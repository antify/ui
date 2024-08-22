<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {handleEnumValidation} from '../handler';
import {Position} from '../enums/Position.enum';
import {classesToObjectSyntax} from '../utils';

const props = withDefaults(defineProps<{
  showPopover: boolean,
  title?: string,
  position?: Position,
  popoverClasses?: string | Record<string, boolean>
}>(), {
  showPopover: false,
  position: Position.left,
  popoverClasses: ''
});
const _popoverClasses = computed(() => ({
  'absolute min-w-[10rem]': true,
  'bottom-0 mb-[50%] pb-3.5': props.position === Position.top,
  'top-0 mt-[50%] pt-3.5': props.position === Position.bottom,
  'right-0 mr-[100%] pr-3.5': props.position === Position.left,
  'left-0 ml-[100%] pl-3.5': props.position === Position.right,
  ...classesToObjectSyntax(props.popoverClasses)
}));
const classes = computed(() => ({
  'z-10 absolute flex': true,
  'top-0 left-0 right-0 -m-[2.5px] justify-center': props.position === Position.bottom,
  'bottom-0 left-0 right-0 -m-[2.5px] justify-center': props.position === Position.top,
  'top-0 left-0 bottom-0 -ml-[2.5px]  items-end pb-1': props.position === Position.right,
  'top-0 right-0 bottom-0 -mr-[2.5px] items-end pb-1': props.position === Position.left,
}));
const itemContainerClasses = computed(() => ({
  'relative flex items-center': true,
  'justify-center': props.position === Position.bottom,
  'justify-center rotate-180': props.position === Position.top,
  'justify-start -rotate-90': props.position === Position.right,
  'justify-end rotate-90': props.position === Position.left,
}));

onMounted(() => {
  handleEnumValidation(props.position, Position, 'Position');
});
</script>

<template>
  <div class="relative inline-flex justify-center items-end">
    <slot/>

    <Transition name="bounce">
      <template v-if="showPopover">
        <div :class="_popoverClasses">
          <div class="shadow-lg border-neutral-300 rounded-md text-sm relative inline-flex flex-col relative">
            <div
              :class="classes"
            >
              <div
                :class="itemContainerClasses"
              >
                <svg
                  class="absolute mt-[.5px]"
                  width="35"
                  height="8"
                  viewBox="0 0 35 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.3284 1.82843L23.1569 4.65685C24.6571 6.15715 26.692 7 28.8137 7L6.18629 7C8.30802 7 10.3429 6.15715 11.8431 4.65686L14.6716 1.82843C16.2337 0.266331 18.7663 0.266328 20.3284 1.82843Z"
                    :class="{'fill-neutral-100': position === Position.bottom, 'fill-white': position === Position.top || position === Position.right || position === Position.left}"
                  />

                  <path
                    d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7L34.5 7Z"
                    :class="{'stroke-neutral-100': position === Position.bottom, 'stroke-white': position === Position.top || position === Position.right || position === Position.left}"
                  />
                </svg>

                <svg
                  class="absolute"
                  width="35"
                  height="8"
                  viewBox="0 0 35 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7"
                    class="stroke-neutral-300"
                  />
                </svg>
              </div>
            </div>

            <div
              class="border-neutral-300 border-b p-2 bg-neutral-100 rounded-t-md border-t border-l border-r text-neutral-100-font font-semibold"
            >
              {{ title }}
            </div>

            <div
              class="p-2 rounded-b-md text-for-white-bg-font border-neutral-300 border-l border-b border-r bg-white"
            >
              <slot name="content"/>
            </div>
          </div>
        </div>
      </template>
    </Transition>
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .4s;
}

.bounce-leave-active {
  animation: bounce-in .4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
