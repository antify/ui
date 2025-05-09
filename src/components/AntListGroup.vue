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
  <div>
    <AntSkeleton
      :visible="skeleton"
      rounded
      class="w-full"
    >
      <div
        class="flex flex-col rounded-md bg-base-300 gap-px relative border border-base-300 overflow-hidden"
        :class="{'invisible': skeleton, 'shadow-md': shadow}"
      >
        <slot />
      </div>
    </AntSkeleton>
  </div>
</template>
