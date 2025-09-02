<script lang="ts" setup>
import {
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../../AntIcon.vue';
import {
  ColorButtonSize,
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
  size?: ColorButtonSize;
  readonly?: boolean;
}>(), {
  selected: false,
  size: ColorButtonSize.xl,
  readonly: false,
});

const buttonRef = ref<HTMLButtonElement | null>(null);

defineExpose({
  buttonRef: buttonRef,
});

const buttonClasses = computed(() => ({
  'rounded-sm cursor-pointer flex items-center justify-center': true,
  'h-5 w-5': props.size === ColorButtonSize.xs3,
  'h-6 w-6': props.size === ColorButtonSize.xs2,
  'h-7 w-7': props.size === ColorButtonSize.xs,
  'h-8 w-8': props.size === ColorButtonSize.sm,
  'h-9 w-9': props.size === ColorButtonSize.md,
  'h-10 w-10': props.size === ColorButtonSize.lg,
  'h-11 w-11': props.size === ColorButtonSize.xl,
  'h-12 w-12': props.size === ColorButtonSize.xl2,
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
