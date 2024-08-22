<script lang="ts" setup>
// TODO:: Fix typo KeyCap with upperchar C
import AntIcon from './AntIcon.vue';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from './__types';
import {AntKeycapSize} from './__types/AntKeycap.types';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  icon?: IconDefinition
  size: AntKeycapSize

}>(), {
  size: AntKeycapSize.sm
});

const classes = computed(() => {
  return {
    'text-sm px-px min-w-5': props.size === AntKeycapSize.sm,
    'text-2xs px-px py-0.5 min-w-[18px]': props.size === AntKeycapSize.xs,
  };
});
const iconClasses = computed(() => {
  if (props.size === AntKeycapSize.sm) {
    return IconSize.sm;
  } else {
    return IconSize.xs2;
  }
});
</script>

<template>
  <span
    class="inline-block bg-neutral-300 rounded-md text-center text-neutral-500-font font-medium"
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
