// @vitest-environment jsdom
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  defineComponent,
  h,
  nextTick,
  ref,
  type Ref,
} from 'vue';
import {
  mount,
} from '@vue/test-utils';
import {
  PLACEHOLDER_DELETE_DELAY,
  PLACEHOLDER_HOLD_DELAY,
  PLACEHOLDER_PAUSE_DELAY,
  PLACEHOLDER_TYPE_DELAY,
  useAnimatedPlaceholder,
  type PlaceholderSource,
} from '../useAnimatedPlaceholder';

function setup(initial: PlaceholderSource, initialPaused = false) {
  const source = ref<PlaceholderSource>(initial);
  const paused = ref(initialPaused);
  let result!: Ref<string | undefined>;
  const wrapper = mount(defineComponent({
    setup() {
      result = useAnimatedPlaceholder(source, paused);

      return () => h('div');
    },
  }));

  return {
    source,
    paused,
    wrapper,
    result,
  };
}

describe('useAnimatedPlaceholder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('passes strings and undefined through without timers', () => {
    const {
      result,
      source,
    } = setup('Search');

    expect(result.value).toBe('Search');
    expect(vi.getTimerCount()).toBe(0);

    source.value = undefined;
    expect(result.value).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('treats an empty array and empty entries like no placeholder', () => {
    const {
      result,
    } = setup([]);

    expect(result.value).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);

    const second = setup([
      '',
      '',
    ]);

    expect(second.result.value).toBeUndefined();
  });

  it('types, holds, deletes and continues with the next text in a loop', async () => {
    const {
      result,
    } = setup([
      'ab',
      'c',
    ]);

    expect(result.value).toBe('');

    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('a');
    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('ab');

    vi.advanceTimersByTime(PLACEHOLDER_HOLD_DELAY - 1);
    expect(result.value).toBe('ab');
    vi.advanceTimersByTime(1);
    expect(result.value).toBe('a');
    vi.advanceTimersByTime(PLACEHOLDER_DELETE_DELAY);
    expect(result.value).toBe('');

    vi.advanceTimersByTime(PLACEHOLDER_PAUSE_DELAY);
    expect(result.value).toBe('c');

    vi.advanceTimersByTime(PLACEHOLDER_HOLD_DELAY);
    expect(result.value).toBe('');
    vi.advanceTimersByTime(PLACEHOLDER_PAUSE_DELAY);
    expect(result.value).toBe('a');
  });

  it('does not split emojis', () => {
    const {
      result,
    } = setup([
      '👍👍',
      'x',
    ]);

    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('👍');
  });

  it('types a single entry once and keeps it', () => {
    const {
      result,
    } = setup([
      'hi',
    ]);

    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY * 2);
    expect(result.value).toBe('hi');
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(PLACEHOLDER_HOLD_DELAY * 3);
    expect(result.value).toBe('hi');
  });

  it('pauses while paused is true and resumes afterwards', async () => {
    const {
      result,
      paused,
    } = setup([
      'abc',
    ], true);

    vi.advanceTimersByTime(10000);
    expect(result.value).toBe('');
    expect(vi.getTimerCount()).toBe(0);

    paused.value = false;
    await nextTick();
    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('a');

    paused.value = true;
    await nextTick();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('restarts when the texts change and ignores an identical array', async () => {
    const {
      result,
      source,
    } = setup([
      'abc',
      'def',
    ]);

    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('a');

    source.value = [
      'abc',
      'def',
    ];
    await nextTick();
    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('ab');

    source.value = [
      'xyz',
      'uvw',
    ];
    await nextTick();
    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(result.value).toBe('x');

    source.value = 'plain';
    await nextTick();
    expect(result.value).toBe('plain');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears all timers on unmount', () => {
    const {
      wrapper,
    } = setup([
      'abc',
      'def',
    ]);

    vi.advanceTimersByTime(PLACEHOLDER_TYPE_DELAY);
    expect(vi.getTimerCount()).toBe(1);

    wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('switches whole texts without typing when reduced motion is preferred', () => {
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
    }));

    const {
      result,
    } = setup([
      'one',
      'two',
    ]);

    expect(result.value).toBe('one');
    vi.advanceTimersByTime(PLACEHOLDER_HOLD_DELAY);
    expect(result.value).toBe('two');
    vi.advanceTimersByTime(PLACEHOLDER_HOLD_DELAY);
    expect(result.value).toBe('one');
  });
});
