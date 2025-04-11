<script lang="ts" setup>
import {
  computed, onBeforeUnmount, onMounted, ref,
} from 'vue';
import AntField from '../forms/AntField.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  InputState, State,
} from '../../enums';
import {
  handleEnumValidation,
} from '../../handler';
import {
  faImage, faMultiply, faUpload,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../AntIcon.vue';
import {
  IconSize,
} from '../__types';
import AntButton from '../buttons/AntButton.vue';
import AntSpinner from '../AntSpinner.vue';
import AntInputDescription from './Elements/AntInputDescription.vue';
import AntSkeleton from '../AntSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  src: string | null;
  loading?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  skeleton?: boolean;
  wrapperClass?: string | Record<string, boolean>;
  messages?: string[];
  expanded?: boolean;
}>(), {
  state: InputState.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  messages: () => [],
  expanded: true,
  loading: false,
});
const emit = defineEmits([
  'validate',
  'upload',
  'remove',
]);
const descriptionFontSize = computed(() => {
  if (props.size === Size.xs2 || props.size === Size.xs) {
    return Size.xs;
  }

  return Size.sm;
});
const fileInput = ref<HTMLInputElement | null>(null);

const openFileDialog = () => {
  fileInput.value?.click();
};

const isDragging = ref<boolean>(false);
const isDraggingOverDropZone = ref<boolean>(false);

const dropZoneClasses = computed(() => {
  return {
    'h-full w-full border-2 border-transparent rounded overflow-y-auto p-2 -top-2 -left-2': true,
    'border-primary-500!': isDraggingOverDropZone.value,
    'border-dashed border-base-300!': isDragging.value,
  };
});

const handleDragOver = () => {
  isDraggingOverDropZone.value = true;
};

const handleDragEnter = () => {
  isDraggingOverDropZone.value = true;
};

const handleDragLeave = () => {
  isDraggingOverDropZone.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDraggingOverDropZone.value = false;
  isDragging.value = false;

  if(!event.dataTransfer) {
    return;
  }

  const file = event.dataTransfer.files?.[0];

  if(file) {
    emit('upload', file as File);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    emit('upload', file as File);
  }
};

const handleDragOverBody = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeaveBody = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

const handleDropBody = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');

  document.body.addEventListener('dragover', handleDragOverBody);
  document.body.addEventListener('dragleave', handleDragLeaveBody);
  document.body.addEventListener('drop', handleDropBody);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('dragover', handleDragOverBody);
  document.body.removeEventListener('dragleave', handleDragLeaveBody);
  document.body.removeEventListener('drop', handleDropBody);
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :state="state"
    :messages="messages"
    :expanded="expanded"
  >
    <div
      class="flex gap-2.5 w-full"
      :class="{'cursor-pointer': !disabled && !skeleton}"
    >
      <div>
        <div class="h-[70px] w-[70px] bg-gray-100 rounded-full overflow-hidden flex items-center justify-center relative">
          <img
            v-if="src && !skeleton"
            :src="src"
            alt="Image"
            class="h-full w-full object-cover"
          >

          <AntIcon
            v-else
            class="text-base-300"
            :size="IconSize.xl3"
            :icon="faImage"
          />

          <div
            v-if="loading"
            class="absolute flex items-center justify-center inset-0 bg-base-600/50 rounded-full"
          >
            <AntSpinner
              :state="State.primary"
            />
          </div>

          <AntSkeleton
            v-if="skeleton"
            absolute
            rounded-full
          />
        </div>
      </div>

      <div class="flex flex-col gap-2.5 w-full">
        <div class="flex items-center relative w-full justify-between gap-2">
          <div class="relative w-full h-full flex items-center">
            <input
              v-if="!disabled && !skeleton"
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            >

            <span class="text-sm text-for-white-bg-font relative">
              Upload Image

              <AntSkeleton
                v-if="skeleton"
                absolute
                rounded
              />
            </span>

            <div
              class="absolute top-0 left-0 w-full h-full border bg-transparent"
              :class="dropZoneClasses"
              @drop.prevent="handleDrop"
              @dragenter.prevent="handleDragEnter"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
            />
          </div>

          <AntButton
            v-if="src"
            :size="Size.lg"
            :icon-left="faMultiply"
            :skeleton="skeleton"
            :disabled="disabled"
            @click.prevent="() => {
              emit('remove');
            }"
          >
            <template #tooltip-content>
              Remove image
            </template>
          </AntButton>

          <AntButton
            v-else
            :size="Size.lg"
            :icon-left="faUpload"
            :skeleton="skeleton"
            :disabled="disabled"
            @click="openFileDialog"
          >
            <template #tooltip-content>
              Upload image
            </template>
          </AntButton>
        </div>

        <AntInputDescription
          v-if="description"
          :skeleton="skeleton"
          :size="descriptionFontSize"
          :state="state"
        >
          {{ description }}
        </AntInputDescription>
      </div>
    </div>
  </AntField>
</template>
