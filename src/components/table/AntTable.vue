<script lang="ts" setup>
import {
  AntTableSize, AntTableSortDirection, type TableHeader,
} from './__types/TableHeader.types';
import {
  computed, onMounted, ref, type Ref, watch,
} from 'vue';
import {
  useVModel,
} from '@vueuse/core';
import {
  Size, State,
} from '../../enums';
import AntTh from './AntTh.vue';
import AntTd from './AntTd.vue';
import AntSpinner from '../AntSpinner.vue';
import {
  hasSlotContent,
} from '../../utils';
import AntCollapsibleTableRowContent from './AntCollapsibleTableRowContent.vue';
import {
  CollapseStrategy,
} from '../../types';
import {
  faAngleDown, faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import AntButton from '../buttons/AntButton.vue';
import AntIcon from '../AntIcon.vue';
import AntTableSkeleton from './AntTableSkeleton.vue';

defineOptions({
  inheritAttrs: false,
});

const emits = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'update:selectedRow',
  'rowClick',
  'updateSort',
]);
// TODO:: add pagination prop and pagination to table
const props = withDefaults(defineProps<{
  selectedRow?: Record<string, unknown> | undefined;
  headers: TableHeader[];
  data: Record<string, unknown>[];
  rowKey?: string;
  loading?: boolean;
  selectableRows?: boolean;
  showLightVersion?: boolean;
  size?: AntTableSize;
  headerColor?: string;
  emptyStateText?: string;
  collapseStrategy?: CollapseStrategy;
  expandedRows?: boolean;
}>(), {
  rowKey: 'id',
  loading: false,
  selectableRows: false,
  showLightVersion: false,
  size: AntTableSize.md,
  headerColor: 'bg-base-200',
  emptyStateText: 'We couldn\'t find any entry',
  collapseStrategy: CollapseStrategy.single,
  expandedRows: false,
});
const slots = defineSlots();
const openItems = ref<number[]>([]);
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

const maxColSpan = computed(() => _headers.value.length + (hasSlotContent(slots['rowFirstCell']) ? 1 : 0) + (hasSlotContent(slots['rowLastCell']) ? 1 : 0));
const skeleton = computed(() => !props.data || props.data.length === 0 && _loading.value);

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

function getRowClasses(element: Record<string, unknown>, rowIndex: number) {
  return {
    'bg-primary-200 text-primary-200-font transition-colors': element === selected.value,
    'bg-white text-for-white-bg-font': element !== selected.value && rowIndex % 2 === 0,
    'bg-base-100 text-base-100-font': element !== selected.value && rowIndex % 2 !== 0,
    'cursor-pointer': props.selectableRows,
    'hover:bg-base-200': props.selectableRows && element !== selected.value,
  };
}

function rowClick(elem: Record<string, unknown>): void {
  selected.value = elem;

  emits('rowClick', elem);
}

function toggleRowContent(index: number) {
  const isOpen = openItems.value.includes(index);

  if (isOpen) {
    openItems.value = props.collapseStrategy === CollapseStrategy.single
      ? []
      : openItems.value.filter(item => item !== index);
  } else {
    openItems.value = props.collapseStrategy === CollapseStrategy.single
      ? [
        index,
      ]
      : [
        ...openItems.value,
        index,
      ];
  }
}

function openRowsByDefault() {
  if (props.expandedRows && props.data.length > 0) {
    openItems.value = props.data.map((_, index) => index);
  }
}

watch(() => props.showLightVersion, (val) => {
  setTimeout(() => _showLightVersion.value = val, val ? 200 : 400);
});

watch(() => props.data, (currVal, prevVal) => {
  if (currVal.length > prevVal.length) {
    // Add newest element to the list of open items so it is open by default
    // Necessary when table content is changed dynamically
    if (props.collapseStrategy === CollapseStrategy.single) {
      openItems.value = [
        currVal.length - 1,
      ];
    } else {
      openItems.value = [
        ...openItems.value,
        currVal.length - 1,
      ];
    }
  }
});

onMounted(() => {
  openRowsByDefault();
});
</script>

<template>
  <div
    class="relative inline-block w-full align-middle h-full"
    data-e2e="table"
  >
    <div
      v-if="!skeleton"
      class="overflow-hidden h-full overflow-x-auto overflow-y-auto"
    >
      <table
        v-bind="$attrs"
        class="min-w-full max-h-full relative"
        :class="{'h-full': data.length === 0 && !_loading}"
      >
        <thead
          class="sticky top-0 z-10"
          :class="headerColor"
        >
          <tr>
            <slot name="headerFirstCell" />

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

            <template v-if="!!$slots.afterRowContent">
              <td />
            </template>

            <slot name="headerLastCell" />
          </tr>
        </thead>

        <tbody class="bg-white relative">
          <!-- TODO:: Add some kind of virtual list for very large tree data (or required pagination??) -->
          <template
            v-for="(elem, rowIndex) in data"
            :key="`table-row-${elem[rowKey]}-${rowIndex}`"
          >
            <tr
              :id="elem[rowKey] as string"
              data-e2e="table-row"
              :class="getRowClasses(elem, rowIndex)"
            >
              <slot
                name="rowFirstCell"
                v-bind="{ elem }"
              />

              <template v-for="(header, colIndex) in _headers">
                <AntTd
                  v-if="!_showLightVersion || (_showLightVersion && header.lightVersion)"
                  :key="`table-cell-${header.identifier}-${rowIndex}-${colIndex}`"
                  :data-e2e="`table-cell-${header.identifier}`"
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

              <template v-if="!!$slots.afterRowContent">
                <td
                  class="whitespace-nowrap text-sm font-medium relative px-2 py-0 h-9 text-right"
                  @click="rowClick(elem)"
                >
                  <AntButton
                    :size="Size.xs2"
                    @click="toggleRowContent(rowIndex)"
                  >
                    <AntIcon :icon="openItems.includes(rowIndex) ? faAngleUp : faAngleDown" />
                  </AntButton>
                </td>
              </template>

              <slot
                name="rowLastCell"
                v-bind="{ elem }"
              />
            </tr>

            <template v-if="!!$slots.afterRowContent">
              <tr data-e2e="table-after-row-content">
                <td
                  :colspan="maxColSpan + 1"
                  class="p-0"
                >
                  <AntCollapsibleTableRowContent :is-open="openItems.includes(rowIndex)">
                    <slot
                      name="afterRowContent"
                      v-bind="{ element: elem, rowIndex }"
                    />
                  </AntCollapsibleTableRowContent>
                </td>
              </tr>
            </template>
          </template>

          <tr v-if="data.length === 0 && !_loading">
            <td
              colspan="100"
              class="w-full h-full py-2 text-center text-for-white-bg-font text-lg"
            >
              <slot name="emptyState">
                <div class="flex items-center flex-col">
                  <span class="font-semibold">{{ emptyStateText }}</span>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="data.length > 0 && _loading"
      class="absolute w-full top-0 bottom-0 bg-base-300/50 flex items-center justify-center z-10"
    >
      <AntSpinner
        class="!w-24 !h-24"
        :state="State.primary"
      />
    </div>

    <AntTableSkeleton
      v-if="skeleton"
      :headers="_headers"
      :size="size"
      :get-row-classes="getRowClasses"
      :header-color="headerColor"
      :show-light-version="_showLightVersion"
    />
  </div>
</template>
