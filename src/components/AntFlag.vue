<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  FlagSize,
} from './__types/AntFlag.types';
import AntSkeleton from './AntSkeleton.vue';
import 'flagpack/dist/flagpack.css';

const props = withDefaults(defineProps<{
  /**
   * ISO 3166-1 alpha-2 country code (e.g. 'us', 'ua', 'af')
   */
  isoCode: string;
  size?: FlagSize;
  skeleton?: boolean;
  round?: boolean;
}>(), {
  size: FlagSize.sm,
  skeleton: false,
  round: false,
});

const containerClasses = computed(() => ({
  'inline-flex items-center justify-center relative flex-shrink-0 overflow-hidden aspect-[4/3]': true,
  'w-3': props.size === FlagSize.xs2,
  'w-4': props.size === FlagSize.xs,
  'w-5': props.size === FlagSize.sm,
  'w-7': props.size === FlagSize.md,
  'w-9': props.size === FlagSize.lg,
  'w-12': props.size === FlagSize.xl3,
  'rounded-full': props.round,
  'rounded-sm': !props.round,
}));

const flagClasses = computed(() => {
  const code = props.isoCode?.toLowerCase();

  return {
    fp: true,
    [code]: !!code,
    'fp-rounded': props.round,
    'w-full h-full block': true,
  };
});

onMounted(() => {
  handleEnumValidation(props.size, FlagSize, 'size');
});
</script>

<template>
  <span
    :class="containerClasses"
    data-e2e="flag"
  >
    <AntSkeleton
      :visible="skeleton"
      :rounded="round"
      absolute
    >
      <span
        v-if="isoCode"
        :class="flagClasses"
      />
    </AntSkeleton>
  </span>
</template>

<style scoped>
.fp {
  width: 100% !important;
  height: 100% !important;
  background-size: cover;
  background-position: center;
  border: none;
}
</style>
