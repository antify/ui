<script lang="ts" setup>
import {
  Direction,
} from '../../enums/Direction.enum';
import {
  computed, useAttrs,
} from 'vue';

const attrs = useAttrs();
const props = withDefaults(defineProps<{
  direction?: Direction;
}>(), {
  direction: Direction.column,
});

const classes = computed(() => {
  // Let override gap-x-* and gap-y-* classes from outside
  const attrClasses = typeof attrs.class === 'string' ? attrs.class : '';
  const hasGapX = /gap-x-\d/.test(attrClasses);
  const hasGapY = /gap-y-\d/.test(attrClasses);

  const classes: Record<string, boolean> = {
    'flex-col': props.direction === Direction.column,
    'gap-y-2.5': !hasGapY && props.direction === Direction.column,
    'flex-row': props.direction === Direction.row,
    'gap-x-2.5': !hasGapX && props.direction === Direction.row,
  };

  return classes;
});
</script>

<template>
  <section
    class="flex"
    :class="classes"
    data-e2e="form-group"
  >
    <slot />
  </section>
</template>
