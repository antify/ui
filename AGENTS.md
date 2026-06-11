# AGENTS.md

> **Absolute source of truth** for AI coding agents (GitHub Copilot, Claude Code, Cursor) working on the **Antify UI Kit** repository.

---

## Project Overview

Antify UI Kit is a **Vue 3 + TypeScript** component library built with strict typing, enum-driven properties, and Storybook for development and testing.

- **Package name**: `@antify/ui` (v4.3.18)
- **Package manager**: `pnpm` (v10.10.0)
- **Node engine**: `^22.14.0`
- **Build tool**: `unbuild` (via `build.config.ts`)
- **Type checking**: `vue-tsc` (via `pnpm run typecheck`)
- **Linting**: ESLint with `typescript-eslint`, `eslint-plugin-vue`, and `@stylistic/eslint-plugin`
- **Storybook**: v8.6.4 (served on port 6006)

---

## Project Structure (Accurate as of June 2026)

```
src/
├── components/                          # UI Components grouped by domain
│   ├── AntAccordion.vue                 # Root-level atomic components
│   ├── AntAccordionItem.vue
│   ├── AntAlert.vue
│   ├── AntButton.vue
│   ├── AntCard.vue
│   ├── AntContent.vue
│   ├── AntDialog.vue
│   ├── AntDropdown.vue
│   ├── AntFlag.vue
│   ├── AntIcon.vue
│   ├── AntItemsPerPage.vue
│   ├── AntKeycap.vue
│   ├── AntListGroup.vue
│   ├── AntListGroupItem.vue
│   ├── AntModal.vue
│   ├── AntPagination.vue
│   ├── AntPopover.vue
│   ├── AntProgress.vue
│   ├── AntSkeleton.vue
│   ├── AntSpinner.vue
│   ├── AntTag.vue
│   ├── AntToast.vue
│   ├── AntToaster.vue
│   ├── AntTooltip.vue
│   ├── Main.mdx
│   ├── Main.stories.ts
│   ├── index.ts                         # Re-exports all public components
│   ├── __types/                         # LEGACY: TypeScript definitions for root components
│   │   ├── index.ts
│   │   ├── AntAccordion.types.ts
│   │   ├── AntButton.types.ts
│   │   ├── AntFlag.types.ts
│   │   ├── AntIcon.types.ts
│   │   ├── AntKeycap.types.ts
│   │   ├── AntListGroupItem.types.ts
│   │   ├── AntSpinner.types.ts
│   │   ├── AntTag.types.ts
│   │   └── AntToaster.types.ts
│   ├── __stories/                       # LEGACY: Storybook stories for root components
│   │   ├── AntAccordion.stories.ts
│   │   ├── AntAlert.stories.ts
│   │   ├── AntButton.stories.ts
│   │   ├── AntCard.stories.ts
│   │   ├── AntContent.stories.ts
│   │   ├── AntDialog.stories.ts
│   │   ├── AntDropdown.stories.ts
│   │   ├── AntFlag.stories.ts
│   │   ├── AntIcon.stories.ts
│   │   ├── AntItemsPerPage.stories.ts
│   │   ├── AntKeycap.stories.ts
│   │   ├── AntListGroup.stories.ts
│   │   ├── AntListGroupItem.stories.ts
│   │   ├── AntModal.stories.ts
│   │   ├── AntPagination.stories.ts
│   │   ├── AntPopover.stories.ts
│   │   ├── AntProgress.stories.ts
│   │   ├── AntSkeleton.stories.ts
│   │   ├── AntSpinner.stories.ts
│   │   ├── AntTag.stories.ts
│   │   ├── AntToast.stories.ts
│   │   ├── AntToaster.stories.ts
│   │   └── AntTooltip.stories.ts
│   │
│   ├── calendar/                        # Date and time picking components
│   │   ├── AntDatePicker.vue
│   │   ├── AntDateSwitcher.vue
│   │   ├── AntMonthPicker.vue
│   │   ├── AntYearPicker.vue
│   │   └── __stories/
│   │       └── AntDatePicker.stories.ts
│   │
│   ├── forms/                           # Form layout and structure
│   │   ├── AntField.vue
│   │   ├── AntFormGroup.vue
│   │   ├── AntFormGroupLabel.vue
│   │   └── __stories/
│   │       ├── AntField.stories.ts
│   │       ├── AntFormGroup.stories.ts
│   │       └── AntFormGroupLabel.stories.ts
│   │
│   ├── inputs/                          # Interactive input fields
│   │   ├── AntBirthdayInput.vue
│   │   ├── AntCheckbox.vue
│   │   ├── AntCheckboxGroup.vue
│   │   ├── AntCountryInput.vue
│   │   ├── AntDateInput.vue
│   │   ├── AntImageInput.vue
│   │   ├── AntMultiSelect.vue
│   │   ├── AntNumberInput.vue
│   │   ├── AntPasswordInput.vue
│   │   ├── AntPhoneNumberInput.vue
│   │   ├── AntRadio.vue
│   │   ├── AntRadioGroup.vue
│   │   ├── AntRangeSlider.vue
│   │   ├── AntRichTextEditor.vue
│   │   ├── AntSearch.vue
│   │   ├── AntSelect.vue
│   │   ├── AntSwitch.vue
│   │   ├── AntSwitcher.vue
│   │   ├── AntTagInput.vue
│   │   ├── AntTextInput.vue
│   │   ├── AntTextarea.vue
│   │   ├── AntUnitInput.vue
│   │   ├── __types/                     # LEGACY: Input type definitions
│   │   │   ├── index.ts
│   │   │   ├── AntCheckbox.types.ts
│   │   │   ├── AntCountryInput.types.ts
│   │   │   ├── AntDateInput.types.ts
│   │   │   ├── AntMultiSelect.types.ts
│   │   │   ├── AntRadio.types.ts
│   │   │   ├── AntSelect.types.ts
│   │   │   ├── AntSwitcher.types.ts
│   │   │   ├── AntTagInput.types.ts
│   │   │   └── AntTextInput.types.ts
│   │   ├── __stories/                   # LEGACY: Input story files
│   │   │   ├── AntBirthdayInput.stories.ts
│   │   │   ├── AntCheckbox.stories.ts
│   │   │   ├── AntCheckboxGroup.stories.ts
│   │   │   ├── AntCountryInput.stories.ts
│   │   │   ├── AntDateInput.stories.ts
│   │   │   ├── AntImageInput.stories.ts
│   │   │   ├── AntMultiSelect.stories.ts
│   │   │   ├── AntNumberInput.stories.ts
│   │   │   ├── AntPasswordInput.stories.ts
│   │   │   ├── AntPhoneNumberInput.stories.ts
│   │   │   ├── AntRadioGroup.stories.ts
│   │   │   ├── AntRangeSlider.stories.ts
│   │   │   ├── AntRichTextEditor.stories-old.ts
│   │   │   ├── AntSearch.stories.ts
│   │   │   ├── AntSelect.stories.ts
│   │   │   ├── AntSwitch.stories.ts
│   │   │   ├── AntSwitcher.stories.ts
│   │   │   ├── AntTagInput.stories.ts
│   │   │   ├── AntTextInput.stories.ts
│   │   │   ├── AntTextarea.stories.ts
│   │   │   └── AntUnitInput.stories.ts
│   │   │
│   │   ├── Elements/                    # PRIVATE atomic internal elements for inputs
│   │   │   ├── AntBaseInput.vue
│   │   │   ├── AntInputDescription.vue
│   │   │   ├── AntInputLabel.vue
│   │   │   ├── AntInputLimiter.vue
│   │   │   ├── AntSelectMenu.vue
│   │   │   ├── index.ts
│   │   │   ├── __types/
│   │   │   │   ├── index.ts
│   │   │   │   └── AntBaseInput.types.ts
│   │   │   └── __stories/
│   │   │       ├── AntBaseInput.stories.ts
│   │   │       ├── AntInputDescription.stories.ts
│   │   │       ├── AntInputLabel.stories.ts
│   │   │       └── AntInputLimiter.stories.ts
│   │   │
│   │   └── AntColorInput/               # Complex component with flat co-location
│   │       ├── AntColorInput.vue
│   │       ├── AntColorInput.types.ts   # Co-located (NOT in __types/)
│   │       ├── AntColorInput.stories.ts # Co-located (NOT in __stories/)
│   │       ├── Color.vue                # Private sub-component (no Ant prefix)
│   │       └── ColorSelection.vue       # Private sub-component (no Ant prefix)
│   │
│   ├── layouts/                         # High-level layout wrappers
│   │   ├── AntNavLeftLayout.vue
│   │   └── __stories/
│   │       └── AntNavLeftLayout.stories.ts
│   │
│   ├── navbar/                          # Navigation layouts and items
│   │   ├── AntNavbar.vue
│   │   ├── AntNavbarItem.vue
│   │   ├── __stories/
│   │   │   └── AntNavbar.stories.ts
│   │   └── __types/
│   │       ├── index.ts
│   │       └── NavbarItem.types.ts
│   │
│   ├── table/                           # Tabular data views
│   │   ├── AntCollapsibleTableRowContent.vue
│   │   ├── AntTable.vue
│   │   ├── AntTableSkeleton.vue
│   │   ├── AntTableSortButton.vue
│   │   ├── AntTd.vue
│   │   ├── AntTh.vue
│   │   ├── __stories/
│   │   │   └── AntTable.stories.ts
│   │   └── __types/
│   │       ├── index.ts
│   │       ├── AntCollapsibleTable.types.ts
│   │       └── TableHeader.types.ts
│   │
│   ├── tabs/                            # Tabbed interface switchers
│   │   ├── AntTabItem.vue
│   │   ├── AntTabs.vue
│   │   ├── __stories/
│   │   │   ├── AntTabItem.stories.ts
│   │   │   └── AntTabs.stories.ts
│   │   └── __types/
│   │       ├── index.ts
│   │       └── AntTabItem.types.ts
│   │
│   └── transitions/                     # Animation/transition wrappers
│       └── AntTransitionCollapseHeight.vue
│
├── composables/                         # Global Vue composables
│   ├── index.ts
│   ├── useFlickerProtection.ts
│   └── useToaster.ts
│
├── constants/                           # Static application constants
│   ├── index.ts
│   └── countries.ts
│
├── enums/                               # GLOBAL STRICT ENUMS for component props
│   ├── index.ts
│   ├── Country.enum.ts                  # CountryValueKey { value, dialCode, numericCode }
│   ├── Direction.enum.ts                # Direction { column, row }
│   ├── Grouped.enum.ts                  # Grouped { none, left, center, right }
│   ├── LayoutVariant.enum.ts            # LayoutVariant { default, block, tab }
│   ├── Locale.enum.ts                   # Locale { de, en, ar, cs, es, fr, it, ru, uk }
│   ├── Position.enum.ts                 # Position { top, right, bottom, left }
│   │                                    # CornerPosition { topLeft, topCenter, topRight, bottomRight, bottomCenter, bottomLeft }
│   ├── Size.enum.ts                     # Size { lg, md, sm, xs, 2xs }
│   └── State.enum.ts                    # State { base, primary, secondary, danger, info, success, warning }
│                                        # InputState { base, danger, info, success, warning }
│
├── index.css                            # Global Tailwind / design token styles
├── index.ts                             # Main entry point (re-exports everything)
├── install.ts                           # Vue plugin installer (auto-registers all components)
├── types.ts                             # Type re-export hub (enums + all __types/ index files)
├── utils.ts                             # Core helper functions
└── handler.ts                           # Enum validation helper
```

---

## Core Commands

```bash
pnpm install            # Install project dependencies
pnpm run dev            # Start Storybook development server (port 6006)
pnpm build              # Compile library assets via build.config.ts (unbuild)
pnpm run lint           # Execute ESLint verification
pnpm run lint:fix       # Force fix automated linting issues
pnpm run typecheck      # Validate TypeScript integrity via vue-tsc
pnpm run chromatic      # Run Chromatic visual regression tests
```

---

## Type & Story Organization (Current State)

This repository has **two coexisting patterns** for organizing types and stories:

### Pattern A: Legacy `__types/` and `__stories/` Subdirectories (Most Common)

Most components use isolated subdirectories:

| Directory | `__types/` | `__stories/` |
|-----------|-----------|-------------|
| `src/components/` (root) | ✅ Yes | ✅ Yes |
| `src/components/inputs/` | ✅ Yes | ✅ Yes |
| `src/components/inputs/Elements/` | ✅ Yes | ✅ Yes |
| `src/components/navbar/` | ✅ Yes | ✅ Yes |
| `src/components/table/` | ✅ Yes | ✅ Yes |
| `src/components/tabs/` | ✅ Yes | ✅ Yes |
| `src/components/calendar/` | ❌ No | ✅ Yes |
| `src/components/forms/` | ❌ No | ✅ Yes |
| `src/components/layouts/` | ❌ No | ✅ Yes |
| `src/components/transitions/` | ❌ No | ❌ No |

### Pattern B: Flat Co-location (Newer / Preferred for Complex Components)

`AntColorInput/` uses flat co-location — all files sit side-by-side in the same directory:

```
AntColorInput/
├── AntColorInput.vue
├── AntColorInput.types.ts     # Co-located
├── AntColorInput.stories.ts   # Co-located
├── Color.vue                  # Private sub-component
└── ColorSelection.vue         # Private sub-component
```

### Type Re-export Chain

Types flow through a centralized re-export system:

```
*.types.ts files
    → __types/index.ts (per domain)
        → src/types.ts (aggregates all __types + enums)
            → src/index.ts (re-exports types + components + composables + utils + constants)
```

The `src/types.ts` file re-exports from:
- `./enums`
- `./components/__types`
- `./components/inputs/__types`
- `./components/inputs/Elements/__types`
- `./components/navbar/__types`
- `./components/table/__types`
- `./components/tabs/__types`

---

## Strict Code Conventions

### 1. Component Naming & Scope

- **Public Components**: Must be written in **PascalCase** and start strictly with the **`Ant`** prefix (e.g., `AntButton.vue`, `AntTextInput.vue`, `AntTable.vue`).
- **Internal/Private Components**: Used exclusively inside a parent domain. Do **NOT** add the `Ant` prefix, and do **NOT** export them in the root `index.ts` file (e.g., `Color.vue` and `ColorSelection.vue` inside `AntColorInput/`).
- **Elements/ (Private)**: Components inside `inputs/Elements/` are internal building blocks. They are exported in `src/components/index.ts` but are intended for internal use only.

### 2. Strict Enums Over String Literals (BANNED)

**Never hardcode string constants** for visual modifiers like size, state, behavior, or positioning. You **must** import and map properties to the global enums inside `src/enums/`:

| Concept | Enum to Use | Example |
|---------|------------|---------|
| Sizes | `Size` from `Size.enum.ts` | `:size="Size.md"` |
| Color/Theme variants | `State` from `State.enum.ts` | `:state="State.primary"` |
| Input validation states | `InputState` from `State.enum.ts` | `:input-state="InputState.danger"` |
| Structural alignment | `Position` or `CornerPosition` from `Position.enum.ts` | `:position="Position.top"` |
| Layout direction | `Direction` from `Direction.enum.ts` | `:direction="Direction.row"` |
| Grouping | `Grouped` from `Grouped.enum.ts` | `:grouped="Grouped.left"` |
| Layout style | `LayoutVariant` from `LayoutVariant.enum.ts` | `:variant="LayoutVariant.block"` |
| Locale | `Locale` from `Locale.enum.ts` | `:locale="Locale.en"` |
| Country key | `CountryValueKey` from `Country.enum.ts` | `:country-value-key="CountryValueKey.dialCode"` |

### 3. TypeScript Requirements

- **Clean compilation**: The code must pass `pnpm run typecheck` with **zero warnings**.
- **Explicit types**: The use of **`any` is entirely banned**. Every prop configuration, custom event emit, and composable response must be strictly defined.
- **Type-based props**: Vue props must use the type-based declaration syntax (`defineProps<{ ... }>()`) as enforced by the ESLint rule `vue/define-props-declaration`.

### 4. ESLint & Formatting Rules

The project enforces strict stylistic rules via `@stylistic/eslint-plugin`. Key rules:
- **2-space indentation** (no tabs)
- **Single quotes** for strings (with `avoidEscape`)
- **Semicolons** required
- **Trailing commas** in multiline structures
- **Newlines** between object properties, array elements, and before `return` statements
- **No multiple empty lines** (max 1, zero at EOF)
- **Padding line between blocks** in Vue SFCs

Run `pnpm run lint:fix` to auto-correct all formatting issues.

### 5. File Organization Rules for AI Agents

- **For NEW components**: Prefer **flat co-location** (Pattern B) — place `.types.ts` and `.stories.ts` files **next to** the `.vue` file in the same directory.
- **For EXISTING components**: Follow the existing pattern of the domain directory. If the domain uses `__types/` and `__stories/`, add files there. If it uses flat co-location (like `AntColorInput/`), use that pattern.
- **Never create** new `__types/` or `__stories/` directories for brand-new components — use flat co-location.
- **Always update** the relevant `__types/index.ts` barrel file when adding a new `.types.ts` file to a `__types/` directory.

---

## Component Creation & Modification Workflow

Copy this checklist into your execution context whenever you generate, extend, or refactor components:

```
Task Execution: [Component Name]
Progress Tracking:
- [ ] 1. Identify target domain directory under `src/components/` (root, calendar, forms, inputs, layouts, navbar, table, tabs, transitions)
- [ ] 2. Create the `.vue` file with type-based props using `defineProps<{ ... }>()`
- [ ] 3. Create the `.types.ts` file with all TypeScript interfaces/types (co-located or in `__types/` per domain convention)
- [ ] 4. Create the `.stories.ts` file for Storybook (co-located or in `__stories/` per domain convention)
- [ ] 5. Map all visual modifier props to `src/enums/` definitions (Size, State, Position, Direction, etc.) — NO raw string literals
- [ ] 6. Register the component export in the local directory's `index.ts` (if applicable, e.g., `inputs/Elements/index.ts`)
- [ ] 7. Add the type export to the relevant `__types/index.ts` barrel file (if using `__types/` pattern)
- [ ] 8. Re-export the component in `src/components/index.ts`
- [ ] 9. Ensure the type is re-exported through `src/types.ts` (if it's a new type file)
- [ ] 10. Execute `pnpm run lint:fix` to clean syntax formatting
- [ ] 11. Confirm successful compilation via `pnpm run typecheck`
```

---

## Pre-Commit Verification

Before declaring a task finished, verify:

- [ ] Types and Storybook configs exist and are placed correctly (co-located or in `__types/`/`__stories/` per domain convention).
- [ ] No raw string literals are used where global enums exist.
- [ ] The component is registered in `src/components/index.ts` (import + export).
- [ ] New type files are re-exported through the appropriate `__types/index.ts` barrel and `src/types.ts`.
- [ ] `pnpm run lint:fix` has been executed with zero remaining errors.
- [ ] `pnpm run typecheck` passes with zero warnings.
- [ ] Private/internal components do NOT have the `Ant` prefix and are NOT exported in `src/components/index.ts`.
- [ ] The `src/index.ts` entry point already re-exports `./components`, `./types`, `./composables`, `./handler`, `./utils`, and `./constants` — no additional changes needed unless a new top-level export category is created.
