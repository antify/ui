## QA Analysis: External AI Consumption of `@antify/ui`

### 1. Global Enums (Size, State, Position) — ✅ PRESERVED & EXPORTED

All global enums are fully preserved as **real TypeScript `enum` declarations** in `dist/` and are reachable via the main entry point.

**Re-export chain:** `dist/index.d.ts` → `dist/types.d.ts` → `dist/enums/index.d.ts` → individual `*.enum.d.ts` files.

| Enum | Status | File |
|------|--------|------|
| `Size` | ✅ `export declare enum Size { lg, md, sm, xs, xs2 }` | `dist/enums/Size.enum.d.ts` |
| `State` | ✅ `export declare enum State { ... }` | `dist/enums/State.enum.d.ts` |
| `InputState` | ✅ `export declare enum InputState { ... }` | `dist/enums/State.enum.d.ts` |
| `Position` | ✅ `export declare enum Position { ... }` | `dist/enums/Position.enum.d.ts` |
| `CornerPosition` | ✅ `export declare enum CornerPosition { ... }` | `dist/enums/Position.enum.d.ts` |
| `Direction` | ✅ `export declare enum Direction { ... }` | `dist/enums/Direction.enum.d.ts` |
| `Grouped` | ✅ `export declare enum Grouped { ... }` | `dist/enums/Grouped.enum.d.ts` |
| `LayoutVariant` | ✅ | `dist/enums/LayoutVariant.enum.d.ts` |
| `Locale` | ✅ | `dist/enums/Locale.enum.d.ts` |
| `CountryValueKey` | ✅ | `dist/enums/Country.enum.d.ts` |

**Access from consumer:** `import { Size, State, Position } from '@antify/ui'` works perfectly.

---

### 2. Vue Component Prop Types with JSDoc — ✅ PRESERVED

**unbuild/mkdist copies `.vue` files verbatim to `dist/`**, keeping the `<script setup>` block intact. This means:

- TypeScript generics in `defineProps<{ ... }>()` are fully preserved.
- JSDoc comments on each prop (e.g., `/** The size variant... */`) are retained.
- Enum types like `State`, `Size`, `Position` are referenced directly in prop definitions.

Example from `dist/components/AntButton.vue` (line 53–92):
```typescript
const props = withDefaults(defineProps<{
  /** The visual color state variant. @values State.base | State.primary | ... @default State.base */
  state?: State;
  /** The size variant of the button. @values ButtonSize.lg | ButtonSize.md | ... @default ButtonSize.md */
  size?: ButtonSize;
  /** Tooltip placement position relative to the button. @values Position.top | ... @default Position.bottom */
  tooltipPosition?: Position;
}>(), { ... });
```

An external IDE (VS Code + Volar) consuming the library will see **full type information, enum references, and JSDoc descriptions** for all component props — similar to viewing the source.

---

### 3. Global Component Type Declarations — ❌ MISSING

There is **NO** global type registration file:

| File | Found? |
|------|--------|
| `env.d.ts` | ❌ |
| `components.d.ts` | ❌ |
| `volar.d.ts` | ❌ |
| Any `*.vue.d.ts` declaration file | ❌ |

**Impact:** In a consumer project using Vue + Volar, `<AntButton />` in a template will **not auto-resolve** unless the consumer either:
- **Manually imports** every component (e.g., `import AntButton from '@antify/ui'`).
- Uses the Vue plugin installer (auto-registers globally at runtime, but Volar won't provide IntelliSense without type augmentation).

**What's missing:** A file like `volar.d.ts` that augments `@vue/runtime-core`'s `GlobalComponents` interface:

```typescript
// src/volar.d.ts (or similar)
import { AntButton, AntTextInput, AntTable, ... } from './components';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AntButton: typeof AntButton;
    AntTextInput: typeof AntTextInput;
    AntTable: typeof AntTable;
    // ... all other Ant* components
  }
}
```

This file would need to be included in the build output (`dist/volar.d.ts`) and referenced in the library's `package.json` via the `types` field or bundled via `typesVersions`.

---

### 4. `package.json` Exports and Types Fields — ⚠️ MOSTLY CORRECT

| Field | Value | Status |
|-------|-------|--------|
| `"main"` | `./dist/index.js` | ✅ File exists |
| `"module"` | `./dist/index.mjs` | ✅ File exists |
| `"types"` | `./dist/index.d.ts` | ✅ File exists |
| `exports["."]` | types/import/style/require | ✅ All correct |
| `exports["./components"]` | types/import/require | ✅ All correct |
| `exports["./install"]` | types/import/require | ✅ All correct |

**Potential issue — `exports` block is restrictive:** Since an explicit `exports` field is present, only the three named subpaths (`.`, `./components`, `./install`) are resolvable by consumers. Deep imports like these will **FAIL**:

```typescript
// These would all fail — not in exports!
import { useToaster } from '@antify/ui/composables';   // ❌
import { countries } from '@antify/ui/constants';        // ❌
import { handleEnumValidation } from '@antify/ui/handler'; // ❌
```

However, **everything IS accessible via the root entry** `@antify/ui` (the main `index.ts` re-exports `./types`, `./components`, `./composables`, `./handler`, `./utils`, `./constants`). So this is only a concern if consumers try deep subpath imports directly.

---

## Summary: What's Missing / Broken for External AI Consumption

| # | Issue | Severity | Recommendation |
|---|-------|----------|---------------|
| 🔴 | **No global component type augmentation** (no `volar.d.ts`) | **High** — No IDE IntelliSense for `<AntButton />` in templates without manual imports. | Create a `volar.d.ts` (or `env.d.ts`) that augments `GlobalComponents` with all Ant* components, build it into `dist/`, and reference it in `package.json`. |
| 🟡 | **Restrictive `exports` field** prevents deep imports like `@antify/ui/handler` | **Low** — Everything is re-exported from the root `@antify/ui`. Only affects consumers attempting deep imports. | Optionally add `"./composables"`, `"./utils"`, `"./handler"`, `"./constants"` subpath entries if deep imports should be supported. |
| ✅ | Enums | **No issue** — Fully preserved as real `export declare enum`. |
| ✅ | Component prop types + JSDoc | **No issue** — Full source `<script setup>` with types and comments is preserved in dist. |
| ✅ | `exports` pointing to correct files | **No issue** — All `types`, `import`, `require` paths resolve to existing files. |
| ✅ | `typesVersions` | **No issue** — Falls back correctly for TypeScript resolution. |

**Bottom line:** The library is functional and all types/enums are correctly exported. The single critical gap is the **missing Volar global type augmentation** (`volar.d.ts`), which means an external AI agent or developer using the library won't get template IntelliSense without manually importing each component.
