<script setup lang="ts">
import {computed} from 'vue';
import {Size} from '../enums/Size.enum';

const props = withDefaults(defineProps<{
  size?: Size;
  padding?: boolean;
  expanded?: boolean;
}>(), {
  size: Size.md,
  padding: true,
  expanded: false
});

const cardClass = computed(() => ({
    'inline-block': true,
    'w-full': props.expanded,
    'p-0': !props.padding,
    'p-2.5': props.size === Size.lg && props.padding,
    'p-2': props.size === Size.md && props.padding,
    'p-1.5': props.size === Size.sm || props.size === Size.xs && props.padding,
    'p-1': props.size === Size.xs2 && props.padding,
  })
);
</script>

<template>
  <div
    :class="cardClass"
    class="bg-white border border-neutral-300 rounded-md"
  >
    <slot/>
  </div>
</template>
