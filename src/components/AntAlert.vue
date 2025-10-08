<script lang="ts" setup>
import {
  computed, onMounted, useSlots,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  faCheckCircle,
  faCircleQuestion,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntTooltip from './AntTooltip.vue';
import AntSkeleton from './AntSkeleton.vue';
import {
  InputState,
} from '../enums';
import {
  IconSize,
} from './__types';

defineEmits([
  'close',
]);

const props = withDefaults(defineProps<{
  title?: string | null;
  state?: InputState;
  icon?: boolean;
  expanded?: boolean;
  questionMarkText?: string | null;
  skeleton?: boolean;
  dismissBtn?: boolean;
}>(), {
  title: null,
  state: InputState.base,
  icon: true,
  expanded: false,
  questionMarkText: null,
  skeleton: false,
  dismissBtn: true,
});

const icons = {
  [InputState.base]: faInfoCircle,
  [InputState.info]: faInfoCircle,
  [InputState.danger]: faExclamationCircle,
  [InputState.warning]: faExclamationTriangle,
  [InputState.success]: faCheckCircle,
};

const _icon = computed(() => icons[props.state]);
const classes = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.danger]: 'bg-danger-100 text-danger-700',
    [InputState.info]: 'bg-info-100 text-info-700',
    [InputState.base]: 'bg-base-100 text-base-100-font',
    [InputState.success]: 'bg-success-100 text-success-700',
    [InputState.warning]: 'bg-warning-100 text-warning-700',
  };

  return {
    'inline-flex flex-col gap-2 rounded-md p-2 transition-colors text-sm': true,
    'w-full': props.expanded,
    [variants[props.state]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
const hasQuestionMark = computed(() => (useSlots()['question-mark-text'] || false) || props.questionMarkText);
const iconColor = computed(() => {
  const variants = {
    [InputState.base]: 'text-base-100-font',
    [InputState.danger]: 'text-danger-700',
    [InputState.info]: 'text-info-700',
    [InputState.success]: 'text-success-700',
    [InputState.warning]: 'text-warning-700',
  };

  return variants[props.state];
});

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <AntSkeleton
    :visible="skeleton"
    rounded
  >
    <div
      :class="classes"
      data-e2e="alert"
      :data-e2e-state="state"
    >
      <div
        v-if="icon || hasQuestionMark || dismissBtn || title"
        class="inline-flex items-center justify-between w-content gap-2"
        :class="{'invisible': skeleton}"
      >
        <div class="inline-flex items-center gap-2">
          <AntIcon
            v-if="icon"
            :icon="_icon"
            :color="iconColor"
            :size="IconSize.sm"
          />

          <div
            :class="{'font-semibold': hasDefaultSlot}"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>

        <div class="flex gap-2">
          <div v-if="hasQuestionMark">
            <slot name="questionMarkText">
              <AntTooltip>
                <AntIcon
                  :icon="faCircleQuestion"
                  :color="iconColor"
                  :size="IconSize.sm"
                />

                <template #content>
                  {{ questionMarkText }}
                </template>
              </AntTooltip>
            </slot>
          </div>

          <AntIcon
            v-if="dismissBtn"
            :icon="faXmark"
            class="cursor-pointer"
            :color="iconColor"
            :size="IconSize.sm"
            @click="() => $emit('close')"
          />
        </div>
      </div>

      <div v-if="hasDefaultSlot">
        <slot />
      </div>
    </div>
  </AntSkeleton>
</template>
