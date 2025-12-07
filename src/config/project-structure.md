# Project Structure & File Naming Conventions

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── core/                   # Core system - DO NOT MODIFY after setup
│   ├── components/         # Core UI primitives
│   ├── hooks/             # Core React hooks
│   ├── utils/             # Core utilities
│   └── types/             # Core type definitions
├── modules/               # Feature modules (plugin-based)
│   ├── hero/
│   ├── about/
│   ├── experience/
│   ├── education/
│   ├── skills/
│   ├── projects/
│   └── contact/
├── registry/              # Module registry & feature flags
├── data/                  # Content JSON files (externalized)
├── types/                 # Shared type definitions
├── config/                # Configuration files
├── lib/                   # Shared utilities & adapters
└── components/            # shadcn/ui components
    └── ui/
```

## Module Structure

Each module follows this structure:

```
modules/{module-name}/
├── components/            # Module-specific components
│   └── {ComponentName}.tsx
├── hooks/                # Module-specific hooks
│   └── use{HookName}.ts
├── types/                # Module-specific types
│   └── index.ts
├── tests/                # Module-specific tests
│   └── {ComponentName}.test.tsx
├── index.ts              # Module exports
└── config.ts             # Module configuration (optional)
```

## File Naming Conventions

### Components

- **Format**: PascalCase
- **Examples**: `HeroSection.tsx`, `ProjectCard.tsx`
- **Pattern**: `{ComponentName}.tsx`

### Hooks

- **Format**: camelCase with `use` prefix
- **Examples**: `useScrollPosition.ts`, `useTheme.ts`
- **Pattern**: `use{HookName}.ts`

### Utilities

- **Format**: kebab-case
- **Examples**: `format-date.ts`, `cn.ts`
- **Pattern**: `{utility-name}.ts`

### Types

- **Format**: kebab-case for files, PascalCase for type names
- **Examples**: `content.ts`, `module.ts`
- **Pattern**: `{type-category}.ts`

### Data Files

- **Format**: kebab-case
- **Examples**: `site-content.json`, `projects-data.json`
- **Pattern**: `{data-name}.json`

### Tests

- **Format**: Same as component/utility + `.test` or `.spec`
- **Examples**: `HeroSection.test.tsx`, `format-date.test.ts`
- **Pattern**: `{Name}.test.ts(x)`

## Import Aliases

```typescript
@/          → src/
@/components → src/components/
@/lib       → src/lib/
@/types     → src/types/
@/modules   → src/modules/
@/core      → src/core/
@/data      → src/data/
@/config    → src/config/
```

## Module Guidelines

1. **Modularity**: Each module is self-contained and independent
2. **Content-Agnostic**: All data passed via props, no hardcoded content
3. **Testable**: Each module has its own test directory
4. **Typed**: Strict TypeScript types for all props and data
5. **Plugin-Based**: Modules can be enabled/disabled via registry

## Adding New Modules

1. Create module directory: `src/modules/{module-name}/`
2. Create subdirectories: `components/`, `hooks/`, `types/`, `tests/`
3. Add module to registry: `src/registry/module-registry.ts`
4. Export from `index.ts`
5. Add content types to `src/types/content.ts`
6. Add data to `src/data/site-content.json`

## Content Management

All content is externalized in `src/data/site-content.json`:

- Easy to update without touching code
- Can be swapped for different projects
- Ready for CMS integration
- Content adapter handles data source changes
