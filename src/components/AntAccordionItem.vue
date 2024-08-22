<script lang="ts" setup>
import {faAngleDown, faAngleUp, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntTransitionCollapseHeight from './transitions/AntTransitionCollapseHeight.vue';
import {IconSize} from './__types/AntIcon.types';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  label?: string;
  collapseTransition?: string;
  iconLeft: boolean;
}>(), {
  collapseTransition: 'slide',
  iconLeft: false,
});
const emit = defineEmits(['close', 'open']);

// TODO:: Stehengeblieben: delays machen
function onClick() {
  if (props.isOpen) {
    emit('close');
  } else {
    emit('open');
  }
}
</script>

<template>
  <div
    class="p-2 select-none cursor-pointer transition-colors"
    :class="{'bg-primary-500 text-primary-500-font': isOpen, 'bg-white text-for-white-bg-font': !isOpen}"
    @click="onClick"
  >
    <slot
      name="label"
      v-bind="{ isOpen: isOpen }"
    >
      <div
        class="hover:text-gray-800 flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <AntIcon
            v-if="iconLeft"
            :size="IconSize.sm"
            :icon="faQuestionCircle"
            :color="isOpen ? 'text-primary-500-font' : 'text-for-white-bg-font'"
          />

          <span class="text-sm font-semibold">
            {{ label }}
          </span>
        </div>

        <AntIcon
          :icon="isOpen ? faAngleUp : faAngleDown"
          :color="isOpen ? 'text-primary-500-font' : undefined"
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
          class="p-2 text-sm bg-white text-for-white-bg-font"
        >
          <slot/>
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
