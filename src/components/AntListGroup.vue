<script lang="ts" setup>
import AntSkeleton from './AntSkeleton.vue';

withDefaults(
  defineProps<{
    skeleton?: boolean
  }>(), {
    skeleton: false
  }
)
</script>

<template>
  <div class="relative">
    <AntSkeleton v-if="skeleton" absolute rounded/>

    <div
      class="flex flex-col rounded-md bg-neutral-300 gap-px relative border border-neutral-300 overflow-hidden"
      :class="{'invisible': skeleton}"
    >
      <slot/>
    </div>
  </div>
</template>
