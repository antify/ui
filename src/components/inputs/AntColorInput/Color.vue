<script lang="ts" setup>
import {
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../../AntIcon.vue';
import {
  ColorInputSize,
} from './AntColorInput.types';

defineEmits([
  'select',
]);

withDefaults(defineProps<{
  /**
   * Value needs to be a variable name which exists in
   * document computed style as CSS variable like --color-{value}
   */
  value: string | null;
  selected?: boolean;
  size?: ColorInputSize;
}>(), {
  selected: false,
  size: ColorInputSize.xl,
});
</script>

<template>
  <div
    class="rounded-sm cursor-pointer flex items-center justify-center"
    :class="{
      'h-4 w-4': [ColorInputSize.xs, ColorInputSize.xs2].includes(size),
      'h-5 w-5': [ColorInputSize.lg, ColorInputSize.md, ColorInputSize.sm].includes(size),
      'h-8 w-8': ColorInputSize.xl === size,
      'h-10 w-10': ColorInputSize.xl2 === size,
    }"
    :style="{
      backgroundColor: `var(--color-${value})`,
      outlineColor: `var(--color-${value})`,
    }"
    @click="$emit('select', value)"
  >
    <AntIcon
      v-if="selected"
      :icon="faCheck"
      class="text-white"
    />
  </div>
</template>
