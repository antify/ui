<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import {
  AntSpinnerSize,
} from './__types/AntSpinner.types';
import {
  handleEnumValidation,
} from '../handler';
import {
  State,
} from '../enums/State.enum';

const props = withDefaults(defineProps<{
  state?: State;
  size?: AntSpinnerSize;
  inverted?: boolean;
}>(), {
  size: AntSpinnerSize.md,
  state: State.base,
  inverted: false,
});

const classes = computed(() => ({
  'animate-spin': true,
  'w-3 h-3': props.size === AntSpinnerSize.xs2,
  'w-4 h-4': props.size === AntSpinnerSize.xs,
  'w-5 h-5': props.size === AntSpinnerSize.sm,
  'w-6 h-6': props.size === AntSpinnerSize.md,
  'w-7 h-7': props.size === AntSpinnerSize.lg,
  'w-8 h-8': props.size === AntSpinnerSize.xl2,
  'w-9 h-9': props.size === AntSpinnerSize.xl3,
  'w-10 h-10': props.size === AntSpinnerSize.xl4,
}));
onMounted(() => {
  handleEnumValidation(props.size, AntSpinnerSize, 'size');
  handleEnumValidation(props.state, State, 'state');
});
const circleClass = computed(() => {
  const invertedVariants: Record<State, string> = {
    [State.base]: 'fill-base-500',
    [State.primary]: 'fill-primary-700',
    [State.secondary]: 'fill-secondary-700',
    [State.danger]: 'fill-danger-700',
    [State.info]: 'fill-info-700',
    [State.success]: 'fill-success-700',
    [State.warning]: 'fill-warning-700',
  };
  const notInvertedVariants: Record<State, string> = {
    [State.base]: 'fill-base-100',
    [State.primary]: 'fill-primary-100',
    [State.secondary]: 'fill-secondary-100',
    [State.danger]: 'fill-danger-100',
    [State.info]: 'fill-info-100',
    [State.success]: 'fill-success-100',
    [State.warning]: 'fill-warning-100',
  };

  return {
    [invertedVariants[props.state]]: props.inverted,
    [notInvertedVariants[props.state]]: !props.inverted,
  };
});
const spinningElementClass = computed(() => {
  const invertedVariants: Record<State, string> = {
    [State.base]: 'fill-base-100',
    [State.primary]: 'fill-primary-100',
    [State.secondary]: 'fill-secondary-100',
    [State.danger]: 'fill-danger-100',
    [State.info]: 'fill-info-100',
    [State.success]: 'fill-success-100',
    [State.warning]: 'fill-warning-100',
  };
  const notInvertedVariants: Record<State, string> = {
    [State.base]: 'fill-base-500',
    [State.primary]: 'fill-primary-500',
    [State.secondary]: 'fill-secondary-500',
    [State.danger]: 'fill-danger-500',
    [State.info]: 'fill-info-500',
    [State.success]: 'fill-success-500',
    [State.warning]: 'fill-warning-500',
  };

  return {
    [invertedVariants[props.state]]: props.inverted,
    [notInvertedVariants[props.state]]: !props.inverted,
  };
});
</script>

<template>
  <svg
    :class="classes"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-e2e="spinner"
    :data-e2e-state="state"
  >
    <path
      :class="circleClass"
      d="M8 16C12.4183 16 16 12.4183 16 8H14C14 11.5346 11.5346 14 8 14C4.46538 14 2 11.5346 2 8C2 4.46538 4.46538 2 8 2V0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
    />
    <path
      :class="spinningElementClass"
      d="M16 8C16 6.94942 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608963C10.0909 0.206926 9.05057 -1.7116e-07 8 0L8 2C8.78793 2 9.56815 2.15519 10.2961 2.45672C11.0241 2.75825 11.6855 3.20021 12.2426 3.75736C12.7998 4.31451 13.2417 4.97595 13.5433 5.7039C13.8448 6.43185 14 7.21207 14 8H16Z"
    />
  </svg>
</template>
