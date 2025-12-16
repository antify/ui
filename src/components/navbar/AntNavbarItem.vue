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
import AntTooltip from '../AntTooltip.vue';
import {
  Position,
} from '../../enums/Position.enum';

const props = defineProps<{
  navbarItem: NavbarItemTypes;
}>();

const shouldRenderTooltip = computed(() =>
  props.navbarItem.disabled && !!props.navbarItem.tooltipMessage
);

const itemClasses = computed(() => ({
  'w-full text-sm p-1.5 rounded-md cursor-pointer flex items-center flex-nowrap gap-1': true,
  'transition-colors hover:bg-base-100': true,
  'text-primary-500': props.navbarItem.active,
  'cursor-default opacity-50': props.navbarItem.disabled,
  'transition-colors hover:bg-base-100 cursor-pointer': !props.navbarItem.disabled,
}));

const open = ref(false);

function itemClick(): void {
  if (props.navbarItem.disabled) {
    return;
  }

  if (props.navbarItem.click) {
    props.navbarItem.click();
  }

  if (props.navbarItem.children && props.navbarItem.children.length > 0) {
    open.value = !open.value;
  }
}
</script>

<template>
  <template v-if="shouldRenderTooltip">
    <AntTooltip
      :position="Position.right"
      :delay="400"
    >
      <component
        :is="navbarItem.to && !navbarItem.disabled ? 'router-link' : 'div'"
        :to="navbarItem.to && !navbarItem.disabled ? navbarItem.to : undefined"
        v-bind="$attrs"
        :class="itemClasses"
        @click="itemClick"
        data-e2e="navbar-item"
      >
        <AntIcon
          v-if="navbarItem.icon"
          :icon="navbarItem.icon"
          :color="navbarItem.active ? 'text-primary-500' : 'text-for-white-bg-font'"
        />

        <div class="grow select-none">
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

      <template #content>
        <div v-if="navbarItem.disabled">
          {{ navbarItem.tooltipMessage }}
        </div>
      </template>
    </AntTooltip>
  </template>

  <component
    v-else
    :is="navbarItem.to && !navbarItem.disabled ? 'router-link' : 'div'"
    :to="navbarItem.to && !navbarItem.disabled ? navbarItem.to : undefined"
    v-bind="$attrs"
    :class="itemClasses"
    @click="itemClick"
    data-e2e="navbar-item"
  >
    <AntIcon
      v-if="navbarItem.icon"
      :icon="navbarItem.icon"
      :color="navbarItem.active ? 'text-primary-500' : 'text-for-white-bg-font'"
    />

    <div class="grow select-none">
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
