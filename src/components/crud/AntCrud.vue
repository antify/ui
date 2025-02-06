<script setup lang="ts">
withDefaults(defineProps<{
  showDetail?: boolean;
}>(), {
  showDetail: false,
});
</script>

<template>
  <div
    class="flex w-full h-full"
    data-e2e="crud"
  >
    <div
      class="left-content h-full flex flex-col bg-base-300 gap-px overflow-hidden"
      :class="{'w-[40rem]': showDetail, 'w-full': !showDetail}"
    >
      <div class="bg-white">
        <slot name="search-section" />
      </div>

      <div class="bg-white flex-grow h-px overflow-hidden">
        <slot name="table-section" />
      </div>

      <div class="bg-white">
        <slot name="table-nav-section" />
      </div>
    </div>

    <Transition name="right-content">
      <div
        v-if="showDetail"
        class="flex flex-col gap-px border-l border-base-300 overflow-hidden"
        :class="{'w-full': showDetail}"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.left-content {
  transition: width .5s ease-in-out, opacity .5s ease;
}

.right-content-enter-active {
  transition: width .5s ease-in-out, opacity .5s ease .3s;
}

.right-content-enter-from {
  width: 0;
  opacity: 0;
}

.right-content-enter-to {
  width: 100%;
  opacity: 1;
}

.right-content-leave-active {
  transition: width .5s ease-in-out, opacity .2s ease;
}

.right-content-leave-from {
  width: 100%;
  opacity: 1;
}

.right-content-leave-to {
  width: 0;
  opacity: 0;
}
</style>
