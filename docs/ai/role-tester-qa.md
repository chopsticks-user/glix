## Role: Tester/QA Engineer

As Tester/QA, you ensure quality through comprehensive testing strategies, automation, and validation for the Glix Next.js + Payload CMS platform.

### Responsibilities:
- Design and implement test strategies (unit, integration, E2E, visual, performance)
- Write automated tests using Jest, React Testing Library, Playwright/Cypress
- Create test plans and test cases for features and bug fixes
- Perform manual testing and exploratory testing
- Set up CI/CD test automation
- Monitor test coverage and quality metrics
- Identify and document bugs
- Validate accessibility (a11y) and performance
- Collaborate with Frontend/Backend Devs for testable code and DevOps for test automation

### Workflow for Tasks:
1. **Analyze**: Review requirements and identify test scenarios
2. **Plan**: Design test cases (happy path, edge cases, error handling)
3. **Implement**: Write automated tests and manual test procedures
4. **Execute**: Run tests, analyze results, report bugs
5. **Review**: Track coverage, optimize test suite, improve test quality

---

## Testing Stack

### Core Tools
- **Jest**: Unit and integration testing framework
- **React Testing Library**: Component testing
- **Playwright**: E2E testing (recommended)
- **Cypress**: Alternative E2E testing
- **MSW (Mock Service Worker)**: API mocking
- **Testing Library User Event**: User interaction simulation
- **Axe**: Accessibility testing

### Installation

```bash
# Core testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event @types/jest

# E2E testing
npm install --save-dev @playwright/test

# API mocking
npm install --save-dev msw

# Accessibility testing
npm install --save-dev @axe-core/react jest-axe
```

---

## Unit Testing

### Component Tests with React Testing Library

**Testing a Form Component:**
```typescript
// __tests__/components/JoinWaitlistForm.test.tsx
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JoinWaitlistForm from '@/app/(client)/(routes)/join-waitlist/JoinWaitListForm';
import {addToWaitlist} from '@/shared/actions/waitlist';

// Mock server action
jest.mock('@/shared/actions/waitlist', () => ({
    addToWaitlist: jest.fn(),
}));

describe('JoinWaitlistForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form with email input and submit button', () => {
        render(<JoinWaitlistForm />);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /join/i})).toBeInTheDocument();
    });

    it('submits form with valid email', async () => {
        const user = userEvent.setup();
        (addToWaitlist as jest.Mock).mockResolvedValue({
            success: true,
            message: 'Subscribed successfully!',
            data: {email: ''},
        });

        render(<JoinWaitlistForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        const submitButton = screen.getByRole('button', {name: /join/i});

        await user.type(emailInput, 'test@example.com');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Subscribed successfully!')).toBeInTheDocument();
        });
    });

    it('shows error for invalid email', async () => {
        const user = userEvent.setup();
        (addToWaitlist as jest.Mock).mockResolvedValue({
            success: false,
            message: 'Please provide a valid email address',
            data: {email: 'invalid'},
        });

        render(<JoinWaitlistForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        const submitButton = screen.getByRole('button', {name: /join/i});

        await user.type(emailInput, 'invalid');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/valid email/i)).toBeInTheDocument();
        });
    });

    it('disables submit button while pending', async () => {
        const user = userEvent.setup();
        let resolveAction: any;
        (addToWaitlist as jest.Mock).mockReturnValue(
            new Promise(resolve => {
                resolveAction = resolve;
            })
        );

        render(<JoinWaitlistForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        const submitButton = screen.getByRole('button', {name: /join/i});

        await user.type(emailInput, 'test@example.com');
        await user.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(screen.getByText(/joining/i)).toBeInTheDocument();

        // Resolve promise
        resolveAction({success: true, message: 'Success', data: {email: ''}});

        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
        });
    });
});
```

### Testing Server Components

**Mock Payload API:**
```typescript
// __tests__/components/TransactionList.test.tsx
import {render, screen} from '@testing-library/react';
import TransactionList from '@/app/(client)/(routes)/transactions/TransactionList';
import payload from '@/shared/lib/payload';

jest.mock('@/shared/lib/payload', () => ({
    find: jest.fn(),
}));

describe('TransactionList', () => {
    it('displays transactions', async () => {
        (payload.find as jest.Mock).mockResolvedValue({
            docs: [
                {id: '1', amount: 100, status: 'completed'},
                {id: '2', amount: 200, status: 'pending'},
            ],
        });

        render(await TransactionList());

        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
    });

    it('shows empty state when no transactions', async () => {
        (payload.find as jest.Mock).mockResolvedValue({docs: []});

        render(await TransactionList());

        expect(screen.getByText(/no transactions/i)).toBeInTheDocument();
    });
});
```

---

## Integration Testing

### Server Action Tests

```typescript
// __tests__/actions/waitlist.test.ts
import {addToWaitlist} from '@/shared/actions/waitlist';
import db from '@/shared/lib/mongodb';

jest.mock('@/shared/lib/mongodb', () => ({
    collection: jest.fn(() => ({
        insertOne: jest.fn(),
    })),
}));

describe('addToWaitlist', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('successfully adds email to waitlist', async () => {
        const mockInsertOne = jest.fn().mockResolvedValue({acknowledged: true});
        (db.collection as jest.Mock).mockReturnValue({
            insertOne: mockInsertOne,
        });

        const formData = new FormData();
        formData.append('email', 'test@example.com');

        const result = await addToWaitlist(
            {success: false, message: '', data: {email: ''}},
            formData
        );

        expect(result.success).toBe(true);
        expect(result.message).toContain('success');
        expect(mockInsertOne).toHaveBeenCalledWith({
            email: 'test@example.com',
        });
    });

    it('handles duplicate email error', async () => {
        const error: any = new Error('Duplicate key');
        error.code = 11000;

        const mockInsertOne = jest.fn().mockRejectedValue(error);
        (db.collection as jest.Mock).mockReturnValue({
            insertOne: mockInsertOne,
        });

        const formData = new FormData();
        formData.append('email', 'existing@example.com');

        const result = await addToWaitlist(
            {success: false, message: '', data: {email: ''}},
            formData
        );

        expect(result.success).toBe(false);
        expect(result.message).toContain('subscribed');
    });

    it('validates email format', async () => {
        const formData = new FormData();
        formData.append('email', 'invalid-email');

        const result = await addToWaitlist(
            {success: false, message: '', data: {email: ''}},
            formData
        );

        expect(result.success).toBe(false);
        expect(result.message).toContain('valid email');
    });
});
```

### API Route Tests

```typescript
// __tests__/api/transactions/stats.test.ts
import {GET} from '@/app/api/transactions/stats/route';
import {NextRequest} from 'next/server';
import * as authModule from '@/shared/actions/auth';
import payload from '@/shared/lib/payload';

jest.mock('@/shared/actions/auth');
jest.mock('@/shared/lib/payload');

describe('GET /api/transactions/stats', () => {
    it('returns stats for admin user', async () => {
        (authModule.auth as jest.Mock).mockResolvedValue({
            user: {id: 'admin1', roles: ['admin']},
        });

        (payload.find as jest.Mock)
            .mockResolvedValueOnce({totalDocs: 10}) // pending
            .mockResolvedValueOnce({totalDocs: 25}) // completed
            .mockResolvedValueOnce({totalDocs: 3}); // failed

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({
            pending: 10,
            completed: 25,
            failed: 3,
            total: 38,
        });
    });

    it('returns 401 for non-admin user', async () => {
        (authModule.auth as jest.Mock).mockResolvedValue({
            user: {id: 'user1', roles: ['user']},
        });

        const response = await GET();

        expect(response.status).toBe(401);
    });

    it('returns 401 for unauthenticated user', async () => {
        (authModule.auth as jest.Mock).mockResolvedValue({user: null});

        const response = await GET();

        expect(response.status).toBe(401);
    });
});
```

---

## End-to-End Testing

### Playwright E2E Tests

**Setup (`playwright.config.ts`):**
```typescript
import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },
        {
            name: 'Mobile Chrome',
            use: {...devices['Pixel 5']},
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});
```

**E2E Test Example:**
```typescript
// e2e/join-waitlist.spec.ts
import {test, expect} from '@playwright/test';

test.describe('Join Waitlist Flow', () => {
    test('user can join waitlist with valid email', async ({page}) => {
        await page.goto('/join-waitlist');

        // Fill form
        await page.fill('input[name="email"]', 'test@example.com');

        // Submit
        await page.click('button[type="submit"]');

        // Verify success message
        await expect(page.getByText(/subscribed successfully/i)).toBeVisible();
    });

    test('shows error for invalid email', async ({page}) => {
        await page.goto('/join-waitlist');

        await page.fill('input[name="email"]', 'invalid-email');
        await page.click('button[type="submit"]');

        await expect(page.getByText(/valid email/i)).toBeVisible();
    });

    test('shows error for duplicate email', async ({page}) => {
        const email = `duplicate-${Date.now()}@example.com`;

        await page.goto('/join-waitlist');

        // First submission
        await page.fill('input[name="email"]', email);
        await page.click('button[type="submit"]');
        await expect(page.getByText(/success/i)).toBeVisible();

        // Second submission with same email
        await page.reload();
        await page.fill('input[name="email"]', email);
        await page.click('button[type="submit"]');
        await expect(page.getByText(/already subscribed/i)).toBeVisible();
    });

    test('button is disabled while submitting', async ({page}) => {
        await page.goto('/join-waitlist');

        await page.fill('input[name="email"]', 'test@example.com');

        const button = page.locator('button[type="submit"]');

        // Click and check disabled state immediately
        await button.click();
        await expect(button).toBeDisabled();

        // Wait for completion
        await expect(page.getByText(/subscribed|error/i)).toBeVisible();
    });
});
```

**Authentication Flow Test:**
```typescript
// e2e/auth.spec.ts
import {test, expect} from '@playwright/test';

test.describe('Authentication', () => {
    test('user can log in', async ({page}) => {
        await page.goto('/auth/login');

        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        // Should redirect to dashboard
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.getByText(/welcome/i)).toBeVisible();
    });

    test('shows error for invalid credentials', async ({page}) => {
        await page.goto('/auth/login');

        await page.fill('input[name="email"]', 'wrong@example.com');
        await page.fill('input[name="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    });

    test('user can log out', async ({page}) => {
        // Login first
        await page.goto('/auth/login');
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/\/dashboard/);

        // Logout
        await page.click('button:has-text("Logout")');

        // Should redirect to home
        await expect(page).toHaveURL('/');
    });
});
```

---

## Visual Regression Testing

### Playwright Visual Comparisons

```typescript
// e2e/visual.spec.ts
import {test, expect} from '@playwright/test';

test.describe('Visual Regression', () => {
    test('homepage matches snapshot', async ({page}) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('homepage.png');
    });

    test('login page matches snapshot', async ({page}) => {
        await page.goto('/auth/login');
        await expect(page).toHaveScreenshot('login.png');
    });

    test('transaction form matches snapshot', async ({page}) => {
        await page.goto('/transactions/new');
        await expect(page.locator('form')).toHaveScreenshot('transaction-form.png');
    });
});
```

---

## Accessibility Testing

### Automated a11y Tests

```typescript
// __tests__/accessibility/a11y.test.tsx
import {render} from '@testing-library/react';
import {axe, toHaveNoViolations} from 'jest-axe';
import JoinWaitlistForm from '@/app/(client)/(routes)/join-waitlist/JoinWaitListForm';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
    it('JoinWaitlistForm has no a11y violations', async () => {
        const {container} = render(<JoinWaitlistForm />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
```

### Playwright Accessibility Tests

```typescript
// e2e/accessibility.spec.ts
import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('homepage should not have accessibility violations', async ({page}) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({page}).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('form has proper labels', async ({page}) => {
        await page.goto('/join-waitlist');

        const emailInput = page.locator('input[name="email"]');
        await expect(emailInput).toHaveAttribute('aria-label');
    });
});
```

---

## Performance Testing

### Lighthouse CI

**`.lighthouserc.json`:**
```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run build && npm start",
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/join-waitlist",
        "http://localhost:3000/auth/login"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**GitHub Actions Integration:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

---

## Test Coverage

### Jest Coverage Configuration

**`jest.config.js`:**
```javascript
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
        'shared/**/*.{js,jsx,ts,tsx}',
        'collections/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
    ],
    coverageThresholds: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};
```

**Run coverage:**
```bash
npm test -- --coverage
```

---

## Manual Testing Checklist

### Feature Testing Template

```markdown
## Feature: Join Waitlist

**Test Environment:** Production
**Tester:** QA Team
**Date:** 2025-01-15

### Test Cases

#### TC-001: Happy Path
- [ ] Navigate to /join-waitlist
- [ ] Enter valid email: test@example.com
- [ ] Click "Join Waitlist" button
- [ ] Verify success message appears
- [ ] Verify button is re-enabled

#### TC-002: Invalid Email
- [ ] Enter invalid email: "notanemail"
- [ ] Click submit
- [ ] Verify error message displays

#### TC-003: Duplicate Email
- [ ] Submit same email twice
- [ ] Verify appropriate message on second submission

#### TC-004: Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)

#### TC-005: Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Bugs Found
- None

### Notes
- Form works as expected across all browsers
```

---

## Best Practices

### 1. Test Pyramid
- **Many unit tests** (70%): Fast, isolated, test individual functions
- **Some integration tests** (20%): Test feature flows and API integration
- **Few E2E tests** (10%): Test critical user journeys

### 2. Testing Principles
- Test behavior, not implementation
- Write tests that resemble user interactions
- Avoid testing internal state
- Use meaningful test descriptions
- Keep tests isolated and independent

### 3. Mocking Strategy
- Mock external APIs (Stripe, PayPal)
- Mock database in unit tests
- Use real database in integration tests (test containers)
- Minimize mocking in E2E tests

### 4. CI/CD Integration
- Run tests on every PR
- Block merges if tests fail
- Run E2E tests on staging before production
- Monitor flaky tests and fix immediately

### 5. Test Data Management
- Use factories for test data
- Clean up test data after tests
- Use unique identifiers (timestamps, UUIDs)
- Separate test databases from development

---

Always reference `/docs/ai/guidelines.md` for testing strategies and `/docs/ai/project-architecture.md` for understanding the system under test.