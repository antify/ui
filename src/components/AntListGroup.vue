<script lang="ts" setup>
import {
  computed,
} from 'vue';
import AntSkeleton from './AntSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the list group body is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the list group loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The data-e2e attribute value for testing selectors. @default 'list-group' */
  dataE2e?: string;
  /** Whether the list group items are disabled (reduced opacity, no interaction). @default false */
  disabled?: boolean;
  /** Whether the list group fills the full width of its container. @default false */
  expanded?: boolean;
  /** Whether the list group is in a readonly (non-interactive) state. @default false */
  readonly?: boolean;
  /** Whether to apply a drop-shadow to the list group container. @default false */
  shadow?: boolean;
  /** Whether to show a skeleton placeholder instead of list group content. @default false */
  skeleton?: boolean;
}>(), {
  disabled: false,
  expanded: false,
  readonly: false,
  shadow: false,
  skeleton: false,
  dataE2e: 'list-group',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the list group is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the list group should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Combined CSS classes for the inner list group container.
 * Applies the base list group styling with conditional shadow and skeleton.
 * @returns {Record<string, boolean>} CSS classes keyed by className
 */
const containerClasses = computed(() => ({
  'flex flex-col rounded-md bg-base-300 gap-px relative border border-base-300 overflow-hidden': true,
  'shadow-md': props.shadow,
  invisible: props.skeleton,
  'w-full': props.expanded,
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
</script>

<template>
  <!--
    @slot (default) — The list group items rendered inside the skeleton wrapper.
    Each item should be an AntListGroupItem or compatible element.
  -->
  <div
    :class="{'w-full': props.expanded}"
    :data-e2e="dataE2e"
    :data-e2e-state="skeleton ? 'skeleton' : 'default'"
  >
    <AntSkeleton
      :visible="skeleton"
      rounded
      class="w-full"
    >
      <div
        :class="containerClasses"
        :tabindex="hasInputState ? '-1' : '0'"
        @click="onClick"
        @blur="onBlur"
      >
        <slot />
      </div>
    </AntSkeleton>
  </div>
</template>
