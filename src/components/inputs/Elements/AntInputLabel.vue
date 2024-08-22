<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../../../enums/Size.enum';
import AntSkeleton from '../../AntSkeleton.vue';
import {handleEnumValidation} from '../../../handler';

defineEmits(['clickContent']);

const props = withDefaults(defineProps<{
  label?: string;
  size?: Size;
  skeleton?: boolean;
}>(), {
  skeleton: false,
  size: Size.md,
});

const fontClasses = computed(() => ({
  'relative font-medium w-fit text-for-white-bg-font': true,
  'text-xs': props.size === Size.xs || props.size === Size.xs2,
  'text-sm': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
}));
const gapSize = computed(() => ({
  'gap-2.5': props.size === Size.lg,
  'gap-2': props.size === Size.md,
  'gap-1.5': props.size === Size.sm || props.size === Size.xs,
  'gap-1': props.size === Size.xs2,
}));

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <label
    class="flex flex-col w-full"
    :class="gapSize"
  >
    <span
      v-if="label"
      :class="fontClasses"
    >
      <span
        :class="{'invisible': skeleton}"
        @click="$emit('clickContent')"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </span>

      <AntSkeleton
        v-if="skeleton"
        absolute
        rounded
      />
    </span>

    <slot/>
  </label>
</template>
