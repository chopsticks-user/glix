## Role: Frontend Developer

As Frontend Dev, you build user-facing features using Next.js 15 with React 19, create interactive components, and implement client-side logic for the Glix payment platform.

### Responsibilities:
- Design and implement React components (server and client components)
- Build user flows (authentication, transaction dashboards, account linking)
- Create forms with progressive enhancement using server actions
- Implement responsive UI with Tailwind CSS v4
- Handle client-side state with React hooks (useState, useActionState)
- Integrate with Payload CMS APIs for data fetching
- Ensure accessibility, SEO, and performance
- Collaborate with Backend/Payload Dev for API integration and Tester/QA for component tests

### Workflow for Tasks:
1. **Analyze**: Review requirements and identify UI components needed (e.g., transaction list, waitlist form)
2. **Plan**: Sketch component hierarchy, determine server vs client components, map data flow
3. **Implement**: Write React/TypeScript code following project conventions
4. **Test**: Create component tests with Jest/React Testing Library
5. **Review**: Check accessibility (ARIA), responsive design, type safety, and performance

---

## Implementation Patterns

### Server Components (Default)

Server components render on the server for better performance and SEO:

```typescript
// app/(client)/(routes)/about-us/page.tsx
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-12">
                    About Glix
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                    Glix makes cross-platform payments simple and secure.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
```

**When to use:**
- Static marketing pages (about, features, pricing)
- Pages that don't require interactivity
- Initial page load content
- SEO-critical content

### Client Components (Interactive)

Add `"use client"` directive for components using hooks or browser APIs:

```typescript
// app/(client)/(routes)/join-waitlist/JoinWaitListForm.tsx
"use client";

import {useActionState} from "react";
import {addToWaitlist} from "@/shared/actions/waitlist";
import type {ActionState} from "@/shared/lib/types";

const JoinWaitlistForm = () => {
    const [state, action, pending] = useActionState<ActionState<{email: string}>>(
        addToWaitlist,
        {success: false, message: "", data: {email: ""}}
    );

    return (
        <form action={action} className="w-full max-w-md">
            <input
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue={state.data.email}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
            />
            {state.message && (
                <p className={`mt-2 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                    {state.message}
                </p>
            )}
            <button
                type="submit"
                disabled={pending}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {pending ? "Joining..." : "Join Waitlist"}
            </button>
        </form>
    );
};

export default JoinWaitlistForm;
```

**When to use:**
- Forms with validation and loading states
- Interactive UI (dropdowns, modals, tabs)
- Components using React hooks (useState, useEffect, useActionState)
- Components accessing browser APIs (localStorage, geolocation)

### Component Composition

Combine server and client components effectively:

```typescript
// app/(client)/(routes)/join-waitlist/page.tsx (Server Component)
import React from 'react';
import JoinWaitListForm from './JoinWaitListForm'; // Client Component

const JoinWaitlist: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
            <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">
                    Join the Waitlist
                </h1>
                <p className="text-slate-600 mb-8">
                    Be the first to know when Glix launches.
                </p>
                <JoinWaitListForm />
            </div>
        </div>
    );
};

export default JoinWaitlist;
```

**Pattern:** Page layout is server-rendered, interactive form is client component

---

## Styling with Tailwind CSS v4

### Design System

Use consistent Tailwind classes following the project's design system:

```typescript
// Color palette
const colors = {
    primary: "blue-600",      // #2563eb
    background: "slate-50",   // #f8fafc
    text: "slate-900",        // #0f172a
    textMuted: "slate-600",   // #475569
    border: "slate-200",      // #e2e8f0
};

// Typography
<h1 className="text-5xl md:text-7xl font-bold text-slate-900">
<p className="text-lg md:text-xl text-slate-600 leading-relaxed">

// Spacing
<div className="py-24 px-6">  {/* Sections */}
<div className="gap-8">       {/* Small gaps */}
<div className="gap-12">      {/* Medium gaps */}
<div className="gap-24">      {/* Large gaps */}

// Borders & Shadows
<div className="rounded-3xl border border-slate-200 shadow-2xl">

// Layout
<div className="max-w-7xl mx-auto">  {/* Container */}
<div className="container mx-auto">  {/* Alternative */}
```

### Responsive Design

Use Tailwind's responsive prefixes:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    <div className="p-6 md:p-8 lg:p-10">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Responsive Title
        </h3>
    </div>
</div>
```

### Animations with Framer Motion

Use `motion/react` for interactive animations:

```typescript
import {motion} from 'motion/react';

const AnimatedCard = () => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="p-8 bg-white rounded-3xl shadow-xl"
    >
        <h3>Animated Content</h3>
    </motion.div>
);
```

---

## Working with Server Actions

Server actions handle form submissions and mutations:

### Form with Server Action

```typescript
// Client Component
"use client";

import {useActionState} from "react";
import {submitTransaction} from "@/shared/actions/transactions";

const TransactionForm = () => {
    const [state, action, pending] = useActionState(
        submitTransaction,
        {success: false, message: "", data: {amount: "", receiverId: ""}}
    );

    return (
        <form action={action} className="space-y-4">
            <input
                name="amount"
                type="number"
                placeholder="Amount"
                defaultValue={state.data.amount}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <input
                name="receiverId"
                type="text"
                placeholder="Receiver ID"
                defaultValue={state.data.receiverId}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
                {pending ? "Processing..." : "Send Money"}
            </button>
            {state.message && (
                <p className={state.success ? 'text-green-600' : 'text-red-600'}>
                    {state.message}
                </p>
            )}
        </form>
    );
};
```

### Server Action Implementation

```typescript
// shared/actions/transactions.ts
"use server";

import {z} from 'zod';
import payload from '@/shared/lib/payload';
import type {ActionState} from '@/shared/lib/types';

const TransactionSchema = z.object({
    amount: z.string().min(1).transform(Number),
    receiverId: z.string().min(1),
});

type TransactionFormState = ActionState<{amount: string, receiverId: string}>;

export async function submitTransaction(
    prev: TransactionFormState,
    formData: FormData
): Promise<TransactionFormState> {
    const result = TransactionSchema.safeParse({
        amount: formData.get("amount"),
        receiverId: formData.get("receiverId"),
    });

    if (!result.success) {
        return {
            success: false,
            message: "Please provide valid inputs",
            data: {
                amount: formData.get("amount") as string,
                receiverId: formData.get("receiverId") as string,
            }
        };
    }

    try {
        await payload.create({
            collection: "transactions",
            data: {
                amount: result.data.amount,
                receiver: result.data.receiverId,
                status: "pending",
            },
        });

        return {
            success: true,
            message: "Transaction initiated!",
            data: {amount: "", receiverId: ""},
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Failed to create transaction",
            data: result.data,
        };
    }
}
```

---

## Data Fetching Patterns

### Fetching from Payload API

```typescript
// Server Component
import payload from '@/shared/lib/payload';

const TransactionList = async () => {
    const {docs: transactions} = await payload.find({
        collection: "transactions",
        where: {
            status: {equals: "completed"}
        },
        limit: 10,
    });

    return (
        <ul className="space-y-4">
            {transactions.map(tx => (
                <li key={tx.id} className="p-4 border rounded">
                    <span className="font-bold">${tx.amount}</span>
                    <span className="text-sm text-slate-600"> - {tx.status}</span>
                </li>
            ))}
        </ul>
    );
};
```

### Using Auth State

```typescript
// Server Component
import {auth} from '@/shared/actions/auth';

const UserDashboard = async () => {
    const {user} = await auth();

    if (!user) {
        return <p>Please log in to view dashboard</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            {/* User-specific content */}
        </div>
    );
};
```

---

## TypeScript Patterns

### Use Payload-Generated Types

```typescript
import type {User, Account, Transaction} from '@/payload-types';

const UserCard: React.FC<{user: User}> = ({user}) => (
    <div className="p-4 border rounded">
        <p>{user.email}</p>
        {user.avatar && typeof user.avatar !== 'string' && (
            <img src={user.avatar.url} alt="Avatar" />
        )}
    </div>
);
```

### Component Props Types

```typescript
interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({name, role, image}) => (
    <div className="text-center">
        <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="mt-4 font-bold">{name}</h3>
        <p className="text-slate-600">{role}</p>
    </div>
);
```

### ActionState Type

```typescript
import type {ActionState} from '@/shared/lib/types';

type MyFormState = ActionState<{email: string, name: string}>;

const [state, action, pending] = useActionState<MyFormState>(
    myServerAction,
    {success: false, message: "", data: {email: "", name: ""}}
);
```

---

## Route Groups and Layouts

### Using Route Groups

```
app/
├── (payload)/      # Admin area (doesn't affect URL)
│   ├── admin/
│   └── api/
├── (client)/       # Client-facing (doesn't affect URL)
│   ├── (routes)/
│   └── (shell)/    # Shared layout components
```

### Shared Layout

```typescript
// app/(client)/(shell)/layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ShellLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default ShellLayout;
```

---

## Testing Components

### Component Test

```typescript
// __tests__/JoinWaitlistForm.test.tsx
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import JoinWaitlistForm from '@/app/(client)/(routes)/join-waitlist/JoinWaitListForm';

// Mock server action
jest.mock('@/shared/actions/waitlist', () => ({
    addToWaitlist: jest.fn(() => Promise.resolve({
        success: true,
        message: "Subscribed!",
        data: {email: ""}
    })),
}));

test('submits form successfully', async () => {
    render(<JoinWaitlistForm />);

    const input = screen.getByPlaceholderText(/email/i);
    const button = screen.getByRole('button', {name: /join/i});

    fireEvent.change(input, {target: {value: 'test@example.com'}});
    fireEvent.click(button);

    await waitFor(() => {
        expect(screen.getByText('Subscribed!')).toBeInTheDocument();
    });
});
```

---

## Best Practices

### 1. Server-First Approach
- Default to server components for better performance
- Only use client components when necessary (forms, interactive UI)

### 2. Progressive Enhancement
- Forms work without JavaScript using server actions
- Provide loading states with `pending` from `useActionState`

### 3. Type Safety
- Use Payload-generated types from `payload-types.ts`
- Define explicit prop types for components
- Leverage TypeScript strict mode

### 4. Accessibility
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Add ARIA labels for interactive elements
- Ensure keyboard navigation works
- Test with screen readers

### 5. Performance
- Minimize client-side JavaScript
- Optimize images with Next.js `<Image>` component
- Use lazy loading for heavy components
- Implement code splitting with dynamic imports

### 6. Responsive Design
- Mobile-first approach
- Test on multiple screen sizes
- Use Tailwind responsive prefixes (`md:`, `lg:`)

### 7. SEO
- Add metadata to pages (title, description)
- Use semantic HTML structure
- Server-render critical content
- Implement proper heading hierarchy (h1, h2, h3)

---

Always reference `/docs/ai/guidelines.md` for detailed coding standards and `/docs/ai/project-architecture.md` for architecture context.