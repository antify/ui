<script lang="ts" setup>
import {
  ref, useSlots, watch,
} from 'vue';
import {
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AntButton from './buttons/AntButton.vue';
import AntSkeleton from './AntSkeleton.vue';

const emit = defineEmits([
  'update:open',
  'close',
]);
const props = withDefaults(defineProps<{
  title: string;
  open: boolean;
  fullscreen?: boolean;
  padding?: boolean;
  skeleton?: boolean;
}>(), {
  fullscreen: false,
  padding: false,
  skeleton: false,
});
const openModal = ref(props.open);
const openBackground = ref(props.open);

watch(() => props.open, (val) => {
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  if (val) {
    openBackground.value = true;
    setTimeout(() => openModal.value = true, props.fullscreen ? 0 : 100);
    document.addEventListener('keydown', onKeydown);
  } else {
    openModal.value = false;
    setTimeout(() => openBackground.value = false, props.fullscreen ? 0 : 100);
    document.removeEventListener('keydown', onKeydown);
  }
});

function closeModal() {
  emit('update:open', false);
  emit('close');
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="openBackground"
      class="absolute inset-0 flex items-center justify-center z-[80] cursor-pointer overflow-hidden"
      :class="{'bg-black/50 backdrop-blur-sm': !fullscreen}"
      @click.self="closeModal"
    >
      <Transition :name="!fullscreen ? 'bounce' : 'bounce-slow'">
        <div
          v-if="openModal"
          class="flex flex-col gap-px bg-base-300 overflow-hidden cursor-auto"
          :class="{'w-full h-full': fullscreen, 'border border-base-300 rounded-md shadow-md': !fullscreen}"
        >
          <div
            class="bg-white p-2 flex items-center justify-between"
          >
            <slot name="title">
              <div class="relative text-for-white-bg-font text-lg font-medium">
                {{ title }}
                <AntSkeleton
                  v-if="skeleton"
                  absolute
                  rounded
                />
              </div>
            </slot>

            <AntButton
              :skeleton="skeleton"
              :icon-left="faXmark"
              @click="closeModal"
            />
          </div>

          <div
            class="bg-white text-for-white-bg-font grow overflow-y-auto"
            :class="{'p-2': padding}"
          >
            <slot />
          </div>

          <div
            v-if="useSlots()['footer'] || false"
            class="bg-white p-2 text-for-white-bg-font"
          >
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .4s;
}

.bounce-leave-active {
  animation: bounce-in .4s reverse;
}

.bounce-slow-enter-active {
  animation: bounce-in .6s;
}

.bounce-slow-leave-active {
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
