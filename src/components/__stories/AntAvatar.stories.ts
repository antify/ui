import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size, State,
} from '../../enums';
import AntAvatar from '../AntAvatar.vue';

const meta: Meta<typeof AntAvatar> = {
  title: 'Components/Avatar',
  component: AntAvatar,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
  },
  args: {
    size: Size.md,
    state: State.base,
    disabled: false,
    label: 'JD',
  },
};

export default meta;

type Story = StoryObj<typeof AntAvatar>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntAvatar,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><AntAvatar v-bind="args" /></div>',
  }),
  args: {},
};

export const WithImage: Story = {
  render: (args) => ({
    components: {
      AntAvatar,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><AntAvatar v-bind="args" /></div>',
  }),
  args: {
    src: 'https://i.pravatar.cc/80?img=11',
    alt: 'User avatar',
    label: '',
  },
};

export const Primary: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    state: State.primary,
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const NoLabel: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    label: '',
  },
};

// ---------------------------------------------------------------------------
// Figma Export — HTML-to-Figma flat matrix of all component permutations.
// This story is intentionally isolated from meta.args so that every prop
// is statically hardcoded in the template. This guarantees Figma plugins
// receive a clean, predictable, flat-layout grid of all visual variants.
// ---------------------------------------------------------------------------
export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => ({
    components: {
      AntAvatar,
    },
    setup() {
      const stateValues = Object.values(State);
      const sizeValues = Object.values(Size);

      return {
        stateValues,
        sizeValues,
        State,
        Size,
      };
    },
    template: `
      <div class="flex flex-col gap-6 p-4">
        <!-- States × Visual Mode Matrix -->
        <div class="flex flex-col gap-1">
          <div class="text-xs font-bold text-base-500 uppercase tracking-wider mb-1">
            States (Default Size)
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <AntAvatar
              v-for="s in stateValues"
              :key="'state-' + s"
              :state="s"
              size="md"
              label="JD"
            />
          </div>
        </div>

        <!-- Sizes Lineup -->
        <div class="flex flex-col gap-1">
          <div class="text-xs font-bold text-base-500 uppercase tracking-wider mb-1">
            Sizes
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <AntAvatar
              v-for="sz in sizeValues"
              :key="'size-' + sz"
              state="base"
              :size="sz"
              label="JD"
            />
          </div>
        </div>

        <!-- Functional States -->
        <div class="flex flex-col gap-1">
          <div class="text-xs font-bold text-base-500 uppercase tracking-wider mb-1">
            Functional States
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <AntAvatar state="primary" size="md" label="JD">Active</AntAvatar>
            <AntAvatar state="primary" size="md" label="JD" disabled>Disabled</AntAvatar>
            <AntAvatar state="primary" size="md" label="JD" skeleton>Skeleton</AntAvatar>
            <AntAvatar state="primary" size="md" label="JD" readonly>Readonly</AntAvatar>
          </div>
        </div>

        <!-- Content Layouts -->
        <div class="flex flex-col gap-1">
          <div class="text-xs font-bold text-base-500 uppercase tracking-wider mb-1">
            Content Layouts
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <AntAvatar state="primary" size="md" label="AB" />
            <AntAvatar state="primary" size="md" label="JKL" />
            <AntAvatar
              state="primary"
              size="md"
              src="https://i.pravatar.cc/80?img=12"
            />
            <AntAvatar state="primary" size="md" label="JD">
              <span class="text-xs">Custom</span>
            </AntAvatar>
          </div>
        </div>
      </div>
    `,
  }),
};
