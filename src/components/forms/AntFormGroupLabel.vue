<script lang="ts" setup>
import AntSkeleton from '../AntSkeleton.vue';

withDefaults(defineProps<{
  skeleton?: boolean;
}>(), {
  skeleton: false,
});
</script>

<template>
  <div class="text-primary-500 text-xl font-medium">
    <AntSkeleton
      :visible="skeleton"
      rounded
    >
      <slot />
    </AntSkeleton>
  </div>
</template>
