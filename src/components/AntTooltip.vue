<script lang="ts" setup>
import {computed, ref} from 'vue';
import {InputState} from '../enums';
import {arrow, autoUpdate, flip, offset, useFloating} from "@floating-ui/vue";
import {hasSlotContent} from '../utils';
import {classesToObjectSyntax} from '../utils';

const props = withDefaults(defineProps<{
  state?: InputState,
  delay?: number,
  tooltipClasses?: string | Record<string, boolean>
}>(), {
  state: InputState.base,
  delay: 600,
  tooltipClasses: '',
});

const floatOpen = ref<boolean>(false)
const clickLock = ref(false);
const timeout = ref<number | undefined>();

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const floatingArrow = ref<HTMLElement | null>(null);

const {floatingStyles, middlewareData, placement} = useFloating(reference, floating, {
  placement: 'top',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(() => 16),
    flip({
      fallbackPlacements: ['bottom', 'left', 'right'],
      fallbackAxisSideDirection: 'none',
    }),
    arrow({element: floatingArrow})
  ]
});
const side = computed(() => placement.value.split('-')[0]);
const staticSide = computed(() => {
  return {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[side.value] as string
})
const arrowTransform = computed(() => {
  if (placement.value === 'bottom') {
    return 'rotate(0deg)'
  } else if (placement.value === 'top') {
    return 'rotate(180deg)'
  } else if (placement.value === 'left') {
    return 'rotate(90deg)'
  } else {
    return 'rotate(270deg)'
  }
});
const svgPathClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'fill-white stroke-white',
    [InputState.danger]: 'fill-danger-500 stroke-danger-500',
    [InputState.info]: 'fill-info-500 stroke-info-500',
    [InputState.success]: 'fill-success-500 stroke-success-500',
    [InputState.warning]: 'fill-warning-500 stroke-warning-500',
  };

  return {[variants[props.state]]: true};
});
const arrowSvgPathClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'stroke-neutral-300',
    [InputState.danger]: 'stroke-danger-500',
    [InputState.info]: 'stroke-info-500',
    [InputState.success]: 'stroke-success-500',
    [InputState.warning]: 'stroke-warning-500',
  };

  return {[variants[props.state]]: true};
});
const contentClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-for-white-bg-font bg-white border-neutral-300',
    [InputState.danger]: 'text-danger-500-font bg-danger-500 border-danger-500',
    [InputState.info]: 'text-info-500-font bg-info-500 border-info-500',
    [InputState.success]: 'text-success-500-font bg-success-500 border-success-500',
    [InputState.warning]: 'text-warning-500-font bg-warning-500 border-warning-500',
  };

  return {[variants[props.state]]: true};
});
const _tooltipClasses = computed(() => ({
  'w-max inline-flex shadow-lg text-sm z-[90] rounded-md': true,
  ...classesToObjectSyntax(props.tooltipClasses)
}));

function onMouseOver() {
  if (floatOpen.value || clickLock.value) {
    return;
  }

  /**
   * To prevent buggy behavior when hovering over multiple tooltips in quick succession,
   * we clear the timeout before setting a new one.
   */
  clearTimeout(timeout.value);

  timeout.value = setTimeout(() => floatOpen.value = true, props.delay) as unknown as number;
}

function onMouseLeave() {
  clearTimeout(timeout.value);

  floatOpen.value = false;
  clickLock.value = false;
}

function onClick() {
  clearTimeout(timeout.value);

  floatOpen.value = false;
  clickLock.value = true;
}
</script>

<template>
  <div
    class="relative"
    data-e2e="tooltip"
  >
    <div
      ref="reference"
      @mouseenter="() => onMouseOver()"
      @mouseleave="() => onMouseLeave()"
      @click="() => onClick()"
    >
      <slot/>
    </div>

    <teleport to="body">
      <div
        v-if="floatOpen && hasSlotContent($slots.content)"
        :class="_tooltipClasses"
        ref="floating"
        :style="{
      ...floatingStyles,
        display: floatOpen
          ? 'block'
          : 'none',
        }"
        data-e2e="tooltip-content"
      >
        <div
          class="p-2 rounded-md border"
          :class="contentClasses"
        >
          <slot name="content"/>
        </div>
        <div
          class="flex items-center justify-center"
          ref="floatingArrow"
          :style="{
        position: 'absolute',
        left:
          middlewareData.arrow?.x != null
            ? `${middlewareData.arrow.x}px`
            : '',
        top:
          middlewareData.arrow?.y != null
            ? `${middlewareData.arrow.y}px`
            : '',
        [staticSide]: '-2px',
        transform: arrowTransform
      }"
        >
          <div
            class="flex items-center justify-center"
          >
            <svg
              class="absolute mt-[.5px]"
              width="30"
              height="8"
              viewBox="0 0 35 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3284 1.82843L23.1569 4.65685C24.6571 6.15715 26.692 7 28.8137 7L6.18629 7C8.30802 7 10.3429 6.15715 11.8431 4.65686L14.6716 1.82843C16.2337 0.266331 18.7663 0.266328 20.3284 1.82843Z"
                :class="svgPathClasses"
              />

              <path
                d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7L34.5 7Z"
                :class="svgPathClasses"
              />
            </svg>

            <svg
              class="absolute"
              width="30"
              height="8"
              viewBox="0 0 35 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7"
                :class="arrowSvgPathClasses"
              />
            </svg>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
