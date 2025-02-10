<script lang="ts" setup>
import {
  onMounted, computed,
} from 'vue';
import {
  Size,
} from '../../enums/Size.enum';
import AntInputLabel from '../inputs/Elements/AntInputLabel.vue';
import AntInputDescription from '../inputs/Elements/AntInputDescription.vue';
import {
  handleEnumValidation,
} from '../../handler';
import AntInputLimiter from '../inputs/Elements/AntInputLimiter.vue';
import {
  InputState,
} from '../../enums';

defineEmits([
  'clickLabel',
  'validate',
]);

const props = withDefaults(defineProps<{
  label?: string;
  description?: string;
  messages?: string[];
  size?: Size;
  state?: InputState;
  skeleton?: boolean;
  limiterValue?: number;
  limiterMaxValue?: number;
  labelFor?: string;
  expanded?: boolean;
  expandedHeight?: boolean;
}>(), {
  state: InputState.base,
  skeleton: false,
  size: Size.md,
  messages: () => [],
  expanded: true,
  expandedHeight: false,
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});

const _state = computed(() => props.messages.length <= 0 ? InputState.base : props.state);
const fontSize = computed(() => {
  if (props.size === Size.xs2 || props.size === Size.xs) {
    return Size.xs;
  }

  return Size.sm;
});
const fieldClasses = computed(() => ({
  'w-full': props.expanded,
  'gap-2.5': props.size === Size.lg,
  'gap-2': props.size === Size.md,
  'gap-1.5': (props.size === Size.sm || props.size === Size.xs),
  'gap-1': props.size === Size.xs2,
  'h-full': props.expandedHeight,
  'h-fit': !props.expandedHeight,
}));
const descriptionClasses = computed(() => ({
  'gap-2.5': props.size === Size.lg,
  'gap-2': props.size === Size.md,
  'gap-1.5': (props.size === Size.sm || props.size === Size.xs),
  'gap-1': props.size === Size.xs2,
}));
</script>

<template>
  <div
    class="flex flex-col items-start"
    :class="fieldClasses"
  >
    <AntInputLabel
      :label="label"
      :size="size"
      :skeleton="skeleton"
      :for="labelFor"
      class="h-full"
      @click-content="$emit('clickLabel')"
    >
      <div class="w-full h-full">
        <slot />
      </div>
    </AntInputLabel>

    <div
      v-if="description || messages.length > 0 || (limiterMaxValue !== undefined && limiterValue !== undefined)"
      class="flex justify-between w-full"
      :class="descriptionClasses"
    >
      <AntInputDescription
        v-if="description || messages.length > 0"
        :size="fontSize"
        :skeleton="skeleton"
        :state="_state"
      >
        <slot name="description">
          <template v-if="_state !== InputState.base && messages.length === 1">
            {{ messages[0] }}
          </template>

          <template v-else-if="_state !== InputState.base && messages.length > 1">
            <ul class="list-disc list-outside pl-4">
              <li
                v-for="(message, index) of messages"
                :key="`field-message-${index}`"
                class="marker:m-none marker:p-none"
              >
                {{ message }}
              </li>
            </ul>
          </template>

          <template v-else>
            {{ description }}
          </template>
        </slot>
      </AntInputDescription>

      <div
        v-if="limiterMaxValue !== undefined && limiterValue !== undefined"
        class="flex grow justify-end"
      >
        <AntInputLimiter
          :value="limiterValue"
          :max-value="limiterMaxValue"
          :size="fontSize"
          :skeleton="skeleton"
        />
      </div>
    </div>
  </div>
</template>
