<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  Size,
  State,
} from '../enums';

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
  /** The data-e2e attribute value for testing selectors. @default 'avatar' */
  dataE2e?: string;
  /** Whether the component is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the component is in a readonly (non-interactive, non-submittable) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of the avatar. @default false */
  skeleton?: boolean;
  /** The size variant of the avatar. @values Size @default Size.md */
  size?: Size;
  /** The visual color state variant used as fallback background. @values State @default State.base */
  state?: State;
  /** Image source URL for the avatar photo. When omitted, the `label` fallback is shown. @default undefined */
  src?: string;
  /** Accessible alt text for the avatar image. @default 'avatar' */
  alt?: string;
  /** Fallback text (e.g. initials) displayed when no `src` is provided or the image fails to load. @default '' */
  label?: string;
}>(), {
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  state: State.base,
  src: undefined,
  alt: 'avatar',
  label: '',
  dataE2e: 'avatar',
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
// Image error handling
// ---------------------------------------------------------------------------

/**
 * Whether the image failed to load, triggering the fallback display.
 */
const imageError = ref(false);

/**
 * Resets the image error state when src changes, so a new src retries loading.
 */
function handleImageError() {
  imageError.value = true;
}

/**
 * Shows the image when it loads successfully.
 */
function handleImageLoad() {
  imageError.value = false;
}

/**
 * Whether the component should render the fallback (label/placeholder) instead of the image.
 * True when no src is provided, or the src image failed to load.
 */
const showFallback = computed(() => !props.src || imageError.value);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each State to its background and text color utility classes for the fallback placeholder.
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
 * Maps each Size to width, height, font-size, and border-radius classes.
 * CRITICAL: The Size enum key for '2xs' is xs2 but the value '2xs' starts
 * with a digit, so bracket notation Size['2xs'] must be used here.
 */
const sizeClasses: Record<Size, string> = {
  [Size.lg]: 'w-14 h-14 text-lg rounded-xl',
  [Size.md]: 'w-10 h-10 text-base rounded-lg',
  [Size.sm]: 'w-8 h-8 text-sm rounded-md',
  [Size.xs]: 'w-6 h-6 text-xs rounded-md',
  [Size['2xs']]: 'w-5 h-5 text-2xs rounded',
};

/**
 * Combined CSS classes for the root element.
 * Merges layout, size, state, and interactivity rules.
 * @returns {Record<string, boolean>} All CSS classes keyed by className
 */
const classes = computed(() => ({
  'transition-all inline-flex items-center justify-center overflow-hidden shrink-0': true,
  'disabled:opacity-50 disabled:cursor-not-allowed': true,
  'cursor-default': props.readonly,
  'select-none': true,
  invisible: props.skeleton,
  [sizeClasses[props.size]]: true,
}));

/**
 * CSS classes for the fallback placeholder text/background.
 * Applied when no image is shown.
 * @returns {Record<string, boolean>} Fallback CSS classes keyed by className
 */
const fallbackClasses = computed(() => ({
  'w-full h-full inline-flex items-center justify-center font-semibold': true,
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
    @slot (default) — Custom content rendered inside the avatar.
    If provided, replaces both the image and the fallback label.
  -->
  <div
    :class="classes"
    :tabindex="hasInputState ? '-1' : '0'"
    v-bind="$attrs"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
    @click="onClick"
    @blur="onBlur"
  >
    <!--
      Skeleton overlay — renders as a full-size placeholder when skeleton is true.
      The overlay sits on top of the invisible content to preserve layout dimensions.
    -->
    <template v-if="skeleton">
      <div class="w-full h-full animate-pulse bg-base-200 rounded-inherit" />
    </template>

    <!--
      Avatar image — shown when `src` is provided and the image has not errored.
      On load error the `imageError` flag triggers the fallback display instead.
    -->
    <img
      v-else-if="!showFallback"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      @error="handleImageError"
      @load="handleImageLoad"
    >

    <!--
      Fallback placeholder — shown when no src is provided, the image fails to
      load, or the default slot is empty. Displays the `label` text (e.g. initials)
      centered on a colored background determined by the `state` prop.
      When slot content is provided, it overrides the fallback entirely.
    -->
    <div
      v-else
      :class="fallbackClasses"
    >
      <slot>
        {{ label }}
      </slot>
    </div>
  </div>
</template>