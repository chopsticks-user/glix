# 🤖 Claude Code Session Start - READ THIS FIRST
**Purpose:** This is your entrypoint for EVERY Claude Code session. Read this file first, then ask the user what they need.
---
## 📋 Session Initialization Protocol
When starting a new session, follow this protocol:
### **Step 1: Read Essential Context**
```
✅ You're reading: /docs/ai/start-here.md (this file)
📖 Next, read: /docs/ai/project-architecture.md (project overview and architecture)
```
### **Step 2: Ask User for Session Type**
Present this menu to the user:
```
🎯 What would you like to work on today?
1. 🐛 FIX BUGS - Debug and resolve issues in Go microservices, Next.js, or integrations
2. 🔍 CONDUCT AUDIT - Systematic investigation of a system/component (e.g., payment flows, security)
3. ✨ PLAN FEATURE - Design and specify new functionality (e.g., new payment provider)
4. 🧪 CREATE TESTS - Write test plans and procedures for unit/integration/E2E
5. 🔧 REFACTOR CODE - Improve code organization and quality in Go or Next.js
6. 📊 REVIEW STATUS - Check project health, bugs, progress, and deployment status
7. 📝 UPDATE DOCS - Sync documentation with code changes or architecture updates
8. ❓ OTHER - Custom task or question (e.g., implement a specific API)
9. 📋 PROCESS USER BUG REPORTS - Review and document user-submitted bugs (if applicable)
Please respond with the number or name of what you need.
```
### **Step 3: Route to Appropriate Workflow**
Based on user's response, follow the specific workflow below. Adopt the appropriate role (Backend Dev, DevOps, Tester/QA) as needed, per /docs/ai/role-*.md.
---
## 🐛 SESSION TYPE 1: Fix Bugs
**When user selects: "1" or "bugs" or "fix"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-implementing.md (implementation best practices)
✅ /docs/ai/guidelines-testing.md (testing strategies)
✅ /docs/ai/role-backend-dev.md (for infrastructure audits)
✅ /docs/ai/role-devops-engineer.md (for infrastructure audits)
OPTIONAL:

```
### **Questions to Ask User:**
1. "Which bug are you working on? (BUG-XXX ID or description)"
2. "Is this in Go microservices, Next.js/Payload, or integrations?"
3. "Do you need me to investigate the root cause first, or do you already know what needs to be fixed?"
### **Your Tasks:**
- [ ] Adopt Backend Dev or DevOps role as appropriate
- [ ] If NEW bug: Create bug report using a template (suggest creating /docs/ai/templates/bug-report-template.md if not exists)
- [ ] If EXISTING bug: Reference details from ACTIVE-BUGS.md
- [ ] Investigate relevant code (e.g., Go APIs, Next.js routes)
- [ ] Analyze root cause (e.g., payment webhook failure)
- [ ] Propose fix with code changes (e.g., Go snippets)
- [ ] Include testing steps per /docs/ai/guidelines-testing.md
- [ ] After fix: Suggest moving to FIXED-BUGS.md
### **Output Format:**
```markdown
## Bug Analysis: [BUG-ID]
**Root Cause:**
[Clear explanation of what's wrong]
**Affected Components:**
- Go service: [file.go] (line XX)
- Next.js: [route.ts] (line YY)
**Proposed Fix:**
[Specific code changes needed]
**Testing Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]
**Related Issues:**
[Any other bugs or concerns discovered]
```
---
## 🔍 SESSION TYPE 2: Conduct Audit
**When user selects: "2" or "audit" or "investigate"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-implementing.md (best practices)
✅ /docs/ai/role-devops-engineer.md (for infrastructure audits)
✅ /docs/ai/role-backend-dev.md (for infrastructure audits)
OPTIONAL:

```
### **Questions to Ask User:**
1. "Which system/component would you like to audit?"
    - Payment Processing Layer
    - API Gateway/Orchestration
    - Database Models (MongoDB/Payload)
    - Security & Auth
    - Deployment (Vercel/Render)
    - Performance
    - Integrations (Stripe/PayPal)
    - Other (specify)
2. "What specific concerns or questions do you have?"
3. "Do you want a comprehensive audit or focused investigation?"
### **Your Tasks:**
- [ ] Adopt DevOps or Backend Dev role
- [ ] Review architecture and relevant code
- [ ] Check data models in Payload config
- [ ] Identify issues (bugs, security, scalability)
- [ ] Create audit document
- [ ] Save as /docs/audits/##-component-name.md
- [ ] Update /docs/audits/README.md
### **Output Format:**
```markdown
# [Component Name] Audit
**Status:** 🔵 In Progress
**Last Updated:** [Date]
**Auditor:** Claude Code
**Scope:** [Brief scope description]
## Current Implementation
[What exists today]
## Issues Found
### 🔴 Critical Issues
[P0 bugs]
### 🟡 High Priority Issues
[P1 issues]
### 🟢 Medium Priority Issues
[P2 improvements]
## Recommendations
### Immediate Fixes
[Fix within 1 week]
### Short-term Improvements
[Fix within 1 month]
### Long-term Enhancements
[Future enhancements]
## Testing Procedures
[How to test]
## Related Documentation
[Links to docs and code]
```
---
## ✨ SESSION TYPE 3: Plan Feature
**When user selects: "3" or "feature" or "plan"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-implementing.md (best practices)
✅ /docs/ai/role-backend-dev.md (for API planning)
OPTIONAL:
📄 /docs/feature-planning/README.md (existing plans; create if needed)
```
### **Questions to Ask User:**
1. "What feature would you like to plan?"
2. "What problem does this feature solve?"
3. "Which components are involved (Go, Next.js, Payload)?"
4. "Do you want a full specification or initial design?"
5. "Are there similar features to reference?"
### **Your Tasks:**
- [ ] Adopt Backend Dev role
- [ ] Check for existing similar features
- [ ] Define user stories
- [ ] Analyze data model changes (Payload collections)
- [ ] Design APIs (Go routes, Next.js endpoints)
- [ ] Estimate effort
- [ ] Save as /docs/feature-planning/feature-name.md
- [ ] Update /docs/feature-planning/README.md
### **Output Format:**
```markdown
# Feature: [Feature Name]
**Status:** 🔵 Planning
**Priority:** [High/Medium/Low]
**Effort Estimate:** [Small/Medium/Large/XL]
**Target Release:** [Date or TBD]
## Problem Statement
[What problem does this solve?]
## User Stories
**As a [role], I want to [action], so that [benefit]**
## Requirements
### Functional Requirements
[What must the feature do?]
### Non-Functional Requirements
[Performance, security, etc.]
## Data Model Changes
[New collections, fields]
## API Design
[Go/Next.js endpoints]
## Technical Implementation
[How to build]
## Testing Requirements
[How to test]
## Dependencies
[Prerequisites]
## Success Metrics
[How to measure]
```
---
## 🧪 SESSION TYPE 4: Create Tests
**When user selects: "4" or "test" or "testing"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-testing.md (testing strategies)
✅ /docs/ai/role-tester-qa.md (QA role)
OPTIONAL:
📄 /docs/testing-plans/README.md (existing plans; create if needed)
```
### **Questions to Ask User:**
1. "What would you like to test?"
    - Specific API (e.g., /api/transactions/initiate)
    - User flow (e.g., payment initiation)
    - Integration (e.g., Stripe webhook)
    - End-to-end scenario
    - Other
2. "Do you need manual procedures or automated code?"
3. "What's the priority?"
### **Your Tasks:**
- [ ] Adopt Tester/QA role
- [ ] Create scenarios (happy path, edges)
- [ ] Write steps or code (e.g., Go tests)
- [ ] Document test data (e.g., mock payments)
- [ ] Save to /docs/testing-plans/[component]-tests.md
- [ ] Update /docs/testing-plans/README.md
### **Output Format:**
```markdown
# Test Plan: [Component/Flow Name]
**Test Type:** [Manual/Automated/Both]
**Priority:** [P0-Critical/P1-High/P2-Medium/P3-Low]
**Last Updated:** [Date]
## Test Scenarios
### Scenario 1: [Happy Path]
**Objective:** [What to test]
**Prerequisites:**
- [Needed setup]
**Test Steps:**
1. [Action] → Expected: [Result]
2. [Action] → Expected: [Result]
**Success Criteria:**
- [ ] [Criterion 1]
### Scenario 2: [Edge Case]
[Same format]
## Test Data Required
- Mock accounts: [List]
- Providers: [Stripe test keys]
## Known Issues
[Bugs affecting testing]
```
---
## 🔧 SESSION TYPE 5: Refactor Code
**When user selects: "5" or "refactor" or "organize"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-implementing.md (best practices)
✅ /docs/ai/role-backend-dev.md (for code refactoring)
OPTIONAL:
📄 /docs/technical-debt/README.md (tech debt; create if needed)
```
### **Questions to Ask User:**
1. "What would you like to refactor?"
    - Go APIs
    - Next.js routes
    - Payload collections
    - File organization
    - Other
2. "What's the goal? (e.g., performance, maintainability)"
3. "Plan first or start refactoring?"
### **Your Tasks:**
- [ ] Adopt Backend Dev role
- [ ] Analyze current structure
- [ ] Create plan with changes
- [ ] Ensure no breakage
- [ ] Update tech debt docs
- [ ] List verification tests
### **Output Format:**
```markdown
# Refactoring Plan: [Component/File Name]
**Goal:** [Achievement]
**Risk Level:** [Low/Medium/High]
**Estimated Effort:** [Time]
## Current State Analysis
[Existing issues]
## Proposed Changes
### Change 1: [Description]
**Before:**
```go
// Current code
```
**After:**
```go
// Refactored code
```
**Rationale:** [Why better]
## Migration Steps
1. [Step 1]
2. [Step 2]
## Testing Checklist
- [ ] Tests pass
- [ ] Manual verification
- [ ] No regressions
## Rollback Plan
[Undo steps]
```
---
## 📊 SESSION TYPE 6: Review Status
**When user selects: "6" or "status" or "review"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-testing.md (testing)
OPTIONAL:
📄 /docs/bug-reports/ACTIVE-BUGS.md
📄 /docs/audits/README.md
📄 /docs/feature-planning/README.md
```
### **Your Tasks:**
- [ ] Summarize bugs by severity
- [ ] List audits/features status
- [ ] Highlight issues
- [ ] Suggest priorities
### **Output Format:**
```markdown
# Project Status Report
**Generated:** [Date]
## 🐛 Bugs Summary
**Active Bugs:** X total
- 🔴 Critical: X
**Recently Fixed:** X
## 🔍 Audits Status
**Completed:** X/Y
## ✨ Feature Planning
**Planned:** X
## 📈 Project Health
[Assessment]
## 🎯 Next Actions
1. [Action 1]
```
---
## 📝 SESSION TYPE 7: Update Documentation
**When user selects: "7" or "docs" or "update"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
✅ /docs/ai/guidelines-implementing.md (best practices)
```
### **Questions to Ask User:**
1. "What changed that needs docs?"
    - Bug fix
    - New feature
    - Refactor
    - Architecture
    - Other
2. "Which files modified?"
### **Your Tasks:**
- [ ] Identify affected docs
- [ ] Update architecture, audits, etc.
- [ ] Verify cross-references
- [ ] Update READMEs
---
## ❓ SESSION TYPE 8: Other
**When user selects: "8" or "other" or custom request**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
```
### **Your Response:**
Ask for details, then route to fitting workflow or handle custom (e.g., implement code).
---
## 📋 SESSION TYPE 9: Process User Bug Reports
**When user selects: "9" or "reports" or "user bugs"**
### **Files to Read:**
```
REQUIRED:
✅ /docs/ai/project-architecture.md (project overview)
OPTIONAL:
📄 /docs/bug-reports/ACTIVE-BUGS.md
```
### **Questions to Ask User:**
1. "Review new user bug reports?"
2. "Generate documentation from submissions?"
### **Your Tasks:**
- [ ] Generate formatted reports
- [ ] Add to ACTIVE-BUGS.md
### **Workflow:**
User provides details; you generate entry.
### **Output Format:**
```markdown
Added to ACTIVE-BUGS.md:
## BUG-XXX: [Title]
**Severity:** [Level]
**Category:** [Category]
**Status:** NEW
**Reported:** [Date]
### Description
[Details]
### Steps to Reproduce
[Steps]
### Environment
[Env]
### Investigation
[Initial notes]
```
---
## 🔄 After Session Complete
At the end of EVERY session, ask:
```
✅ Session complete!
Did we:
- [ ] Create/update documentation?
- [ ] Fix bugs? (move to FIXED)
- [ ] Discover new bugs? (add to ACTIVE)
- [ ] Complete audits? (update README)
- [ ] Make code changes needing docs?
Would you like me to:
1. Update related documentation?
2. Generate session summary?
3. Prepare for next session?
```
---
## 📚 Quick Reference: File Locations
```
Context & Guidelines:
- /docs/ai/start-here.md (this file)
- /docs/ai/project-architecture.md (overview)
- /docs/ai/guidelines.md (testing, implementing)
Templates:
- /docs/ai/role-*.md (roles)
```
---
## 🎯 Pro Tips for Effective Sessions
1. **Always read project-architecture.md first** - Critical info
2. **Follow guidelines** - Ensure consistency
3. **Update as you go** - Keep docs current
4. **Cross-reference** - Link to code/docs
5. **Ask questions** - Clarify assumptions
6. **Summarize** - Aid understanding
7. **Actionable steps** - Provide clear next actions
---
**🤖 Claude Code: This is your operating manual. Start here every time!**