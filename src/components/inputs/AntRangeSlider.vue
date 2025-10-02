<script setup lang="ts">
import AntField from '../forms/AntField.vue';
import AntTooltip from '../AntTooltip.vue';
import {
  useVModel,
} from '@vueuse/core';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  State, Size,
} from '../../enums';
import {
  handleEnumValidation,
} from '../../handler';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'validate',
  'blur',
]);
const props = withDefaults(defineProps<{
  modelValue: number | null;
  label?: string;
  description?: string;
  state?: State;
  size?: Size;
  disabled?: boolean;
  skeleton?: boolean;
  min?: number;
  max?: number;
  steps?: number;
  messages?: string[];
}>(), {
  state: State.base,
  size: Size.md,
  disabled: false,
  skeleton: false,
  messages: () => [],
  min: 0,
  max: 100,
  steps: undefined,
});

const _modelValue = useVModel(props, 'modelValue', emit);

const thumbClasses = computed(() => {
  const borders: Record<State, string> = {
    [State.base]: 'hover:border-base-500',
    [State.primary]: 'hover:border-primary-500',
    [State.secondary]: 'hover:border-secondary-500',
    [State.danger]: 'hover:border-danger-500',
    [State.info]: 'hover:border-info-500',
    [State.success]: 'hover:border-success-500',
    [State.warning]: 'hover:border-warning-500',
  };

  return {
    'absolute -translate-y-[50%] top-1/2 h-[16px] w-[16px] bg-base-50 border-2 border-base-300 rounded-full cursor-pointer': true,
    [borders[props.state]]: true,
  };
});

const progressClasses = computed(() => {
  const variants: Record<State, string> = {
    [State.base]: 'bg-base-500',
    [State.primary]: 'bg-primary-500',
    [State.secondary]: 'bg-secondary-500',
    [State.danger]: 'bg-danger-500',
    [State.info]: 'bg-info-500',
    [State.success]: 'bg-success-500',
    [State.warning]: 'bg-warning-500',
  };

  return {
    [variants[props.state]]: true,
  };
});

const sliderRef = ref<HTMLElement | null>(null);
const sliderWidth = ref(0);
const isDragging = ref(false);

// Pixelposition (Thumb auf der Leiste)
const xPosition = ref(0);
// Startwerte beim Klick
const initialMouseX = ref(0);
const startXPosition = ref(0);

// -------------------------------
// Mapping: Pixel ↔ Wert
// -------------------------------
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const value = computed({
  get: () => {
    if (sliderWidth.value === 0) {
      return props.min;
    }

    const ratio = xPosition.value / sliderWidth.value;
    const raw = props.min + ratio * (props.max - props.min);

    return Math.round(clamp(raw, props.min, props.max));
  },
  set: (val: number | null) => {
    if (val === null || sliderWidth.value === 0) {
      return;
    }

    const clampedVal = clamp(val, props.min, props.max);
    const ratio = (clampedVal - props.min) / (props.max - props.min);
    xPosition.value = ratio * sliderWidth.value;
  },
});

// binde computed-Wert an modelValue
watch(value, (val) => {
  _modelValue.value = val;
});
watch(_modelValue, (val) => {
  if (val != null) value.value = val;
});

// -------------------------------
// Maus-Events
// -------------------------------
const onMouseDownThumb = (e: MouseEvent) => {
  if (props.disabled) return;
  isDragging.value = true;
  initialMouseX.value = e.clientX;
  startXPosition.value = xPosition.value;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  let newX = startXPosition.value + (e.clientX - initialMouseX.value);
  // clamp zwischen 0 und sliderWidth
  newX = Math.max(0, Math.min(newX, sliderWidth.value));
  xPosition.value = newX;
};

const onMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

// -------------------------------
// Setup
// -------------------------------
onMounted(() => {
  handleEnumValidation(props.state, State, 'state');
  handleEnumValidation(props.size, Size, 'size');

  if (sliderRef.value) {
    sliderWidth.value = sliderRef.value.offsetWidth - 16;
  }

  // init position aus modelValue
  if (_modelValue.value != null) {
    value.value = _modelValue.value;
  }
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :messages="messages"
  >
    <div class="flex flex-col gap-2">
      <div
        ref="sliderRef"
        class="relative w-full"
      >
        <!-- Track -->
        <div class="w-full h-[8px] bg-base-300 rounded-md" />
        <!-- Progress -->
        <div
          class="absolute h-[8px] rounded-md top-0 left-0"
          :class="progressClasses"
          :style="{ width: `${xPosition + 8}px` }"
        />
        <!-- Thumb -->
        <div
          :class="thumbClasses"
          :style="{ left: `${xPosition}px` }"
          @mousedown="onMouseDownThumb"
        />
      </div>

      <div
        v-if="steps > 0"
        class="flex px-1.5"
        :class="{
          'justify-center': steps === 1,
          'justify-between': steps > 1,
        }"
      >
        <div
          v-for="(step, index) in Array.from({
            length: steps,
          })"
          :key="index"
          class="bg-base-200 border border-base-300 h-[10px] w-[3px] rounded-md"
        />
      </div>
    </div>

    <!-- Debug -->
    <pre>Value: {{ value }}</pre>
    <pre>xPosition: {{ xPosition }}</pre>
    <pre>modelValue: {{ _modelValue }}</pre>
  </AntField>
</template>
