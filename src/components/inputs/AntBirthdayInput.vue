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
  faChevronDown,
  faChevronUp,
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
  tooltipInvalidDay?: string;
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
  tooltipNotLeapYear: 'Not a leap year',
  tooltipInvalidMonth: 'Day not available in this month',
  tooltipInvalidDay: 'Not available in selected month',
  tooltipSelectDayFirst: 'Please select a day first',
  tooltipSelectMonthFirst: 'Please select a month first',
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

onClickOutside(floating, (e) => {
  if (reference.value?.contains(e.target as Node)) {
    return;
  }

  closeMenu();
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
  let maxValidDay = 31;

  if (selectedYear.value && selectedMonth.value) {
    maxValidDay = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
  } else if (selectedMonth.value) {
    maxValidDay = selectedMonth.value === 2 ? 29 : new Date(2024, selectedMonth.value, 0).getDate();
  }

  return Array.from({
    length: 31,
  }, (_, i) => {
    const day = i + 1;
    const disabled = day > maxValidDay;
    const tooltip = disabled ? props.tooltipInvalidDay : null;

    return {
      value: day,
      disabled,
      tooltip,
    };
  });
});

watch(() => props.modelValue, (val) => {
  if (val) {
    const [
      year,
      month,
      day,
    ] = val.split('-');
    selectedYear.value = parseInt(year, 10);
    selectedMonth.value = parseInt(month, 10);
    selectedDay.value = parseInt(day, 10);
  } else {
    selectedYear.value = null;
    selectedMonth.value = null;
    selectedDay.value = null;
  }
}, {
  immediate: true,
});

function toggleMenu() {
  if (props.disabled || props.readonly || props.skeleton) {
    return;
  }

  if (isOpen.value) {
    closeMenu();
  } else {
    isOpen.value = true;
    selectedDay.value = null;
    selectedMonth.value = null;
    selectedYear.value = null;
    currentView.value = 'day';
  }
}

function closeMenu() {
  isOpen.value = false;

  if (props.modelValue) {
    const [
      year,
      month,
      day,
    ] = props.modelValue.split('-');
    selectedYear.value = parseInt(year, 10);
    selectedMonth.value = parseInt(month, 10);
    selectedDay.value = parseInt(day, 10);
  } else {
    selectedYear.value = null;
    selectedMonth.value = null;
    selectedDay.value = null;
  }

  emit('validate', props.modelValue);
}

function clearValue() {
  selectedYear.value = null;
  selectedMonth.value = null;
  selectedDay.value = null;
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

const displayValue = computed(() => {
  if (selectedDay.value && selectedMonth.value && selectedYear.value) {
    return `${String(selectedDay.value).padStart(2, '0')}.${String(selectedMonth.value).padStart(2, '0')}.${selectedYear.value}`;
  }

  if (props.modelValue) {
    const [
      year,
      month,
      day,
    ] = props.modelValue.split('-');
    if (year && month && day) {
      return `${day}.${month}.${year}`;
    }
  }

  return props.placeholder;
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
          :icon-right="isOpen ? faChevronUp : faChevronDown"
          :grouped="(nullable && modelValue) ? Grouped.left : Grouped.none"
          class="text-left font-normal"
          @click="toggleMenu"
        >
          <span
            class="flex-grow truncate"
            :class="{'text-base-500': !modelValue, 'text-black': modelValue}"
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
                  @click="currentView = 'day'"
                >
                  {{ tabLabels?.day || 'Day' }}
                </AntButton>

                <AntButton
                  :expanded="true"
                  :grouped="Grouped.center"
                  :state="currentView === 'month' ? State.primary : State.base"
                  :filled="currentView === 'month'"
                  :disabled="!selectedDay"
                  @click="currentView = 'month'"
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
                  @click="currentView = 'year'"
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

              <div class="overflow-y-auto pr-1 custom-scrollbar max-h-[240px]">
                <div
                  v-if="currentView === 'day'"
                  class="grid grid-cols-7 gap-1 h-max"
                >
                  <AntButton
                    v-for="day in daysList"
                    :key="day.value"
                    :expanded="true"
                    :state="selectedDay === day.value ? State.primary : State.base"
                    :filled="selectedDay === day.value"
                    :disabled="day.disabled"
                    @click="onSelectDay(day.value)"
                  >
                    {{ day.value }}
                    <template
                      v-if="day.tooltip"
                      #tooltip-content
                    >
                      {{ day.tooltip }}
                    </template>
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
                    :state="selectedMonth === month.value ? State.primary : State.base"
                    :filled="selectedMonth === month.value"
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
                    :state="selectedYear === year.value ? State.primary : State.base"
                    :filled="selectedYear === year.value"
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
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
</style>
