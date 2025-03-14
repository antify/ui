<template>
  <div
    class="flex flex-col bg-base-300 gap-px h-full"
    data-e2e="crud-detail"
  >
    <slot name="header" />

    <div class="grow h-px overflow-y-auto bg-base-100">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>
