# Folder Structure

This guide defines standard folder organization patterns for Hide & Seek Digital projects.

## Principles

1. **Predictability** - Developers should know where to find things
2. **Scalability** - Structure should work for small and large projects
3. **Consistency** - Same patterns across all projects
4. **Clarity** - Folder names should describe their purpose

---

## 📁 Recommended Next.js Structure

For Next.js projects using App Router, use the **root-level `app/` directory**. This is the modern Next.js standard.

```
project-root/
├── app/                                             # Next.js App Router pages & layouts
│   ├── (routes)/                                    # Route groups (kebab-case)
│   │   ├── account-settings/
│   │   │   ├── components/                         # Route-specific components
│   │   │   │   └── accountForm/                    # Example component structure
│   │   │   │       ├── AccountForm.tsx             # Component implementation
│   │   │   │       ├── AccountForm.test.tsx        # Unit tests
│   │   │   │       ├── AccountForm.module.css     # Component styles
│   │   │   │       ├── types.ts                    # Component types
│   │   │   │       └── index.ts                    # Export file
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api/                                         # API routes (kebab-case)
│   │   ├── users/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/                                      # React components
│   ├── ui/                                          # Reusable UI components
│   │   └── Button/                                  # Example component structure
│   │       ├── Button.tsx                           # Component implementation
│   │       ├── Button.test.tsx                      # Unit tests
│   │       ├── Button.stories.tsx                   # Storybook stories
│   │       ├── types.ts                             # Component types
│   │       └── index.ts                             # Export file
│   ├── features/                                    # Feature-specific components
│   └── layout/                                      # Layout components
├── lib/                                             # Core utilities & libraries
│   ├── permissions/                                 # Permission files (grouped)
│   │   ├── index.ts                                 # Main definitions
│   │   ├── api.ts                                   # API permissions
│   │   ├── page.ts                                  # Page permissions
│   │   └── plan.ts                                  # Plan permissions
│   ├── integrations/                                # External services (grouped)
│   │   ├── stripe.ts                                # Payment processing
│   │   └── supabase/                                # Database integration
│   │       ├── client.ts
│   │       └── mock/
│   ├── middleware/                                  # Middleware concerns (grouped)
│   │   ├── cors.ts
│   │   ├── rate-limit.ts
│   │   └── session.ts
│   ├── validation/                                  # Validation schemas
│   ├── constants/                                   # Constants
│   ├── errors/                                      # Error handlers
│   ├── types/                                       # Type definitions
│   └── utils/                                       # Helper functions (grouped)
│       ├── csv.ts
│       ├── date.ts
│       └── format.ts
├── hooks/                                           # Custom React hooks
├── services/                                        # Business logic services
├── stores/                                          # State management stores
├── types/                                           # TypeScript type definitions
├── constants/                                       # App constants
├── styles/                                          # Global styles
├── public/                                          # Static assets
├── tests/                                           # Test files
├── package.json
├── next.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

---

## 📁 Next.js Project Structure

**Next.js modern standard** (App Router) uses root-level directories:

```
project-root/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities
├── public/                 # Static assets
├── package.json
├── next.config.mjs
└── tsconfig.json
```

### 💡 Why root-level for Next.js?

- **Next.js standard** - Official documentation uses root-level
- **Simpler imports** - Cleaner import paths
- **Faster development** - No abstraction layer
- **Better Next.js integration** - Optimized for the framework
- **Easier for beginners** - Less complexity
- **Framework conventions** - Matches Next.js ecosystem

---

## 🎯 Route-Specific Components Pattern

Components can live inside route folders alongside their pages. Only if the component is specific to that route

### ✅ Example: Components in Routes

```
app/
├── (routes)/
│   ├── account-settings/
│   │   ├── components/       # Specific to account-settings
│   │   │   └── accountForm/
│   │   │       ├── AccountForm.tsx
│   │   │       ├── AccountForm.test.tsx
│   │   │       ├── AccountForm.module.css
│   │   │       ├── types.ts
│   │   │       └── index.ts
│   │   │   └── accountHeader/
│   │   │       ├── AccountHeader.tsx
│   │   │       ├── AccountHeader.module.css
│   │   │       └── types.ts
│   │   │       └── index.ts
│   │   └── page.tsx
│   └── page.tsx
└── api/
```

### 💡 When to Use This Pattern

- **Route-specific components** - Place components inside the route folder if they're only used by that route
- **Shared route components** - Place components in the route group folder if shared across multiple routes
- **Global components** - Place components in root `components/` if used across the entire app

---

## 🧩 Component Organization

Organize components by what they **do**, not what they **are**:

```
components/
├── ui/                      # Reusable UI components
│   ├── button/
│   ├── form/
│   └── modal/
├── features/                # Feature-specific components
│   ├── userManagement/
│   ├── billing/
│   └── dashboard/
└── layout/                  # Layout components
    ├── header/
    ├── sidebar/
    └── footer/
```

### ❌ Avoid: Type-Based Grouping

Unless using Atomic Design deliberately:

```
components/
├── atoms/                   # Too abstract
├── molecules/               # Hard to navigate
└── organisms/               # Unclear boundaries
```

---

## 🧪 Test Placement

**Co-locate tests** with the code they test:

```
components/
├── button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
hooks/
├── useUserData/
│   ├── useUserData.ts
│   ├── useUserData.test.ts
│   └── index.ts
```

---

## 📄 Configuration Files

**Keep configuration at the root** where tools expect it:

```
/root
├── eslint.config.mjs         # ESLint configuration
├── prettier.config.js       # Prettier configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies & scripts
└── .env.local               # Environment variables (gitignored)
```

---

## 🚨 Red Flags

Avoid these anti-patterns:

- ❌ **Deep nesting** - More than 4-5 levels deep
- ❌ **Scattered logic** - Related code in multiple unrelated folders
- ❌ **Vague names** - `utils/`, `helpers/`, `stuff/` without organization
- ❌ **Inconsistent patterns** - Different structures for similar things

---

## 📚 Naming Conventions

See [Naming Conventions](/Structure/naming-conventions) for detailed file and folder naming rules.

**Quick reference:**

- **Component files**: PascalCase (`UserProfile.tsx`)
- **Utility files**: camelCase (`apiUtils.ts`)
- **Hook files**: camelCase with `use` prefix (`useUserData.ts`)
- **Service files**: camelCase with `Service` suffix (`apiService.ts`)
- **Route Folder names**: kebab-case (`user-management/`, `api-routes/`)
- **Component Folder names**: camelCase (`header/`, `model/`)

---

## 📚 Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Project Structure](https://nextjs.org/docs/app/building-your-application/routing/colocation)
- [Monorepo Patterns](https://monorepo.tools/)
