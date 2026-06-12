<script lang="ts" setup>
import {
  computed,
  onMounted,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  Size,
} from '../enums/Size.enum';
import AntSkeleton from './AntSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the card body is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the card loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default 'card' */
  dataE2e?: string;
  /** Whether the card is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the card fills the full width of its container. @default false */
  expanded?: boolean;
  /** Whether to apply padding inside the card. @default true */
  padding?: boolean;
  /** Whether the card is in a readonly (non-interactive) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of card content. @default false */
  skeleton?: boolean;
  /** The size variant controlling padding density. @values Size @default Size.md */
  size?: Size;
}>(), {
  disabled: false,
  expanded: false,
  padding: true,
  readonly: false,
  skeleton: false,
  size: Size.md,
  dataE2e: 'card',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the card is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the card should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each Size to the corresponding padding class.
 * CRITICAL: The Size enum key for '2xs' is xs2 but the value '2xs' starts
 * with a digit, so bracket notation Size['2xs'] must be used here.
 */
const paddingClasses: Record<Size, string> = {
  [Size.lg]: 'p-2.5',
  [Size.md]: 'p-2',
  [Size.sm]: 'p-1.5',
  [Size.xs]: 'p-1.5',
  [Size['2xs']]: 'p-1',
};

/**
 * Combined CSS classes for the root card element.
 * Applies base card styling, conditional padding, expanded width,
 * and interactivity rules.
 * @returns {Record<string, boolean>} All CSS classes keyed by className
 */
const cardClass = computed(() => ({
  'inline-block': true,
  'w-full': props.expanded,
  'p-0': !props.padding,
  [paddingClasses[props.size]]: props.padding,
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
});
</script>

<template>
  <!--
    @slot (default) — The main content rendered inside the card body.
    When `skeleton` is true the content is wrapped in an invisible placeholder
    while the skeleton animation displays.
  -->
  <AntSkeleton
    :visible="skeleton"
    rounded
  >
    <div
      :class="cardClass"
      class="bg-white border border-base-300 rounded-md relative"
      :tabindex="hasInputState ? '-1' : '0'"
      v-bind="$attrs"
      :data-e2e="dataE2e"
      :data-e2e-state="size"
      @click="onClick"
      @blur="onBlur"
    >
      <slot />
    </div>
  </AntSkeleton>
</template>
