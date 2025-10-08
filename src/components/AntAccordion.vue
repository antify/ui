<script lang="ts" setup>
import AntAccordionItem from './AntAccordionItem.vue';
import {
  onMounted,
} from 'vue';
import {
  CollapseStrategy, type AccordionItem,
} from './__types/AntAccordion.types';
import AntSkeleton from './AntSkeleton.vue';

const props = withDefaults(defineProps<{
  items: AccordionItem[];
  collapseStrategy?: CollapseStrategy;
  skeleton?: boolean;
}>(), {
  collapseStrategy: CollapseStrategy.single,
  skeleton: false,
});

const _openItems = defineModel<number[]>('openItems', {
  default: [],
});

onMounted(() => {
  _openItems.value = props.items
    .map((item, index) => item.isOpen ? index : -1)
    .filter((index) => index !== -1);
});

function onOpen(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    _openItems.value = [
      index,
    ];
  } else {
    _openItems.value = [
      ..._openItems.value,
      index,
    ];
  }
}

function onClose(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    _openItems.value = [];
  } else {
    _openItems.value = _openItems.value.filter((item) => item !== index);
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-base-300 gap-px"
    data-e2e="accordion"
  >
    <slot>
      <AntAccordionItem
        v-for="(item, index) in items"
        :key="`accordion-item-${index}`"
        :label="item.label"
        :is-open="_openItems.includes(index)"
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
