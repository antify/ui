<script lang="ts" setup>
import {
  onMounted, ref,
} from 'vue';
import AntButton from '../AntButton.vue';

const props = defineProps<{
  value: number;
}>();
defineEmits([
  'select',
]);

const currentYear = new Date().getFullYear();
const years = Array.from({
  length: 41,
}, (_, i) => currentYear + 20 - i);
const yearListRef = ref<HTMLDivElement | null>(null);

/**
 * Scroll to the selected year.
 */
function scrollToYear() {
  const currentYearElement = yearListRef.value?.querySelector(`[data-year="${props.value}"]`);

  currentYearElement?.scrollIntoView({
    block: 'center',
  });
}

onMounted(scrollToYear);

defineExpose({
  scrollToYear,
});
</script>

<template>
  <div class="flex flex-col">
    <div
      ref="yearListRef"
      class="h-64 overflow-y-auto flex flex-col gap-2 p-2 border-b border-base-300"
    >
      <div
        v-for="year in years"
        :key="year"
        :data-year="year"
        class="p-2 text-center text-for-white-bg-font cursor-pointer rounded-md transition-colors"
        :class="{
          'bg-primary-500 text-info-500-font hover:bg-primary-300 hover:text-info-300-font': year === value,
          'hover:bg-base-200 hover:text-base-200-font': year !== value,
          'outline outline-primary-500': year === currentYear,
        }"
        @click="$emit('select', year)"
      >
        {{ year }}
      </div>
    </div>

    <div class="p-2 flex justify-center">
      <AntButton
        expanded
        @click="$emit('select', currentYear)"
      >
        {{ currentYear }}
      </AntButton>
    </div>
  </div>
</template>
