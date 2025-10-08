<script lang="ts" setup>
import {
  ref,
  useSlots,
  onMounted,
} from 'vue';
import {
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AntButton from './AntButton.vue';
import AntSkeleton from './AntSkeleton.vue';

const emit = defineEmits([
  'close',
]);
const props = withDefaults(defineProps<{
  title: string;
  fullscreen?: boolean;
  padding?: boolean;
  skeleton?: boolean;
}>(), {
  fullscreen: false,
  padding: false,
  skeleton: false,
});
const openModal = ref(false);
const openBackground = ref(false);

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  openModal.value = false;

  setTimeout(() => openBackground.value = false, props.fullscreen ? 0 : 100);
  document.removeEventListener('keydown', onKeydown);

  setTimeout(
    () => {
      emit('close');
    },
    //  Wait finishing the close animation
    400,
  );
}

defineExpose({
  close: closeModal,
});

onMounted(() => {
  openBackground.value = true;
  setTimeout(() => openModal.value = true, props.fullscreen ? 0 : 100);
  document.addEventListener('keydown', onKeydown);
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="openBackground"
      class="absolute inset-0 flex items-center justify-center z-[80] cursor-pointer overflow-hidden"
      :class="{'bg-black/50 backdrop-blur-xs': !fullscreen}"
      @click.self="closeModal"
    >
      <Transition :name="!fullscreen ? 'bounce' : 'bounce-slow'">
        <div
          v-if="openModal"
          class="flex flex-col gap-px bg-base-300 overflow-hidden cursor-auto"
          :class="{'w-full h-full': fullscreen, 'border border-base-300 rounded-md shadow-md': !fullscreen}"
        >
          <div
            class="bg-white p-2 flex items-center justify-between gap-2"
          >
            <slot name="title">
              <div class="text-for-white-bg-font text-lg font-medium">
                <AntSkeleton
                  :visible="skeleton"
                  rounded
                >
                  {{ title }}
                </AntSkeleton>
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
