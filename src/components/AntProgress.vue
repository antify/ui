<script setup lang="ts">
import {
  computed,
} from 'vue';

const props = defineProps<{
  /**
   * Represent the value in percentage
   * Should be a number from 0 to 100
   */
  progress: number | null;
}>();

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
  <div class="relative bg-base-100 w-full h-[16px] rounded-md">
    <div
      class="absolute bg-primary-500 h-[16px] rounded-md"
      :style="{ width: progressWidth }"
    />
  </div>
</template>
