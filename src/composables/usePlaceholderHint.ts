import {
  computed,
  toValue,
  useId,
  type MaybeRefOrGetter,
} from 'vue';
import {
  firstPlaceholder,
  normalizePlaceholder,
  type PlaceholderSource,
} from './useAnimatedPlaceholder';

/**
 * Internal helper (not part of the public API).
 *
 * An animated placeholder changes constantly, so screen readers get a stable hint instead:
 * the first entry of the array, rendered in a visually hidden element and referenced via aria-describedby.
 * Without an array (string / undefined) nothing is rendered and aria-describedby stays untouched.
 */
export function usePlaceholderHint(
  source: MaybeRefOrGetter<PlaceholderSource>,
  existingDescribedBy?: MaybeRefOrGetter<string | undefined>,
) {
  const hintId = `${useId()}-placeholder-hint`;
  const hintText = computed(() => {
    const value = toValue(source);

    return Array.isArray(normalizePlaceholder(value)) ? firstPlaceholder(value) : undefined;
  });
  const describedBy = computed(() => {
    const existing = toValue(existingDescribedBy);

    if (hintText.value === undefined) {
      return existing;
    }

    return existing ? `${existing} ${hintId}` : hintId;
  });

  return {
    hintId,
    hintText,
    describedBy,
  };
}
