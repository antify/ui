<script setup lang="ts">
import type {
  NavbarItemTypes,
} from './__types/NavbarItem.types';
import {
  computed, ref,
} from 'vue';
import AntIcon from '../AntIcon.vue';
import {
  faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import AntTransitionCollapseHeight from '../transitions/AntTransitionCollapseHeight.vue';

const props = defineProps<{
  navbarItem: NavbarItemTypes;
}>();

const itemClasses = computed(() => ({
  'w-full text-sm p-1.5 rounded-md cursor-pointer flex items-center flex-nowrap gap-1': true,
  'transition-colors hover:bg-base-100': true,
  'text-primary-500': props.navbarItem.active,
}));

const open = ref(false);

function itemClick(): void {
  if (props.navbarItem.click) {
    props.navbarItem.click();
  }

  if (props.navbarItem.children && props.navbarItem.children.length > 0) {
    open.value = !open.value;
  }
}
</script>

<template>
  <component
    :is="navbarItem.to ? 'router-link' : 'div'"
    :to="navbarItem.to"
    v-bind="$attrs"
    :class="itemClasses"
    @click="itemClick"
  >
    <AntIcon
      v-if="navbarItem.icon"
      :icon="navbarItem.icon"
      :color="navbarItem.active ? 'text-primary-500' : 'text-for-white-bg-font'"
    />

    <div class="flex-grow select-none">
      {{ navbarItem.label }}
    </div>

    <div
      v-if="navbarItem.children && navbarItem.children.length > 0"
    >
      <AntIcon
        v-if="!open"
        :icon="faChevronDown"
        :color="navbarItem.active ? 'text-primary-500' : 'text-for-white-bg-font'"
      />

      <AntIcon
        v-if="open"
        :icon="faChevronUp"
        :color="navbarItem.active ? 'text-primary-500' : 'text-for-white-bg-font'"
      />
    </div>
  </component>

  <AntTransitionCollapseHeight
    v-if="navbarItem.children && navbarItem.children.length > 0"
  >
    <div v-show="open">
      <AntNavbarItem
        v-for="(child, index) in navbarItem.children"
        :key="`navbar-item-child-${index}`"
        :navbar-item="child"
        class="pl-[30px]"
      />
    </div>
  </AntTransitionCollapseHeight>
</template>
