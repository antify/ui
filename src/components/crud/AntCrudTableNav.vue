<script lang="ts" setup>
// @ts-nocheck
/**
 * TODO:: test me in storybook through vue router
 * TODO:: fix ts errors
 */
import {
  useRouter, useRoute,
} from 'vue-router';
import AntPagination from '../AntPagination.vue';
import {
  computed, ref, watch,
} from 'vue';
import AntSelect from '../inputs/AntSelect.vue';
import AntSkeleton from '../AntSkeleton.vue';
import {
  type SelectOption,
} from '../inputs/__types';

const emit = defineEmits([
  'changeItemsPerPage',
  'changePage',
]);
const props = withDefaults(
  defineProps<{
    count: number | null;
    pageQuery?: string;
    itemsPerPageQuery?: string;
    fullWidth?: boolean;
    validItemsPerPage?: number[];
    skeleton?: boolean;
  }>(),
  {
    pageQuery: 'p',
    itemsPerPageQuery: 'ipp',
    fullWidth: true,
    validItemsPerPage: () => [
      20,
      50,
      100,
      200,
    ],
    skeleton: false,
  },
);

const route = useRoute();
const router = useRouter();
const itemsPerPageOptions = computed(() => props.validItemsPerPage.map(item => ({
  label: `${item}`,
  value: item,
}) as SelectOption));
const page = computed(() => {
  const _page = route.query[props.pageQuery] >= 1 ? Number.parseInt(route.query[props.pageQuery]) : 1;

  if (_page <= 0 || _page > pages.value) {
    return 1;
  }

  return _page;
});
const itemsPerPage = computed({
  get() {
    return route.query[props.itemsPerPageQuery] ?
      Number.parseInt(route.query[props.itemsPerPageQuery]) :
      props.validItemsPerPage[0];
  },
  set(val) {
    const query = {
      ...route.query,
    };
    query[props.itemsPerPageQuery] = `${val}`;
    delete query[props.pageQuery];

    (async () => {
      await router.push({
        ...route,
        query,
      });

      emit('changeItemsPerPage', val);
    })();
  },
});
const fromItems = computed(() => (itemsPerPage.value * (page.value - 1)) + 1);
const toItems = computed(() => {
  const items = itemsPerPage.value * page.value;

  if (page.value === pages.value && items > props.count) {
    return props.count;
  }

  return itemsPerPage.value * page.value;
});
const pages = computed(() => Math.ceil(props.count / itemsPerPage.value));
const _fullWidth = ref(props.fullWidth);

watch(() => props.fullWidth, (val) => {
  setTimeout(() => {
    _fullWidth.value = val;
  }, val ? 300 : 200);
});
</script>

<template>
  <div
    class="w-full"
    data-e2e="crud-table-nav"
  >
    <div
      class="flex w-full items-center p-2"
      :class="{'justify-end': !_fullWidth, 'justify-between': _fullWidth}"
    >
      <div
        v-if="_fullWidth"
        class="flex gap-2 items-center text-for-white-bg-font text-sm"
        data-e2e="items-per-page"
      >
        <span class="relative">
          <AntSkeleton
            v-if="skeleton"
            rounded
            absolute
          />
          Items per page
        </span>

        <AntSelect
          v-model="itemsPerPage"
          :options="itemsPerPageOptions"
          :skeleton="skeleton"
          :expanded="false"
        />

        <div
          v-if="count !== null"
          class="flex gap-1 relative"
        >
          <AntSkeleton
            v-if="skeleton"
            rounded
            absolute
          />

          <span class="font-medium">{{ fromItems }} - {{ toItems }}</span>
          <span>of</span>
          <span
            class="font-medium"
            data-e2e="total-items"
          >{{ count }}</span>
        </div>
      </div>

      <AntPagination
        :pages="pages"
        :page-query="pageQuery"
        :skeleton="skeleton"
        :light-version="!_fullWidth"
        @input="(val) => emit('changePage', val)"
      />
    </div>
  </div>
</template>
