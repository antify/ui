<script lang="ts" setup>
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  computed,
  onMounted,
} from 'vue';
import {
  type RouteLocationRaw,
} from 'vue-router';
import AntIcon from './AntIcon.vue';
import AntSkeleton from './AntSkeleton.vue';
import AntSpinner from './AntSpinner.vue';
import AntTooltip from './AntTooltip.vue';
import {
  AntSpinnerSize,
  ButtonSize,
  ButtonType,
} from './__types';
import {
  IconSize,
} from './__types/AntIcon.types';
import {
  Grouped,
} from '../enums/Grouped.enum';
import {
  handleEnumValidation,
} from '../handler';
import {
  InputState,
  Position,
  State,
} from '../enums';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the button is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the button loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default 'button' */
  dataE2e?: string;
  /** Whether the button is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the button fills the full width of its container. @default false */
  expanded?: boolean;
  /** Whether the button has a filled (solid) background instead of outlined. @default false */
  filled?: boolean;
  /** How the button is visually grouped with adjacent buttons. @values Grouped.none | Grouped.left | Grouped.center | Grouped.right @default Grouped.none */
  grouped?: Grouped;
  /** FontAwesome icon displayed on the left side of the button content. @default undefined */
  iconLeft?: IconDefinition;
  /** FontAwesome icon displayed on the right side of the button content. @default undefined */
  iconRight?: IconDefinition;
  /** Whether the button cannot receive keyboard focus. @default false */
  noFocus?: boolean;
  /** Whether to render an outline border around the button. @default true */
  outlined?: boolean;
  /** Whether the button is in a readonly (non-interactive, non-submittable) state. @default false */
  readonly?: boolean;
  /** The size variant of the button. @values ButtonSize.lg | ButtonSize.md | ButtonSize.sm | ButtonSize.xs | ButtonSize.xs2 | ButtonSize.xs3 @default ButtonSize.md */
  size?: ButtonSize;
  /** Whether to show a skeleton placeholder instead of the button. @default false */
  skeleton?: boolean;
  /** Whether to show a loading spinner instead of the button content. @default false */
  spinner?: boolean;
  /** The visual color state variant. @values State.base | State.primary | State.secondary | State.danger | State.info | State.success | State.warning @default State.base */
  state?: State;
  /** Whether the button acts as a form submit button. @default false */
  submit?: boolean;
  /** Router-link target route location for navigation. @default undefined */
  to?: RouteLocationRaw;
  /** Delay in milliseconds before the tooltip appears. @default 800 */
  tooltipDelay?: number;
  /** Tooltip placement position relative to the button. @values Position.top | Position.right | Position.bottom | Position.left @default Position.bottom */
  tooltipPosition?: Position;
  /** Tooltip visual state variant. @values InputState.base | InputState.danger | InputState.info | InputState.success | InputState.warning @default InputState.base */
  tooltipState?: InputState;
}>(), {
  state: State.base,
  disabled: false,
  filled: false,
  skeleton: false,
  spinner: false,
  size: ButtonSize.md,
  grouped: Grouped.none,
  readonly: false,
  expanded: false,
  submit: false,
  outlined: true,
  noFocus: false,
  tooltipPosition: Position.bottom,
  tooltipState: InputState.base,
  tooltipDelay: 800,
  dataE2e: 'button',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the button is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the button should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Border-radius classes based on the grouping position.
 * Grouped buttons connect seamlessly without double borders by removing
 * the inner border-radius and using negative margin to overlap.
 * @returns {Record<string, boolean>} CSS classes keyed by className
 */
const groupedClassList = computed(() => ({
  'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none -mr-px': props.grouped === Grouped.left,
  'rounded-none -mx-px': props.grouped === Grouped.center,
  'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md -ml-px': props.grouped === Grouped.right,
  'rounded-md': props.grouped === Grouped.none,
}));

/**
 * Focus ring width based on button size.
 * Smaller buttons (xs3 through sm) get a thinner 2px ring;
 * medium and large buttons get a thicker 4px ring.
 * No focus ring is applied when the button is non-interactive.
 * @returns {string} The focus ring CSS class, or empty string
 */
const focusRingClass = computed(() => {
  if (hasInputState.value) {
    return '';
  }

  return props.size === ButtonSize.md || props.size === ButtonSize.lg
    ? 'focus:ring-4'
    : 'focus:ring-2';
});

/**
 * Maps each State to the outline/focus ring color classes.
 * Applied when the button receives keyboard focus.
 */
const stateOutlineVariants: Record<State, string> = {
  [State.base]: 'ring-primary-200 outline-base-300',
  [State.danger]: 'ring-danger-200 outline-danger-500',
  [State.info]: 'ring-info-200 outline-info-500',
  [State.primary]: 'ring-primary-200 outline-primary-500',
  [State.secondary]: 'ring-secondary-200 outline-secondary-500',
  [State.success]: 'ring-success-200 outline-success-500',
  [State.warning]: 'ring-warning-200 outline-warning-500',
};

/**
 * Maps each State to background + text color classes for outlined (non-filled) buttons.
 */
const notFilledColorVariants: Record<State, string> = {
  [State.base]: 'bg-white text-for-white-bg-font',
  [State.danger]: 'bg-white text-danger-500',
  [State.info]: 'bg-white text-info-500',
  [State.primary]: 'bg-white text-primary-500',
  [State.secondary]: 'bg-white text-secondary-500',
  [State.success]: 'bg-white text-success-500',
  [State.warning]: 'bg-white text-warning-500',
};

/**
 * Maps each State to the hover background color class for outlined buttons.
 */
const notFilledHoverVariants: Record<State, string> = {
  [State.base]: 'hover:bg-base-100',
  [State.danger]: 'hover:bg-danger-100',
  [State.info]: 'hover:bg-info-100',
  [State.primary]: 'hover:bg-primary-100',
  [State.secondary]: 'hover:bg-secondary-100',
  [State.success]: 'hover:bg-success-100',
  [State.warning]: 'hover:bg-warning-100',
};

/**
 * Maps each State to background + text color classes for filled (solid) buttons.
 */
const filledColorVariants: Record<State, string> = {
  [State.base]: 'bg-base-50 text-base-50-font',
  [State.danger]: 'bg-danger-500 text-danger-500-font',
  [State.info]: 'bg-info-500 text-info-500-font',
  [State.primary]: 'bg-primary-500 text-primary-500-font',
  [State.secondary]: 'bg-secondary-500 text-secondary-500-font',
  [State.success]: 'bg-success-500 text-success-500-font',
  [State.warning]: 'bg-warning-500 text-warning-500-font',
};

/**
 * Maps each State to the hover background color class for filled buttons.
 */
const filledHoverVariants: Record<State, string> = {
  [State.base]: 'hover:bg-base-200',
  [State.danger]: 'hover:bg-danger-600',
  [State.info]: 'hover:bg-info-600',
  [State.primary]: 'hover:bg-primary-600',
  [State.secondary]: 'hover:bg-secondary-600',
  [State.success]: 'hover:bg-success-600',
  [State.warning]: 'hover:bg-warning-600',
};

/**
 * Maps each ButtonSize to its padding, font-size, and gap classes.
 */
const sizeClasses: Record<ButtonSize, string> = {
  [ButtonSize.xs3]: 'p-1 text-2xs gap-1',
  [ButtonSize.xs2]: 'p-1 text-xs gap-1',
  [ButtonSize.xs]: 'p-1.5 text-xs gap-1.5',
  [ButtonSize.sm]: 'p-1.5 text-sm gap-1.5',
  [ButtonSize.md]: 'p-2 text-sm gap-2',
  [ButtonSize.lg]: 'p-2.5 text-sm gap-2.5',
};

/**
 * Combined CSS classes for the root button element.
 * Merges layout (flex, alignment), size, state, filled/outlined,
 * grouping, focus ring, and interactivity rules.
 * @returns {Record<string, boolean>} All CSS classes keyed by className
 */
const classes = computed(() => ({
  'transition-all inline-flex items-center justify-center font-medium cursor-pointer select-none h-fit': true,
  'active:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]': !hasInputState.value,
  'disabled:opacity-50 disabled:cursor-not-allowed': true,
  'cursor-default': props.readonly,
  'w-full': props.expanded,
  'outline outline-1 outline-offset-[-1px]': props.outlined,
  [focusRingClass.value]: focusRingClass.value !== '',
  ...groupedClassList.value,
  [sizeClasses[props.size]]: true,
  [stateOutlineVariants[props.state]]: true,
  [notFilledColorVariants[props.state]]: !props.filled,
  [notFilledHoverVariants[props.state]]: !props.filled && !hasInputState.value,
  [filledColorVariants[props.state]]: props.filled,
  [filledHoverVariants[props.state]]: props.filled && !hasInputState.value,
}));

/**
 * Icon color class based on whether the button is filled or outlined.
 * Filled buttons use the lighter "font" color variants for contrast
 * against the solid background; outlined buttons use the state color.
 * @returns {string} Tailwind text color class
 */
const iconColor = computed<string>(() => {
  const notFilled: Record<State, string> = {
    [State.base]: 'text-for-white-bg-font',
    [State.danger]: 'text-danger-500',
    [State.info]: 'text-info-500',
    [State.primary]: 'text-primary-500',
    [State.secondary]: 'text-secondary-500',
    [State.success]: 'text-success-500',
    [State.warning]: 'text-warning-500',
  };
  const filled: Record<State, string> = {
    [State.base]: 'text-for-white-bg-font',
    [State.danger]: 'text-danger-500-font',
    [State.info]: 'text-info-500-font',
    [State.primary]: 'text-primary-500-font',
    [State.secondary]: 'text-secondary-500-font',
    [State.success]: 'text-success-500-font',
    [State.warning]: 'text-warning-500-font',
  };

  return props.filled ? filled[props.state] : notFilled[props.state];
});

// ---------------------------------------------------------------------------
// Element type / attribute helpers
// ---------------------------------------------------------------------------

/**
 * The native `type` attribute for the rendered button element.
 * Returns `submit` or `button` for native buttons, and `undefined`
 * for router-links (which do not support a type attribute).
 * @returns {ButtonType | undefined}
 */
const type = computed<ButtonType | undefined>(() => {
  if (props.to !== undefined) {
    return undefined;
  }

  return props.submit ? ButtonType.submit : ButtonType.button;
});

/**
 * The HTML element or Vue component tag used as the root element:
 * - `div` when readonly (completely non-interactive)
 * - `router-link` when a `to` route is provided (navigation)
 * - `button` otherwise (default interactive state)
 * @returns {'div' | 'router-link' | 'button'}
 */
const is = computed<'div' | 'router-link' | 'button'>(() => {
  if (props.readonly) {
    return 'div';
  }

  return props.to !== undefined ? 'router-link' : 'button';
});

// ---------------------------------------------------------------------------
// Size-derived sub-component sizes
// ---------------------------------------------------------------------------

/**
 * Icon size derived from the button size.
 * xs3→IconSize.xs2, xs/xs2→IconSize.xs, all larger→IconSize.sm.
 * @returns {IconSize}
 */
const getIconSize = computed<IconSize>(() => {
  if (props.size === ButtonSize.xs || props.size === ButtonSize.xs2) {
    return IconSize.xs;
  } else if (props.size === ButtonSize.xs3) {
    return IconSize.xs2;
  }

  return IconSize.sm;
});

/**
 * Spinner size derived from the button size.
 * Larger buttons (sm-md-lg) use a small spinner; xs uses xs; xs2+ default to xs2.
 * @returns {AntSpinnerSize}
 */
const spinnerSize = computed<AntSpinnerSize>(() => {
  switch (props.size) {
    case ButtonSize.lg:
    case ButtonSize.md:
    case ButtonSize.sm:
      return AntSpinnerSize.sm;
    case ButtonSize.xs:
      return AntSpinnerSize.xs;
    case ButtonSize.xs2:
    default:
      return AntSpinnerSize.xs2;
  }
});

// ---------------------------------------------------------------------------
// Runtime enum validation
// ---------------------------------------------------------------------------

onMounted(() => {
  handleEnumValidation(props.size, ButtonSize, 'size');
  handleEnumValidation(props.state, State, 'state');
  handleEnumValidation(props.grouped, Grouped, 'grouped');
});
</script>

<template>
  <!--
    Skeleton wrapper — shown when `skeleton` is true; otherwise renders
    children transparently.
  -->
  <AntSkeleton
    :visible="skeleton"
    :grouped="grouped"
    :class="{'w-full': props.expanded}"
    rounded
  >
    <div
      class="inline-flex h-fit"
      :class="{'w-full': props.expanded}"
      data-e2e="button"
      :data-e2e-state="state"
    >
      <AntTooltip
        class="w-full"
        :state="tooltipState"
        :delay="tooltipDelay"
      >
        <!--
          Dynamic root element: <button>, <router-link>, or <div> (readonly).
          @slot (default) — Content rendered inside the button, between the left
          and right icons. Automatically hidden when `spinner` is active.
          @slot icon-left — Custom content on the left side. Defaults to an
          <AntIcon> using the `iconLeft` prop when the slot is empty.
          @slot icon-right — Custom content on the right side. Defaults to an
          <AntIcon> using the `iconRight` prop when the slot is empty.
        -->
        <component
          :is="is"
          :class="classes"
          :type="type"
          :to="to"
          :disabled="disabled || undefined"
          :tabindex="noFocus || hasInputState ? '-1' : '0'"
          v-bind="$attrs"
          :data-e2e="dataE2e"
          :data-e2e-state="state"
          @click="(e: MouseEvent) => !props.readonly ? emit('click', e) : null"
          @blur="(e: FocusEvent) => !props.readonly ? emit('blur', e) : null"
        >
          <!-- Spinner replaces all visible content when loading -->
          <AntSpinner
            v-if="spinner"
            :size="spinnerSize"
            :state="state"
            :inverted="!filled"
          />

          <!-- Left icon / slot — hidden during spinner -->
          <slot
            v-if="!spinner"
            name="icon-left"
          >
            <AntIcon
              v-if="iconLeft"
              :icon="iconLeft"
              :size="getIconSize"
              :color="iconColor"
            />
          </slot>

          <!-- Default slot content — hidden during spinner -->
          <slot v-if="!spinner" />

          <!-- Right icon / slot — hidden during spinner -->
          <slot
            v-if="!spinner"
            name="icon-right"
          >
            <AntIcon
              v-if="iconRight"
              :icon="iconRight"
              :size="getIconSize"
              :color="iconColor"
            />
          </slot>
        </component>

        <!--
          @slot tooltip-content — Custom content for the tooltip popover.
          Rendered inside AntTooltip's content area via its named slot.
        -->
        <template #content>
          <slot name="tooltip-content" />
        </template>
      </AntTooltip>
    </div>
  </AntSkeleton>
</template>