<script setup lang="ts">
import AntSkeleton from './AntSkeleton.vue';
import AntSelect from './inputs/AntSelect.vue';
import {
  computed,
} from 'vue';
import type {
  SelectOption,
} from './inputs/__types/AntSelect.types';

const props = withDefaults(defineProps<{
  modelValue: number;
  itemsPerPageOptions?: number[];
  amountOfItems?: number | null;
  selectedPage?: number;
  skeleton?: boolean;
}>(), {
  itemsPerPageOptions: () => [
    20,
    50,
    100,
    200,
  ],
  amountOfItems: null,
  selectedPage: 1,
  skeleton: false,
});
const emit = defineEmits([
  'update:modelValue',
]);

const _itemsPerPage = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit('update:modelValue', value);
  },
});
const _itemsPerPageOptions = computed<SelectOption[]>(() => props.itemsPerPageOptions.map(item => ({
  label: `${item}`,
  value: item,
})));
const amountOfPages = computed(() => props.amountOfItems ? Math.ceil(props.amountOfItems / _itemsPerPage.value) : 1);
const fromItems = computed(() => props.amountOfItems && props.amountOfItems > 0 ? (_itemsPerPage.value * (props.selectedPage - 1) + 1) : 0);
const toItems = computed(() => {
  if (!props.amountOfItems) {
    return 0;
  }

  const items = _itemsPerPage.value * props.selectedPage;

  if (props.selectedPage === amountOfPages.value && items > props.amountOfItems) {
    return props.amountOfItems;
  }

  return _itemsPerPage.value * props.selectedPage;
});
</script>

<template>
  <div
    class="flex gap-2 items-center text-for-white-bg-font text-sm"
    data-e2e="items-per-page"
  >
    <span class="relative">
      <AntSkeleton
        v-if="skeleton"
        rounded
        absolute
      />
      Einträge pro Seite
    </span>

    <AntSelect
      v-model="_itemsPerPage"
      :options="_itemsPerPageOptions"
      :skeleton="skeleton"
      :expanded="false"
    />

    <div
      v-if="amountOfItems !== null"
      class="flex gap-1 relative"
    >
      <AntSkeleton
        v-if="skeleton"
        rounded
        absolute
      />

      <span class="font-medium">{{ fromItems }} - {{ toItems }}</span>
      <span>von</span>
      <span
        class="font-medium"
        data-e2e="total-items"
      >{{ amountOfItems }}</span>
    </div>
  </div>
</template>
