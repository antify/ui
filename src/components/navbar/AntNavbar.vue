<script setup lang="ts">

import {computed} from 'vue';
import type {NavbarItemTypes} from './__types/NavbarItem.types';
import AntNavbarItem from './AntNavbarItem.vue';

defineProps<{
  navbarItems: NavbarItemTypes[]
}>();

const containerClasses = computed(() => ({
  'w-full h-full bg-white flex flex-col gap-1 p-1.5': true,
}));

</script>

<template>
  <div :class="containerClasses">
    <AntNavbarItem
      v-for="(navbarItem, index) in navbarItems"
      :key="`navbar-item-${index}`"
      :navbar-item="navbarItem"
    />
  </div>
</template>
