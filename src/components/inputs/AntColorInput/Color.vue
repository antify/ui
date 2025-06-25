<script lang="ts" setup>
import {
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../../AntIcon.vue';
import {
  ColorInputSize,
} from './AntColorInput.types';
import {
  computed, ref,
} from 'vue';

defineEmits([
  'select',
]);

const props = withDefaults(defineProps<{
  /**
   * Value needs to be a variable name which exists in
   * document computed style as CSS variable like --color-{value}
   */
  value: string | null;
  selected?: boolean;
  size?: ColorInputSize;
  readonly?: boolean;
}>(), {
  selected: false,
  size: ColorInputSize.xl,
  readonly: false,
});

const buttonRef = ref<HTMLButtonElement | null>(null);

defineExpose({
  buttonRef: buttonRef,
});

const buttonClasses = computed(() => ({
  'rounded-sm cursor-pointer flex items-center justify-center': true,
  'h-4 w-4': [
    ColorInputSize.xs,
    ColorInputSize.xs2,
  ].includes(props.size),
  'h-5 w-5': [
    ColorInputSize.lg,
    ColorInputSize.md,
    ColorInputSize.sm,
  ].includes(props.size),
  'h-8 w-8': ColorInputSize.xl === props.size,
  'h-10 w-10': ColorInputSize.xl2 === props.size,
}));

const iconClasses = computed(() => {
  const colorIntensity = Number(props.value?.split('-')[1]);

  if(!colorIntensity) {
    return 'text-white!';
  }

  return colorIntensity < 500 ? 'text-black!' : 'text-white!';
});
</script>

<template>
  <button
    ref="buttonRef"
    :data-e2e-color="value"
    :class="buttonClasses"
    :style="{
      backgroundColor: `var(--color-${value})`,
      outlineColor: `var(--color-${value})`,
    }"
    :tabindex="readonly ? -1 : 0"
    @click.prevent="$emit('select', value)"
  >
    <AntIcon
      v-if="selected"
      :icon="faCheck"
      :class="iconClasses"
    />
  </button>
</template>
