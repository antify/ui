<script lang="ts" setup>
import {
  computed,
  onMounted,
  useSlots,
} from 'vue';
import {
  faCheckCircle,
  faCircleQuestion,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  handleEnumValidation,
} from '../handler';
import {
  InputState,
} from '../enums';
import {
  IconSize,
} from './__types';
import AntIcon from './AntIcon.vue';
import AntTooltip from './AntTooltip.vue';
import AntSkeleton from './AntSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the alert dismiss (close) button is clicked.
 */
const emit = defineEmits<{
  close: [];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default 'alert' */
  dataE2e?: string;
  /** Whether the alert dismiss button is visible. @default true */
  dismissBtn?: boolean;
  /** Whether the alert is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the alert fills the full width of its container. @default false */
  expanded?: boolean;
  /** Whether to show the state icon on the left side. @default true */
  icon?: boolean;
  /** Optional tooltip text shown as a question mark icon. @default null */
  questionMarkText?: string | null;
  /** Whether the alert is in a readonly (non-interactive) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of the alert content. @default false */
  skeleton?: boolean;
  /** The visual state/color variant of the alert. @values InputState @default InputState.base */
  state?: InputState;
  /** The title text displayed next to the icon. @default null */
  title?: string | null;
}>(), {
  dismissBtn: true,
  disabled: false,
  expanded: false,
  icon: true,
  questionMarkText: null,
  readonly: false,
  skeleton: false,
  state: InputState.base,
  title: null,
  dataE2e: 'alert',
});

const slots = useSlots();

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the alert is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the alert should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

/**
 * Maps each InputState to the corresponding FontAwesome icon displayed
 * on the left side of the alert title.
 */
const icons: Record<InputState, IconDefinition> = {
  [InputState.base]: faInfoCircle,
  [InputState.danger]: faExclamationCircle,
  [InputState.info]: faInfoCircle,
  [InputState.success]: faCheckCircle,
  [InputState.warning]: faExclamationTriangle,
};

/**
 * The resolved icon for the current alert state.
 */
const _icon = computed(() => icons[props.state]);

/**
 * Maps each InputState to the text color class applied to the icon.
 */
const iconColorVariants: Record<InputState, string> = {
  [InputState.base]: 'text-base-100-font',
  [InputState.danger]: 'text-danger-700',
  [InputState.info]: 'text-info-700',
  [InputState.success]: 'text-success-700',
  [InputState.warning]: 'text-warning-700',
};

/**
 * Text color class for the state icon based on the current alert state.
 */
const iconColor = computed(() => iconColorVariants[props.state]);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each InputState to the background and text color utility classes.
 */
const colorVariants: Record<InputState, string> = {
  [InputState.base]: 'bg-base-100 text-base-100-font',
  [InputState.danger]: 'bg-danger-100 text-danger-700',
  [InputState.info]: 'bg-info-100 text-info-700',
  [InputState.success]: 'bg-success-100 text-success-700',
  [InputState.warning]: 'bg-warning-100 text-warning-700',
};

/**
 * Combined CSS classes for the root alert element.
 * @returns {Record<string, boolean>} CSS classes keyed by className
 */
const classes = computed(() => ({
  'inline-flex flex-col gap-2 rounded-md p-2 transition-colors text-sm': true,
  'w-full': props.expanded,
  [colorVariants[props.state]]: true,
}));

// ---------------------------------------------------------------------------
// Slot detection
// ---------------------------------------------------------------------------

/**
 * Whether a default slot has been provided (body content below the title row).
 */
const hasDefaultSlot = computed(() => !!slots.default);

/**
 * Whether a question-mark tooltip should be shown — when the slot is provided
 * or the `questionMarkText` prop has a value.
 */
const hasQuestionMark = computed(() => !!slots['question-mark-text'] || !!props.questionMarkText);

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

function onDismiss() {
  if (!props.disabled) {
    emit('close');
  }
}

// ---------------------------------------------------------------------------
// Runtime enum validation
// ---------------------------------------------------------------------------

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <!--
    Skeleton wrapper — shown when `skeleton` is true; otherwise renders
    children transparently.
  -->
  <AntSkeleton
    :visible="skeleton"
    rounded
  >
    <div
      :class="classes"
      :tabindex="hasInputState ? '-1' : '0'"
      :data-e2e="dataE2e"
      :data-e2e-state="state"
    >
      <!--
        Title row — icon, title text, question mark tooltip, and dismiss button.
        Only rendered when at least one of these elements is active.
      -->
      <div
        v-if="icon || hasQuestionMark || dismissBtn || title"
        class="inline-flex items-center justify-between w-content gap-2"
        :class="{'invisible': skeleton}"
      >
        <div class="inline-flex items-center gap-2">
          <!--
            State icon — visible when `icon` prop is true.
            @slot icon — Replaces the state icon with custom content.
          -->
          <AntIcon
            v-if="icon"
            :icon="_icon"
            :color="iconColor"
            :size="IconSize.sm"
          />

          <!--
            @slot title — The alert title. Defaults to the `title` prop value.
            When the default slot is also provided, the title renders with
            semibold weight for visual hierarchy.
          -->
          <div
            :class="{'font-semibold': hasDefaultSlot}"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>

        <div class="flex gap-2">
          <!--
            @slot question-mark-text — Tooltip trigger slot. Defaults to an
            AntTooltip wrapping a question mark icon that shows the
            `questionMarkText` prop content.
          -->
          <div v-if="hasQuestionMark">
            <slot name="question-mark-text">
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

          <!-- Dismiss / close button -->
          <AntIcon
            v-if="dismissBtn"
            :icon="faXmark"
            class="cursor-pointer"
            :color="iconColor"
            :size="IconSize.sm"
            @click="onDismiss"
          />
        </div>
      </div>

      <!--
        @slot (default) — Additional body content rendered below the title row.
        When present, the title text is displayed in semibold to visually
        separate the title from the body.
      -->
      <div v-if="hasDefaultSlot">
        <slot />
      </div>
    </div>
  </AntSkeleton>
</template>
