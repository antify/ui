<script setup lang="ts">
import AntTabItem from './AntTabItem.vue';
import {
  type TabItem,
} from './__types/AntTabItem.types';
import {
  useVModel,
} from '@vueuse/core';
import {
  computed,
} from 'vue';

const emits = defineEmits([
  'update:modelValue',
]);
const props = withDefaults(defineProps<{
  modelValue?: string;
  tabItems?: TabItem[];
  expanded?: boolean;
  skeleton?: boolean;
  leftBorder?: boolean;
  rightBorder?: boolean;
}>(), {
  expanded: false,
  skeleton: false,
  leftBorder: false,
  rightBorder: false,
});

const currentActive = useVModel(props, 'modelValue', emits);
const containerClasses = computed(() => ({
  'flex transition-all h-full': true,
}));

const scrollContainerClasses = computed(() => ({
  'w-full': props.expanded,
  'border-l': props.leftBorder,
  'border-r': props.rightBorder,
}));

function clickTab(tabItem: TabItem) {
  if (tabItem.clickHandler) {
    tabItem.clickHandler();
  }

  if (tabItem.disabled) {
    return;
  }

  currentActive.value = tabItem.id;
}
</script>

<template>
  <div :class="containerClasses">
    <div
      class="flex gap-px bg-base-300 border-base-300 overflow-x-auto"
      :class="scrollContainerClasses"
      data-e2e="tabs"
    >
      <slot>
        <AntTabItem
          v-for="(tabItem, index) in tabItems"
          :key="`tab-item-${index}`"
          v-bind="tabItem"
          :active="currentActive === tabItem.id"
          :expanded="expanded"
          :disabled="tabItem.disabled"
          :skeleton="skeleton"
          @click="clickTab(tabItem)"
        >
          <slot
            name="content"
            v-bind="{item: tabItem, isActive: currentActive === tabItem.id}"
          />
        </AntTabItem>
      </slot>
    </div>
  </div>
</template>
