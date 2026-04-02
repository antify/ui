<script lang="ts" setup>
import {
  computed, ref, nextTick,
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
  COUNTRIES, CountryValueKey, Locale,
} from '../../constants/countries';
import type {
  Country,
} from '../../types';
import AntField from '../forms/AntField.vue';
import AntSelectMenu from './Elements/AntSelectMenu.vue';
import AntSearch from './AntSearch.vue';
import AntIcon from '../AntIcon.vue';
import AntSkeleton from '../AntSkeleton.vue';

const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  countries?: Country[];
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  maxHeight?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  grouped?: Grouped;
  showFlags?: boolean;
  isGrouped?: boolean;
  emptyStateMessage?: string;
  /**
   * Key from the Country object used as the value for modelValue.
   * Useful when you need to bind the select to dialCode, numericCode or ISO value.
   * @default 'value'
   */
  optionValueKey?: CountryValueKey;
  showDialCodeInMenu?: boolean;
  showIsoCode?: boolean;
  locale?: Locale;
}>(), {
  size: Size.md,
  state: InputState.base,
  maxHeight: '350px',
  placeholder: 'Select country',
  searchable: true,
  grouped: Grouped.none,
  showFlags: true,
  isGrouped: false,
  emptyStateMessage: 'No countries found',
  optionValueKey: CountryValueKey.value,
  showDialCodeInMenu: false,
  showIsoCode: false,
  countries: () => COUNTRIES,
  locale: Locale.en,
});

const emit = defineEmits([
  'update:modelValue',
  'select',
]);

const isOpen = ref(false);
const searchQuery = ref<string | null>(null);
const inputRef = ref<HTMLElement | null>(null);
const focusedItem = ref<string | number | null>(null);
const selectMenuRef = ref<InstanceType<typeof AntSelectMenu> | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const localizedCountries = computed(() => {
  const currentLocale = (props.locale || Locale.en).toLowerCase();

  return props.countries.map(country => ({
    ...country,
    label: country.label[currentLocale] || country.label['en'] || Object.values(country.label)[0],
  }));
});
const filteredOptions = computed(() => {
  const options = localizedCountries.value;
  const query = searchQuery.value?.trim().toLowerCase();

  const filtered = !props.searchable || !query
    ? options
    : options.filter(country => {
      const label = country.label.toLowerCase();
      const isoCode = country.value.toLowerCase();
      const dialCode = country.dialCode.toLowerCase();

      return label.includes(query) ||
        isoCode.includes(query) ||
        dialCode.includes(query);
    });

  return filtered.map(country => ({
    ...country,
    isoCode: country.value,
    value: country[props.optionValueKey] as string | number,
  }));
});
const selectedCountry = computed(() => {
  return localizedCountries.value.find(country => String(country[props.optionValueKey]) === String(props.modelValue)) || null;
});
const rootComponent = computed(() => (props.isGrouped ? 'div' : AntField));
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
    'opacity-50 cursor-not-allowed': props.disabled,
    'read-only:cursor-default': props.readonly,
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    'rounded-md': props.grouped === Grouped.none,
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none': props.grouped === Grouped.right,
  };
});
const placeholderClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-base-500',
    [InputState.success]: 'text-success-700',
    [InputState.info]: 'text-info-700',
    [InputState.warning]: 'text-warning-700',
    [InputState.danger]: 'text-danger-700',
  };

  return {
    'select-none text-ellipsis overflow-hidden whitespace-nowrap w-full': true,
    [variants[props.state]]: true,
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
const skeletonGrouped = computed(() => props.grouped || Grouped.none);
const iconSize = computed(() => (props.size === Size.lg || props.size === Size.md || props.size === Size.sm ? IconSize.sm : IconSize.xs));
const fieldProps = computed(() => {
  if (props.isGrouped) {
    return {};
  }

  return {
    label: props.label,
    description: props.description,
    state: props.state,
    size: props.size,
    skeleton: props.skeleton,
  };
});

function onSelect(val: string | number | null) {
  const country = localizedCountries.value.find(country => String(country[props.optionValueKey]) === String(val));

  emit('update:modelValue', val);
  emit('select', country || null);

  isOpen.value = false;
  searchQuery.value = null;
  inputRef.value?.focus();
}

async function toggleMenu(e: MouseEvent) {
  if (props.disabled || props.readonly) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    if (props.searchable) {
      await nextTick();

      searchInputRef.value?.focus();
    }
  } else {
    searchQuery.value = null;
    inputRef.value?.focus();
  }
}
</script>

<template>
  <component
    :is="rootComponent"
    v-bind="fieldProps"
  >
    <div
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
        @click-outside="searchQuery = null"
      >
        <template #contentBefore>
          <div
            v-if="searchable"
            class="p-2 border-b border-base-300 bg-white"
          >
            <AntSearch
              v-model:input-ref="searchInputRef"
              v-model="searchQuery"
              :size="Size.lg"
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
                <span
                  v-if="showFlags"
                  class="text-lg leading-none"
                >{{ selectedCountry.flag }}</span>

                <span class="truncate font-medium">{{ selectedCountry.dialCode }}</span>

                <span
                  v-if="!isGrouped"
                  class="truncate"
                >{{ selectedCountry.label }}</span>
              </template>

              <div
                v-else
                :class="placeholderClasses"
              >
                {{ placeholder }}
              </div>
            </div>

            <AntIcon
              :icon="isOpen ? faChevronUp : faChevronDown"
              class="ml-2 flex-shrink-0"
              :class="arrowClasses"
              :size="iconSize"
            />
          </div>
        </AntSkeleton>

        <template #contentLeft="option">
          <span
            v-if="showFlags"
            class="text-lg"
          >{{ (option as any).flag }}</span>
        </template>

        <template #contentRight="option">
          <slot
            name="right"
            :option="(option as any)"
          >
            <div class="ml-auto flex items-center gap-2">
              <span
                v-if="showIsoCode"
                class="text-md font-mono uppercase text-for-white-bg-font"
              >
                {{ (option as any).isoCode }}
              </span>

              <span
                v-if="showDialCodeInMenu"
                class="text-md text-for-white-bg-font"
              >
                {{ (option as any).dialCode }}
              </span>
            </div>
          </slot>
        </template>

        <template #empty>
          <div class="p-2 text-center text-sm text-for-white-bg-font">
            {{ emptyStateMessage }}
          </div>
        </template>
      </AntSelectMenu>
    </div>
  </component>
</template>
