<script lang="ts" setup>
import AntAccordionItem from './AntAccordionItem.vue';
import {onMounted, ref} from 'vue';
import {CollapseStrategy} from './__types/AntAccordion.types';

const props = withDefaults(defineProps<{
  items: {
    label?: string;
    content?: string;
    isOpen?: boolean;
    iconLeft?: boolean;
  }[];
  collapseStrategy?: CollapseStrategy;
}>(), {
  collapseStrategy: CollapseStrategy.single
});

const openItems = ref<number[]>([]);

onMounted(() => {
  openItems.value = props.items
    .map((item, index) => item.isOpen ? index : -1)
    .filter((index) => index !== -1);
});

function onOpen(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    openItems.value = [index];
  } else {
    openItems.value = [...openItems.value, index];
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
  <div class="w-full h-full flex flex-col bg-neutral-300 gap-px">
    <slot>
      <AntAccordionItem
        v-for="(item, index) in items"
        :key="`accordion-item-${index}`"
        :label="item.label"
        :is-open="openItems.includes(index)"
        :icon-left="item.iconLeft"
        @open="() => onOpen(index)"
        @close="() => onClose(index)"
      >
        <slot
          name="item-content"
          v-bind="{item, index}"
        >
          <div v-html="item.content"/>
        </slot>
      </AntAccordionItem>
    </slot>
  </div>
</template>
