<script lang="ts" setup>
import {computed, ref} from 'vue';
import {Position} from '../enums/Position.enum';
import {classesToObjectSyntax} from '../utils';
import {arrow, autoUpdate, flip, offset, useFloating, shift, limitShift} from "@floating-ui/vue";
import {vOnClickOutside} from '@vueuse/components';
import {onKeyStroke} from "@vueuse/core";

const props = withDefaults(defineProps<{
  showPopover: boolean,
  title?: string,
  isClickable?: boolean,
  popoverClasses?: string | Record<string, boolean>
}>(), {
  isClickable: true,
  showPopover: false,
  preferredPosition: Position.top,
  popoverClasses: ''
});

const emit = defineEmits(['update:showPopover']);

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const floatingArrow = ref<HTMLElement | null>(null);

const {floatingStyles, middlewareData, placement} = useFloating(reference, floating, {
  transform: false,
  placement: 'right',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(() => 16),
    shift({
      limiter: limitShift({
        offset: {
          mainAxis: 62,
        }
      }),
    }),
    flip({
      fallbackPlacements: ['top', 'bottom', 'left'],
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

const _popoverClasses = computed(() => ({
  'z-[90] min-w-[10rem]': true,
  ...classesToObjectSyntax(props.popoverClasses)
}));
const itemContainerClasses = computed(() => ({
  'relative flex items-center justify-center': true,
}));

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (props.showPopover) {
    e.preventDefault();
    emit('update:showPopover', false);
  }
});

const onClickOutside = [
  (ev) => {
    emit('update:showPopover', false);
  },
  {
    ignore: [floating]
  }
]
</script>

<template>
  <div class="relative inline-flex justify-center items-end">
    <div
      v-on-click-outside="onClickOutside"
      ref="reference"
    >
      <slot/>
    </div>

    <Transition name="bounce">
      <template v-if="showPopover">
        <teleport to="body">
          <div
            :class="_popoverClasses"
            ref="floating"
            :style="floatingStyles"
          >
            <div class="shadow-lg border-neutral-300 rounded-md text-sm relative inline-flex flex-col">

              <div
                class="border-neutral-300 border-b p-2 bg-neutral-100 rounded-t-md border-t border-l border-r text-neutral-100-font font-semibold"
              >
                <slot name="title">
                  {{ title }}
                </slot>
              </div>

              <div
                class="p-2 rounded-b-md text-for-white-bg-font border-neutral-300 border-l border-b border-r bg-white"
              >
                <slot name="content"/>
              </div>
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
            [staticSide]: '-2.5px',
            transform: arrowTransform
            }"
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
                    :class="{'fill-neutral-100': placement === Position.bottom, 'fill-white': placement === Position.top || placement === Position.right || placement === Position.left}"
                  />

                  <path
                    d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7L34.5 7Z"
                    :class="{'stroke-neutral-100': placement === Position.bottom, 'stroke-white': placement === Position.top || placement === Position.right || placement === Position.left}"
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
          </div>
        </teleport>
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
