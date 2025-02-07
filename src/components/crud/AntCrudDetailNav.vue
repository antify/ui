<script setup lang="ts">
// TODO:: fix why tabs are not full height in story
import type {
  TabItem,
} from '../tabs/__types/AntTabItem.types';
import AntTabs from '../tabs/AntTabs.vue';
import AntDeleteButton from '../buttons/AntDeleteButton.vue';
import AntDeleteDialog from '../dialogs/AntDeleteDialog.vue';
import {
  ref,
} from 'vue';
import {
  Position,
} from '../../enums';

defineEmits([
  'delete',
]);
withDefaults(defineProps<{
  tabItems?: TabItem[];
  deleteButtonDisabled?: boolean;
  getEntityName: () => string;
  canDelete?: boolean;
  showDeleteButton?: boolean;
  skeleton?: boolean;
}>(), {
  tabItems: () => [],
  deleteButtonDisabled: false,
  canDelete: true,
  showDeleteButton: true,
  skeleton: false,
});

const dialogOpen = ref(false);
</script>

<template>
  <div
    class="flex justify-between items-stretch gap-2 bg-white h-[52px]"
    data-e2e="crud-detail-nav"
  >
    <slot name="tabs">
      <AntTabs
        :tab-items="tabItems"
        :skeleton="skeleton"
      />
    </slot>

    <div class="flex gap-2 pr-2 py-2">
      <slot name="buttons">
        <slot name="before-delete-button" />

        <AntDeleteButton
          v-if="showDeleteButton"
          :disabled="deleteButtonDisabled || !canDelete"
          :skeleton="skeleton"
          filled
          :can-delete="canDelete"
          :invalid-permission-tooltip-position="Position.left"
          @click="() => dialogOpen = true"
        />

        <slot name="after-delete-button" />
      </slot>
    </div>

    <AntDeleteDialog
      v-model:open="dialogOpen"
      :entity="getEntityName()"
      @confirm="$emit('delete')"
    />
  </div>
</template>
