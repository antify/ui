<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * Selected month index (0-11).
     */
    value: number;
    highlightCurrentMonth?: boolean;
  }>(),
  {
    highlightCurrentMonth: true,
  },
);
defineEmits([
  'select',
]);

const months = [
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
const currentMonthIndex = new Date().getMonth();
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <div
      v-for="(month, index) in months"
      :key="index"
      class="p-2 text-center text-for-white-bg-font cursor-pointer rounded-md transition-colors"
      :class="{
        'outline outline-primary-500': highlightCurrentMonth && index === currentMonthIndex,
        'bg-primary-500 text-info-500-font hover:bg-primary-300 hover:text-info-300-font': index === value,
        'hover:bg-base-200 hover:text-base-200-font': index !== value,
      }"
      @click="$emit('select', index)"
    >
      {{ month }}
    </div>
  </div>
</template>
