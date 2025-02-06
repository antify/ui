<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '../../enums';
import {
  faPencil,
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
  canEdit?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canEdit: true,
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :state="State.base"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faPencil : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canEdit"
    :tooltip-position="tooltipPosition"
    data-e2e="edit-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Edit
    </template>

    <template #invalidPermissionTooltipContent>
      You have no permission to edit entries.<br>
      Please contact your administrator.
    </template>

    <template #tooltipContent>
      Edit entry
    </template>
  </AntActionButton>
</template>
