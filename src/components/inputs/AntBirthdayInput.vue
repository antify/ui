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
  invalidDateMessage?: string;
  leapYearMessage?: string;
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
  invalidDateMessage: 'Selected date is not valid. Please select a new day.',
  leapYearMessage: 'Not a leap year. Please select a valid day for February.',
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
const warningMessage = ref<string | null>(null);
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

const yearsList = computed(() => {
  const currentYear = new Date().getFullYear();

  return Array.from({
    length: 120,
  }, (_, i) => currentYear - i);
});

const monthsList = computed(() => [
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
]);

const daysList = computed(() => {
  const y = selectedYear.value || 2024;
  const m = selectedMonth.value || 1;
  const daysInMonth = new Date(y, m, 0).getDate();

  return Array.from({
    length: daysInMonth,
  }, (_, i) => i + 1);
});

watch(() => props.modelValue, (val) => {
  if (val) {
    const [
      y,
      m,
      d,
    ] = val.split('-');
    selectedYear.value = parseInt(y, 10);
    selectedMonth.value = parseInt(m, 10);
    selectedDay.value = parseInt(d, 10);
  } else {
    selectedYear.value = null;
    selectedMonth.value = null;
    selectedDay.value = null;
  }
}, {
  immediate: true,
});

function toggleMenu() {
  if (props.disabled || props.readonly || props.skeleton) return;
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    warningMessage.value = null;

    if (!selectedDay.value) {
      currentView.value = 'day';
    } else if (!selectedMonth.value) {
      currentView.value = 'month';
    } else if (!selectedYear.value) {
      currentView.value = 'year';
    } else {
      currentView.value = 'day';
    }
  }
}

function closeMenu() {
  isOpen.value = false;

  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    const maxDays = new Date(selectedYear.value, selectedMonth.value, 0).getDate();

    if (selectedDay.value > maxDays) {
      selectedDay.value = maxDays;
    }

    const formattedDate = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`;
    emit('update:modelValue', formattedDate);
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
    closeMenu();
  }
}

function onSelectDay(d: number) {
  selectedDay.value = d;
  warningMessage.value = null;

  if (!selectedMonth.value) currentView.value = 'month';
  else if (!selectedYear.value) currentView.value = 'year';
  else tryEmitAndClose();
}

function onSelectMonth(m: number) {
  selectedMonth.value = m;

  const y = selectedYear.value || 2024;
  const maxDays = new Date(y, m, 0).getDate();

  if (selectedDay.value && selectedDay.value > maxDays) {
    selectedDay.value = null;
    const monthName = monthsList.value.find(item => item.value === m)?.label || 'this month';
    warningMessage.value = `${props.invalidDateMessage} (${monthName})`;
    currentView.value = 'day';

    return;
  }

  if (!selectedYear.value) {
    currentView.value = 'year';
  } else if (!selectedDay.value) {
    currentView.value = 'day';
  } else {
    tryEmitAndClose();
  }
}

function onSelectYear(y: number) {
  selectedYear.value = y;

  const m = selectedMonth.value || 1;
  const maxDays = new Date(y, m, 0).getDate();

  if (selectedDay.value && selectedDay.value > maxDays) {
    selectedDay.value = null;
    warningMessage.value = `${y} - ${props.leapYearMessage}`;
    currentView.value = 'day';

    return;
  }

  if (!selectedMonth.value) {
    currentView.value = 'month';
  } else if (!selectedDay.value) {
    currentView.value = 'day';
  } else {
    tryEmitAndClose();
  }
}

const displayValue = computed(() => {
  if (selectedDay.value && selectedMonth.value && selectedYear.value) {
    return `${String(selectedDay.value).padStart(2, '0')}.${String(selectedMonth.value).padStart(2, '0')}.${selectedYear.value}`;
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
                  @click="currentView = 'month'"
                >
                  {{ tabLabels?.month || 'Month' }}
                </AntButton>

                <AntButton
                  :expanded="true"
                  :grouped="Grouped.right"
                  :state="currentView === 'year' ? State.primary : State.base"
                  :filled="currentView === 'year'"
                  @click="currentView = 'year'"
                >
                  {{ tabLabels?.year || 'Year' }}
                </AntButton>
              </div>

              <div
                v-if="warningMessage && currentView === 'day'"
                class="mb-2 p-2 text-xs text-danger-700 bg-danger-100 border border-danger-200 rounded"
              >
                {{ warningMessage }}
              </div>

              <div class="overflow-y-auto pr-1 custom-scrollbar max-h-[240px]">
                <div
                  v-if="currentView === 'day'"
                  class="grid grid-cols-7 gap-1 h-max"
                >
                  <AntButton
                    v-for="day in daysList"
                    :key="day"
                    :expanded="true"
                    :state="selectedDay === day ? State.primary : State.base"
                    :filled="selectedDay === day"
                    @click="onSelectDay(day)"
                  >
                    {{ day }}
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
                    @click="onSelectMonth(month.value)"
                  >
                    {{ month.label }}
                  </AntButton>
                </div>

                <div
                  v-if="currentView === 'year'"
                  class="grid grid-cols-3 gap-1 h-max"
                >
                  <AntButton
                    v-for="year in yearsList"
                    :key="year"
                    :expanded="true"
                    :state="selectedYear === year ? State.primary : State.base"
                    :filled="selectedYear === year"
                    @click="onSelectYear(year)"
                  >
                    {{ year }}
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
