<script lang="ts" setup>
import AntButton from '../AntButton.vue';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  Grouped,
} from '../../enums';
import AntDropdown from '../AntDropdown.vue';
import {
  nextTick,
  ref, watch,
} from 'vue';
import AntMonthPicker from './AntMonthPicker.vue';
import AntYearPicker from './AntYearPicker.vue';

const props = defineProps<{
  /**
   * Selected month index (0-11).
   */
  month: number;
  year: number;
}>();
const emit = defineEmits([
  'update:month',
  'update:year',
]);
// TODO:: add translation support
const options = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];
const showMonthDropdown = ref(false);
const showYearDropdown = ref(false);
const currentYear = new Date().getFullYear();
const yearPickerRef = ref<InstanceType<typeof AntYearPicker> | null>(null);

watch(showYearDropdown, (val) => {
  if (val) {
    setTimeout(() => {
      yearPickerRef.value?.scrollToYear();
    }, 50);
  }
});

function onSelectYear(year: number) {
  showYearDropdown.value = false;
  emit('update:year', year);
}

function onClickPrevious() {
  if (props.month === 0) {
    emit('update:month', 11);
    nextTick(() => {
      emit('update:year', props.year - 1);
    });
  } else {
    emit('update:month', props.month - 1);
  }
}

function onClickNext() {
  if (props.month === 11) {
    emit('update:month', 0);
    nextTick(() => {
      emit('update:year', props.year + 1);
    });
  } else {
    emit('update:month', props.month + 1);
  }
}
</script>

<template>
  <div class="flex">
    <AntButton
      :icon-left="faChevronLeft"
      :grouped="Grouped.left"
      @click="onClickPrevious"
    />
    <AntDropdown
      v-model:show-dropdown="showMonthDropdown"
      expanded
      class="-ml-px"
    >
      <AntButton
        :grouped="Grouped.center"
        expanded
        @click="showMonthDropdown = !showMonthDropdown"
      >
        {{ options[month] }}
      </AntButton>

      <template #content>
        <AntMonthPicker
          :value="month"
          :highlight-current-month="year === currentYear"
          @select="(m) => { emit('update:month', m); showMonthDropdown = false; }"
        />
      </template>
    </AntDropdown>

    <AntDropdown
      v-model:show-dropdown="showYearDropdown"
      :content-padding="false"
      expanded
      class="-ml-px"
    >
      <AntButton
        :grouped="Grouped.center"
        expanded
        @click="showYearDropdown = !showYearDropdown"
      >
        {{ year }}
      </AntButton>

      <template #content>
        <AntYearPicker
          ref="yearPickerRef"
          :value="year"
          :highlight-current-month="year === currentYear"
          @select="onSelectYear"
        />
      </template>
    </AntDropdown>

    <div
      class="-ml-px"
    >
      <AntButton
        :icon-left="faChevronRight"
        :grouped="Grouped.right"
        @click="onClickNext"
      />
    </div>
  </div>
</template>
