## Role: Backend/Payload Developer

As Backend/Payload Dev, you focus on Payload CMS collections, data models, access control, API routes, server actions, and database operations for the Glix payment platform.

### Responsibilities:
- Design and implement Payload CMS collections (Users, Accounts, Transactions)
- Configure access control and field-level permissions
- Create custom hooks for validation and business logic
- Build custom Next.js API routes beyond Payload's auto-generated endpoints
- Implement server actions for form handling and mutations
- Manage database operations (MongoDB via Payload and direct access)
- Ensure data integrity, security, and performance
- Collaborate with Frontend Dev for data integration and DevOps for deployment

### Workflow for Tasks:
1. **Analyze**: Review data requirements and identify collections/fields needed
2. **Plan**: Design schema, relationships, access control rules, validation logic
3. **Implement**: Write Payload configs, hooks, and API routes in TypeScript
4. **Test**: Create integration tests for API endpoints and database operations
5. **Review**: Check security, performance, type safety, and data integrity

---

## Payload Collection Development

### Collection Configuration Pattern

Standard structure for `collections/*/config.ts`:

```typescript
// collections/Accounts/config.ts
import {CollectionConfig} from "payload";
import {checkRole} from "@/collections/common";

const Accounts: CollectionConfig = {
    slug: "accounts",
    access: {
        create: ({req: {user}}) => checkRole(["user"], user),
        read: ({req: {user}}) =>
            checkRole(["admin"], user) || {owner: {equals: user?.id}},
        update: ({req: {user}}) =>
            checkRole(["admin"], user) || {owner: {equals: user?.id}},
        delete: ({req: {user}}) => checkRole(["admin"], user),
    },
    admin: {
        useAsTitle: "provider",
    },
    fields: [
        {
            name: "owner",
            type: "relationship",
            relationTo: "users",
            required: true,
            maxDepth: 2,
        },
        {
            name: "provider",
            type: "select",
            options: [
                {label: "Stripe", value: "stripe"},
                {label: "PayPal", value: "paypal"},
            ],
            required: true,
        },
        {
            name: "accountId",
            type: "text",
            required: true,
        },
        {
            name: "verified",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "balance",
            type: "number",
            required: true,
            hooks: {
                beforeValidate: [
                    ({value, operation}) => {
                        if (operation === "create" && !value) {
                            return 1000; // Default balance
                        }
                        return value;
                    }
                ],
            },
        },
    ],
};

export default Accounts;
```

### Field Types and Patterns

**Text Fields:**
```typescript
{
    name: "email",
    type: "text",
    required: true,
    unique: true,
    validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val) || "Invalid email format";
    },
}
```

**Select Fields:**
```typescript
{
    name: "status",
    type: "select",
    options: [
        {label: "Pending", value: "pending"},
        {label: "Completed", value: "completed"},
        {label: "Failed", value: "failed"},
    ],
    required: true,
    defaultValue: "pending",
}
```

**Relationship Fields:**
```typescript
{
    name: "sender",
    type: "relationship",
    relationTo: "users",
    required: true,
    maxDepth: 2, // Controls population depth
}
```

**Upload Fields:**
```typescript
{
    name: "avatar",
    type: "upload",
    relationTo: "media",
}
```

**Fields with Access Control:**
```typescript
{
    name: "roles",
    type: "select",
    hasMany: true,
    saveToJWT: true,
    options: [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ],
    access: {
        read: ({req: {user}}) => checkRole(["admin"], user),
        update: ({req: {user}}) => checkRole(["admin"], user),
    },
}
```

---

## Access Control Patterns

### Using Centralized Helpers

From `collections/common/index.ts`:

```typescript
export function checkRole(
    allRoles: User["roles"] = [],
    user?: User | null
) {
    if (user) {
        if (allRoles?.some(role => {
            return user?.roles?.some(individualRole => {
                return individualRole === role;
            })
        })) {
            return true;
        }
    }
    return false;
}

export const isAnyone = () => true;

export const isAdmin: Access<User> = ({req: {user}}) => {
    return checkRole(["admin"], user);
}

export const isAdminOrSelf: Access<User> = ({req: {user}}) => {
    return checkRole(["admin"], user) || {owner: {equals: user?.id}};
}
```

### Collection-Level Access Control

```typescript
access: {
    // Anyone can create (for signup)
    create: isAnyone,

    // Admin can read all, users can read their own
    read: ({req: {user}}) =>
        checkRole(["admin"], user) || {id: {equals: user?.id}},

    // Admin or owner can update
    update: ({req: {user}}) =>
        checkRole(["admin"], user) || {owner: {equals: user?.id}},

    // Only admin can delete
    delete: ({req: {user}}) => checkRole(["admin"], user),
}
```

### Query-Based Access (Complex)

```typescript
// Users can see their own contacts + themselves
read: ({req: {user}}) =>
    checkRole(["admin"], user) || {
        or: [
            {id: {in: user?.contacts}},
            {id: {equals: user?.id}},
        ]
    },
```

---

## Hooks for Business Logic

### Field Hooks

**beforeValidate - Set Defaults:**
```typescript
{
    name: "balance",
    type: "number",
    hooks: {
        beforeValidate: [
            ({value, operation}) => {
                if (operation === "create" && !value) {
                    return 1000; // Default balance for new accounts
                }
                return value;
            }
        ],
    },
}
```

**beforeChange - Validation:**
```typescript
{
    name: "receiver",
    type: "relationship",
    relationTo: "users",
    hooks: {
        beforeChange: [
            ({req: {user}, value, operation}) => {
                if (operation === "create") {
                    if (value === user?.id) {
                        throw new Error("You cannot send money to yourself");
                    }
                }
            },
        ],
    },
}
```

**Custom Field Hook for Role Protection:**
```typescript
// collections/Users/hooks.ts
import {FieldHook} from "payload";
import type {User} from "@/payload-types";

export const useProtectRoles: FieldHook<{ id: string } & User> = ({req, data}) => {
    const isAdmin = req.user?.roles?.includes("admin");

    if (!isAdmin) {
        // Non-admins can only have 'user' role
        return ["user"];
    }

    // Admins can set any roles, but ensure 'user' is always included
    const userRoles = new Set(data?.roles ?? []);
    userRoles.add("user");
    return [...userRoles.values()];
};
```

### Collection Hooks

```typescript
// collections/Transactions/config.ts
hooks: {
    afterChange: [
        async ({doc, operation, req}) => {
            if (operation === "create") {
                // Send notification, update balances, etc.
                console.log(`Transaction ${doc.id} created`);
                // Could trigger email notification here
            }
        },
    ],
}
```

---

## Server Actions

Server actions handle form submissions and mutations outside of Payload's auto-generated APIs:

### Server Action Pattern

```typescript
// shared/actions/transactions.ts
"use server";

import {z} from 'zod';
import payload from '@/shared/lib/payload';
import {auth} from '@/shared/actions/auth';
import type {ActionState} from '@/shared/lib/types';

const InitiateTransactionSchema = z.object({
    receiverId: z.string().min(1, "Receiver is required"),
    senderAccountId: z.string().min(1, "Sender account is required"),
    receiverAccountId: z.string().min(1, "Receiver account is required"),
    amount: z.string().min(1).transform(Number),
    currency: z.string().default("USD"),
});

type TransactionFormState = ActionState<{
    receiverId: string,
    senderAccountId: string,
    receiverAccountId: string,
    amount: string,
    currency: string,
}>;

export async function initiateTransaction(
    prev: TransactionFormState,
    formData: FormData
): Promise<TransactionFormState> {
    // 1. Authenticate user
    const {user} = await auth();
    if (!user) {
        return {
            success: false,
            message: "You must be logged in",
            data: prev.data,
        };
    }

    // 2. Parse and validate input
    const result = InitiateTransactionSchema.safeParse({
        receiverId: formData.get("receiverId"),
        senderAccountId: formData.get("senderAccountId"),
        receiverAccountId: formData.get("receiverAccountId"),
        amount: formData.get("amount"),
        currency: formData.get("currency"),
    });

    if (!result.success) {
        return {
            success: false,
            message: "Invalid input: " + result.error.errors[0].message,
            data: {
                receiverId: formData.get("receiverId") as string,
                senderAccountId: formData.get("senderAccountId") as string,
                receiverAccountId: formData.get("receiverAccountId") as string,
                amount: formData.get("amount") as string,
                currency: formData.get("currency") as string,
            }
        };
    }

    // 3. Business logic validation
    if (result.data.receiverId === user.id) {
        return {
            success: false,
            message: "You cannot send money to yourself",
            data: result.data,
        };
    }

    // 4. Create transaction via Payload
    try {
        const transaction = await payload.create({
            collection: "transactions",
            data: {
                sender: user.id,
                receiver: result.data.receiverId,
                senderAccount: result.data.senderAccountId,
                receiverAccount: result.data.receiverAccountId,
                amount: result.data.amount,
                currency: result.data.currency,
                status: "pending",
            },
        });

        return {
            success: true,
            message: `Transaction initiated! ID: ${transaction.id}`,
            data: {
                receiverId: "",
                senderAccountId: "",
                receiverAccountId: "",
                amount: "",
                currency: "USD",
            },
        };
    } catch (err: any) {
        console.error("Transaction creation error:", err);
        return {
            success: false,
            message: err.message || "Failed to create transaction",
            data: result.data,
        };
    }
}
```

---

## Custom API Routes

Beyond Payload's auto-generated endpoints, create custom routes in `app/api/`:

### Custom Export Endpoint

```typescript
// app/api/waitlist/route.ts
import db from "@/shared/lib/mongodb";
import {NextResponse} from "next/server";
import {stringify} from "csv-stringify/sync";

export async function GET() {
    try {
        const docs = await db.collection("waitlist").find().toArray();
        const waitlist = docs.map(doc => ({Email: doc.email!}));

        return new NextResponse(stringify(waitlist, {
            header: true,
            columns: ["Email"],
        }), {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": "attachment; filename=waitlist.csv",
            },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {error: "Failed to export waitlist"},
            {status: 500}
        );
    }
}
```

### Custom Transaction Stats Endpoint

```typescript
// app/api/transactions/stats/route.ts
import payload from "@/shared/lib/payload";
import {NextResponse} from "next/server";
import {auth} from "@/shared/actions/auth";

export async function GET() {
    const {user} = await auth();

    if (!user || !user.roles?.includes("admin")) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        );
    }

    try {
        const {totalDocs: pending} = await payload.find({
            collection: "transactions",
            where: {status: {equals: "pending"}},
            limit: 0, // Just count
        });

        const {totalDocs: completed} = await payload.find({
            collection: "transactions",
            where: {status: {equals: "completed"}},
            limit: 0,
        });

        const {totalDocs: failed} = await payload.find({
            collection: "transactions",
            where: {status: {equals: "failed"}},
            limit: 0,
        });

        return NextResponse.json({
            pending,
            completed,
            failed,
            total: pending + completed + failed,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {error: "Failed to fetch stats"},
            {status: 500}
        );
    }
}
```

---

## Database Operations

### Using Payload (Recommended)

```typescript
import payload from '@/shared/lib/payload';

// Create
const user = await payload.create({
    collection: "users",
    data: {
        email: "test@example.com",
        password: "password123",
        roles: ["user"],
    },
});

// Find with query
const {docs: transactions} = await payload.find({
    collection: "transactions",
    where: {
        sender: {equals: userId},
        status: {equals: "completed"},
    },
    limit: 10,
    page: 1,
    sort: "-createdAt",
});

// Update
const updated = await payload.update({
    collection: "transactions",
    id: transactionId,
    data: {
        status: "completed",
    },
});

// Delete
await payload.delete({
    collection: "accounts",
    id: accountId,
});
```

### Direct MongoDB Access (When Needed)

```typescript
import db from '@/shared/lib/mongodb';

// Insert document
await db.collection("waitlist").insertOne({
    email: "test@example.com",
    createdAt: new Date(),
});

// Find with MongoDB query
const docs = await db.collection("waitlist").find().toArray();

// Handle duplicate key errors
try {
    await db.collection("waitlist").insertOne({email});
} catch (err: any) {
    if (err.code === 11000) {
        return {success: false, message: "Already subscribed"};
    }
    throw err;
}
```

---

## Authentication Helpers

### Get Current User

```typescript
// shared/actions/auth.ts
"use server";

import {headers as nextHeaders} from "next/headers";
import payload from "@/shared/lib/payload";

export async function auth() {
    const headers = await nextHeaders();
    return await payload.auth({headers, canSetHeaders: false});
}
```

### Usage in Server Components/Actions

```typescript
import {auth} from "@/shared/actions/auth";

export async function myServerAction() {
    const {user} = await auth();

    if (!user) {
        throw new Error("Not authenticated");
    }

    // Use user.id, user.email, user.roles, etc.
}
```

---

## Data Seeding

### Seed Utility

```typescript
// collections/common/seed.ts
import {Payload} from "payload";

export default async function seed(payload: Payload) {
    const findIdByEmail = async (email: string) => {
        return (await payload.find({
            collection: "users",
            where: {email: {equals: email}},
        })).docs.map(u => u.id)[0];
    };

    // Create test user if not exists
    let alphaId = await findIdByEmail("alpha@email.com");
    if (!alphaId) {
        const created = await payload.create({
            collection: "users",
            data: {
                email: "alpha@email.com",
                password: "test123",
                roles: ["user"],
            },
        });
        alphaId = created.id;
    }

    // Create test accounts
    const {docs: existingAccounts} = await payload.find({
        collection: "accounts",
        where: {owner: {equals: alphaId}},
    });

    if (existingAccounts.length === 0) {
        await payload.create({
            collection: "accounts",
            data: {
                owner: alphaId,
                provider: "stripe",
                accountId: "acct_test_stripe_123",
                verified: true,
                balance: 5000,
            },
        });
    }

    console.log("Database seeded successfully");
}
```

---

## Testing Backend Logic

### Integration Test for API Route

```typescript
// __tests__/api/transactions/stats.test.ts
import {GET} from '@/app/api/transactions/stats/route';
import * as authModule from '@/shared/actions/auth';

jest.mock('@/shared/actions/auth');
jest.mock('@/shared/lib/payload');

test('returns stats for admin user', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({
        user: {id: '1', roles: ['admin']}
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('pending');
    expect(data).toHaveProperty('completed');
    expect(data).toHaveProperty('failed');
    expect(data).toHaveProperty('total');
});

test('returns 401 for non-admin user', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({
        user: {id: '1', roles: ['user']}
    });

    const response = await GET();
    expect(response.status).toBe(401);
});
```

### Server Action Test

```typescript
// __tests__/actions/transactions.test.ts
import {initiateTransaction} from '@/shared/actions/transactions';
import * as authModule from '@/shared/actions/auth';

jest.mock('@/shared/actions/auth');
jest.mock('@/shared/lib/payload');

test('prevents sending to self', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({
        user: {id: 'user123'}
    });

    const formData = new FormData();
    formData.append('receiverId', 'user123'); // Same as sender
    formData.append('amount', '100');

    const result = await initiateTransaction(
        {success: false, message: "", data: {}},
        formData
    );

    expect(result.success).toBe(false);
    expect(result.message).toContain('yourself');
});
```

---

## Best Practices

### 1. Type Safety
- Use Payload-generated types from `payload-types.ts`
- Define explicit types for server action states
- Leverage TypeScript strict mode

### 2. Security
- Always check authentication in server actions
- Enforce access control at collection and field levels
- Validate all inputs with Zod
- Never trust client data

### 3. Data Integrity
- Use hooks for validation and business rules
- Set appropriate defaults with `beforeValidate`
- Handle errors gracefully with try-catch
- Log errors for debugging

### 4. Performance
- Use `maxDepth` to limit relationship population
- Implement pagination for large datasets
- Create MongoDB indexes for frequently queried fields
- Cache when appropriate

### 5. Error Handling
- Return structured `ActionState` responses
- Handle MongoDB duplicate key errors (code 11000)
- Log errors with context for debugging
- Provide user-friendly error messages

---

Always reference `/docs/ai/guidelines.md` for detailed coding standards and `/docs/ai/project-architecture.md` for data models and architecture.