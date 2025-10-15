<script setup lang="ts">
import {
  computed, useSlots,
} from 'vue';
import AntNavbar from '../navbar/AntNavbar.vue';
import type {
  RouteLocationRaw,
} from 'vue-router';
import type {
  NavbarItemTypes,
} from '../navbar/__types/NavbarItem.types';

defineProps<{
  navbarItems: NavbarItemTypes[];
  logoRoute?: RouteLocationRaw;
}>();

const hasLogoImageSlot = computed(() => useSlots()['logo-image'] || false);
</script>

<template>
  <div class="flex gap-px bg-base-300 h-screen min-w-full overflow-y-hidden">
    <div class="flex flex-col gap-px bg-base-300 w-52 shrink-0">
      <component
        :is="logoRoute ? 'RouterLink' : 'div'"
        v-if="hasLogoImageSlot"
        :to="logoRoute"
        class="bg-white min-h-[60px] flex justify-center items-center p-2.5"
        data-e2e="nav-left-layout-logo"
      >
        <slot name="logo-image" />
      </component>

      <AntNavbar
        :navbar-items="navbarItems"
      />
    </div>

    <div class="w-px grow">
      <slot />
    </div>
  </div>
</template>
