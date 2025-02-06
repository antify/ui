<script setup lang="ts">
/**
 * It is not possible to smoothly animate height or max-height with CSS transitions not using a fixed value
 * like 'height: 1rem';
 *
 * This component does it via javascript.
 */

// @ts-nocheck
// TODO:: fix typescript errors
/**
 * @param {HTMLElement} element
 */
function beforeEnter(element) {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = '0px';
    }

    element.style.display = '';
    // element.style.display = null;
  });
}

/**
 * @param {HTMLElement} element
 */
function enter(element) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = `${element.scrollHeight}px`;
    });
  });
}

/**
 * @param {HTMLElement} element
 */
function afterEnter(element) {
  element.style.height = '';
  // element.style.height = null;
}

/**
 * @param {HTMLElement} element
 */
function beforeLeave(element) {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = `${element.offsetHeight}px`;
    }
  });
}

/**
 * @param {HTMLElement} element
 */
function leave(element) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = '0px';
    });
  });
}

/**
 * @param {HTMLElement} element
 */
function afterLeave(element) {
  element.style.height = '';
  // element.style.height = null;
}
</script>

<template>
  <transition
    enter-active-class="enter-active"
    leave-active-class="leave-active"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<style scoped>
.enter-active,
.leave-active {
  overflow: hidden;
  transition: height .4s ease-in-out;
}
</style>
