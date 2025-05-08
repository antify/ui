<script setup lang="ts">

import {
  faAngleDown, faAngleUp, faMinus,
} from '@fortawesome/free-solid-svg-icons';
import {
  AntTableSize, AntTableSortDirection,
} from './__types/TableHeader.types';
import AntButton from '../AntButton.vue';
import {
  computed,
} from 'vue';
import {
  Size,
} from '../../enums/Size.enum';

defineEmits([
  'sortClick',
]);
const props = withDefaults(defineProps<{
  sortDirection?: AntTableSortDirection;
  size?: AntTableSize;
}>(), {
  sortDirection: AntTableSortDirection.neutral,
  size: AntTableSize.md,
});

const buttonSize = computed(() => {
  if (props.size === AntTableSize.lg) {
    return Size.sm;
  } else if (props.size === AntTableSize.md) {
    return Size.xs;
  } else {
    return Size.xs2;
  }
});
const buttonIcon = computed(() => {
  if (props.sortDirection === AntTableSortDirection.asc) {
    return faAngleDown;
  }

  if (props.sortDirection === AntTableSortDirection.desc) {
    return faAngleUp;
  }

  if (props.sortDirection === AntTableSortDirection.neutral) {
    return faMinus;
  }
});
</script>

<template>
  <AntButton
    :size="buttonSize"
    :icon-left="buttonIcon"
  />
</template>
