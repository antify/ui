<script setup lang="ts">

import {AntTableAlign, AntTableSize, AntTableSortDirection, type TableHeader} from './__types/TableHeader.types';
import {computed, ref, type Ref} from 'vue';
import AntTableSortButton from './AntTableSortButton.vue';

defineEmits(['sort']);
const props = withDefaults(
  defineProps<{
    header: TableHeader
    size?: AntTableSize
  }>(), {
    size: AntTableSize.md
  }
);

const headerClasses = computed(() => ({
  [props.header.headerClassList || '']: true,
  'text-sm text-base-200-font uppercase font-semi-bold': true,
  'text-left': !props.header.align || props.header.align === AntTableAlign.left,
  'text-center': props.header.align === AntTableAlign.center,
  'text-right': props.header.align === AntTableAlign.right,
  'px-2.5 py-0 h-10': props.size === AntTableSize.lg,
  'px-2 py-0 h-9': props.size === AntTableSize.md,
  'px-1.5 py-0 h-8': props.size === AntTableSize.sm
}));

const cellClasses = computed(() => ({
  'flex items-center': true,
  'justify-start': !props.header.align || props.header.align === AntTableAlign.left,
  'justify-center': props.header.align === AntTableAlign.center,
  'justify-end': props.header.align === AntTableAlign.right,
  'gap-2.5': props.size === AntTableSize.lg,
  'gap-2': props.size === AntTableSize.md,
  'gap-1.5': props.size === AntTableSize.sm,
}));

// TODO:: Initial sort should be possible with this
const sortDirection: Ref<AntTableSortDirection> = ref(AntTableSortDirection.neutral);

function getNewSortDirection(): AntTableSortDirection {
  if (sortDirection.value === AntTableSortDirection.neutral) {
    sortDirection.value = AntTableSortDirection.asc;
    return AntTableSortDirection.asc;
  }

  if (sortDirection.value === AntTableSortDirection.asc) {
    sortDirection.value = AntTableSortDirection.desc;
    return AntTableSortDirection.desc;
  }

  sortDirection.value = AntTableSortDirection.neutral;
  return AntTableSortDirection.neutral;
}
</script>

<template>
  <th
    scope="col"
    :class="headerClasses"
  >
    <div :class="cellClasses">
      <slot
        name="headerContent"
        v-bind="header"
      >
        {{ header.title }}
      </slot>

      <AntTableSortButton
        v-if="header.sortable"
        :sort-direction="sortDirection"
        :size="size"
        @sort-click="$emit('sort', header, getNewSortDirection())"
      />
    </div>
  </th>
</template>
