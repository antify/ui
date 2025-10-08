<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  faCircleXmark, type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  AntTagSize, TagState,
} from './__types/AntTag.types';
import AntIcon from './AntIcon.vue';
import {
  IconSize,
} from './__types/AntIcon.types';

defineEmits([
  'close',
]);
const props = withDefaults(defineProps<{
  state?: TagState;
  size?: AntTagSize;
  iconLeft?: IconDefinition;
  dismiss?: boolean;
}>(), {
  size: AntTagSize.md,
  state: TagState.base,
  dismiss: false,
});

const classes = computed(() => {
  const variants: Record<TagState, string> = {
    [TagState.danger]: 'bg-danger-500 text-danger-500-font',
    [TagState.info]: 'bg-info-500 text-info-500-font',
    [TagState.primary]: 'bg-primary-500 text-primary-500-font',
    [TagState.secondary]: 'bg-secondary-500 text-secondary-500-font',
    [TagState.base]: 'bg-base-300 text-base-300-font',
    [TagState.success]: 'bg-success-500 text-success-500-font',
    [TagState.warning]: 'bg-warning-500 text-warning-500-font',
  };

  return {
    'rounded-md inline-flex items-center': true,
    'px-1 py-0.5 text-xs gap-0.5': props.size === AntTagSize.xs3,
    'px-1.5 py-1 text-xs gap-1': props.size === AntTagSize.xs2,
    'px-2 py-1.5 text-xs gap-1.5': props.size === AntTagSize.xs,
    'px-2 py-1.5 text-sm gap-1.5': props.size === AntTagSize.sm,
    'px-2.5 py-2 text-sm gap-2': props.size === AntTagSize.md,
    'px-3 py-2.5 text-sm gap-2.5': props.size === AntTagSize.lg,
    [variants[props.state]]: true,
  };
});
const getIconSize = computed(() => {
  if (props.size === AntTagSize.xs || props.size === AntTagSize.xs2 || props.size === AntTagSize.xs3) {
    return IconSize.xs;
  } else {
    return IconSize.sm;
  }
});
const iconState = computed(() => {
  switch (props.state) {
    case TagState.info:
      return 'text-info-500-font';
    case TagState.success:
      return 'text-success-500-font';
    case TagState.warning:
      return 'text-warning-500-font';
    case TagState.danger:
      return 'text-danger-500-font';
    case TagState.primary:
      return 'text-primary-500-font';
    case TagState.secondary:
      return 'text-secondary-500-font';
    default:
      return 'text-base-300-font';
  }
});
const iconWrapperClass = computed(() => {
  return {
    'w-4 h-4': props.size === AntTagSize.xs2 || props.size === AntTagSize.xs,
    'w-5 h-5': props.size === AntTagSize.sm || props.size === AntTagSize.md || props.size === AntTagSize.lg,
  };
});

onMounted(() => {
  handleEnumValidation(props.size, AntTagSize, 'size');
  handleEnumValidation(props.state, TagState, 'state');
});
</script>

<template>
  <span
    :class="classes"
    data-e2e="tag"
    :data-e2e-state="state"
  >
    <span
      v-if="iconLeft"
      class="inline-flex items-center justify-center"
      :class="iconWrapperClass"
    >
      <AntIcon
        :icon="iconLeft"
        :size="getIconSize"
        :color="iconState"
      />
    </span>

    <slot />

    <span
      v-if="dismiss"
      class="inline-flex items-center justify-center"
      :class="iconWrapperClass"
    >
      <AntIcon
        :icon="faCircleXmark"
        :size="getIconSize"
        :color="iconState"
        class="cursor-pointer"
        @click="() => $emit('close')"
      />
    </span>
  </span>
</template>
