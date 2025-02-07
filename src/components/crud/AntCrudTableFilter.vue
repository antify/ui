<script lang="ts" setup>
// TODO:: This component works only with vue-router. Make it work in storybook.
import AntSearch from '../inputs/AntSearch.vue';
import AntCreateButton from '../buttons/AntCreateButton.vue';
import AntDropdown from '../AntDropdown.vue';
import {
  computed, ref, watch,
} from 'vue';
import AntButton from '../buttons/AntButton.vue';
import {
  faFilter, faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import {
  State, Grouped, Position,
} from '../../enums';
import {
  useRoute, useRouter,
} from 'vue-router';

const props = withDefaults(defineProps<{
  fullWidth?: boolean;
  showFilter?: boolean;
  searchQuery?: string;
  hasFilter?: boolean;
  canCreate?: boolean;
  skeleton?: boolean;
}>(), {
  fullWidth: true,
  showFilter: true,
  searchQuery: 'search',
  hasFilter: false,
  canCreate: true,
  skeleton: false,
});
const emit = defineEmits([
  'search',
  'create',
  'removeFilter',
]);
const router = useRouter();
const route = useRoute();

const showDropdown = ref(false);
const _fullWidth = ref(props.fullWidth);
const search = computed({
  get: () => route.query[props.searchQuery] as string || '',
  set: (value) => {
    const query = {
      ...route.query,
      [props.searchQuery]: value,
    };

    if (!value) {
      delete query[props.searchQuery];
    }

    (async () => {
      await router.replace({
        ...route,
        query,
      });

      emit('search', value);
    })();
  },
});

watch(() => props.fullWidth, (val) => {
  setTimeout(() => {
    _fullWidth.value = val;
  }, val ? 250 : 300);
});
</script>

<template>
  <div
    class="flex h-full items-center p-2 gap-2 bg-white"
    data-e2e="crud-table-filter"
  >
    <div
      class="flex gap-2.5 grow"
      :class="{'grow': !_fullWidth}"
    >
      <div :class="{'w-80': _fullWidth, 'w-full': !_fullWidth}">
        <AntSearch
          v-model="search"
          :skeleton="skeleton"
        />
      </div>

      <AntDropdown
        v-if="showFilter"
        v-model:show-dropdown="showDropdown"
        :position="Position.left"
      >
        <div class="flex">
          <AntButton
            :state="hasFilter ? State.info : State.base"
            :grouped="hasFilter ? Grouped.left : Grouped.none"
            :skeleton="skeleton"
            :icon-left="faFilter"
            @click="() => showDropdown = !showDropdown"
          />

          <AntButton
            v-if="hasFilter"
            :state="State.info"
            :grouped="Grouped.right"
            :skeleton="skeleton"
            :icon-left="faMultiply"
            filled
            @click="$emit('removeFilter')"
          />
        </div>

        <template #content>
          <slot name="dropdownContent" />
        </template>
      </AntDropdown>
    </div>

    <div v-if="_fullWidth">
      <slot name="buttons">
        <AntCreateButton
          filled
          :skeleton="skeleton"
          :can-create="canCreate"
          :invalid-permission-tooltip-position="Position.left"
          @click="() => emit('create')"
        />
      </slot>
    </div>
  </div>
</template>
