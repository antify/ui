<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import AntField from '../forms/AntField.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  InputState, State,
} from '../../enums';
import {
  useVModel,
} from '@vueuse/core';
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
  modelValue: string | null;
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
  'update:modelValue',
  'validate',
]);
const _modelValue = useVModel(props, 'modelValue', emit);
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

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      emit('update:modelValue', reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');
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
            v-if="_modelValue && !skeleton"
            :src="_modelValue"
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
        <div class="flex items-center relative w-full justify-between">
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

          <AntButton
            v-if="_modelValue"
            :size="Size.lg"
            :icon-left="faMultiply"
            :skeleton="skeleton"
            :disabled="disabled"
            @click.prevent="() => _modelValue = null"
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
