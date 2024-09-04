<script lang="ts" setup>
// TODO:: Fix typo KeyCap with upperchar C
import AntIcon from './AntIcon.vue';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from './__types';
import {AntKeycapSize} from './__types/AntKeycap.types';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  icon?: IconDefinition
  size?: AntKeycapSize

}>(), {
  size: AntKeycapSize.sm
});

const classes = computed(() => {
  return {
    'px-1': true,
    'test-sm min-w-6 h-6 ': props.size === AntKeycapSize.md,
    'test-xs min-w-5 h-5': props.size === AntKeycapSize.sm,
    'text-2xs min-w-4 h-4': props.size === AntKeycapSize.xs,
  };
});
const iconClasses = computed(() => {
  switch (props.size) {
    case AntKeycapSize.md:
      return IconSize.md
    case AntKeycapSize.sm:
      return IconSize.sm
    default:
      return IconSize.xs;
  }
});
</script>

<template>
  <span
    class="inline-flex justify-center items-center bg-neutral-300 rounded-sm text-center text-neutral-300-font font-medium"
    :class="classes"
  >
    <AntIcon
      v-if="icon"
      :icon="icon"
      :size="iconClasses"
    />

    <slot v-else/>
  </span>
</template>
