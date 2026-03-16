<script lang="ts" setup>
import {
  computed, ref, watch, onMounted,
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
  type Country,
} from '../../constants/countries';
import {
  vOnClickOutside,
} from '@vueuse/components';
import AntField from '../forms/AntField.vue';
import AntSelectMenu from './Elements/AntSelectMenu.vue';
import AntSearch from './AntSearch.vue';
import AntIcon from '../AntIcon.vue';
import AntSkeleton from '../AntSkeleton.vue';

const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  countries: Country[];
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
  showFlags?: boolean;
  isGrouped?: boolean;
  autoSelectDefault?: boolean;
  emptyStateMessage?: string;
  optionValueKey?: keyof Country;
  showDialCodeInMenu: boolean;
  showIsoCode: boolean;
}>(), {
  size: Size.md,
  state: InputState.base,
  maxHeight: '350px',
  placeholder: 'Select country',
  searchable: true,
  grouped: Grouped.none,
  showFlags: true,
  isGrouped: false,
  autoSelectDefault: true,
  emptyStateMessage: 'No countries found',
  optionValueKey: 'value',
  showDialCodeInMenu: false,
  showIsoCode: false,
});

const emit = defineEmits([
  'update:modelValue',
  'select',
]);

const isOpen = ref(false);
const searchQuery = ref<string | null>(null);
const inputRef = ref<HTMLElement | null>(null);
const focusedItem = ref<string | number | null>(null);
const selectMenuRef = ref<any>(null);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const defaultCountry = computed(() => props.countries.find(c => c.isDefault));
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.countries;
  }

  const query = searchQuery.value.toLowerCase();

  return props.countries.filter(c => c.label.toLowerCase().includes(query) ||
    c.value.toLowerCase().includes(query) ||
    c.dialCode.includes(query));
});
const selectedCountry = computed(() => props.countries.find(c => String(c[props.optionValueKey]) === String(props.modelValue)) || null);
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

function onSelect(val: string | number | null) {
  const country = props.countries.find(c => String(c[props.optionValueKey]) === String(val));

  emit('update:modelValue', val);
  emit('select', country || null);

  isOpen.value = false;
  inputRef.value?.focus();
}

function toggleMenu(e: MouseEvent) {
  if (props.disabled || props.readonly) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  if (isOpen.value) {
    inputRef.value?.focus();
  }

  isOpen.value = !isOpen.value;
}

function onClickOutside(e: Event) {
  if (!isOpen.value) {
    return;
  }

  const menuElement = selectMenuRef.value?.floating;
  const triggerElement = inputRef.value;

  if ((menuElement && menuElement.contains(e.target as Node)) || (triggerElement && triggerElement.contains(e.target as Node))) {
    return;
  }

  isOpen.value = false;
}

onMounted(() => {
  if (props.autoSelectDefault && !props.modelValue && defaultCountry.value) {
    const defaultValue = defaultCountry.value[props.optionValueKey];
    onSelect(defaultValue as string | number);
  }
});

watch(isOpen, (val) => {
  if (!val) {
    searchQuery.value = null;
  }
});
</script>

<template>
  <component
    :is="rootComponent"
    :label="isGrouped ? undefined : label"
    :description="isGrouped ? undefined : description"
    :state="state"
    :size="size"
    :skeleton="skeleton"
    class="ant-country"
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
        :option-value-key="(optionValueKey as string)"
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
          >{{ (option as Country).flag }}</span>
        </template>

        <template #contentRight="option">
          <slot
            name="right"
            :option="(option as Country)"
          >
            <div class="ml-auto flex items-center gap-2">
              <span
                v-if="showIsoCode"
                class="text-md font-mono uppercase text-base-400"
              >
                {{ (option as Country).value }}
              </span>

              <span
                v-if="showDialCodeInMenu"
                class="text-md text-base-400"
              >
                {{ (option as Country).dialCode }}
              </span>
            </div>
          </slot>
        </template>

        <template #empty>
          <div class="p-2 text-center text-sm text-base-500">
            {{ emptyStateMessage }}
          </div>
        </template>
      </AntSelectMenu>
    </div>
  </component>
</template>
