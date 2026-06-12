<script lang="ts" setup>
import {
  computed,
  onMounted,
} from 'vue';
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  handleEnumValidation,
} from '../handler';
import {
  IconSize,
} from './__types/AntIcon.types';
import AntSkeleton from './AntSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

/**
 * Emitted when the icon container is clicked.
 * @payload {MouseEvent} The native mouse click event
 */
/**
 * Emitted when the icon container loses focus.
 * @payload {FocusEvent} The native focus blur event
 */
const emit = defineEmits<{
  click: [event: MouseEvent];
  blur: [event: FocusEvent];
}>();

const props = withDefaults(defineProps<{
  /** The FontAwesome icon definition to render. @required */
  icon: IconDefinition;
  /** The data-e2e attribute value for testing selectors. @default 'icon' */
  dataE2e?: string;
  /** Whether the icon is disabled (reduced opacity). @default false */
  disabled?: boolean;
  /** Whether the icon is in a readonly (non-interactive) state. @default false */
  readonly?: boolean;
  /** Whether to show a skeleton placeholder instead of the icon. @default false */
  skeleton?: boolean;
  /** The size variant of the icon. @values IconSize @default IconSize.sm */
  size?: IconSize;
  /** CSS text color class applied to the icon (e.g. 'text-primary-500'). @default 'text-for-white-bg-font' */
  color?: string;
}>(), {
  disabled: false,
  readonly: false,
  skeleton: false,
  size: IconSize.sm,
  color: 'text-for-white-bg-font',
  dataE2e: 'icon',
});

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/**
 * Whether the icon is in a non-interactive state — skeleton (placeholder),
 * readonly, or disabled. Used to disable pointer events, cursors, and focus rings.
 * @returns {boolean} `true` when the icon should not accept interaction
 */
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

// ---------------------------------------------------------------------------
// CSS class generators
// ---------------------------------------------------------------------------

/**
 * Maps each IconSize to the container width and height classes.
 */
const containerSizeClasses: Record<IconSize, string> = {
  [IconSize.xl3]: 'w-9 h-9',
  [IconSize.lg]: 'w-7 h-7',
  [IconSize.md]: 'w-6 h-6',
  [IconSize.sm]: 'w-5 h-5',
  [IconSize.xs]: 'w-4 h-4',
  [IconSize.xs2]: 'w-3 h-3',
};

/**
 * Maps each IconSize to the font-size class for the FontAwesome icon.
 */
const iconSizeClasses: Record<IconSize, string> = {
  [IconSize.xl3]: 'text-3xl',
  [IconSize.lg]: 'text-lg',
  [IconSize.md]: 'text-md',
  [IconSize.sm]: 'text-sm',
  [IconSize.xs]: 'text-xs',
  [IconSize.xs2]: 'text-2xs',
};

/**
 * Combined CSS classes for the outer icon container span.
 * @returns {Record<string, boolean>} Container CSS classes keyed by className
 */
const containerClasses = computed(() => ({
  'inline-flex items-center justify-center relative': true,
  'disabled:opacity-50 disabled:cursor-not-allowed': true,
  'cursor-pointer': !hasInputState.value,
  'cursor-default': props.readonly,
  [containerSizeClasses[props.size]]: true,
  [props.color]: true,
}));

/**
 * CSS classes for the inner FontAwesome icon element.
 * @returns {Record<string, boolean>} Icon CSS classes keyed by className
 */
const iconClasses = computed(() => ({
  'transition-colors': true,
  [iconSizeClasses[props.size]]: true,
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
  handleEnumValidation(props.size, IconSize, 'size');
});
</script>

<template>
  <!--
    @slot (default) — Custom content to render inside the icon container,
    replacing the FontAwesome icon. Useful for inline SVGs or custom markup.
  -->
  <span
    :class="containerClasses"
    :tabindex="hasInputState ? '-1' : '0'"
    :data-e2e="dataE2e"
    :data-e2e-state="size"
    @click="onClick"
    @blur="onBlur"
  >
    <AntSkeleton
      :visible="skeleton"
      rounded
    >
      <!--
        FontAwesome icon rendered via its Vue component.
        Hidden when `skeleton` is active (via the AntSkeleton wrapper).
      -->
      <FaIcon
        :icon="icon"
        :class="iconClasses"
      />
    </AntSkeleton>
  </span>
</template>
