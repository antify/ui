<script setup lang="ts">
/**
 * ButtonPlayground.vue
 *
 * Self-documenting code test: this file proves that AntButton's full API
 * (props, enums, slots, defaults) can be consumed solely from its JSDoc
 * annotations and source code — no external documentation needed.
 *
 * @see src/components/AntButton.vue
 */
import AntButton from './components/AntButton.vue';
import {
  Grouped,
  Position,
  State,
} from './enums';
</script>

<template>
  <div class="space-y-8 p-8">
    <!-- ------------------------------------------------------------------ -->
    <!-- Case 1: Enum Props                                                 -->
    <!-- Reads @values and @default from the `state` and `filled` props.    -->
    <!--   state → @values State.base | State.primary | ... @default base   -->
    <!--   filled → @default false                                          -->
    <!-- Renders a primary filled button.                                   -->
    <!-- ------------------------------------------------------------------ -->
    <section>
      <h2 class="mb-2 text-lg font-semibold">
        Case 1 — Primary Filled Button
      </h2>
      <AntButton
        :state="State.primary"
        :filled="true"
      >
        Primary Filled
      </AntButton>
    </section>

    <!-- ------------------------------------------------------------------ -->
    <!-- Case 2: Layout & Grouping                                          -->
    <!-- Reads @values from the `grouped` prop and the computed logic that   -->
    <!-- removes inner border-radius for seamless grouping.                 -->
    <!--   grouped → @values Grouped.none | Grouped.left | ... @default none-->
    <!-- Two buttons in a flex row: left + right.                           -->
    <!-- ------------------------------------------------------------------ -->
    <section>
      <h2 class="mb-2 text-lg font-semibold">
        Case 2 — Grouped Buttons
      </h2>
      <div class="flex flex-row">
        <AntButton
          :grouped="Grouped.left"
          :state="State.primary"
          :filled="true"
        >
          Left
        </AntButton>
        <AntButton
          :grouped="Grouped.right"
          :state="State.primary"
          :filled="true"
        >
          Right
        </AntButton>
      </div>
    </section>

    <!-- ------------------------------------------------------------------ -->
    <!-- Case 3: Slots Verification                                         -->
    <!-- Reads @values from `tooltipPosition` and the named slot definitions-->
    <!-- at the bottom of the template.                                     -->
    <!--   tooltipPosition → @values Position.top | ... @default bottom     -->
    <!--   @slot tooltip-content — Custom content for the tooltip popover   -->
    <!-- Button with tooltip at top and custom tooltip content.             -->
    <!-- ------------------------------------------------------------------ -->
    <section>
      <h2 class="mb-2 text-lg font-semibold">
        Case 3 — Tooltip with Custom Slot Content
      </h2>
      <AntButton
        :state="State.secondary"
        :tooltip-position="Position.top"
        :tooltip-delay="800"
      >
        Hover for tooltip

        <template #tooltip-content>
          <div class="text-sm">
            Custom tooltip content rendered via the
            <code class="rounded bg-base-200 px-1 font-mono">tooltip-content</code>
            slot.
          </div>
        </template>
      </AntButton>
    </section>
  </div>
</template>