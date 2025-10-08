<script setup lang="ts">
import {
  computed,
} from 'vue';
import {
  State,
} from '../enums/State.enum';

const props = withDefaults(defineProps<{
  /**
   * Represent the value in percentage
   * Should be a number from 0 to 100
   */
  progress: number | null;
  /**
   * Takes string with height and the unit e.g. '16px' or '1rem'
   */
  height: string;
  /**
   * Takes tailwind class for background color e.g. 'bg-primary-500'
   */
  color?: string;
}>(),{
  color: 'bg-primary-500',
});

const progressWidth = computed(() => {
  if (!props.progress || props.progress <= 0) {
    return '0%';
  } else if (props.progress && props.progress <= 100) {
    return `${props.progress}%`;
  } else {
    return '100%';
  }
});
</script>

<template>
  <div
    class="relative bg-base-100 w-full rounded-md"
    :style="{ height: height }"
    data-e2e="progress"
  >
    <div
      class="absolute rounded-md"
      :class="color"
      :style="{ width: progressWidth, height: height }"
    />
  </div>
</template>
