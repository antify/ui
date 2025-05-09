<script lang="ts" setup>
// @ts-nocheck
/**
 * TODO:: test me in storybook through vue router
 * TODO:: Fix ts errors
 */
import {
  useRouter, useRoute,
} from 'vue-router';
import {
  computed,
} from 'vue';
import AntButton from './AntButton.vue';
import {
  faChevronRight, faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from './AntSkeleton.vue';
import {
  State, Grouped,
} from '../enums';

const emit = defineEmits([
  'update:skeleton',
  'input',
]);
const props = withDefaults(
  defineProps<{
    pages: number;
    pageQuery?: string;
    skeleton?: boolean;

    /**
     * Light version does not show the very previous and next page button.
     * This makes the pagination smaller in space.
     */
    lightVersion?: boolean;
  }>(),
  {
    pageQuery: 'p',
    skeleton: false,
    lightVersion: false,
  },
);
const router = useRouter();
const route = useRoute();
const page = computed({
  get() {
    const _page = route.query[props.pageQuery] >= 1 ? Number.parseInt(route.query[props.pageQuery]) : 1;

    if (_page <= 0 || _page > props.pages) {
      return 1;
    }

    return _page;
  },
  set(val) {
    const query = {
      ...route.query,
    };
    query[props.pageQuery] = val;

    (async () => {
      await router.push({
        ...route,
        query,
      });

      emit('input', val);
    })();
  },
});

/**
 * Build following constellations:
 * [1] 2 3 ... 10
 * 1 [2] 3 4 ... 10
 * 1 2 [3] 4 ... 10
 * 1 ... 3 [4] 5 ... 10
 * 1 ... 4 [5] 6 ... 10
 * 1 ... 7 [8] 9 10
 * 1 ... 8 [9] 10
 * 1 ... 8 9 [10]
 */
const defaultPagination = computed(() => {
  const pagination = [];

  if (page.value > 2 && props.pages > 3) {
    pagination.push(1);

    if (page.value > 3) {
      pagination.push('...');
    }
  }

  if (page.value === 1) {
    pagination.push(1);

    if (props.pages >= 2) {
      pagination.push(2);
    }

    if (props.pages >= 3) {
      pagination.push(3);
    }
  } else if (page.value === props.pages) {
    if (props.pages - 2 >= 1) {
      pagination.push(props.pages - 2);
    }
    if (props.pages - 1 >= 1) {
      pagination.push(props.pages - 1);
    }
    pagination.push(props.pages);
  } else {
    pagination.push(page.value - 1);
    pagination.push(page.value);
    pagination.push(page.value + 1);
  }

  if (page.value < props.pages - 1 && props.pages > 3) {
    if (page.value < props.pages - 2) {
      pagination.push('...');
    }
    pagination.push(props.pages);
  }

  return pagination;
});

/**
 * Build following constellations:
 * [1] ... 10
 * 1 [2] ... 10
 * 1 ... [3] ... 10
 * 1 ... [5] ... 10
 * 1 ... [8] ... 10
 * 1 ... [9] 10
 * 1 ... [10]
 */
const lightPagination = computed(() => {
  const pagination = [];

  pagination.push(1);

  if (page.value > 2) {
    pagination.push('...');
  }

  if (page.value > 1) {
    pagination.push(page.value);
  }

  if (page.value < props.pages - 1) {
    pagination.push('...');
  }

  if (page.value < props.pages) {
    pagination.push(props.pages);
  }

  return pagination;
});

const pagination = computed(() => {
  if (props.lightVersion) {
    return lightPagination.value;
  }

  return defaultPagination.value;
});
</script>

<template>
  <AntSkeleton
    :visible="skeleton"
    rounded
  >
    <div
      class="inline-flex"
      data-e2e="pagination"
    >
      <div
        class="inline-flex gap-px"
      >
        <AntButton
          :disabled="page === 1"
          :icon-left="faChevronLeft"
          :grouped="Grouped.left"
          :filled="false"
          @click="() => page = page - 1"
        />

        <AntButton
          v-for="(pageObj) in pagination"
          :key="`pagination-button-${pageObj}`"
          :state="pageObj === page ? State.primary : State.base"
          :class="{'text-primary-500 z-10': pageObj === page}"
          :disabled="pageObj === '...'"
          :grouped="Grouped.center"
          :filled="false"
          :readonly="pageObj === page"
          @click="() => page = pageObj"
        >
          {{ pageObj }}
        </AntButton>

        <AntButton
          :icon-left="faChevronRight"
          :grouped="Grouped.right"
          :disabled="page === pages"
          :filled="false"
          @click="() => page = page + 1"
        />
      </div>
    </div>
  </AntSkeleton>
</template>
