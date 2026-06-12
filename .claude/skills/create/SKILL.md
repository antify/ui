---
name: create
description: Professionally scaffold a brand-new Vue 3 component with strict typing, global enums, JSDoc, and Storybook configuration using Flat Co-location
Parameter:
  name: The PascalCase name of the component starting with 'Ant' (e.g., AntBadge, AntListItem)
  directory: The target domain directory path (e.g., src/components/ or src/components/inputs/)
user-invocable: true
---

# UI Library Developer (Component Creation)

## Role
You are an experienced UI Library Architect specialized in Vue 3 (Composition API, `<script setup lang="ts">`), TypeScript, and Storybook 8+. Your task is to generate a new public UI component from scratch. You must follow the **Flat Co-location** pattern, enforce strict enum usage, include comprehensive JSDoc documentation for AI readability, and properly register the component in the project's export chain.

## Parameters
- `name`: PascalCase component name, must start with `Ant` prefix (e.g., `AntBadge`).
- `directory`: Target directory under `src/components/` (e.g., `src/components/inputs/` or `src/components/`).

## Approach

### 1. Structure Initialization (Flat Co-location)
Analyze whether the component requires unique, domain-specific internal enums. Place the following files side-by-side in the target `directory`:
- `[name].vue` (Component Implementation — REQUIRED)
- `[name].stories.ts` (Storybook 8 CSF Definition — REQUIRED)
- `[name].types.ts` (Component-specific enums — **OPTIONAL**. Create ONLY if component-specific enums or unique internal sub-interfaces are strictly needed. Do NOT create if all props map to global enums).

### 2. Generate Types (`[name].types.ts` - Optional)
Define component-specific enums only (e.g., internal size or variant enums not covered by global enums).

**Important**: Do NOT export a Props interface from `.types.ts`. Props must be defined inline directly in the `.vue` file via `defineProps<{ ... }>()`.

### 3. Generate Vue SFC (`[name].vue`)
Implement the component using modern Vue 3 syntax with the **exact script block structure** demonstrated below. Enforce this strict ordering:

1. **Imports** — grouped by external → internal, each in curly-braced blocks per source. Use `<script lang="ts" setup>` (lang before setup).
2. **`defineOptions`** — `{ inheritAttrs: false }`. Do NOT include a `name:` property.
3. **`defineEmits`** — Multi-line JSDoc comment blocks placed **ABOVE** the `defineEmits` declaration (one `/** ... */` block per event), using the tuple syntax `click: [event: MouseEvent]`.
4. **`defineProps`** — Inline type-based with `withDefaults`. Concise `@default` JSDoc on each prop line.
5. **State helpers** — Section comment bar `// ---` separator, then `hasInputState` computed.
6. **CSS class generators** — `Record<EnumType, string>` mapping objects, then a `classes` computed that merges them into a single `Record<string, boolean>` object. Never use arrays with `.join(' ')`.
7. **Event handlers** — Named functions calling `emit(...)`.
8. **Runtime enum validation** — `onMounted` with `handleEnumValidation`.
9. **Template** — Rich HTML comment blocks documenting every section, slot, and wrapper. Use `v-bind="$attrs"`, `:tabindex`, `data-e2e`, and `data-e2e-state`.

**CRITICAL GUARDRAILS:**
- **Bracket notation for numeric-keyed enums**: The global `Size` enum has `xs2 = '2xs'`. The value `'2xs'` starts with a number, so use **`Size['2xs']`** (bracket notation with the string value). Never use `Size.xs2` or `Size.2xs`.
- **Dynamic relative paths**: Calculate the relative path to `src/enums` and `src/handler` based on the provided `directory` parameter (e.g., `../enums` for root components, `../../enums` for sub-domains like `inputs/`).
- **`hasInputState`**: Always create this computed and use it to control `:tabindex`, focus rings, and cursor behavior. It must check `skeleton || readonly || disabled`.
- **`data-e2e`**: Always include `:data-e2e` and `:data-e2e-state` on the root interactive element.

### 4. Generate Story (`[name].stories.ts`)
Create a comprehensive Storybook 8 story file:
- Import `type Meta, type StoryObj` from `@storybook/vue3`.
- Dynamically calculate relative paths to enums based on `directory`.
- Use `parameters: { controls: { sort: 'requiredFirst' } }`.
- Use `control: { type: 'select' }` (object format) for enum argTypes.
- Use `options: Object.values(EnumName)` for enum options.
- Define a `Docs` story with a `render` function returning a component setup template.
- Reuse `Docs.render` for variant stories with spread args (`Primary`, `Disabled`, `Skeleton`).

### 5. Wire the Export Chain
Ensure the new component is fully discoverable by updating the following files:
1. Re-export the component in `src/components/index.ts` (import + export named).
2. If a `.types.ts` file was created with custom enums, add a re-export line to the parent domain's `__types/index.ts` barrel file.
3. If the component is an internal building block (no `Ant` prefix), do NOT export it in `src/components/index.ts`.

---

## Boilerplate Templates

### 1. TypeScript Types Boilerplate (`[ComponentName].types.ts` - Optional)

Component-specific enums only. Do NOT export a Props interface — props are defined inline in the `.vue` file.

```typescript
/**
 * Component-specific size variants not covered by the global Size enum.
 * Use this when the component needs a different granularity than Size.
 */
export enum [ComponentName]Size {
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
}

/**
 * Component-specific state/color variants.
 * Use this when the component needs a subset of the global State enum.
 */
export enum [ComponentName]State {
  base = 'base',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  info = 'info',
}
```

### 2. Vue Component Boilerplate (`[ComponentName].vue`)

```vue
<script lang="ts" setup>
import {
  computed,
  onMounted,
} from 'vue';

// Note: AI must resolve the correct relative path based on directory parameter
import {
  handleEnumValidation,
} from '[relative-path-to-handler]';
import {
  Grouped,
  InputState,
  Position,
  Size,
  State,
} from '[relative-path-to-enums]';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the component is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the component loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default '[component-kebab]' */
  dataE2e?: string;
  /** Whether the component is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the component is in a readonly (non-interactive, non-submittable) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of the component. @default false */
  skeleton?: boolean;
  /** The size variant of the component. @values Size @default Size.md */
  size?: Size;
  /** The visual color state variant. @values State @default State.base */
  state?: State;
}>(), {
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  state: State.base,
  dataE2e: '[component-kebab]',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the component is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the component should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each State to background + text color classes.
 */
const colorVariants: Record<State, string> = {
  [State.base]: 'bg-base-50 text-base-50-font',
  [State.danger]: 'bg-danger-500 text-danger-500-font',
  [State.info]: 'bg-info-500 text-info-500-font',
  [State.primary]: 'bg-primary-500 text-primary-500-font',
  [State.secondary]: 'bg-secondary-500 text-secondary-500-font',
  [State.success]: 'bg-success-500 text-success-500-font',
  [State.warning]: 'bg-warning-500 text-warning-500-font',
};

/**
 * Maps each Size to its padding, font-size, and gap classes.
 * CRITICAL: The Size enum key for '2xs' is xs2 but the value '2xs' starts
 * with a digit, so bracket notation Size['2xs'] must be used here.
 */
const sizeClasses: Record<Size, string> = {
  [Size.lg]: 'p-2.5 text-sm gap-2.5',
  [Size.md]: 'p-2 text-sm gap-2',
  [Size.sm]: 'p-1.5 text-sm gap-1.5',
  [Size.xs]: 'p-1.5 text-xs gap-1.5',
  [Size['2xs']]: 'p-1 text-xs gap-1',
};

/**
 * Combined CSS classes for the root button element.
 * Merges layout, size, state, and interactivity rules.
 * @returns {Record<string, boolean>} All CSS classes keyed by className
 */
const classes = computed(() => ({
  'transition-all inline-flex items-center justify-center font-medium cursor-pointer select-none h-fit': true,
  'disabled:opacity-50 disabled:cursor-not-allowed': true,
  'cursor-default': props.readonly,
  [sizeClasses[props.size]]: true,
  [colorVariants[props.state]]: true,
}));

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

function onClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}

// ---------------------------------------------------------------------------
// Runtime enum validation
// ---------------------------------------------------------------------------

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, State, 'state');
});
</script>

<template>
  <!--
    @slot (default) — The main content rendered inside the component.
    Falls back to displaying the `label` prop when the slot is empty.
  -->
  <button
    :class="classes"
    :disabled="disabled || skeleton"
    :tabindex="hasInputState ? '-1' : '0'"
    v-bind="$attrs"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
    @click="onClick"
    @blur="onBlur"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
```

### 3. Storybook Boilerplate (`[ComponentName].stories.ts`)

```typescript
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
// Note: AI must resolve the correct relative path based on directory parameter
import {
  Size, State,
} from '[relative-path-to-enums]';
import [ComponentName] from './[ComponentName].vue';

const meta: Meta<typeof [ComponentName]> = {
  title: 'Components/[ComponentName]',
  component: [ComponentName],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
  },
  args: {
    size: Size.md,
    state: State.base,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof [ComponentName]>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      [ComponentName],
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><[ComponentName] v-bind="args">[ComponentName]</[ComponentName]></div>',
  }),
  args: {},
};

export const Primary: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    state: State.primary,
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
```

---

## Quality Criteria
- **Strict Format**: 2-space indentation, single quotes, required semicolons, trailing commas in multiline structures.
- **CSS Object Syntax**: Use `Record<string, boolean>` for computed classes — no array `.join(' ')`.
- **Inline Props**: Define all props inside `defineProps<{ ... }>()` in the `.vue` file — do NOT export a Props interface from `.types.ts`.
- **Dynamic Relative Paths**: AI must dynamically calculate paths to `enums` and `handler` based on the `directory` parameter. Do not hardcode `../../enums`.
- **Bracket Notation Guardrail**: Always use `Size['2xs']` for the numeric value. `Size.xs2` or `Size.2xs` is strictly banned.
- **Strict Enums**: No string literals allowed for design tokens. Use global enums from `src/enums/`.
- **Emit JSDoc Placement**: Multi-line `/** ... */` JSDoc blocks go ABOVE the `defineEmits` declaration, not inside the generic.
- **hasInputState**: Always include the `hasInputState` computed and use it for `:tabindex`, focus ring suppression, and cursor behavior.
- **data-e2e**: Include `:data-e2e` and `:data-e2e-state` attributes on the root interactive element.
- **Section Comment Bars**: Use `// ---` separator bars to visually isolate sections (State helpers, CSS generators, Event handlers, Runtime validation).
- **Zero Errors**: Must compilation-check perfectly (`pnpm run typecheck`) and follow ESLint formatting rules (`pnpm run lint:fix`).

## Handoff
After creating and wiring the component, respond with:
> "The component `[ComponentName]` has been successfully created using the Flat Co-location pattern inside `[directory]`. The `.vue` and `.stories.ts` files have been scaffolded with strict typing and inline props. All exports have been correctly added to the root export chain. You can run `pnpm run typecheck` and `pnpm run dev` to see it in Storybook."
