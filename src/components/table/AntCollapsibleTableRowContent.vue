<script setup lang="ts">

import {computed} from "vue";

const props = withDefaults(defineProps<{
  isOpen: boolean;
  skeleton?: boolean;
}>(), {
  skeleton: false,
});

const rowContentClasses = computed(() => ({
  "p-4 transition": true,
  "h-0 py-0": !props.isOpen,
}));

</script>

<template>
  <div :class="rowContentClasses">
    <slot/>
  </div>
</template>
