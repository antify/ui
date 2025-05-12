<script setup lang="ts">
import {
  computed,
} from 'vue';
import {
  Size,
} from '../enums/Size.enum';
import AntSkeleton from './AntSkeleton.vue';

const props = withDefaults(defineProps<{
  size?: Size;
  padding?: boolean;
  expanded?: boolean;
  skeleton?: boolean;
}>(), {
  size: Size.md,
  padding: true,
  expanded: false,
  skeleton: false,
});

const cardClass = computed(() => ({
  'inline-block': true,
  'w-full': props.expanded,
  'p-0': !props.padding,
  'p-2.5': props.size === Size.lg && props.padding,
  'p-2': props.size === Size.md && props.padding,
  'p-1.5': props.size === Size.sm || props.size === Size.xs && props.padding,
  'p-1': props.size === Size.xs2 && props.padding,
}));
</script>

<template>
  <div
    :class="cardClass"
    class="bg-white outline outline-offset-[-1px] outline-base-300 rounded-md relative"
  >
    <slot />

    <AntSkeleton
      :visible="skeleton"
      rounded
      :class="{'w-full': props.expanded}"
      absolute
    />
  </div>
</template>
