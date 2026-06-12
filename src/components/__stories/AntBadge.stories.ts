import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  CornerPosition, Size, State,
} from '../../enums';
import AntBadge from '../AntBadge.vue';
import AntButton from '../AntButton.vue';

const meta: Meta<typeof AntBadge> = {
  title: 'Components/Badge',
  component: AntBadge,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    position: {
      control: {
        type: 'select',
      },
      options: Object.values(CornerPosition),
    },
    dot: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntBadge>;

// ---------------------------------------------------------------------------
// Wrapper-mode stories — badge wraps an AntButton so positioning is visible.
// ---------------------------------------------------------------------------

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntBadge,
      AntButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-8"><AntBadge v-bind="args"><AntButton label="Inbox" /></AntBadge></div>',
  }),
  args: {},
};

export const Danger: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    state: State.danger,
    label: '3',
  },
};

export const Success: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    state: State.success,
    label: '12',
  },
};

export const TopLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    position: CornerPosition.topLeft,
    label: '!',
    state: State.warning,
  },
};

export const BottomRight: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    position: CornerPosition.bottomRight,
    label: '99+',
    state: State.danger,
  },
};

export const DotMode: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    dot: true,
    state: State.danger,
  },
};

// ---------------------------------------------------------------------------
// Standalone-mode stories — badge rendered with no slot content.
// ---------------------------------------------------------------------------

export const StandaloneDot: Story = {
  render: (args) => ({
    components: {
      AntBadge,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-8"><AntBadge v-bind="args" /></div>',
  }),
  args: {
    dot: true,
    state: State.danger,
    size: Size.md,
  },
};

export const StandaloneLabel: Story = {
  render: (args) => ({
    components: {
      AntBadge,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-8"><AntBadge v-bind="args" /></div>',
  }),
  args: {
    label: 'New',
    state: State.primary,
    size: Size.sm,
  },
};

export const StandaloneSkeleton: Story = {
  render: (args) => ({
    components: {
      AntBadge,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-8"><AntBadge v-bind="args" /></div>',
  }),
  args: {
    skeleton: true,
    state: State.danger,
    label: '3',
  },
};
