<script setup lang="ts">
import AntIcon from '../AntIcon.vue';
import {
  faExclamationCircle,
  faExclamationTriangle,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {computed} from 'vue';
import {type RouteLocationRaw, useRoute} from 'vue-router';
import {TabItemState} from './__types/AntTabItem.types';

const props = withDefaults(defineProps<{
  label: string;
  active: boolean;
  state?: TabItemState
  showIcon?: boolean;
  icon?: IconDefinition;
  to?: RouteLocationRaw;
  expanded?: boolean;
}>(), {
  state: TabItemState.base,
  showIcon: true,
});
const route = useRoute();

const icons = {
  [TabItemState.base]: null,
  [TabItemState.danger]: faExclamationCircle,
  [TabItemState.warning]: faExclamationTriangle,
};
const iconRight = computed<IconDefinition | null>(() => icons[props.state]);
const _active = computed<boolean>(() => {
  if (typeof props.to === 'string') {
    return route.path === props.to;
  }

  if (typeof props.to === 'object' && props.to?.name !== undefined) {
    return route.name === props.to.name;
  }

  return props.active;
});
const containerClasses = computed(() => {
  const variants: Record<TabItemState, string> = {
    [TabItemState.base]: 'hover:bg-neutral-100',
    [TabItemState.warning]: 'hover:bg-warning-100',
    [TabItemState.danger]: 'hover:bg-danger-100',
  };
  const activeVariants: Record<TabItemState, string> = {
    [TabItemState.base]: 'text-primary-500 border-primary-500',
    [TabItemState.warning]: 'text-warning-500 border-warning-500',
    [TabItemState.danger]: 'text-danger-500 border-danger-500',
  };
  const notActiveVariants: Record<TabItemState, string> = {
    [TabItemState.base]: 'text-for-white-bg-font border-white',
    [TabItemState.warning]: 'text-warning-500',
    [TabItemState.danger]: 'text-danger-500',
  };

  return {
    'p-2 hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-white transition-[background-color] relative text-sm': true,
    'grow': props.expanded,
    [variants[props.state]]: true,
    [activeVariants[props.state]]: _active.value,
    [notActiveVariants[props.state]]: !_active.value,
  };
});
const borderBoxClasses = computed(() => {
  const variants: Record<TabItemState, string> = {
    [TabItemState.base]: 'bg-primary-500',
    [TabItemState.warning]: 'bg-warning-500',
    [TabItemState.danger]: 'bg-danger-500',
  };

  return {
    'h-[2px] w-full bg-danger-500 absolute bottom-0': true,
    [variants[props.state]]: true,
  };
});
const iconColor = computed(() => {
  const variants = {
    [TabItemState.base]: 'text-neutral-100-font',
    [TabItemState.warning]: 'text-warning-500',
    [TabItemState.danger]: 'text-danger-500',
  };

  return variants[props.state];
});
</script>

<template>
  <component
    :is="to !== undefined ? 'router-link' : 'div'"
    :to="to"
    :class="containerClasses"
  >
    <slot name="iconLeft">
      <AntIcon
        v-if="icon"
        :icon="icon"
        :color="_active ? 'text-primary-500' : 'text-for-white-bg-font'"
      />
    </slot>

    <slot>{{ label }}</slot>

    <AntIcon
      v-if="iconRight && showIcon"
      :icon="iconRight"
      :color="iconColor"
    />

    <div
      v-if="_active"
      :class="borderBoxClasses"
    />
  </component>
</template>
