<script setup lang="ts">
import {InputState} from '../../enums';
import AntDialog from './AntDialog.vue';
import {useVModel} from '@vueuse/core';

const emit = defineEmits(['update:open', 'close', 'confirm']);
const props = defineProps<{
  open: boolean,
  entity: string
}>();

const _open = useVModel(props, 'open', emit);
</script>

<template>
  <AntDialog
    v-model:open="_open"
    :state="InputState.danger"
    title="Delete"
    confirm-text="Delete"
    data-e2e="delete-dialog"
    @confirm="() => $emit('confirm')"
    @close="() => $emit('close')"
  >
    <div>
      Do you really want to delete <span class="font-semibold">{{ entity }}</span>?
    </div>
  </AntDialog>
</template>
