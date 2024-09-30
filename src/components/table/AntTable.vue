<script lang="ts" setup>
import {AntTableSize, AntTableSortDirection, type TableHeader} from './__types/TableHeader.types';
import {computed, ref, type Ref, watch} from 'vue';
import {useVModel} from '@vueuse/core';
import {State} from '../../enums';
import AntTh from './AntTh.vue';
import AntTd from './AntTd.vue';
import AntSpinner from '../AntSpinner.vue';
import AntSkeleton from '../AntSkeleton.vue';

defineOptions({inheritAttrs: false});

const emits = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'update:selectedRow',
  'rowClick',
  'updateSort'
]);
// TODO:: add pagination prop and pagination to table
const props = withDefaults(
  defineProps<{
    selectedRow?: Record<string, unknown> | undefined,
    headers: TableHeader[];
    data: Record<string, unknown>[];
    rowKey?: string;
    loading?: boolean;
    selectableRows?: boolean;
    showLightVersion?: boolean;
    size?: AntTableSize;
    headerColor?: string;
  }>(), {
    rowKey: 'id',
    loading: false,
    selectableRows: false,
    showLightVersion: false,
    size: AntTableSize.md,
    headerColor: 'bg-neutral-200'
  });

const selected: Ref<Record<string, unknown> | undefined> = useVModel(props, 'selectedRow', emits);
const _loading: Ref<boolean> = useVModel(props, 'loading', emits);
const _showLightVersion = ref(props.showLightVersion);
const _headers = computed(() => {
  // if (_showLightVersion.value) {
  //   const lightHeaders = props.headers.filter(header => header.lightVersion);
  //
  //   return lightHeaders.length > 0 ? lightHeaders : [props.headers[0]];
  // }

  return props.headers;
});

watch(() => props.showLightVersion, (val) => {
  setTimeout(() => _showLightVersion.value = val, val ? 200 : 400);
});

function sortTable(header: TableHeader, newDirection: AntTableSortDirection) {
  // TODO:: Sorting is always done externally, here should only be a emit sort with header and direction.
  // TODO:: Save current sort in some kind of prop (maybe same as pagination?)
  // TODO:: Multi column sort?
  // if (newDirection !== AntTableSortDirection.neutral) {
  //   if (header.sort) {
  //     const sortFn = header.sort;
  //     internalRows.value.sort((a, b) => sortFn(a, b, newDirection));
  //   } else {
  //     internalRows.value.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
  //       if (newDirection === AntTableSortDirection.asc) {
  //         return (a[header.identifier] as string) < (b[header.identifier] as string) ? -1 : 1
  //       } else {
  //         return (a[header.identifier] as string) > (b[header.identifier] as string) ? -1 : 1
  //       }
  //     });
  //   }
  // } else {
  //   // Reset sort to default
  //   internalRows.value = [ ...props.data ];
  // }

  emits('updateSort', header, newDirection);
}

function rowClick(elem: Record<string, unknown>): void {
  selected.value = elem;

  emits('rowClick', elem);
}
</script>

<template>
  <div
    class="relative inline-block min-w-full align-middle h-full"
    data-e2e="table"
  >
      <div class="overflow-hidden h-full overflow-x-auto overflow-y-auto">
        <table
          v-bind="$attrs"
          class="min-w-full max-h-full relative"
          :class="{'h-full': data.length === 0 && !_loading}"
        >
          <thead class="sticky top-0 z-10" :class="headerColor">
          <tr>
            <slot name="headerFirstCell"/>

            <template v-for="(header, index) in _headers">
              <AntTh
                v-if="!_showLightVersion || (_showLightVersion && header.lightVersion)"
                :key="`table-header-${header.identifier}-${index}`"
                :header="header"
                :size="size"
                @sort="sortTable"
              >
                <template #headerContent>
                  <slot
                    name="headerContent"
                    v-bind="header"
                  />
                </template>
              </AntTh>
            </template>

            <slot name="headerLastCell"></slot>
          </tr>
          </thead>

          <tbody class="bg-white relative">
          <!-- TODO:: Add some kind of virtual list for very large tree data (or required pagination??) -->
          <tr
            v-for="(elem, rowIndex) in data"
            :id="elem[rowKey] as string"
            :key="`table-row-${elem[rowKey]}-${rowIndex}`"
            class="transition-all"
            :class="{
              'bg-primary-200 text-primary-200-font': elem === selected,
              'bg-white text-for-white-bg-font': elem !== selected && rowIndex % 2 === 0,
              'bg-neutral-100 text-neutral-100-font': elem !== selected && rowIndex % 2 !== 0,
              'cursor-pointer': selectableRows
            }"
          >
            <slot
              name="rowFirstCell"
              v-bind="{ elem }"
            />

            <template v-for="(header, colIndex) in _headers">
              <AntTd
                v-if="!_showLightVersion || (_showLightVersion && header.lightVersion)"
                :key="`table-cell-${header.identifier}-${colIndex}`"
                :header="header"
                :element="elem"
                :align="header.align"
                :size="size"
                @click="rowClick(elem)"
              >
                <template #beforeCellContent="props">
                  <slot
                    name="beforeCellContent"
                    v-bind="{...props, colIndex, rowIndex}"
                  />
                </template>

                <template #cellContent="props">
                  <slot
                    name="cellContent"
                    v-bind="{...props, colIndex, rowIndex}"
                  />
                </template>

                <template #afterCellContent="props">
                  <slot
                    name="afterCellContent"
                    v-bind="{...props, colIndex, rowIndex}"
                  />
                </template>
              </AntTd>
            </template>

            <slot
              name="rowLastCell"
              v-bind="{ elem }"
            />
          </tr>

          <tr v-if="data.length <= 0 && !_loading">
            <td
              colspan="100"
              class="w-full h-full py-2 text-center text-for-white-bg-font text-lg"
            >
              <slot name="emptyState">
                <div class="flex items-center flex-col">
                  <span class="font-semibold">We couldn't find any entry</span>
                </div>
              </slot>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    <div
      v-if="data.length > 0 && _loading"
      class="absolute bg-opacity-50 w-full top-0 bottom-0 bg-neutral-300 flex items-center justify-center"
    >
      <AntSpinner
        class="!w-24 !h-24"
        :state="State.primary"
      />
    </div>

    <div
      v-if="!data || data.length <= 0 && _loading"
      class="absolute bg-opacity-50 w-full top-[40px] bottom-0 bg-neutral-300 flex items-center justify-center"
    >
      <AntSkeleton
        v-model="_loading"
        absolute
      />
    </div>
  </div>
</template>
