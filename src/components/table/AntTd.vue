<script setup lang="ts">
import {AntTableAlign, AntTableRowTypes, AntTableSize, type TableHeader} from './__types/TableHeader.types';
import {computed} from 'vue';
import {type RouteLocationRaw, RouterLink} from 'vue-router';

const props =
  withDefaults(
    defineProps<{
      element: Record<string, unknown>;
      header: TableHeader;
      align?: AntTableAlign
      size?: AntTableSize
    }>(), {
      align: AntTableAlign.left,
      size: AntTableSize.md
    });

const cellClasses = computed(() => ({
  'whitespace-nowrap text-sm font-medium relative': true,
  'text-right': props.align === AntTableAlign.right,
  'text-center': props.align === AntTableAlign.center,
  'px-2.5 py-0 h-10': props.size === AntTableSize.lg,
  'px-2 py-0 h-9': props.size === AntTableSize.md,
  'px-1.5 py-0 h-8': props.size === AntTableSize.sm
}));
</script>

<template>
  <td
    :class="cellClasses"
  >
    <slot
      name="beforeCellContent"
      v-bind="{ elem: element, header: header }"
    />

    <div
      v-if="header.type === AntTableRowTypes.text"
      :class="header.rowClassList"
    >
      {{ element[header.identifier] }}
    </div>

    <div
      v-else-if="header.type === AntTableRowTypes.link && header.toProp"
    >
      <RouterLink
        :to="element[header.toProp] as RouteLocationRaw"
        class="absolute inset-0"
      >
      </RouterLink>
      {{ element[header.identifier] }}
    </div>

    <div
      v-else-if="header.type === AntTableRowTypes.html"
      :class="header.rowClassList"
      v-html="element[header.identifier]"
    />

    <div
      v-else-if="header.type === AntTableRowTypes.slot"
      :class="header.rowClassList"
    >
      <slot
        name="cellContent"
        v-bind="{ element, header }"
      ></slot>
    </div>

    <slot
      name="afterCellContent"
      v-bind="{ elem: element, header: header }"
    />
  </td>
</template>
