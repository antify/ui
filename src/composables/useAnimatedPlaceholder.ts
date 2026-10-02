import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue';

export type PlaceholderSource = string | string[] | undefined;

/** Delay between two typed characters in ms. */
export const PLACEHOLDER_TYPE_DELAY = 60;
/** How long a fully typed text stays visible in ms. */
export const PLACEHOLDER_HOLD_DELAY = 2000;
/** Delay between two deleted characters in ms. */
export const PLACEHOLDER_DELETE_DELAY = 30;
/** Pause between a fully deleted text and the next one in ms. */
export const PLACEHOLDER_PAUSE_DELAY = 400;

/**
 * Splits a text into user-perceived characters (grapheme clusters), so flags and ZWJ emojis are not cut apart.
 * Falls back to code points where Intl.Segmenter is not available.
 */
function splitGraphemes(text: string): string[] {
  // Intl.Segmenter is not part of the TypeScript lib target of this package.
  const Segmenter = (Intl as unknown as {
    Segmenter?: new (locale?: string, options?: {
      granularity: 'grapheme';
    }) => {
      segment: (input: string) => Iterable<{
        segment: string;
      }>;
    };
  }).Segmenter;

  if (typeof Segmenter === 'function') {
    return Array.from(new Segmenter(undefined, {
      granularity: 'grapheme',
    }).segment(text), (part) => part.segment);
  }

  return Array.from(text);
}

/**
 * Strips empty entries from an array. Strings and undefined are returned unchanged.
 * An array without any usable entry results in undefined (behaves like no placeholder).
 */
export function normalizePlaceholder(source: PlaceholderSource): string | string[] | undefined {
  if (!Array.isArray(source)) {
    return source;
  }

  const texts = source.filter((text) => typeof text === 'string' && text !== '');

  return texts.length > 0 ? texts : undefined;
}

/**
 * Returns the text that should be used where a single string is needed
 * (accessibility hint, label fallback, width calculation): the string itself or the first array entry.
 */
export function firstPlaceholder(source: PlaceholderSource): string | undefined {
  const normalized = normalizePlaceholder(source);

  return Array.isArray(normalized) ? normalized[0] : normalized;
}

/**
 * Turns a placeholder into the currently visible text.
 *
 * - string / undefined: passed through unchanged, no timers.
 * - array with several entries: types each text, holds it, deletes it, continues with the next one (endless).
 * - array with one entry: types it once and keeps it.
 * - empty array: undefined (like no placeholder).
 *
 * The animation starts on mount (the server renders an empty text) and pauses while `paused` is true.
 */
export function useAnimatedPlaceholder(
  source: MaybeRefOrGetter<PlaceholderSource>,
  paused?: MaybeRefOrGetter<boolean>,
): Ref<string | undefined> {
  const animated = ref('');
  const mounted = ref(false);
  const normalized = computed(() => normalizePlaceholder(toValue(source)));
  // Arrays are compared by content, so a new array literal with the same texts does not restart the animation.
  const key = computed(() => JSON.stringify(normalized.value));
  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function getMediaQuery() {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : undefined;
  }

  function prefersReducedMotion() {
    return getMediaQuery()?.matches === true;
  }

  function schedule(fn: () => void, delay: number) {
    timer = setTimeout(fn, delay);
  }

  function start() {
    clear();

    const texts = normalized.value;

    if (!Array.isArray(texts) || !mounted.value || toValue(paused)) {
      return;
    }

    if (prefersReducedMotion()) {
      let reducedIndex = 0;
      const showNext = () => {
        animated.value = texts[reducedIndex];
        reducedIndex = (reducedIndex + 1) % texts.length;

        if (texts.length > 1) {
          schedule(showNext, PLACEHOLDER_HOLD_DELAY);
        }
      };

      showNext();

      return;
    }

    let index = 0;
    let chars = splitGraphemes(texts[0]);
    let length = 0;

    animated.value = '';

    const type = () => {
      length++;
      animated.value = chars.slice(0, length).join('');

      if (length < chars.length) {
        schedule(type, PLACEHOLDER_TYPE_DELAY);
      } else if (texts.length > 1) {
        schedule(erase, PLACEHOLDER_HOLD_DELAY);
      }
    };
    const erase = () => {
      length--;
      animated.value = chars.slice(0, length).join('');

      if (length > 0) {
        schedule(erase, PLACEHOLDER_DELETE_DELAY);
      } else {
        index = (index + 1) % texts.length;
        chars = splitGraphemes(texts[index]);
        schedule(type, PLACEHOLDER_PAUSE_DELAY);
      }
    };

    schedule(type, PLACEHOLDER_TYPE_DELAY);
  }

  if (getCurrentInstance()) {
    const onMotionChange = () => start();
    let motionQuery: MediaQueryList | undefined;

    onMounted(() => {
      mounted.value = true;
      motionQuery = getMediaQuery();
      motionQuery?.addEventListener?.('change', onMotionChange);
      start();
    });
    onBeforeUnmount(() => {
      mounted.value = false;
      motionQuery?.removeEventListener?.('change', onMotionChange);
      clear();
    });
  }

  watch([
    key,
    () => !!toValue(paused),
  ], () => {
    start();
  });

  return computed(() => {
    const value = normalized.value;

    if (!Array.isArray(value)) {
      return value;
    }

    return animated.value;
  });
}
