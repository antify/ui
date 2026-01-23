<script lang="ts" setup>
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

const props = withDefaults(
  defineProps<{
    modelValue: number;
    pages: number;
    skeleton?: boolean;

    /**
     * Light version does not show the very previous and next page button.
     * This makes the pagination smaller in space.
     */
    lightVersion?: boolean;
  }>(),
  {
    skeleton: false,
    lightVersion: false,
  },
);
const emits = defineEmits([
  'update:modelValue',
]);
const _page = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emits('update:modelValue', value);
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

  if (_page.value > 2 && props.pages > 3) {
    pagination.push(1);

    if (_page.value > 3) {
      pagination.push('...');
    }
  }

  if (_page.value === 1) {
    pagination.push(1);

    if (props.pages >= 2) {
      pagination.push(2);
    }

    if (props.pages >= 3) {
      pagination.push(3);
    }
  } else if (_page.value === props.pages) {
    if (props.pages - 2 >= 1) {
      pagination.push(props.pages - 2);
    }
    if (props.pages - 1 >= 1) {
      pagination.push(props.pages - 1);
    }
    pagination.push(props.pages);
  } else {
    pagination.push(_page.value - 1);
    pagination.push(_page.value);
    pagination.push(_page.value + 1);
  }

  if (_page.value < props.pages - 1 && props.pages > 3) {
    if (_page.value < props.pages - 2) {
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

  if (_page.value > 2) {
    pagination.push('...');
  }

  if (_page.value > 1) {
    pagination.push(_page.value);
  }

  if (_page.value < props.pages - 1) {
    pagination.push('...');
  }

  if (_page.value < props.pages) {
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
          :disabled="_page === 1"
          :icon-left="faChevronLeft"
          :grouped="Grouped.left"
          :filled="false"
          data-e2e="left-arrow-button"
          @click="() => _page = _page - 1"
        />

        <AntButton
          v-for="(pageObj) in pagination"
          :key="`pagination-button-${pageObj}`"
          :state="pageObj === _page ? State.primary : State.base"
          :class="{'text-primary-500 z-10': pageObj === _page}"
          :disabled="pageObj === '...'"
          :grouped="Grouped.center"
          :filled="false"
          :readonly="pageObj === _page"
          @click="() => _page = pageObj as number"
        >
          {{ pageObj }}
        </AntButton>

        <AntButton
          :icon-left="faChevronRight"
          :grouped="Grouped.right"
          :disabled="_page === pages"
          :filled="false"
          data-e2e="right-arrow-button"
          @click="() => _page = _page + 1"
        />
      </div>
    </div>
  </AntSkeleton>
</template>
