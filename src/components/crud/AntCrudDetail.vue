<template>
  <div
    class="flex flex-col bg-base-300 gap-px h-full"
    data-e2e="crud-detail"
  >
    <slot name="header" />

    <div class="flex-grow bg-white h-full overflow-y-auto">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>
