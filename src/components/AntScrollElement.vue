<script setup lang="ts">
</script>

<template>
  <div class="scroll-container overflow-auto">
    <slot/>
  </div>
</template>

<style>
/*TODO:: Auslagern in eine globale css datei?*/
.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: #AAAAAA;

}

::-webkit-scrollbar-thumb:hover {
  background-color: #777;
  transition: background-color 1s ease-in-out;
}

::-webkit-scrollbar-corner {
  border-radius: 10px;

}
</style>
