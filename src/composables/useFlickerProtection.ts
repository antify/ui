import {
  ref,
  watch,
  type Ref,
  type ComputedRef,
} from 'vue';

/**
 * Add flicker protection to a ref or computed ref to ensure
 * the value change is not too fast and does not cause flicker.
 *
 * [refToWatch = true]
 * [visible = false] [if refToWatch = false -> Finish] [visible = true] [freeze now, ignore any change]   [visible = refToWatch]        [unlock]
 * [------------------ flickerThreshold ------------------][------------------ minShowTime ------------------]
 *
 * This logic is separated into 4 phases:
 * - null: The initial phase where the value is hidden.
 * - threshold: The initial phase where the value is hidden and waits for flicker threshold time.
 * If in this phase, refToWatch changes to false, the process get canceled.
 * - minShowTime: The phase where the value is shown for a minimum time.
 * - over: The final phase where the value is shown or hidden based on the refToWatch.
 *
 * @param refToWatch - The ref or computed ref to watch for changes.
 * @param minShowTime - The minimum time (in ms) the value should remain visible.
 * @param flickerThreshold - The threshold (in ms) to ignore rapid changes.
 * @returns A ref that manages the visibility state with flicker protection.
 */
export const useFlickerProtection = (
  refToWatch: Ref<boolean> | ComputedRef<boolean>,
  minShowTime: number = 300,
  flickerThreshold: number = 50,
): Ref<boolean> => {
  const visible = ref(refToWatch.value);
  const phase: Ref<'threshold' | 'minShowTime' | 'over' | null> = ref(null);

  function startThresholdPhase() {
    phase.value = 'threshold';

    // Hide initially and wait flicker threshold time.
    visible.value = false;

    setTimeout(() => {
      // If meanwhile the refToWatch is still true,
      // show the element and start min show time phase.
      if (refToWatch.value) {
        startMinShowTimePhase();
      }
    }, flickerThreshold);
  }

  function startMinShowTimePhase() {
    phase.value = 'minShowTime';
    visible.value = true;

    setTimeout(() => {
      visible.value = refToWatch.value;
      phase.value = refToWatch.value ? 'over' : null;
    }, minShowTime);
  }

  watch(
    refToWatch,
    (newValue) => {
      if (phase.value === 'minShowTime') {
        // Ignore any changes in this phase.
        return;
      }

      if (phase.value === null && newValue) {
        return startThresholdPhase();
      }

      if (phase.value === 'threshold' && !newValue) {
        phase.value = null;

        return visible.value = false;
      }

      if (phase.value === 'over' && !newValue) {
        phase.value = null;
        visible.value = false;
      }
    },
    {
      immediate: true,
    },
  );

  return visible;
};
