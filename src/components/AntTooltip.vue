<script lang="ts" setup>
import {computed, onMounted, ref, getCurrentInstance} from 'vue';
import {handleEnumValidation} from '../handler';
import {InputState, Position} from '../enums';
import {classesToObjectSyntax} from '../utils';
import {hasSlotContent} from '../utils';

const props = withDefaults(defineProps<{
  position?: Position
  tooltipClasses?: string | Record<string, boolean>
  state?: InputState
  expanded?: boolean
  delay?: number
}>(), {
  position: Position.left,
  tooltipClasses: '',
  state: InputState.base,
  expanded: false,
  delay: 800
});
const visible = ref(false);
const _tooltipClasses = computed(() => ({
  'absolute w-max inline-flex': true,
  // Position
  'bottom-full pb-3.5': props.position === Position.top,
  'top-full pt-3.5': props.position === Position.bottom,
  'right-full pr-3.5': props.position === Position.left,
  'left-full pl-3.5': props.position === Position.right,
  ...classesToObjectSyntax(props.tooltipClasses)
}));
const classes = computed(() => ({
  'z-10 absolute flex': true,
  'top-0 left-0 right-0 -m-[2px] justify-center': props.position === Position.bottom,
  'bottom-0 left-0 right-0 -m-[2px] justify-center': props.position === Position.top,
  'top-0 left-0 bottom-0 -ml-[2.2px] items-center': props.position === Position.right,
  'top-0 right-0 bottom-0 -mr-[2.2px] items-center': props.position === Position.left,
}));
const itemContainerClasses = computed(() => ({
  'relative flex items-center': true,
  'justify-center': props.position === Position.bottom,
  'justify-center rotate-180': props.position === Position.top,
  'justify-center -rotate-90': props.position === Position.right,
  'justify-center rotate-90': props.position === Position.left,
}));
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
const timeout = ref<number | undefined>();
const clickLock = ref(false);
const uuid = ref(getCurrentInstance()?.uid);

onMounted(() => {
  handleEnumValidation(props.position, Position, 'position');
  handleEnumValidation(props.state, InputState, 'state');
});

function onMouseOver() {
  if (visible.value || clickLock.value) {
    return;
  }

  /**
   * To prevent buggy behavior when hovering over multiple tooltips in quick succession,
   * we clear the timeout before setting a new one.
   */
  clearTimeout(timeout.value);

  timeout.value = setTimeout(() => visible.value = true, props.delay) as unknown as number;
}

function onMouseLeave() {
  clearTimeout(timeout.value);

  visible.value = false;
  clickLock.value = false;
}

function onClick() {
  clearTimeout(timeout.value);

  visible.value = false;
  clickLock.value = true;
}
</script>

<template>
  <div
    :key="uuid"
    class="relative justify-center items-center"
    :class="{'flex w-full': props.expanded, 'inline-flex': !props.expanded}"
    data-e2e="tooltip"
    @mouseover="() => onMouseOver()"
    @mouseleave="() => onMouseLeave()"
  >
    <div
      class="w-full"
      @click="() => onClick()"
    >
      <slot/>
    </div>

    <div
      v-if="visible && hasSlotContent($slots.content)"
      :class="_tooltipClasses"
    >
      <div
        class="shadow-lg text-sm relative"
      >
        <div
          :class="classes"
        >
          <div
            :class="itemContainerClasses"
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

        <div
          class="p-2 rounded-md border"
          :class="contentClasses"
        >
          <slot name="content"/>
        </div>
      </div>
    </div>
  </div>
</template>
