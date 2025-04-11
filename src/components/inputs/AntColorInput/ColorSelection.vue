<script lang="ts" setup>
import {
  Size,
} from '../../../enums';
import Color from './Color.vue';
import {
  ColorInputSize,
} from './AntColorInput.types';
import {
  nextTick, onMounted, ref,
} from 'vue';

defineEmits([
  'select',
]);

withDefaults(defineProps<{
  // The selected color value
  value: string | null;
  colors: string[];
  size?: Size;
}>(), {
  size: Size.md,
});

const colorButtonRefs = ref<HTMLButtonElement[]>([]);

onMounted(() => {
  // Set focus to the first item in the colors list
  setTimeout(() => {
    colorButtonRefs.value[0].buttonRef?.focus();
  }, 50);
});
</script>

<template>
  <div
    class="grid grid-cols-4 gap-1.5"
    :class="{
      'p-1': size === Size.xs2,
      'p-1.5': size === Size.xs || size === Size.sm,
      'p-2': size === Size.md,
      'p-2.5': size === Size.lg,
    }"
  >
    <Color
      v-for="(color, index) in colors"
      :key="color"
      :ref="(val) => colorButtonRefs[index] = val"
      :value="color"
      :selected="color === value"
      :size="ColorInputSize.xl2"
      @select="(val) => $emit('select', val)"
    />
  </div>
</template>
