<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {handleEnumValidation} from '../handler';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from './__types/AntIcon.types';
import AntSkeleton from "./AntSkeleton.vue";

const props = withDefaults(defineProps<{
  icon: IconDefinition;
  size?: IconSize;
  skeleton?: boolean;

  /**
   * A css text-* class
   */
  color?: string;
}>(), {
  size: IconSize.sm,
  color: 'text-for-white-bg-font',
  skeleton: false,
});

const containerClasses = computed(() => ({
  'inline-flex items-center justify-center relative': true,
  'w-3 h-3': props.size === IconSize.xs2,
  'w-4 h-4': props.size === IconSize.xs,
  'w-5 h-5': props.size === IconSize.sm,
  'w-6 h-6': props.size === IconSize.md,
  'w-7 h-7': props.size === IconSize.lg,
  'w-9 h-9': props.size === IconSize.xl3,
  [props.color]: true,
}));

const iconClasses = computed(() => ({
  'transition-colors': true,
  'text-2xs': props.size === IconSize.xs2,
  'text-xs': props.size === IconSize.xs,
  'text-sm': props.size === IconSize.sm,
  'text-md': props.size === IconSize.md,
  'text-lg': props.size === IconSize.lg,
  'text-3xl': props.size === IconSize.xl3,
}));

onMounted(() => {
  handleEnumValidation(props.size, IconSize, 'size');
});
</script>

<template>
  <span :class="containerClasses">
    <FaIcon
      v-if="icon"
      :icon="icon"
      :class="iconClasses"
    />
    <AntSkeleton v-if="skeleton" absolute rounded/>
  </span>
</template>
