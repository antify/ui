<script lang="ts" setup>
import {
  computed,
  onMounted,
} from 'vue';
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  type RouteLocationRaw,
} from 'vue-router';
import {
  handleEnumValidation,
} from '../handler';
import {
  ListGroupItemState,
} from './__types/AntListGroupItem.types';
import AntIcon from './AntIcon.vue';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the list group item is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the list group item loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default 'list-group-item' */
  dataE2e?: string;
  /** Whether the item is disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** FontAwesome icon displayed on the left side of the item content. @default undefined */
  iconLeft?: IconDefinition;
  /** FontAwesome icon displayed on the right side of the item content. @default undefined */
  iconRight?: IconDefinition;
  /** Whether the item is in a readonly (non-interactive) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of the item content. @default false */
  skeleton?: boolean;
  /** The visual state/color variant of the item. @values ListGroupItemState @default ListGroupItemState.base */
  state?: ListGroupItemState;
  /** Router-link target route location for navigation. When provided, renders as a router-link. @default undefined */
  to?: RouteLocationRaw | string;
}>(), {
  disabled: false,
  readonly: false,
  skeleton: false,
  state: ListGroupItemState.base,
  dataE2e: 'list-group-item',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the item is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the item should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each ListGroupItemState to background and text color classes,
 * including hover states.
 */
const colorVariants: Record<ListGroupItemState, string> = {
  [ListGroupItemState.base]: 'bg-white text-for-white-bg-font hover:bg-base-200',
  [ListGroupItemState.danger]: 'bg-danger-500 text-danger-500-font hover:bg-danger-700',
  [ListGroupItemState.info]: 'bg-info-500 text-info-500-font hover:bg-info-700',
  [ListGroupItemState.primary]: 'bg-primary-500 text-primary-500-font hover:bg-primary-700',
  [ListGroupItemState.secondary]: 'bg-secondary-500 text-secondary-500-font hover:bg-secondary-700',
  [ListGroupItemState.success]: 'bg-success-500 text-success-500-font hover:bg-success-700',
  [ListGroupItemState.warning]: 'bg-warning-500 text-warning-500-font hover:bg-warning-700',
};

/**
 * Maps each ListGroupItemState to the text color class used for child content
 * when the item acts as a router-link (clickable).
 */
const linkTextVariants: Record<ListGroupItemState, string> = {
  [ListGroupItemState.base]: 'text-for-white-bg-font',
  [ListGroupItemState.danger]: 'text-danger-500-font',
  [ListGroupItemState.info]: 'text-info-500-font',
  [ListGroupItemState.primary]: 'text-primary-500-font',
  [ListGroupItemState.secondary]: 'text-secondary-500-font',
  [ListGroupItemState.success]: 'text-success-500-font',
  [ListGroupItemState.warning]: 'text-warning-500-font',
};

/**
 * Whether the item renders as a clickable router-link or a static div.
 */
const isLink = computed(() => props.to !== undefined);

/**
 * CSS classes for the root component element.
 * @returns {Record<string, boolean>} CSS classes keyed by className
 */
const classes = computed(() => ({
  'text-sm transition-colors inline-block w-full': true,
  [colorVariants[props.state]]: true,
}));

/**
 * CSS classes for the inner content wrapper.
 * Applies flex layout, padding, and conditional link styling.
 * @returns {Record<string, boolean>} CSS classes keyed by className
 */
const contentWrapperClasses = computed(() => ({
  'w-full p-2 flex gap-2 items-center justify-between': true,
  'cursor-pointer transition-colors': isLink.value,
  [linkTextVariants[props.state]]: isLink.value,
}));

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

function onClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}

// ---------------------------------------------------------------------------
// Runtime enum validation
// ---------------------------------------------------------------------------

onMounted(() => {
  handleEnumValidation(props.state, ListGroupItemState, 'state');
});
</script>

<template>
  <!--
    Dynamic root element: <router-link> when `to` is provided, otherwise <div>.
    @slot (default) — The main text content of the item, rendered between the
    left and right icon slots.
    @slot icon-left — Custom content on the left side. Defaults to an AntIcon
    using the `iconLeft` prop when the slot is empty.
    @slot icon-right — Custom content on the right side. Defaults to an AntIcon
    using the `iconRight` prop when the slot is empty.
  -->
  <component
    :is="isLink ? 'router-link' : 'div'"
    :to="to"
    :class="classes"
    :tabindex="hasInputState ? '-1' : '0'"
    :data-e2e="dataE2e"
    :data-e2e-state="state"
    @click="onClick"
    @blur="onBlur"
  >
    <div :class="contentWrapperClasses">
      <div class="flex items-center gap-2.5">
        <!-- Left icon / slot -->
        <slot
          v-if="iconLeft"
          name="icon-left"
        >
          <AntIcon :icon="iconLeft" />
        </slot>

        <!-- Default slot content -->
        <slot />
      </div>

      <!-- Right icon / slot -->
      <slot
        v-if="iconRight"
        name="icon-right"
      >
        <AntIcon :icon="iconRight" />
      </slot>
    </div>
  </component>
</template>
