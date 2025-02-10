<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '../../enums';
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

defineEmits([
  'click',
  'blur',
]);
withDefaults(defineProps<{
  iconVariant?: boolean;
  size?: Size;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  expanded?: boolean;
  canDelete?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canDelete: true,
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :state="State.danger"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faTrash : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canDelete"
    :tooltip-position="tooltipPosition"
    data-e2e="delete-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Delete
    </template>

    <template #invalidPermissionTooltipContent>
      You have no permission to delete entries.<br>
      Please contact your administrator.
    </template>

    <template #tooltipContent>
      Delete entry
    </template>
  </AntActionButton>
</template>
