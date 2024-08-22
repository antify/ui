<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {Position, Size, Grouped, State} from '../../enums';
import {faFloppyDisk, faPlus} from '@fortawesome/free-solid-svg-icons';

defineEmits(['click', 'blur']);
withDefaults(defineProps<{
  iconVariant?: boolean;
  size?: Size;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  expanded?: boolean;
  canSave?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canSave: true
});
</script>

<template>
  <AntActionButton
    :filled="true"
    :state="State.primary"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faFloppyDisk : undefined"
    :icon-right="iconVariant ? faPlus : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :submit="true"
    :has-permission="canSave"
    :tooltip-position="tooltipPosition"
    data-e2e="save-and-new-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Save and new
    </template>

    <template #invalidPermissionTooltipContent>
      You have no permission to save entries.<br>
      Please contact your administrator.
    </template>

    <template #tooltipContent>
      Save entry
    </template>
  </AntActionButton>
</template>
