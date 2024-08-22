<script lang="ts" setup>
/**
 * TODO:: Emit if there's enough space for the dropdown content. If not, reposition it automatically like the
 * browsers select dropdown content does.
 * TODO:: Known issue: open dropdown, click between button and dropdown. Dropdown will not click.
 * The v-on-click-outside does not trigger, because it think it's the dropdown itself.
 * Solution is using margin only (calc(50% + 0.625rem)) and not padding.
 */
import {computed, onMounted} from 'vue';
import {handleEnumValidation} from '../handler';
import {Position} from '../enums';
import {classesToObjectSyntax} from '../utils';
import {vOnClickOutside} from '@vueuse/components';
import {onKeyStroke} from '@vueuse/core';

const props = withDefaults(defineProps<{
  showDropdown: boolean,
  position?: Position,
  dropdownClasses?: string | Record<string, boolean>,
  contentPadding?: boolean
}>(), {
  showDropdown: false,
  contentPadding: true,
  position: Position.bottom,
  dropdownClasses: '',
});
const emit = defineEmits(['update:showDropdown']);

const _dropdownClasses = computed(() => ({
  'absolute min-w-[10rem]': true,
  'bottom-0 left-0 mb-[50%] pb-2.5': props.position === Position.top,
  'top-0 left-0 mt-[50%] pt-2.5': props.position === Position.bottom,
  'right-0 top-0 mr-[100%] pr-2.5': props.position === Position.left,
  'left-0 top-0 ml-[100%] pl-2.5': props.position === Position.right,
  ...classesToObjectSyntax(props.dropdownClasses)
}));

onMounted(() => {
  handleEnumValidation(props.position, Position, 'Position');
});
onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (props.showDropdown) {
    e.preventDefault();
    emit('update:showDropdown', false);
  }
});

function onClickOutside() {
  emit('update:showDropdown', false);
}
</script>

<template>
  <div
    v-on-click-outside="onClickOutside"
    class="relative inline-flex justify-center items-end z-40"
    data-e2e="dropdown"
  >
    <slot/>

    <Transition name="bounce">
      <div
        v-if="showDropdown"
        :class="_dropdownClasses"
      >
        <div
          class="shadow-lg border border-neutral-300 rounded-md text-sm relative inline-flex flex-col relative bg-white text-for-white-bg-font w-full"
          :class="{'p-2': contentPadding}"
        >
          <slot name="content"/>
        </div>
      </div>
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
