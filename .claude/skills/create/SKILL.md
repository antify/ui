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
Create a dedicated folder if the domain requires it, or place the following files side-by-side in the target `directory`:
- `[name].vue` (Component Implementation)
- `[name].types.ts` (TypeScript Interfaces — for component-specific enums, NOT the Props interface)
- `[name].stories.ts` (Storybook 8 CSF Definition)

### 2. Generate Types (`[name].types.ts`)
Define component-specific enums only (e.g., internal size or variant enums not covered by global enums). Use global enums from `src/enums/` for visual modifiers (Size, State, Position, etc.). Never use raw string literals.

**Important**: Do NOT export a Props interface from `.types.ts`. Props are defined inline in the `.vue` file via `defineProps<{ ... }>()`.

### 3. Generate Vue SFC (`[name].vue`)
Implement the component using modern Vue 3 syntax:
- `<script setup lang="ts">` with explicit imports
- `withDefaults(defineProps<{ ... }>())` for type-based props, with all props defined inline
- `defineEmits<{ eventName: [payloadType]; }>()` using the **tuple syntax** for strict emit typing
- CSS classes computed as **object syntax** (`Record<string, boolean>`), NOT array/string joining
- Use `computed(() => ({ 'class-name': condition }))` pattern
- Use `Record<EnumType, string>` mapping objects for enum-to-class derivations
- Explanatory JSDoc comments for computed properties and logic
- Semantic HTML and `data-e2e="component-name"` attribute on root elements
- `onMounted` with `handleEnumValidation` for runtime enum validation
- `hasInputState` computed helper for skeleton/readonly/disabled state

### 4. Generate Story (`[name].stories.ts`)
Create a comprehensive Storybook 8 story file:
- Import `type Meta, type StoryObj` from `@storybook/vue3`
- Use `parameters: { controls: { sort: 'requiredFirst' } }`
- Use `control: { type: 'select' }` (object format) for enum argTypes
- Use `options: Object.values(EnumName)` for enum options
- Define a `Docs` story with a `render` function returning a component setup template
- Reuse `Docs.render` for variant stories with spread args

### 5. Wire the Export Chain
Ensure the new component is fully discoverable by updating the following files:
1. Re-export the component in `src/components/index.ts` (import + export named).
2. If `.types.ts` contains component-specific enums used by other parts of the codebase, re-export them via the domain's `__types/index.ts` barrel file and ensure `src/types.ts` covers it. For flat co-location, add a re-export line to the parent domain's `__types/index.ts`.
3. If the component is an internal building block (no `Ant` prefix), do NOT export it in `src/components/index.ts`.

---

## Boilerplate Templates

### 1. TypeScript Types Boilerplate (`[ComponentName].types.ts`)

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
  xs2 = '2xs',
  xs3 = '3xs',
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
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import {
  Grouped, InputState, Position, Size, State,
} from '../../enums';
import { handleEnumValidation } from '../../handler';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the component is clicked.
   * @payload {MouseEvent} The native mouse click event
   */
  click: [event: MouseEvent];

  /**
   * Emitted when the component loses focus.
   * @payload {FocusEvent} The native focus blur event
   */
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The main text content or label of the component. @default '' */
  label?: string;

  /** The visual state/theme color variant. @values State @default State.base */
  state?: State;

  /** The size variant of the component. @values Size @default Size.md */
  size?: Size;

  /** Whether the component is visually and functionally disabled. @default false */
  disabled?: boolean;

  /** Whether the component renders a skeleton placeholder. @default false */
  skeleton?: boolean;

  /** Whether the component is in a readonly non-interactive state. @default false */
  readonly?: boolean;

  /** The data-e2e attribute value for testing selectors. @default 'component-name' */
  dataE2e?: string;
}>(), {
  label: '',
  state: State.base,
  size: Size.md,
  disabled: false,
  skeleton: false,
  readonly: false,
  dataE2e: 'component-name',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the component is in a non-interactive state — skeleton,
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the component should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each State variant to its corresponding background and text color classes.
 */
const colorVariants: Record<State, string> = {
  [State.base]: 'bg-base-50 text-base-50-font',
  [State.primary]: 'bg-primary-500 text-primary-500-font',
  [State.secondary]: 'bg-secondary-500 text-secondary-500-font',
  [State.danger]: 'bg-danger-500 text-danger-500-font',
  [State.info]: 'bg-info-500 text-info-500-font',
  [State.success]: 'bg-success-500 text-success-500-font',
  [State.warning]: 'bg-warning-500 text-warning-500-font',
};

/**
 * Maps each Size to its padding, font-size, and gap classes.
 */
const sizeClasses: Record<Size, string> = {
  [Size.lg]: 'p-2.5 text-lg gap-2.5',
  [Size.md]: 'p-2 text-sm gap-2',
  [Size.sm]: 'p-1.5 text-sm gap-1.5',
  [Size.xs]: 'p-1.5 text-xs gap-1.5',
  [Size.xs2]: 'p-1 text-xs gap-1',
};

/**
 * Combined CSS classes for the root element.
 * @returns {Record<string, boolean>} All CSS classes keyed by className
 */
const classes = computed(() => ({
  'inline-flex items-center justify-center font-medium transition-colors rounded-md': true,
  'focus:outline-hidden focus:ring-4': !hasInputState.value,
  'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
  'cursor-pointer': !hasInputState.value,
  'cursor-default': props.readonly,
  invisible: props.skeleton,
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
  handleEnumValidation(props.state, State, 'state');
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || skeleton"
    :tabindex="hasInputState ? -1 : 0"
    v-bind="$attrs"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
    @click="onClick"
    @blur="onBlur"
  >
    <!-- @slot Default slot for custom content inside the component (fallback to label prop) -->
    <slot>{{ label }}</slot>
  </button>
</template>
```

### 3. Storybook Boilerplate (`[ComponentName].stories.ts`)

```typescript
import { type Meta, type StoryObj } from '@storybook/vue3';
import { Size, State } from '../../enums';
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
    label: '[ComponentName]',
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
- **Strict Enums**: No string literals allowed for design tokens. Use global enums from `src/enums/` (imported via relative path `../../enums`).
- **Documentation**: Inline `@default` JSDoc for props, multi-line JSDoc for computed properties and emits.
- **Relative Imports**: Use relative paths (e.g., `../../enums`, `../../handler`), NOT the `@/` alias.
- **data-e2e**: Include `data-e2e` attribute on the root element for test selectors.
- **Zero Errors**: Must compilation-check perfectly (`pnpm run typecheck`) and follow ESLint formatting rules (`pnpm run lint:fix`).

## Handoff
After creating and wiring the component, respond with:
> "The component `[ComponentName]` has been successfully created using the Flat Co-location pattern inside `[directory]`. The `.vue`, `.types.ts`, and `.stories.ts` files have been scaffolded with strict typing and global enums. All exports have been correctly added to the root export chain. You can run `pnpm run typecheck` and `pnpm run dev` to see it in Storybook."
