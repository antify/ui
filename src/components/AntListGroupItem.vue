<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  ListGroupItemState,
} from './__types/AntListGroupItem.types';
import {
  handleEnumValidation,
} from '../handler';
import {
  type RouteLocationRaw,
} from 'vue-router';
import AntIcon from './AntIcon.vue';

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw | string;
  state?: ListGroupItemState;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
}>(), {
  state: ListGroupItemState.base,
});

const classes = computed(() => {
  const variants: Record<ListGroupItemState, string> = {
    [ListGroupItemState.danger]: 'bg-danger-500 text-danger-500-font hover:bg-danger-700',
    [ListGroupItemState.info]: 'bg-info-500 text-info-500-font hover:bg-info-700',
    [ListGroupItemState.base]: 'bg-white text-for-white-bg-font hover:bg-base-200',
    [ListGroupItemState.primary]: 'bg-primary-500 text-primary-500-font hover:bg-primary-700',
    [ListGroupItemState.secondary]: 'bg-secondary-500 text-secondary-500-font hover:bg-secondary-700',
    [ListGroupItemState.success]: 'bg-success-500 text-success-500-font hover:bg-success-700',
    [ListGroupItemState.warning]: 'bg-warning-500 text-warning-500-font hover:bg-warning-700',
  };

  return {
    'text-sm transition-colors inline-block w-full': true,
    [variants[props.state]]: true,
  };
});
const contentWrapperClasses = computed(() => {
  const variants: Record<ListGroupItemState, string> = {
    [ListGroupItemState.danger]: 'text-danger-500-font',
    [ListGroupItemState.info]: 'text-info-500-font',
    [ListGroupItemState.base]: 'text-for-white-bg-font',
    [ListGroupItemState.primary]: 'text-primary-500-font',
    [ListGroupItemState.secondary]: 'text-secondary-500-font',
    [ListGroupItemState.success]: 'text-success-500-font',
    [ListGroupItemState.warning]: 'text-warning-500-font',
  };

  return {
    'w-full p-2 flex gap-2 items-center justify-between': true,
    'cursor-pointer transition-colors': props.to !== undefined,
    [variants[props.state]]: props.to !== undefined,
  };
});

onMounted(() => {
  handleEnumValidation(props.state, ListGroupItemState, 'state');
});
</script>

<template>
  <component
    :is="to !== undefined ? 'router-link' : 'div'"
    :to="to"
    :class="classes"
    data-e2e="list-group-item"
    :data-e2e-state="state"
  >
    <div :class="contentWrapperClasses">
      <div class="flex items-center gap-2.5">
        <slot
          v-if="iconLeft"
          name="icon-left"
        >
          <AntIcon :icon="iconLeft" />
        </slot>

        <slot />
      </div>

      <slot
        v-if="iconRight"
        name="icon-right"
      >
        <AntIcon :icon="iconRight" />
      </slot>
    </div>
  </component>
</template>
