<script lang="ts" setup>
import {
  getMonth,
  format,
  addDays,
  subDays,
} from 'date-fns';
import {
  ref,
  watch,
  computed,
  defineEmits,
} from 'vue';
import AntDateSwitcher from './AntDateSwitcher.vue';
import AntButton from '../AntButton.vue';
import AntSkeleton from '../AntSkeleton.vue';

const props = withDefaults(defineProps<{
  /**
   * The date which should be visible when the date picker is opened
   * as timestamp.
   */
  modelValue: number;
  showWeekend?: boolean;
  showTodayButton?: boolean;
  skeleton?: boolean;
}>(), {
  showWeekend: false,
  showTodayButton: true,
  skeleton: false,
});
defineEmits([
  'select',
  'update:modelValue',
]);

const COUNT_ROWS = 6;
const COUNT_COLUMNS = 7;
const currentMonthIndex = ref(new Date(props.modelValue).getMonth());
const currentYear = ref(new Date(props.modelValue).getFullYear());
const matrix = computed(() => {
  /**
   * The picker always starts with Monday.
   * So if the first day of the current month is for example a wednesday,
   * the first two days (Monday and Tuesday) should be from the previous month.
   * Also, the last days of the matrix should be filled with the next month's days.
   */
  const firstDateOfMonth = new Date(currentYear.value, currentMonthIndex.value, 1);
  const _matrix = Array.from({
    length: COUNT_ROWS,
  }, () => Array(COUNT_COLUMNS).fill(null));

  // Emit on which weekday the first day of the month is.
  const weekdayIndexOfFirstDay = (firstDateOfMonth.getDay() - 1); // 0 is Monday, 6 is Sunday

  // Subtract the gap from the currentDate
  let currentDate = subDays(firstDateOfMonth, weekdayIndexOfFirstDay);

  for (let weekIndex = 0; weekIndex < _matrix.length; weekIndex++) {
    for (let weekdayIndex = 0; weekdayIndex < COUNT_COLUMNS; weekdayIndex++) {
      const date = format(currentDate, 'yyyy-MM-dd');
      const isCurrentMonth = getMonth(currentDate) === currentMonthIndex.value;

      _matrix[weekIndex][weekdayIndex] = {
        date,
        label: format(currentDate, 'd'),
        month: getMonth(currentDate),
        isCurrentMonth,
        isWeekend: weekdayIndex === 5 || weekdayIndex === 6,
        isToday: date === format(Date.now(), 'yyyy-MM-dd') && isCurrentMonth,
      };

      currentDate = addDays(currentDate, 1);
    }
  }

  if (props.showWeekend) {
    return _matrix;
  }

  // Filter out weekends
  return _matrix.map(week => week.filter(day => !day.isWeekend));
});
const weekDays = computed(() => {
  // TODO:: Add translation support
  return props.showWeekend
    ? [
      'M',
      'D',
      'M',
      'D',
      'F',
      'S',
      'S',
    ]
    : [
      'M',
      'D',
      'M',
      'D',
      'F',
    ];
});

watch(() => props.modelValue, (val) => {
  const date = new Date(val);
  currentMonthIndex.value = date.getMonth();
  currentYear.value = date.getFullYear();
});
</script>

<template>
  <div>
    <AntDateSwitcher
      v-model:month="currentMonthIndex"
      v-model:year="currentYear"
      :skeleton="skeleton"
    />

    <div
      class="grid gap-1 p-px"
      :class="{
        'grid-cols-7': showWeekend,
        'grid-cols-5': !showWeekend,
      }"
    >
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-for-white-bg-font text-center p-2"
      >
        <AntSkeleton
          :visible="skeleton"
          rounded
        >
          {{ day }}
        </AntSkeleton>
      </div>

      <template
        v-for="week in matrix"
        :key="week"
      >
        <template
          v-for="day in week"
          :key="day.date"
        >
          <AntSkeleton
            :visible="skeleton"
            rounded
          >
            <div
              class="rounded-md flex items-center justify-center p-2 font-semibold cursor-pointer transition-colors"
              :class="{
                'text-base-400': !day.isCurrentMonth,
                'text-for-white-bg-font': day.isCurrentMonth,
                'outline outline-primary-500': day.isToday,
                'hover:bg-base-200 hover:text-base-200-font': day.date !== format(modelValue, 'yyyy-MM-dd'),
                'bg-primary-500 text-primary-500-font hover:bg-primary-300 hover:text-primary-300-font': day.date === format(modelValue, 'yyyy-MM-dd'),
              }"
              @click="() => $emit('update:modelValue', new Date(day.date).getTime())"
            >
              {{ day.label }}
            </div>
          </AntSkeleton>
        </template>
      </template>
    </div>

    <div
      v-if="showTodayButton"
      class="flex items-center justify-center p-2"
    >
      <AntButton
        :skeleton="skeleton"
        @click="() => $emit('update:modelValue', Date.now())"
      >
        Heute
      </AntButton>
    </div>
  </div>
</template>
