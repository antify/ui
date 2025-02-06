<script lang="ts" setup>
import AntSkeleton from './AntSkeleton.vue';

withDefaults(defineProps<{
  skeleton?: boolean;
  shadow?: boolean;
}>(), {
  skeleton: false,
  shadow: false,
});
</script>

<template>
  <div class="relative">
    <AntSkeleton
      v-if="skeleton"
      absolute
      rounded
    />

    <div
      class="flex flex-col rounded-md bg-base-300 gap-px relative border border-base-300 overflow-hidden"
      :class="{'invisible': skeleton, 'shadow-md': shadow}"
    >
      <slot />
    </div>
  </div>
</template>
