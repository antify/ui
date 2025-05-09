<script lang="ts" setup>
import {
  faAngleDown, faAngleUp, faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntTransitionCollapseHeight from './transitions/AntTransitionCollapseHeight.vue';
import {
  IconSize,
} from './__types/AntIcon.types';
import {
  computed,
} from 'vue';
import AntSkeleton from '../components/AntSkeleton.vue';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  label?: string;
  collapseTransition?: string;
  iconLeft?: boolean;
  contentPadding?: boolean;
  activeLabelClasses?: string;
  activeIconClasses?: string;
  inactiveLabelClasses?: string;
  inactiveIconClasses?: string;
  skeleton?: boolean;
}>(), {
  collapseTransition: 'slide',
  iconLeft: false,
  contentPadding: true,
  skeleton: false,
  activeLabelClasses: 'bg-primary-500 text-primary-500-font',
  activeIconClasses: 'text-primary-500-font',
  inactiveLabelClasses: 'bg-white text-for-white-bg-font',
  inactiveIconClasses: 'text-for-white-bg-font',
});
const emit = defineEmits([
  'close',
  'open',
]);

// TODO:: Stehengeblieben: delays machen
function onClick() {
  if (props.skeleton) {
    return;
  }

  if (props.isOpen) {
    emit('close');
  } else {
    emit('open');
  }
}

const labelClasses = computed(() => ({
  [props.activeLabelClasses]: props.isOpen,
  [props.inactiveLabelClasses]: !props.isOpen,
  'cursor-pointer': !props.skeleton,
}));
</script>

<template>
  <div
    class="p-2 select-none transition-colors"
    :class="labelClasses"
    @click="onClick"
  >
    <slot
      name="label"
      v-bind="{ isOpen: isOpen }"
    >
      <div
        class="flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <slot
            name="icon-left"
            v-bind="{isOpen}"
          >
            <AntIcon
              v-if="iconLeft"
              :size="IconSize.sm"
              :icon="faQuestionCircle"
              :color="isOpen ? activeIconClasses : inactiveIconClasses"
              :skeleton="skeleton"
            />
          </slot>

          <AntSkeleton
            :visible="skeleton"
            rounded
          >
            <div class="text-sm font-semibold">
              {{ label }}
            </div>
          </AntSkeleton>
        </div>

        <AntIcon
          :icon="isOpen ? faAngleUp : faAngleDown"
          :color="isOpen ? activeIconClasses : inactiveIconClasses"
          :skeleton="skeleton"
        />
      </div>
    </slot>
  </div>

  <AntTransitionCollapseHeight>
    <div
      v-show="isOpen"
      class="bg-white overflow-hidden -mt-px"
    >
      <Transition name="bounce">
        <div
          v-show="isOpen"
          class="text-sm bg-white text-for-white-bg-font"
          :class="{'p-2': contentPadding}"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </AntTransitionCollapseHeight>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce .6s;
}

.bounce-leave-active {
  animation: bounce .6s reverse;
}

@keyframes bounce {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

.slide-enter-active {
  animation: slide 1s;
}

.slide-leave-active {
  animation: slide 1s reverse;
}

/*@keyframes slide {
  0% {
  //transform: translateY(-100%); max-height: 0; opacity: 0;
  }
  100% {
  //transform: translateY(0%); max-height: 100%; opacity: 1;
  }
}*/
</style>
