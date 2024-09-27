<script lang="ts" setup>
import {computed, ref} from 'vue';
import {classesToObjectSyntax} from '../utils';
import {vOnClickOutside} from '@vueuse/components';
import {onKeyStroke} from '@vueuse/core';
import {autoUpdate, flip, offset, useFloating, shift} from "@floating-ui/vue";

const props = withDefaults(defineProps<{
  showDropdown: boolean,
  dropdownClasses?: string | Record<string, boolean>,
  contentPadding?: boolean
}>(), {
  showDropdown: false,
  contentPadding: true,
  dropdownClasses: '',
});
const emit = defineEmits(['update:showDropdown']);

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const {floatingStyles} = useFloating(reference, floating, {
  transform: false,
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    shift(),
    flip({
      fallbackPlacements: ['top-start'],
    }),
  ]
});

const _dropdownClasses = computed(() => ({
  'absolute min-w-[10rem]': true,
  ...classesToObjectSyntax(props.dropdownClasses)
}));

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (props.showDropdown) {
    e.preventDefault();
    emit('update:showDropdown', false);
  }
});

const onClickOutside = [
  (ev) => {
    emit('update:showDropdown', false);
  },
  {
    ignore: [reference]
  }
]
</script>

<template>
  <div
    class="relative inline-flex justify-center items-end z-40"
    data-e2e="dropdown"
  >
    <div
      ref="reference"
      @click="() => props.showDropdown ? emit('update:showDropdown', false) : emit('update:showDropdown', true)"
    >
      <slot/>
    </div>

    <Transition name="bounce">
      <teleport to="body">
        <div
          v-on-click-outside="onClickOutside"
          v-if="showDropdown"
          :class="_dropdownClasses"
          ref="floating"
          :style="floatingStyles"
        >
          <div
            class="shadow-lg border border-neutral-300 rounded-md text-sm relative inline-flex flex-col bg-white text-for-white-bg-font w-full"
            :class="{'p-2': contentPadding}"
          >
            <slot name="content"/>
          </div>
        </div>
      </teleport>
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
