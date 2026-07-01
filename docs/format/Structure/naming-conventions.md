# Naming Conventions

Consistent naming conventions make codebases easier to navigate, understand, and maintain.

## File Naming

### Components

**Use PascalCase** for React/Vue component files:

```tsx
✅ Good
UserProfile.tsx
DataTable.tsx
SidebarNavigation.tsx
SubmitButton.tsx

❌ Bad
userProfile.tsx
data_table.tsx
sidebar-nav.tsx
```

**Use PascalCase** for component declarations:

```tsx
✅ Good
function UserProfile() { }
const DataTable = () => { };
function SubmitButton() { }

❌ Bad
function userProfile() { }
const dataTable = () => { }
function submit_button() { }
```

### Utilities

**Use camelCase** for utility/helper files:

```ts
✅ Good
apiUtils.ts
dateHelpers.ts
formatCurrency.ts

❌ Bad
api-utils.ts
date-helpers.ts
string-manipulation.ts
format_currency.ts
```

### Hooks

**Use camelCase** with `use` prefix:

```ts
✅ Good
useUserData.ts
useDebounce.ts
useFormValidation.ts
useLocalStorage.ts

❌ Bad
userData.ts
getDebounce.ts
formValidation.ts
use-local-storage.ts
```

### Stores

**Use camelCase** with `Store` suffix:

```ts
✅ Good
userStore.ts
cartStore.ts
authStore.ts
preferencesStore.ts

❌ Bad
user.ts
cart.ts
useAuthStore.ts
auth-store.ts
```

### Services

**Use camelCase** with `Service` suffix:

```ts
✅ Good
userService.ts
apiService.ts
paymentService.ts
notificationService.ts

❌ Bad
UserService.ts
api.ts
payment.ts
service-user.ts
```

### Types

**Use camelCase** descriptive names:

```ts
✅ Good
userWithPermissions.ts
apiResponseData.ts
cartItemWithProduct.ts
recordingUsageData.ts

❌ Bad
UserWithPermissions.ts
userTypes.ts
apiResponse.ts
data.ts
```

### Constants

**Use camelCase** for constant file names, **SCREAMING_SNAKE_CASE** for the constants themselves:

```ts
✅ Good
// File names
userRole.ts
httpStatus.ts
paymentStatus.ts

// Constant Variable Names
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 5000;
const COOKIE_DURATION_DAYS = 30;

❌ Bad Constant Variable Names
const maxRetryAttempts = 3;
const apiTimeout = 5000;
const cookieDays = 30;
```

### CSS Modules

**Use camelCase** with `.module.css` suffix:

```tsx
✅ Good
userProfile.module.css
dataTableStyles.module.css
formComponents.module.css

❌ Bad
UserProfile.module.css
data-table-styles.css
form-components.module.css
```

---

## Variables & Functions

### Variables

**Use camelCase**:

```ts
✅ Good
const userName = "John";
const isLoading = true;
const hasPermission = false;
const itemCount = 10;

❌ Bad
const UserName = "John";
const IsLoading = true;
const has_permission = false;
const item_count = 10;
```

### Functions

**Use camelCase** with descriptive verbs:

```ts
✅ Good
function getUserData() { }
function validateEmail() { }
function calculateTotal() { }
function handleSubmit() { }

❌ Bad
function GetUserData() { }
function validate_email() { }
function total() { }
function submit() { }
```

### Boolean Variables

**Prefix with `is`, `has`, `should`, `can`:**

```ts
✅ Good
const isActive = true;
const hasPermission = true;
const shouldUpdate = false;
const canDelete = true;

❌ Bad
const active = true;
const permission = true;
const update = false;
const delete = true;
```

### Types & Interfaces

**Use PascalCase** for types/interfaces:

```ts
✅ Good
type UserData = { };
interface ApiResponse { }
interface UserWithPermissions { }

❌ Bad
type userData = { };
interface api_response { }
interface user_with_permissions { }
```

---

## Quick Reference

| Type                | Convention                       | Example                      |
| ------------------- | -------------------------------- | ---------------------------- |
| **Component files** | PascalCase                       | `UserProfile.tsx`            |
| **Utility files**   | camelCase                        | `dateHelpers.ts`             |
| **Hook files**      | camelCase + `use`                | `useUserData.ts`             |
| **Store files**     | camelCase + `Store`              | `userStore.ts`               |
| **Service files**   | camelCase + `Service`            | `apiService.ts`              |
| **Type files**      | camelCase                        | `userWithRoles.ts`           |
| **Constant files**  | camelCase / SCREAMING_SNAKE_CASE | `userRole.ts` / `API_URL.ts` |
| **CSS modules**     | camelCase + `.module.css`        | `userProfile.module.css`     |
| **Variables**       | camelCase                        | `userName`                   |
| **Functions**       | camelCase                        | `getUserData`                |
| **Components**      | PascalCase                       | `UserProfile`                |
| **Types**           | PascalCase                       | `UserData`                   |
| **Constants**       | SCREAMING_SNAKE_CASE             | `API_BASE_URL`               |
| **Booleans**        | camelCase + prefix               | `isActive`, `hasPermission`  |

---

## Enforcing Conventions

Use ESLint and Prettier to enforce these conventions automatically:

- **eslint-plugin-react** - React naming conventions
- **simple-import-sort** - Import ordering
- **@typescript-eslint** - TypeScript naming rules

See [ESLint](/Standards/eslint) and [Prettier](/Standards/prettier) configuration for setup.
