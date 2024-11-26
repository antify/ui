<script setup lang="ts">
import AntIcon from '../AntIcon.vue';
import {
  faCircleInfo,
  faExclamationCircle,
  faExclamationTriangle,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {computed} from 'vue';
import {type RouteLocationRaw, useRoute} from 'vue-router';
import {TabItemState} from './__types/AntTabItem.types';
import {AntSkeleton} from "../../../dist";

const props = withDefaults(defineProps<{
  label: string;
  active: boolean;
  disabled?: boolean;
  state?: TabItemState
  showIcon?: boolean;
  icon?: IconDefinition;
  to?: RouteLocationRaw;
  expanded?: boolean;
  skeleton?: boolean;
}>(), {
  state: TabItemState.base,
  showIcon: true,
  disabled: false,
  skeleton: false,
});
const route = useRoute();

const icons = {
  [TabItemState.base]: null,
  [TabItemState.info]: faCircleInfo,
  [TabItemState.danger]: faExclamationCircle,
  [TabItemState.warning]: faExclamationTriangle,
};
const iconRight = computed<IconDefinition | null>(() => icons[props.state]);
const _active = computed<boolean>(() => {
  if (typeof props.to === 'string') {
    return route.path.startsWith(props.to);
  }

  if (typeof props.to === 'object' && props.to?.name !== undefined) {
    return route.name.startsWith(props.to.name);
  }

  return props.active;
});
const containerClasses = computed(() => {
  const variants: Record<TabItemState, string> = {
    [TabItemState.base]: 'hover:bg-neutral-100',
    [TabItemState.info]: 'hover:bg-neutral-100',
    [TabItemState.warning]: 'hover:bg-warning-100',
    [TabItemState.danger]: 'hover:bg-danger-100',
  };
  const activeVariants: Record<TabItemState, string> = {
    [TabItemState.base]: 'text-primary-500 border-primary-500',
    [TabItemState.info]: 'text-primary-500 border-primary-500',
    [TabItemState.warning]: 'text-warning-500 border-warning-500',
    [TabItemState.danger]: 'text-danger-500 border-danger-500',
  };
  const notActiveVariants: Record<TabItemState, string> = {
    [TabItemState.base]: 'text-for-white-bg-font border-white',
    [TabItemState.info]: 'text-primary-500',
    [TabItemState.warning]: 'text-warning-500',
    [TabItemState.danger]: 'text-danger-500',
  };

  return {
    'p-2 text-center flex items-center justify-center gap-2 bg-white transition-[background-color] relative text-sm': true,
    'grow': props.expanded,
    [variants[props.state]]: !props.disabled,
    [activeVariants[props.state]]: _active.value,
    [notActiveVariants[props.state]]: !_active.value,
    'hover:cursor-pointer': !props.disabled,
    'hover:cursor-not-allowed opacity-50': props.disabled,
  };
});
const borderBoxClasses = computed(() => {
  const variants: Record<TabItemState, string> = {
    [TabItemState.base]: 'bg-primary-500',
    [TabItemState.info]: 'bg-primary-500',
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
    [TabItemState.info]: 'text-primary-500',
    [TabItemState.warning]: 'text-warning-500',
    [TabItemState.danger]: 'text-danger-500',
  };

  return variants[props.state];
});
</script>

<template>
  <component
    :is="to !== undefined && !disabled ? 'router-link' : 'div'"
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

    <div class="relative">
      <slot>{{ label }}</slot>
      <AntSkeleton v-if="skeleton" rounded absolute/>
    </div>

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
