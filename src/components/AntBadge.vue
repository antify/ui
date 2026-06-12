<script lang="ts" setup>
import {
  computed, onMounted, useSlots,
} from 'vue';
import {
  CornerPosition, Size, State,
} from '../enums';
import {
  handleEnumValidation,
} from '../handler';

defineOptions({
  inheritAttrs: false,
});

const slots = useSlots();

const props = withDefaults(defineProps<{
  /**
   * Content displayed inside the badge (e.g. a count, status label).
   * When omitted and `dot` is `false`, the badge renders as a small colored dot.
   * @default ''
   */
  label?: string | number;

  /**
   * The background color variant.
   * @values State
   * @default State.danger
   */
  state?: State;

  /**
   * Corner of the parent element where the badge is anchored.
   * Only used when slot content is provided (wrapper mode).
   * @values CornerPosition
   * @default CornerPosition.topRight
   */
  position?: CornerPosition;

  /**
   * Size variant that controls badge dimensions.
   * @values Size
   * @default Size.sm
   */
  size?: Size;

  /**
   * Whether to render as a small colored circle without text.
   * When `true`, the `label` prop is ignored visually (the dot is sized by `size`).
   * @default false
   */
  dot?: boolean;

  /**
   * Whether the badge renders a skeleton placeholder.
   * @default false
   */
  skeleton?: boolean;

  /**
   * The data-e2e attribute value for testing selectors.
   * @default 'badge'
   */
  dataE2e?: string;
}>(), {
  label: '',
  state: State.danger,
  position: CornerPosition.topRight,
  size: Size.sm,
  dot: false,
  skeleton: false,
  dataE2e: 'badge',
});

// ---------------------------------------------------------------------------
// Slot detection
// ---------------------------------------------------------------------------

/**
 * Whether the default slot contains any content.
 * When true the component renders as a wrapper; when false it stands alone.
 */
const hasSlotContent = computed(() => !!slots.default);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each State variant to its background and text color utility classes.
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
 * Maps each CornerPosition to absolute-positioning + transform classes so the
 * badge straddles the parent edge with its center pinned to the chosen corner.
 */
const positionClasses: Record<CornerPosition, string> = {
  [CornerPosition.topLeft]: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  [CornerPosition.topCenter]: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  [CornerPosition.topRight]: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  [CornerPosition.bottomRight]: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  [CornerPosition.bottomCenter]: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  [CornerPosition.bottomLeft]: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
};

/**
 * Maps each Size to dot-mode dimensions (width, height, border-radius).
 * Used when the `dot` prop is true or no label is provided.
 */
const dotSizeClasses: Record<Size, string> = {
  [Size.lg]: 'w-3.5 h-3.5',
  [Size.md]: 'w-3 h-3',
  [Size.sm]: 'w-2.5 h-2.5',
  [Size.xs]: 'w-2 h-2',
  [Size.xs2]: 'w-1.5 h-1.5',
};

/**
 * Maps each Size to content-mode dimensions (min-width, height, padding, font).
 * Used when the `dot` prop is false and a label is provided.
 */
const contentSizeClasses: Record<Size, string> = {
  [Size.lg]: 'min-w-[22px] h-[22px] px-2 text-xs',
  [Size.md]: 'min-w-[20px] h-[20px] px-1.5 text-xs',
  [Size.sm]: 'min-w-[16px] h-[16px] px-1.5 text-[10px]',
  [Size.xs]: 'min-w-[14px] h-[14px] px-1 text-[10px]',
  [Size.xs2]: 'min-w-[12px] h-[12px] px-0.5 text-[8px]',
};

/**
 * Whether the badge should render in dot-mode (small circle without text).
 * True when `dot` prop is explicitly set or no label is provided.
 */
const isDotMode = computed(() => props.dot || !props.label);

/**
 * CSS classes applied to the badge element itself.
 * @returns {Record<string, boolean>} Badge CSS classes keyed by className
 */
const badgeClasses = computed(() => ({
  'inline-flex items-center justify-center rounded-full font-bold leading-none': true,
  'transition-colors': true,
  'select-none': true,
  invisible: props.skeleton,
  [colorVariants[props.state]]: true,
  [dotSizeClasses[props.size]]: isDotMode.value,
  [contentSizeClasses[props.size]]: !isDotMode.value,
}));

/**
 * CSS classes applied to the outer wrapper element (only rendered when slot
 * content is provided). The wrapper uses `relative` so the absolutely-positioned
 * badge is anchored to it.
 * @returns {Record<string, boolean>} Wrapper CSS classes keyed by className
 */
const wrapperClasses = computed(() => ({
  'relative inline-flex': true,
}));

// ---------------------------------------------------------------------------
// Runtime enum validation
// ---------------------------------------------------------------------------

onMounted(() => {
  handleEnumValidation(props.state, State, 'state');
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.position, CornerPosition, 'position');
});
</script>

<template>
  <!--
    @slot Default slot for the wrapped element.
      - When the slot is filled, the component renders as a wrapper and the
        badge appears as an absolutely-positioned overlay in the chosen corner.
      - When the slot is empty, the component renders only the badge as a
        standalone inline-block element.
  -->
  <span
    v-if="hasSlotContent"
    :class="wrapperClasses"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
  >
    <slot />
    <span
      :class="[badgeClasses, positionClasses[props.position]]"
      class="absolute"
      data-e2e="badge-inner"
    >
      <template v-if="!isDotMode">
        {{ label }}
      </template>
    </span>
  </span>

  <span
    v-else
    :class="badgeClasses"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
  >
    <template v-if="!isDotMode">
      {{ label }}
    </template>
  </span>
</template>
