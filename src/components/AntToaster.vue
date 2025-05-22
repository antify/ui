<script lang="ts" setup>
import {
  computed,
} from 'vue';
import AntToast from './AntToast.vue';
import {
  CornerPosition,
} from '../enums/Position.enum';
import type {
  Toast,
} from '../components/__types';

defineEmits([
  'close',
]);

const props = withDefaults(defineProps<{
  position?: CornerPosition;
  toasts: Toast[];
}>(), {
  position: CornerPosition.bottomLeft,
});

const _toasts = computed(() => {
  if(props.position === CornerPosition.topLeft || props.position === CornerPosition.topRight) {
    return props.toasts;
  }

  return [
    ...props.toasts,
  ].reverse();
});

const transitionName = computed(() => {
  if(props.position === CornerPosition.topLeft || props.position === CornerPosition.topRight) {
    return 'list-top';
  }

  return 'list-bottom';
});

const classes = computed(() => ({
  'left-0 top-0 items-start': props.position === CornerPosition.topLeft,
  'left-0 top-0 items-center': props.position === CornerPosition.topCenter,
  'right-0 top-0 items-end': props.position === CornerPosition.topRight,
  'left-0 bottom-0 items-start': props.position === CornerPosition.bottomLeft,
  'left-0 bottom-0 items-center': props.position === CornerPosition.bottomCenter,
  'right-0 bottom-0 items-end': props.position === CornerPosition.bottomRight,
}));
</script>

<template>
  <div
    class="absolute flex flex-col space-y-2.5 p-2.5 z-[100]"
    :class="classes"
    data-e2e="toaster"
  >
    <TransitionGroup :name="transitionName">
      <AntToast
        v-for="toast of _toasts"
        :key="`ant-toast-${toast.id}`"
        :title="toast.title"
        :state="toast.type"
        :icon="toast.hasIcon"
        @close="() => $emit('close', toast)"
      >
        <template
          v-if="toast.content"
          #default
        >
          {{ toast.content }}
        </template>
      </AntToast>
    </TransitionGroup>
  </div>
</template>

<style>
.list-top-move, .list-bottom-move {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.list-top-enter-active,
.list-top-leave-active,
.list-bottom-enter-active,
.list-bottom-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.list-top-enter-from,
.list-top-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.list-bottom-enter-from,
.list-bottom-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.list-top-enter-to,
.list-top-leave-from,
.list-bottom-enter-to,
.list-bottom-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
