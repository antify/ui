<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import {
  faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  Size, InputState, Grouped,
} from '../../enums';
import {
  IconSize,
} from '../__types';
import {
  type CountryOption,
} from './__types/AntCountry.types';
import {
  vOnClickOutside,
} from '@vueuse/components';
import AntField from '../forms/AntField.vue';
import AntSelectMenu from './Elements/AntSelectMenu.vue';
import AntSearch from './AntSearch.vue';
import AntIcon from '../AntIcon.vue';
import AntSkeleton from '../AntSkeleton.vue';

const props = withDefaults(defineProps<{
  modelValue: string | null;
  countries: CountryOption[];
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  maxHeight?: string;
  searchPlaceholder: string;
  searchable?: boolean;
  grouped?: Grouped;
}>(), {
  size: Size.md,
  state: InputState.base,
  maxHeight: '350px',
  placeholder: 'Select country',
  searchable: true,
  grouped: Grouped.none,
});

const emit = defineEmits([
  'update:modelValue',
  'select',
]);

const isOpen = ref(false);
const searchQuery = ref<string | null>(null);
const inputRef = ref<HTMLElement | null>(null);
const focusedItem = ref<string | number | null>(null);
const searchComponentRef = ref<any>(null);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.countries.map(c => ({
      value: c.value,
      label: c.label,
      dialCode: c.dialCode,
      flag: c.flag,
    }));
  }

  const query = searchQuery.value.toLowerCase();

  return props.countries
    .filter(c => c.label.toLowerCase().includes(query) ||
      c.value.toLowerCase().includes(query) ||
      c.dialCode.includes(query))
    .map(c => ({
      value: c.value,
      label: c.label,
      dialCode: c.dialCode,
      flag: c.flag,
    }));
});

const selectedCountry = computed(() => props.countries.find(c => c.value === props.modelValue) || null);

watch(isOpen, (val) => {
  if (!val) {
    searchQuery.value = null;
  }
});

function onSelect(val: string | number | null) {
  emit('update:modelValue', val);
  emit('select', props.countries.find(c => c.value === val));
  isOpen.value = false;
}

function toggleMenu(e: MouseEvent) {
  e.preventDefault();

  if (props.disabled || props.readonly) {
    return;
  }

  e.stopPropagation();

  if (isOpen.value) {
    inputRef.value?.focus();
  }

  isOpen.value = !isOpen.value;
}

const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 bg-white focus:ring-primary-200',
    [InputState.success]: 'outline-success-500 bg-success-100 focus:ring-success-200',
    [InputState.info]: 'outline-info-500 bg-info-100 focus:ring-info-200',
    [InputState.warning]: 'outline-warning-500 bg-warning-100 focus:ring-warning-200',
    [InputState.danger]: 'outline-danger-500 bg-danger-100 focus:ring-danger-200',
  };

  return {
    'flex items-center justify-between transition-colors border-none outline relative w-full cursor-pointer': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    [variants[props.state]]: true,
    invisible: props.skeleton,
    'opacity-50 cursor-not-allowed': props.disabled,
    'read-only:cursor-default': props.readonly,
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    'rounded-md': true,
  };
});

const arrowClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-for-white-bg-font',
    [InputState.success]: 'text-success-100-font',
    [InputState.info]: 'text-info-100-font',
    [InputState.warning]: 'text-warning-100-font',
    [InputState.danger]: 'text-danger-100-font',
  };

  return variants[props.state];
});

const skeletonGrouped = computed(() => {
  return props.grouped || Grouped.none;
});

const iconSize = computed(() => {
  if (props.size === Size.lg || props.size === Size.md || props.size === Size.sm) {
    return IconSize.sm;
  }

  return IconSize.xs;
});

const selectMenuRef = ref<any>(null);

function onClickOutside(e: Event) {
  if (!isOpen.value) {
    return;
  }

  const menuElement = selectMenuRef.value?.floating;
  const triggerElement = inputRef.value;

  if (
    (menuElement && menuElement.contains(e.target as Node)) ||
    (triggerElement && triggerElement.contains(e.target as Node))
  ) {
    return;
  }

  isOpen.value = false;
}
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :state="state"
    :size="size"
    :skeleton="skeleton"
  >
    <div
      v-on-click-outside="onClickOutside"
      class="relative w-full"
    >
      <AntSelectMenu
        ref="selectMenuRef"
        v-model:open="isOpen"
        v-model:focused="focusedItem"
        :options="filteredOptions"
        :model-value="modelValue"
        :input-ref="inputRef"
        :max-height="maxHeight"
        :size="size"
        @select-element="onSelect"
      >
        <template #contentBefore>
          <div
            v-if="searchable"
            class="p-2 border-b border-base-200 bg-white"
          >
            <AntSearch
              ref="searchComponentRef"
              v-model="searchQuery"
              :size="Size.sm"
              :placeholder="searchPlaceholder"
              class="w-full"
            />
          </div>
        </template>

        <AntSkeleton
          :visible="skeleton"
          rounded
          :grouped="skeletonGrouped"
          class="w-full"
        >
          <div
            ref="inputRef"
            :class="inputClasses"
            :tabindex="disabled || readonly || skeleton ? -1 : 0"
            @mousedown="toggleMenu"
          >
            <div class="flex items-center gap-2 overflow-hidden">
              <template v-if="selectedCountry">
                <span class="text-lg">{{ selectedCountry.flag }}</span>
                <span class="truncate font-medium">{{ selectedCountry.dialCode }}</span>
                <span class="truncate text-base-500">{{ selectedCountry.label }}</span>
              </template>
              <span
                v-else
                class="text-base-400"
              >
                {{ placeholder }}
              </span>
            </div>

            <AntIcon
              :icon="isOpen ? faChevronUp : faChevronDown"
              class="ml-2"
              :class="arrowClasses"
              :size="iconSize"
            />
          </div>

          <template #contentLeft="option">
            <span class="text-lg">{{ option.flag }}</span>
          </template>

          <template #contentRight="option">
            <span class="text-xs text-base-400 ml-auto">{{ option.dialCode }}</span>
          </template>

          <template #empty>
            <div class="p-4 text-center text-sm text-base-500">
              No countries found
            </div>
          </template>
        </antskeleton>
      </AntSelectMenu>
    </div>
  </AntField>
</template>
