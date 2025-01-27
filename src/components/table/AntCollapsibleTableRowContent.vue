<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  isOpen: boolean;
  skeleton?: boolean;
}>(), {
  skeleton: false,
});

const rowContentClasses = computed(() => ({
  "grid transition-all duration-300 delay-0 ease-in-out": true,
  "grid-rows-[0fr]": !props.isOpen,
  "grid-rows-[1fr]": props.isOpen,
}));

</script>

<template>
  <div :class="rowContentClasses">
    <div class="overflow-hidden">
      <slot/>
    </div>
  </div>
</template>
