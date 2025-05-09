<script lang="ts" setup>
import AntAccordionItem from './AntAccordionItem.vue';
import {
  onMounted, ref,
} from 'vue';
import {
  CollapseStrategy,
} from './__types/AntAccordion.types';
import AntSkeleton from './AntSkeleton.vue';

const props = withDefaults(defineProps<{
  items: {
    label?: string;
    content?: string;
    isOpen?: boolean;
    iconLeft?: boolean;
    contentPadding?: boolean;
    activeLabelClasses?: string;
    activeIconClasses?: string;
    inactiveLabelClasses?: string;
    inactiveIconClasses?: string;
  }[];
  collapseStrategy?: CollapseStrategy;
  skeleton?: boolean;
}>(), {
  collapseStrategy: CollapseStrategy.single,
  skeleton: false,
});

const openItems = ref<number[]>([]);

onMounted(() => {
  openItems.value = props.items
    .map((item, index) => item.isOpen ? index : -1)
    .filter((index) => index !== -1);
});

function onOpen(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    openItems.value = [
      index,
    ];
  } else {
    openItems.value = [
      ...openItems.value,
      index,
    ];
  }
}

function onClose(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    openItems.value = [];
  } else {
    openItems.value = openItems.value.filter((item) => item !== index);
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-base-300 gap-px">
    <slot>
      <AntAccordionItem
        v-for="(item, index) in items"
        :key="`accordion-item-${index}`"
        :label="item.label"
        :is-open="openItems.includes(index)"
        :icon-left="item.iconLeft"
        :content-padding="item.contentPadding"
        :active-label-classes="item.activeLabelClasses"
        :active-icon-classes="item.activeIconClasses"
        :inactive-label-classes="item.inactiveLabelClasses"
        :inactive-icon-classes="item.inactiveIconClasses"
        :skeleton="skeleton"
        @open="() => onOpen(index)"
        @close="() => onClose(index)"
      >
        <template #icon-left="{isOpen}">
          <slot
            name="icon-left"
            v-bind="{item, index, isOpen}"
          />
        </template>

        <div>
          <slot
            name="item-content"
            v-bind="{item, index}"
          >
            <AntSkeleton
              :visible="skeleton"
              rounded
            >
              <div v-html="item.content" />
            </AntSkeleton>
          </slot>
        </div>
      </AntAccordionItem>
    </slot>
  </div>
</template>
