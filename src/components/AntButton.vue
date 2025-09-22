<script lang="ts" setup>
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  computed, onMounted,
} from 'vue';
import {
  type RouteLocationRaw,
} from 'vue-router';
import AntSkeleton from './AntSkeleton.vue';
import AntSpinner from './AntSpinner.vue';
import {
  AntSpinnerSize,
} from './__types';
import {
  Grouped,
} from '../enums/Grouped.enum';
import {
  handleEnumValidation,
} from '../handler';
import {
  State, InputState, Position,
} from '../enums';
import {
  ButtonType,
  ButtonSize,
} from './__types';
import AntIcon from './AntIcon.vue';
import AntTooltip from './AntTooltip.vue';
import {
  IconSize,
} from './__types/AntIcon.types';

defineOptions({
  inheritAttrs: false,
});

defineEmits([
  'click',
  'blur',
]);

const props = withDefaults(defineProps<{
  filled?: boolean;
  size?: ButtonSize;
  state?: State;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  to?: RouteLocationRaw;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  spinner?: boolean;
  readonly?: boolean;
  expanded?: boolean;
  submit?: boolean;
  outlined?: boolean;
  noFocus?: boolean;
  tooltipPosition?: Position;
  tooltipState?: InputState;
  tooltipDelay?: number;
  dataE2e?: string;
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

const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const groupedClassList = computed(() => ({
  'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none -mr-px': props.grouped === Grouped.left,
  'rounded-none -mx-px': props.grouped === Grouped.center,
  'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md -ml-px': props.grouped === Grouped.right,
  'rounded-md': props.grouped === Grouped.none,
}));
const classes = computed(() => {
  const variants = {
    [State.base]: 'ring-primary-200 outline-base-300',
    [State.danger]: 'ring-danger-200 outline-danger-500',
    [State.info]: 'ring-info-200 outline-info-500',
    [State.primary]: 'ring-primary-200 outline-primary-500',
    [State.secondary]: 'ring-secondary-200 outline-secondary-500',
    [State.success]: 'ring-success-200 outline-success-500',
    [State.warning]: 'ring-warning-200 outline-warning-500',
  };
  const notFilledVariants = {
    [State.base]: 'bg-white text-for-white-bg-font',
    [State.danger]: 'bg-white text-danger-500',
    [State.info]: 'bg-white text-info-500',
    [State.primary]: 'bg-white text-primary-500',
    [State.secondary]: 'bg-white text-secondary-500',
    [State.success]: 'bg-white text-success-500',
    [State.warning]: 'bg-white text-warning-500',
  };
  const notFilledHoverVariants = {
    [State.base]: 'hover:bg-base-100',
    [State.danger]: 'hover:bg-danger-100',
    [State.info]: 'hover:bg-info-100',
    [State.primary]: 'hover:bg-primary-100',
    [State.secondary]: 'hover:bg-secondary-100',
    [State.success]: 'hover:bg-success-100',
    [State.warning]: 'hover:bg-warning-100',
  };
  const filledVariants = {
    [State.base]: 'bg-base-50 text-base-50-font',
    [State.danger]: 'bg-danger-500 text-danger-500-font',
    [State.info]: 'bg-info-500 text-info-500-font',
    [State.primary]: 'bg-primary-500 text-primary-500-font',
    [State.secondary]: 'bg-secondary-500 text-secondary-500-font',
    [State.success]: 'bg-success-500 text-success-500-font',
    [State.warning]: 'bg-warning-500 text-warning-500-font',
  };
  const filledHoverVariants = {
    [State.base]: 'hover:bg-base-200',
    [State.danger]: 'hover:bg-danger-600',
    [State.info]: 'hover:bg-info-600',
    [State.primary]: 'hover:bg-primary-600',
    [State.secondary]: 'hover:bg-secondary-600',
    [State.success]: 'hover:bg-success-600',
    [State.warning]: 'hover:bg-warning-600',
  };

  return {
    'transition-all inline-flex items-center justify-center font-medium cursor-pointer select-none h-fit': true,
    'active:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]': !hasInputState.value,
    'p-1 text-2xs gap-1': props.size === ButtonSize.xs3,
    'p-1 text-xs gap-1': props.size === ButtonSize.xs2,
    'p-1.5 text-xs gap-1.5': props.size === ButtonSize.xs,
    'p-1.5 text-sm gap-1.5': props.size === ButtonSize.sm,
    'p-2 text-sm gap-2': props.size === ButtonSize.md,
    'p-2.5 text-sm gap-2.5': props.size === ButtonSize.lg,
    'disabled:opacity-50 disabled:cursor-not-allowed': true,
    'cursor-default': props.readonly,
    'focus:ring-2': !props.readonly && props.size === ButtonSize.sm || props.size === ButtonSize.xs || props.size === ButtonSize.xs2 || props.size === ButtonSize.xs3,
    'focus:ring-4': !props.readonly && props.size === ButtonSize.md || props.size === ButtonSize.lg,
    'w-full': props.expanded,
    'outline outline-1 outline-offset-[-1px]': props.outlined,
    ...groupedClassList.value,
    [variants[props.state]]: true,
    [notFilledVariants[props.state]]: !props.filled,
    [notFilledHoverVariants[props.state]]: !props.filled && !hasInputState.value,
    [filledVariants[props.state]]: props.filled,
    [filledHoverVariants[props.state]]: props.filled && !hasInputState.value,
  };
});
const iconColor = computed(() => {
  const notFilledVariants = {
    [State.base]: 'text-for-white-bg-font',
    [State.danger]: 'text-danger-500',
    [State.info]: 'text-info-500',
    [State.primary]: 'text-primary-500',
    [State.secondary]: 'text-secondary-500',
    [State.success]: 'text-success-500',
    [State.warning]: 'text-warning-500',
  };
  const filledVariants = {
    [State.base]: 'text-for-white-bg-font',
    [State.danger]: 'text-danger-500-font',
    [State.info]: 'text-info-500-font',
    [State.primary]: 'text-primary-500-font',
    [State.secondary]: 'text-secondary-500-font',
    [State.success]: 'text-success-500-font',
    [State.warning]: 'text-warning-500-font',
  };

  return props.filled ? filledVariants[props.state] : notFilledVariants[props.state];
});
const type = computed(() => {
  if (props.to !== undefined) {
    return undefined;
  }

  return props.submit ? ButtonType.submit : ButtonType.button;
});
const is = computed(() => {
  if (props.readonly) {
    return 'div';
  }

  return props.to !== undefined ? 'router-link' : 'button';
});
const getIconSize = computed(() => {
  if (props.size === ButtonSize.xs || props.size === ButtonSize.xs2) {
    return IconSize.xs;
  } else if (props.size === ButtonSize.xs3) {
    return IconSize.xs2;
  } else {
    return IconSize.sm;
  }
});
const spinnerSize = computed(() => {
  switch (props.size) {
    case ButtonSize.lg:
      return AntSpinnerSize.sm;
    case ButtonSize.md:
      return AntSpinnerSize.sm;
    case ButtonSize.sm:
      return AntSpinnerSize.sm;
    case ButtonSize.xs:
      return AntSpinnerSize.xs;
    case ButtonSize.xs2:
      return AntSpinnerSize.xs2;
    default:
      return AntSpinnerSize.xs2;
  }
});

onMounted(() => {
  handleEnumValidation(props.size, ButtonSize, 'size');
  handleEnumValidation(props.state, State, 'state');
  handleEnumValidation(props.grouped, Grouped, 'grouped');
});
</script>

<template>
  <AntSkeleton
    :visible="skeleton"
    :grouped="grouped"
    :class="{'w-full': props.expanded}"
    rounded
  >
    <div
      class="inline-flex h-fit"
      :class="{'w-full': props.expanded}"
    >
      <AntTooltip
        class="w-full"
        :state="tooltipState"
        :delay="tooltipDelay"
      >
        <component
          :is="is"
          :class="classes"
          :type="type"
          :to="to"
          :disabled="disabled || undefined"
          :tabindex="noFocus || hasInputState ? '-1' : '0'"
          v-bind="$attrs"
          :data-e2e="dataE2e"
          :data-e2e-state="props.state"
          @click="(e: MouseEvent) => !props.readonly ? $emit('click', e) : null"
          @blur="(e: FocusEvent) => !props.readonly ? $emit('blur', e) : null"
        >
          <AntSpinner
            v-if="spinner"
            :size="spinnerSize"
            :state="state"
            :inverted="!filled"
          />

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

          <slot
            v-if="!spinner"
          />

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

        <template #content>
          <slot name="tooltip-content" />
        </template>
      </AntTooltip>
    </div>
  </AntSkeleton>
</template>
