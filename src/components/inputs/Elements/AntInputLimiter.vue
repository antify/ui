<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import {
  Size,
} from '../../../enums/Size.enum';
import AntSkeleton from '../../AntSkeleton.vue';
import {
  handleEnumValidation,
} from '../../../handler';
import {
  InputState,
} from '../../../enums';

const props = withDefaults(defineProps<{
  value: number;
  maxValue: number;
  state?: InputState;
  size?: Size;
  skeleton?: boolean;
}>(), {
  skeleton: false,
  size: Size.md,
  state: InputState.base,
});

const classes = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-for-white-bg-font',
    [InputState.danger]: 'text-danger-500',
    [InputState.info]: 'text-info-500',
    [InputState.success]: 'text-success-500',
    [InputState.warning]: 'text-warning-500',
  };

  return {
    'relative font-regular inline-block transition-color': true,
    'text-2xs': props.size === Size.xs2,
    'text-xs': props.size === Size.xs,
    'text-sm': props.size === Size.sm,
    'text-md': props.size === Size.md,
    'text-lg': props.size === Size.lg,
    [variants[props.state]]: true,
  };
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <div :class="classes">
    <AntSkeleton
      :visible="skeleton"
      rounded
    >
      {{ value }}/{{ maxValue }}
    </AntSkeleton>
  </div>
</template>
