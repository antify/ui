<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import {
  autoUpdate, flip, offset, useFloating,
} from '@floating-ui/vue';
import {
  onClickOutside,
} from '@vueuse/core';
import {
  faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import AntField from '../forms/AntField.vue';
import AntButton from '../AntButton.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  Grouped, InputState, State,
} from '../../enums';
import {
  ButtonSize,
} from '../__types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  messages?: string[];
  nullable?: boolean;
  placeholder?: string;
  monthLabels?: string[];
  tabLabels?: {
    day: string;
    month: string;
    year: string;
  };
  tooltipNotLeapYear?: string;
  tooltipInvalidMonth?: string;
  tooltipSelectDayFirst?: string;
  tooltipSelectMonthFirst?: string;
}>(), {
  state: InputState.base,
  size: Size.md,
  disabled: false,
  readonly: false,
  skeleton: false,
  messages: () => [],
  nullable: false,
  placeholder: 'Select date',
  monthLabels: () => [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  tabLabels: () => ({
    day: 'Day',
    month: 'Month',
    year: 'Year',
  }),
  tooltipNotLeapYear: 'The 29th of February is only available during leap years. The year you are trying to select is not a leap year.',
  tooltipInvalidMonth: 'You have selected a day (like the 30th or 31st) that does not exist in this month. Please select a different month.',
  tooltipSelectDayFirst: 'To ensure a valid date is formed, please begin by selecting the day before moving on to the month.',
  tooltipSelectMonthFirst: 'You must select a month first. This helps us ensure the final date you select is completely valid.',
});

const emit = defineEmits([
  'update:modelValue',
  'validate',
]);

const selectedDay = ref<number | null>(null);
const selectedMonth = ref<number | null>(null);
const selectedYear = ref<number | null>(null);
const isOpen = ref(false);
const currentView = ref<'day' | 'month' | 'year'>('day');
const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);
const {
  floatingStyles,
} = useFloating(reference, floating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: [
        'top-start',
      ],
    }),
  ],
});

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const yearsList = computed(() => {
  const currentYear = new Date().getFullYear();

  return Array.from({
    length: 120,
  }, (_, i) => {
    const year = currentYear - i;
    let disabled = false;
    let tooltip: string | null = null;

    if (selectedDay.value === 29 && selectedMonth.value === 2) {
      disabled = !isLeapYear(year);

      if (disabled) {
        tooltip = props.tooltipNotLeapYear;
      }
    }

    return {
      value: year,
      disabled,
      tooltip,
    };
  });
});
const monthsList = computed(() => {
  return [
    {
      value: 1,
      label: props.monthLabels?.[0],
    },
    {
      value: 2,
      label: props.monthLabels?.[1],
    },
    {
      value: 3,
      label: props.monthLabels?.[2],
    },
    {
      value: 4,
      label: props.monthLabels?.[3],
    },
    {
      value: 5,
      label: props.monthLabels?.[4],
    },
    {
      value: 6,
      label: props.monthLabels?.[5],
    },
    {
      value: 7,
      label: props.monthLabels?.[6],
    },
    {
      value: 8,
      label: props.monthLabels?.[7],
    },
    {
      value: 9,
      label: props.monthLabels?.[8],
    },
    {
      value: 10,
      label: props.monthLabels?.[9],
    },
    {
      value: 11,
      label: props.monthLabels?.[10],
    },
    {
      value: 12,
      label: props.monthLabels?.[11],
    },
  ].map(month => {
    let disabled = false;
    let tooltip: string | null = null;

    if (selectedDay.value === 31) {
      disabled = [
        2,
        4,
        6,
        9,
        11,
      ].includes(month.value);
    } else if (selectedDay.value === 30) {
      disabled = month.value === 2;
    }

    if (disabled) {
      tooltip = props.tooltipInvalidMonth;
    }

    return {
      ...month,
      disabled,
      tooltip,
    };
  });
});
const daysList = computed(() => {
  return Array.from({
    length: 31,
  }, (_, i) => ({
    value: i + 1,
    disabled: false,
    tooltip: null,
  }));
});
const isPlaceholder = computed(() => displayValue.value === props.placeholder);
const displayValue = computed(() => {
  if (selectedDay.value && selectedMonth.value && selectedYear.value) {
    return `${String(selectedDay.value).padStart(2, '0')}.${String(selectedMonth.value).padStart(2, '0')}.${selectedYear.value}`;
  }

  return props.placeholder;
});

const isValidDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

function clearInternalState() {
  selectedYear.value = null;
  selectedMonth.value = null;
  selectedDay.value = null;
}

function syncFromProps(val: string | null) {
  if (val) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(val)) {
      console.warn(`[DateComponent Warning]: Invalid date format provided ("${val}"). Expected format is YYYY-MM-DD.`);
      clearInternalState();

      emit('update:modelValue', null);
      emit('validate', null);

      return;
    }

    const [
      yearStr,
      monthStr,
      dayStr,
    ] = val.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (!isValidDate(year, month, day)) {
      console.warn(`[DateComponent Warning]: Physically impossible date provided ("${val}").`);
      clearInternalState();

      emit('update:modelValue', null);
      emit('validate', null);

      return;
    }

    selectedYear.value = year;
    selectedMonth.value = month;
    selectedDay.value = day;
  } else {
    clearInternalState();
  }
}

function onTabClick(view: 'day' | 'month' | 'year') {
  if (view === 'day' && currentView.value !== 'day') {
    clearInternalState();
  }

  else if (view === 'month' && currentView.value !== 'month') {
    selectedMonth.value = null;
    selectedYear.value = null;
  }

  currentView.value = view;
}

function toggleMenu() {
  if (props.disabled || props.readonly || props.skeleton) {
    return;
  }

  if (isOpen.value) {
    closeMenu();
  } else {
    isOpen.value = true;
    clearInternalState();
    currentView.value = 'day';
  }
}

function closeMenu() {
  isOpen.value = false;
  syncFromProps(props.modelValue);
  emit('validate', props.modelValue);
}

function clearValue() {
  clearInternalState();
  emit('update:modelValue', null);
  emit('validate', null);
}

function tryEmitAndClose() {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    const formattedDate = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`;
    emit('update:modelValue', formattedDate);
    emit('validate', formattedDate);
    isOpen.value = false;
  }
}

function onSelectDay(day: number) {
  selectedDay.value = day;

  if (selectedMonth.value) {
    if (day === 31 && [
      2,
      4,
      6,
      9,
      11,
    ].includes(selectedMonth.value)) {
      selectedMonth.value = null;
      selectedYear.value = null;
    } else if (day === 30 && selectedMonth.value === 2) {
      selectedMonth.value = null;
      selectedYear.value = null;
    }
  }

  if (day === 29 && selectedMonth.value === 2 && selectedYear.value && !isLeapYear(selectedYear.value)) {
    selectedYear.value = null;
  }

  if (!selectedMonth.value) {
    currentView.value = 'month';
  } else if (!selectedYear.value) {
    currentView.value = 'year';
  } else {
    tryEmitAndClose();
  }
}

function onSelectMonth(month: number) {
  selectedMonth.value = month;

  if (selectedDay.value === 29 && month === 2 && selectedYear.value && !isLeapYear(selectedYear.value)) {
    selectedYear.value = null;
  }

  if (!selectedYear.value) {
    currentView.value = 'year';
  } else {
    tryEmitAndClose();
  }
}

function onSelectYear(year: number) {
  selectedYear.value = year;
  tryEmitAndClose();
}

onClickOutside(floating, (e) => {
  if (reference.value?.contains(e.target as Node)) {
    return;
  }

  closeMenu();
});

watch(() => props.modelValue, syncFromProps, {
  immediate: true,
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :messages="messages"
    data-e2e="birthday-input"
  >
    <div class="flex w-full">
      <div
        ref="reference"
        class="relative flex-grow"
      >
        <AntButton
          :expanded="true"
          :size="(size as unknown as ButtonSize)"
          :state="(state as unknown as State)"
          :skeleton="skeleton"
          :disabled="disabled"
          :readonly="readonly"
          :grouped="(nullable && modelValue) ? Grouped.left : Grouped.none"
          class="text-left font-normal"
          v-bind="$attrs"
          @click="toggleMenu"
        >
          <span
            class="flex-grow truncate"
            :class="{'text-base-500': isPlaceholder, 'text-black': !isPlaceholder}"
          >
            {{ displayValue }}
          </span>
        </AntButton>

        <teleport to="body">
          <div
            v-if="isOpen"
            ref="floating"
            class="w-[300px] border border-base-300 bg-white shadow-md z-[90] flex flex-col rounded-md"
            :style="floatingStyles"
          >
            <div class="p-3 flex flex-col">
              <div class="flex w-full mb-3 -space-x-px">
                <AntButton
                  :expanded="true"
                  :grouped="Grouped.left"
                  :state="currentView === 'day' ? State.primary : State.base"
                  :filled="currentView === 'day'"
                  @click="onTabClick('day')"
                >
                  {{ tabLabels?.day || 'Day' }}
                </AntButton>

                <AntButton
                  :expanded="true"
                  :grouped="Grouped.center"
                  :state="currentView === 'month' ? State.primary : State.base"
                  :filled="currentView === 'month'"
                  :disabled="!selectedDay"
                  @click="onTabClick('month')"
                >
                  {{ tabLabels?.month || 'Month' }}
                  <template
                    v-if="!selectedDay"
                    #tooltip-content
                  >
                    {{ tooltipSelectDayFirst }}
                  </template>
                </AntButton>

                <AntButton
                  :expanded="true"
                  :grouped="Grouped.right"
                  :state="currentView === 'year' ? State.primary : State.base"
                  :filled="currentView === 'year'"
                  :disabled="!selectedMonth"
                  @click="onTabClick('year')"
                >
                  {{ tabLabels?.year || 'Year' }}
                  <template
                    v-if="!selectedMonth"
                    #tooltip-content
                  >
                    {{ tooltipSelectMonthFirst }}
                  </template>
                </AntButton>
              </div>

              <div class="overflow-y-auto pr-1 max-h-[240px]">
                <div
                  v-if="currentView === 'day'"
                  class="grid grid-cols-7 gap-1 h-max"
                >
                  <AntButton
                    v-for="day in daysList"
                    :key="day.value"
                    :expanded="true"
                    :disabled="day.disabled"
                    @click="onSelectDay(day.value)"
                  >
                    {{ day.value }}
                  </AntButton>
                </div>

                <div
                  v-if="currentView === 'month'"
                  class="grid grid-cols-3 gap-1 h-max"
                >
                  <AntButton
                    v-for="month in monthsList"
                    :key="month.value"
                    :expanded="true"
                    :disabled="month.disabled"
                    @click="onSelectMonth(month.value)"
                  >
                    {{ month.label }}
                    <template
                      v-if="month.tooltip"
                      #tooltip-content
                    >
                      {{ month.tooltip }}
                    </template>
                  </AntButton>
                </div>

                <div
                  v-if="currentView === 'year'"
                  class="grid grid-cols-3 gap-1 h-max"
                >
                  <AntButton
                    v-for="year in yearsList"
                    :key="year.value"
                    :expanded="true"
                    :disabled="year.disabled"
                    @click="onSelectYear(year.value)"
                  >
                    {{ year.value }}
                    <template
                      v-if="year.tooltip"
                      #tooltip-content
                    >
                      {{ year.tooltip }}
                    </template>
                  </AntButton>
                </div>
              </div>
            </div>
          </div>
        </teleport>
      </div>

      <AntButton
        v-if="nullable && modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :icon-left="faMultiply"
        :grouped="Grouped.right"
        :state="(state as unknown as State)"
        :skeleton="skeleton"
        :size="(size as unknown as ButtonSize)"
        @click="clearValue"
      />
    </div>
  </AntField>
</template>

<style scoped>
  .ant-birthday-input {
    display: contents;
  }
</style>
