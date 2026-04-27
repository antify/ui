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
  <AntSkeleton
    :visible="skeleton"
    rounded
  >
    <div
      :class="cardClass"
      class="bg-white border border-base-300 rounded-md relative overflow-hidden"
      data-e2e="card"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </AntSkeleton>
</template>
