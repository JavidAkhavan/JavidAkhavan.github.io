# Portfolio Project Structure

## Overview

This project uses a **modular, content-agnostic architecture** designed for:

- Easy feature additions/removals
- Content reusability across different projects
- Future-proof scalability
- Plugin-based module system

## Key Architectural Principles

### 1. Content-Agnostic Design

All content is externalized in `src/data/site-content.json`. This allows:

- Swapping content without touching code
- Repurposing for different projects (e.g., e-commerce in 4-8 hours)
- Easy CMS integration in the future

### 2. Modular Plugin System

Features are isolated modules that can be enabled/disabled via `src/registry/module-registry.ts`:

```typescript
export const moduleRegistry = {
  hero: { id: 'hero', enabled: true, order: 1 },
  about: { id: 'about', enabled: true, order: 2 },
  // ... other modules
};
```

### 3. Separation of Concerns

- **Core**: Never modified after initial setup
- **Modules**: Feature-specific, self-contained
- **Data**: Externalized content
- **Registry**: Module configuration

## Directory Structure

```
src/
├── app/              # Next.js App Router
├── core/             # Core system (DO NOT MODIFY)
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── modules/          # Feature modules
│   ├── hero/
│   ├── about/
│   ├── experience/
│   └── ...
├── registry/         # Module registry
├── data/             # Content files
├── types/            # Shared types
├── config/           # Configuration
├── lib/              # Utilities & adapters
└── components/       # shadcn/ui components
    └── ui/
```

## How to Add a New Feature

1. **Create module**: `src/modules/{feature-name}/`
2. **Register module**: Add to `src/registry/module-registry.ts`
3. **Add types**: Extend `src/types/content.ts`
4. **Add content**: Update `src/data/site-content.json`
5. **Commit**: `git commit -m "feat(feature-name): add new feature"`

## Content Management

All site content lives in `src/data/site-content.json`. The `ContentAdapter` in `src/lib/content-adapter.ts` provides abstraction for future data source changes (CMS, API, database).

## Testing Strategy

Each module has its own `tests/` directory:

```
modules/{module-name}/
└── tests/
    ├── ComponentName.test.tsx
    └── hooks.test.ts
```

Target: **80% code coverage** minimum.

## Git Workflow

- **Branch**: `develop` for all development
- **Commits**: Conventional commits format
- **Frequency**: Commit after every implementation
- **Hooks**: Pre-commit (format, type-check), commit-msg (lint)

## Documentation

See `src/config/project-structure.md` for detailed file naming conventions and guidelines.
