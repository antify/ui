<script lang="ts" setup>
import {
  getMonth,
  format,
  addDays,
  subDays,
  getISOWeek,
} from 'date-fns';
import {
  ref,
  watch,
  computed,
  defineEmits,
  onMounted,
} from 'vue';
import AntDateSwitcher from './AntDateSwitcher.vue';
import AntSkeleton from '../AntSkeleton.vue';
import AntTooltip from '../AntTooltip.vue';

const props = withDefaults(defineProps<{
  /**
   * The date which should be visible when the date picker is opened
   * as timestamp.
   */
  modelValue: number;
  showWeekend?: boolean;
  showWeekNumbers?: boolean;
  skeleton?: boolean;
  /**
   * To highlight specific days with a custom color e.g. legal holidays
   * date have the following format: yyyy-mm-dd
   */
  specialDays?: {
    name: string | null;
    date: string;
    color: string;
  }[];
}>(), {
  showWeekend: false,
  showWeekNumbers: false,
  skeleton: false,
  specialDays: () => [],
});
const emit = defineEmits([
  'select',
  'update:modelValue',
  'changeCurrentVisibleMonth',
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
  const _matrix = [];

  // Emit on which weekday the first day of the month is.
  let weekdayIndexOfFirstDay = firstDateOfMonth.getDay() - 1;

  if (weekdayIndexOfFirstDay === -1) {
    weekdayIndexOfFirstDay = 6;
  }

  // Subtract the gap from the currentDate
  let currentDate = subDays(firstDateOfMonth, weekdayIndexOfFirstDay);

  for (let weekIndex = 0; weekIndex < COUNT_ROWS; weekIndex++) {
    const weekDays = [];
    const weekNumber = getISOWeek(currentDate);

    for (let weekdayIndex = 0; weekdayIndex < COUNT_COLUMNS; weekdayIndex++) {
      const date = format(currentDate, 'yyyy-MM-dd');
      const isCurrentMonth = getMonth(currentDate) === currentMonthIndex.value;

      weekDays.push({
        date,
        label: format(currentDate, 'd'),
        month: getMonth(currentDate),
        isCurrentMonth,
        isWeekend: weekdayIndex === 5 || weekdayIndex === 6,
        isToday: date === format(Date.now(), 'yyyy-MM-dd') && isCurrentMonth,
        isSpecialDay: !!props.specialDays.find(sd => sd.date === date),
        specialDayColor: props.specialDays.find(sd => sd.date === date)?.color,
      });

      currentDate = addDays(currentDate, 1);
    }

    _matrix.push({
      weekNumber,
      days: props.showWeekend ? weekDays : weekDays.filter(day => !day.isWeekend),
    });
  }

  return _matrix;
});
const weekDays = computed(() => {
  // TODO:: Add translation support
  const days = props.showWeekend ? [
    'M',
    'D',
    'M',
    'D',
    'F',
    'S',
    'S',
  ] : [
    'M',
    'D',
    'M',
    'D',
    'F',
  ];
  if (props.showWeekNumbers) {
    return [
      'KW',
      ...days,
    ];
  }

  return days;
});

const getColorNumber = (color: string) => {
  const match = color.match(/(\d+)/);

  return match ? parseInt(match[0], 10) : null;
};

watch(() => props.modelValue, (val) => {
  const date = new Date(val);
  currentMonthIndex.value = date.getMonth();
  currentYear.value = date.getFullYear();
});

watch(() => [
  currentMonthIndex.value,
  currentYear.value,
], ([
  currentMonthIndex,
  currentYear,
]) => {
  emit('changeCurrentVisibleMonth', {
    month: currentMonthIndex,
    year: currentYear,
  });
});

onMounted(() => {
  emit('changeCurrentVisibleMonth', {
    month: currentMonthIndex.value,
    year: currentYear.value,
  });
});
</script>

<template>
  <div
    data-e2e="date-picker"
  >
    <AntDateSwitcher
      v-model:month="currentMonthIndex"
      v-model:year="currentYear"
      :skeleton="skeleton"
      class="pb-1"
    />

    <div
      class="grid gap-1"
      :style="{
        gridTemplateColumns: `repeat(${weekDays.length}, minmax(0, 1fr))`
      }"
    >
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-for-white-bg-font text-center flex items-center justify-center"
      >
        <AntSkeleton
          :visible="skeleton"
          rounded
          class="w-full"
        >
          <div class="flex items-center justify-center w-full py-2">
            {{ day }}
          </div>
        </AntSkeleton>
      </div>

      <template
        v-for="(week, wIndex) in matrix"
        :key="wIndex"
      >
        <div
          v-if="showWeekNumbers"
          class="flex text-base-500 font-semibold bg-base-100 rounded-md"
        >
          <AntSkeleton
            :visible="skeleton"
            rounded
            class="w-full"
          >
            <div class="flex items-center justify-center w-full py-2">
              {{ week.weekNumber }}
            </div>
          </AntSkeleton>
        </div>

        <template
          v-for="day in week.days"
          :key="day.date"
        >
          <AntSkeleton
            :visible="skeleton"
            rounded
          >
            <AntTooltip :delay="300">
              <div
                class="rounded-md flex items-center justify-center p-2 font-semibold cursor-pointer transition-colors w-full h-full"
                :class="{
                  'text-base-400': !day.isCurrentMonth,
                  'text-for-white-bg-font': day.isCurrentMonth,
                  'outline outline-primary-500': day.isToday,
                  'bg-primary-100': day.isWeekend,
                  'hover:bg-base-200 hover:text-base-200-font': day.date !== format(modelValue, 'yyyy-MM-dd'),
                  '!bg-primary-500 !text-primary-500-font hover:bg-primary-300 hover:text-primary-300-font': day.date === format(modelValue, 'yyyy-MM-dd'),
                }"
                :style="{
                  backgroundColor: day.isSpecialDay ? `var(--color-${day.specialDayColor})` : 'none',
                  color: day.isSpecialDay
                    ? getColorNumber(day.specialDayColor) < 500
                      ? 'var(--color-for-white-bg-font)'
                      : '#fff'
                    : 'none'
                }"
                @click="() => $emit('update:modelValue', new Date(day.date).getTime())"
              >
                {{ day.label }}
              </div>

              <template
                v-if="day.isSpecialDay && specialDays.find(specialDay => specialDay.date === day.date)?.name"
                #content
              >
                {{ specialDays.find(specialDay => specialDay.date === day.date)?.name }}
              </template>
            </AntTooltip>
          </AntSkeleton>
        </template>
      </template>
    </div>
  </div>
</template>
