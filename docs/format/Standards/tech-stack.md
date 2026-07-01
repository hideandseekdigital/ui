# Tech Stack

Standard technology choices for Hide & Seek Digital projects.

---

## 📋 Standard Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0+
- **Package Manager**: pnpm (monorepo: workspaces)
- **Styling**: CSS Modules
- **Node Version**: >= 20.0.0
- **Build Tool**: Turbopack (Next.js built-in)

---

## 🧪 Testing Stack

- **Unit Testing**: Vitest
- **Component Testing**: @testing-library/react
- **E2E Testing**: Playwright
- **Coverage**: @vitest/coverage-v8

---

## 🗄️ Database & Backend

- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase client (direct)
- **Validation**: Zod schemas

---

## ⚛️ State Management

- **Server State**: @tanstack/react-query
- **Global State**: Zustand
- **Form State**: @tanstack/react-form

---

## 📦 Package Versions

See `package.json` for specific version requirements. Key dependencies:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "@tanstack/react-query": "^5.85.5",
    "zustand": "^5.0.7"
  },
  "devDependencies": {
    "typescript": "^5",
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "playwright": "^1.53.1"
  }
}
```

---

## 🎨 UI Libraries

- **Design System**: Custom (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Tables**: TanStack Table

---

## 🔧 Development Tools

- **Linting**: ESLint 9+
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Monorepo**: Turborepo
- **Documentation**: Docusaurus

---

## Version Requirements

### Node.js

- **Minimum**: 20.0.0
- **Recommended**: Latest LTS (20.x or 22.x)
- **Package Manager**: pnpm 10.16.1+

### TypeScript

- **Version**: 5.0+
- **Strict Mode**: Enabled
- **Target**: ES2022+
