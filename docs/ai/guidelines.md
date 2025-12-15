## Guidelines for the Project

This file contains best practices for implementation and testing. Follow these conventions to maintain code quality and consistency across the Glix platform.

---

## Code Style & Formatting

### TypeScript
- **Strict Mode**: Always enabled (`strict: true` in tsconfig.json)
- **Target**: ES2017 for optimal compatibility
- **Path Aliases**: Use `@/*` for imports (e.g., `@/shared/lib/payload`)
- **Type Safety**: Leverage Payload-generated types from `payload-types.ts`

### Linting
- **ESLint**: Use Next.js config (`eslint-config-next`)
- **Run Before Commits**: `npm run lint` to catch issues
- **Auto-fix**: `npm run lint -- --fix` for automatic corrections

### Naming Conventions
- **Files**: `pascalCase.tsx` for components, `kebab-case/` for directories
- **Special Files**: `page.tsx`, `layout.tsx`, `route.ts`, `config.ts`
- **Variables**: `camelCase` for variables/functions
- **Components**: `pascalCase` for React components and types
- **Constants**: `UPPER_SNAKE_CASE` (rare, use sparingly)

### Code Organization
- **Colocation**: Place components near their pages (e.g., `JoinWaitListForm.tsx` next to `page.tsx`)
- **Shared Code**: Use `shared/` for cross-cutting concerns
- **Collections**: Keep Payload logic in `collections/*/` with `config.ts` and hooks
- **Server Actions**: Centralize in `shared/actions/`

---

## Component Patterns

### Server Components (Default)
Use server components by default for optimal performance:

```typescript
// app/(client)/(routes)/about-us/page.tsx
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="container mx-auto">
            <h1>About Us</h1>
        </div>
    );
};

export default AboutUs;
```

### Client Components (When Needed)
Add `"use client"` directive only when using hooks or interactivity:

```typescript
// app/(client)/(routes)/join-waitlist/JoinWaitListForm.tsx
"use client";

import {useActionState} from "react";
import {addToWaitlist} from "@/shared/actions/waitlist";

const JoinWaitlistForm = () => {
    const [state, action, pending] = useActionState(
        addToWaitlist,
        {success: false, message: "", data: {email: ""}}
    );

    return (
        <form action={action}>
            <input
                name="email"
                type="email"
                defaultValue={state.data.email}
                className="border rounded px-4 py-2"
            />
            {state.message && <p>{state.message}</p>}
            <button disabled={pending}>
                {pending ? "Submitting..." : "Join Waitlist"}
            </button>
        </form>
    );
};

export default JoinWaitlistForm;
```

**Key Principles:**
- **Minimize Client Components**: Keep interactive parts isolated
- **Progressive Enhancement**: Forms work without JS using server actions
- **Loading States**: Use `pending` from `useActionState` for feedback

---

## Payload CMS Patterns

### Collection Configuration

Standard structure for `collections/*/config.ts`:

```typescript
import {CollectionConfig} from "payload";
import {checkRole} from "@/collections/common";

const MyCollection: CollectionConfig = {
    slug: "my-collection",
    access: {
        create: ({req: {user}}) => checkRole(["admin"], user),
        read: ({req: {user}}) => checkRole(["admin", "user"], user),
        update: ({req: {user}}) => checkRole(["admin"], user),
        delete: ({req: {user}}) => checkRole(["admin"], user),
    },
    admin: {
        useAsTitle: "name", // Field to display in admin
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "owner",
            type: "relationship",
            relationTo: "users",
            required: true,
        },
    ],
};

export default MyCollection;
```

### Access Control

Use centralized helpers from `collections/common/index.ts`:

```typescript
// Simple role check
access: {
    create: ({req: {user}}) => checkRole(["admin"], user),
}

// Admin or self
access: {
    update: ({req: {user}}) =>
        checkRole(["admin"], user) || {owner: {equals: user?.id}},
}

// Complex query-based access
read: ({req: {user}}) =>
    checkRole(["admin"], user) || {
        or: [
            {id: {in: user?.contacts}},
            {id: {equals: user?.id}},
        ]
    },
```

**Available Helpers:**
- `checkRole(roles, user)` - Check if user has any of specified roles
- `isAnyone()` - Allow public access
- `isAdmin({req: {user}})` - Admin-only access
- `isAdminOrSelf({req: {user}})` - Admin or document owner

### Field Definitions

Common field patterns:

```typescript
// Text field
{
    name: "email",
    type: "text",
    required: true,
    unique: true,
}

// Select field with options
{
    name: "roles",
    type: "select",
    hasMany: true,
    saveToJWT: true,
    options: [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ],
    required: true,
    defaultValue: ["user"],
}

// Relationship field
{
    name: "owner",
    type: "relationship",
    relationTo: "users",
    required: true,
    maxDepth: 2, // How deep to populate
}

// Upload field
{
    name: "avatar",
    type: "upload",
    relationTo: "media",
}

// Field with access control
{
    name: "roles",
    type: "select",
    access: {
        read: ({req: {user}}) => checkRole(["admin"], user),
        update: ({req: {user}}) => checkRole(["admin"], user),
    },
}
```

### Hooks

Use hooks for validation, defaults, and side effects:

```typescript
// Field hook for setting defaults
{
    name: "balance",
    type: "number",
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
}

// Field hook for validation
{
    name: "receiver",
    type: "relationship",
    relationTo: "users",
    hooks: {
        beforeChange: [
            ({req: {user}, value, operation}) => {
                if (operation === "create" && value === user?.id) {
                    throw new Error("You cannot send money to yourself");
                }
            },
        ],
    },
}

// Collection hook (rare, use sparingly)
hooks: {
    afterChange: [
        async ({doc, operation}) => {
            if (operation === "create") {
                // Send notification, etc.
            }
        },
    ],
}
```

---

## Server Actions

Use server actions for form handling and mutations:

```typescript
// shared/actions/myaction.ts
"use server";

import {z} from 'zod';
import type {ActionState} from '@/shared/lib/types';

const MySchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
});

type MyFormState = ActionState<{email: string, name: string}>;

export async function myAction(
    prev: MyFormState,
    formData: FormData
): Promise<MyFormState> {
    // 1. Parse and validate
    const result = MySchema.safeParse({
        email: formData.get("email"),
        name: formData.get("name"),
    });

    if (!result.success) {
        return {
            success: false,
            message: "Invalid input",
            data: {
                email: formData.get("email") as string,
                name: formData.get("name") as string,
            }
        };
    }

    // 2. Process (database, API call, etc.)
    try {
        // ... your logic here
        return {
            success: true,
            message: "Success!",
            data: {email: "", name: ""},
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Something went wrong",
            data: result.data,
        };
    }
}
```

**Best Practices:**
- Always use Zod for validation
- Return structured `ActionState<T>` responses
- Handle MongoDB duplicate key errors (`err.code === 11000`)
- Clear form data on success
- Preserve user input on error

---

## Styling with Tailwind CSS v4

### Utility-First Approach

```typescript
<div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
    <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Welcome
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Description text
        </p>
    </div>
</div>
```

### Design System
- **Colors**: Slate scale (50-950), blue-600 primary, gradients for accents
- **Typography**: Plus Jakarta Sans, responsive sizes (`text-5xl md:text-7xl`)
- **Spacing**: `py-24 px-6` for sections, `gap-8/12/24` for grids
- **Borders**: `rounded-3xl`, `border-slate-200`
- **Shadows**: `shadow-xl`, `shadow-2xl`

### Responsive Design
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
```

### Animations
Use Framer Motion for interactive animations:

```typescript
import {motion} from 'motion/react';

<motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
>
    Content
</motion.div>
```

---

## Error Handling

### Validation Errors
```typescript
// Zod validation
const result = MySchema.safeParse(data);
if (!result.success) {
    return {success: false, message: "Validation failed", data};
}
```

### MongoDB Errors
```typescript
try {
    await collection.insertOne(doc);
} catch (err: any) {
    if (err.code === 11000) {
        return {success: false, message: "Duplicate entry"};
    }
    console.error(err);
    return {success: false, message: "Database error"};
}
```

### API Errors
```typescript
export async function GET() {
    try {
        const data = await fetchData();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}
```

---

## Testing Guidelines

### Unit Tests (Component Testing)

Use Jest + React Testing Library:

```typescript
// __tests__/MyComponent.test.tsx
import {render, screen, waitFor} from '@testing-library/react';
import MyComponent from '@/app/(client)/(routes)/my-page/MyComponent';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({data: "test"}),
    })
) as jest.Mock;

test('renders component', async () => {
    render(<MyComponent />);
    await waitFor(() =>
        expect(screen.getByText('Expected Text')).toBeInTheDocument()
    );
});
```

### Integration Tests (API Routes)

```typescript
// __tests__/api/myroute.test.ts
import {GET} from '@/app/api/myroute/route';

test('API returns correct data', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual({success: true});
});
```

### Server Action Tests

```typescript
// __tests__/actions/myaction.test.ts
import {myAction} from '@/shared/actions/myaction';

test('validates input correctly', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid');

    const result = await myAction(
        {success: false, message: "", data: {email: ""}},
        formData
    );

    expect(result.success).toBe(false);
    expect(result.message).toContain('valid email');
});
```

### E2E Tests (Cypress/Playwright)

```typescript
// cypress/e2e/join-waitlist.cy.ts
describe('Join Waitlist Flow', () => {
    it('allows user to join waitlist', () => {
        cy.visit('/join-waitlist');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('button[type="submit"]').click();
        cy.contains('Subscribed successfully!').should('be.visible');
    });
});
```

### Testing Best Practices
- **Coverage Goal**: 80%+ for critical paths
- **Test Pyramid**: Many unit tests, some integration, few E2E
- **Mock External APIs**: Use test/sandbox environments for Stripe/PayPal
- **Test Edge Cases**: Empty inputs, duplicates, unauthorized access
- **CI Integration**: Run tests on every commit (GitHub Actions)

---

## Security Best Practices

### Input Validation
- **Always use Zod**: Validate all user inputs
- **Sanitize**: Prevent XSS by escaping HTML in user content
- **Rate Limiting**: Use Payload's built-in auth rate limiting

### Authentication
- **JWT Tokens**: HTTP-only cookies managed by Payload
- **Token Expiration**: 7200s (2 hours) configured in Payload auth
- **Max Login Attempts**: 5 attempts, 10min lockout

### Secrets Management
- **Environment Variables**: Never commit secrets to git
- **Vercel Env Vars**: Store API keys and secrets in Vercel dashboard
- **Local .env**: Add `.env.local` to `.gitignore`

### Database Security
- **Parameterized Queries**: Mongoose handles SQL injection prevention
- **Access Control**: Always enforce Payload access rules
- **Sensitive Data**: Hash passwords, never store cards directly

### API Security
- **HTTPS Only**: Enforced by Vercel
- **CORS**: Configure in Payload config if needed
- **Webhooks**: Verify signatures from payment providers

---

## Performance Optimization

### Next.js Optimization
- **Server Components**: Default to server rendering
- **Static Generation**: Use for marketing pages
- **Image Optimization**: Use Next.js `<Image>` component
- **Code Splitting**: Automatic with App Router

### Database Optimization
- **Indexes**: Create indexes for frequently queried fields
- **Pagination**: Use Payload's built-in pagination
- **MaxDepth**: Limit relationship depth to avoid over-fetching

### Caching
- **Vercel Edge Cache**: Automatic for static assets
- **ISR**: Use for semi-dynamic pages (e.g., transaction history)
- **React Cache**: Use for deduplicating data fetches

---

## Version Control

### Git Workflow
- **Branches**: `feature/`, `bugfix/`, `hotfix/` prefixes
- **Commits**: Clear, concise messages (e.g., "Add waitlist form validation")
- **Pull Requests**: Required for main branch, include description and testing notes

### Commit Messages
```
Add user transaction dashboard

- Create dashboard page with transaction list
- Implement server action to fetch user transactions
- Add loading and error states
```

---

## Documentation

### Code Comments
```typescript
// Use comments for complex logic
// Avoid obvious comments

// Good:
// Prevent users from sending money to themselves
if (receiverId === senderId) {
    throw new Error("Cannot send to self");
}

// Bad:
// Increment counter
counter++;
```

### JSDoc for Complex Functions
```typescript
/**
 * Fetches paginated transactions for the current user
 *
 * @param page - Page number (1-indexed)
 * @param limit - Results per page
 * @returns Promise resolving to transaction list
 *
 * @example
 * const txs = await getUserTransactions(1, 10);
 */
```

### TODO Comments
```typescript
// todo: implement email notifications
// todo: add pagination support
// fixme: handle edge case where sender and receiver accounts are same provider
```

---

## Deployment Process

### Pre-Deploy Checklist
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured in Vercel
- [ ] Database migrations applied (if any)

### Vercel Deployment
1. **Push to GitHub**: Vercel auto-deploys on push to `main`
2. **Preview Deployments**: Every PR gets a preview URL
3. **Environment Variables**: Set in Vercel dashboard
4. **Domain Configuration**: Custom domains in Vercel settings

### Rollback Plan
- Use Vercel's instant rollback feature
- Keep previous deployment available for 24h
- Monitor Vercel Analytics for errors post-deploy

---

## Key Principles

1. **Type Safety First**: Leverage TypeScript and Payload types
2. **Server-First**: Maximize server components for performance
3. **Progressive Enhancement**: Forms work without JavaScript
4. **Security by Default**: Validate inputs, enforce access control
5. **Code Quality**: ESLint, testing, clear naming
6. **Performance**: Optimize images, cache effectively, minimize client JS
7. **Documentation**: Comment complex logic, maintain this guide

---

Always reference `/docs/ai/project-architecture.md` for architecture decisions and data models.