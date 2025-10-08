<script setup lang="ts">
withDefaults(defineProps<{
  padding?: boolean;
}>(), {
  padding: true,
});
</script>

<template>
  <div
    :class="{ 'p-2.5': padding }"
    class="bg-white overflow-auto"
    data-e2e="content"
  >
    <slot />
  </div>
</template>
