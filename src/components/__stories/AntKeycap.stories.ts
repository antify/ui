import AntKeycap from '../AntKeycap.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  AntKeycapSize,
} from '../__types/AntKeycap.types';
import {
  faPlus, faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntKeycap> = {
  title: 'Components/Keycap',
  component: AntKeycap,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed instead of the default slot if given.<br>Use Font-awesome Icons.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(AntKeycapSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntKeycap>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntKeycap,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><AntKeycap v-bind="args">F</AntKeycap></div>',
  }),
  args: {
    size: AntKeycapSize.sm,
  },
};

export const Text: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
  },
};

export const Icon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    icon: faChevronUp,
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntKeycap,
    },
    setup() {
      return {
        args,
        AntKeycapSize,
        faPlus,
      };
    },
    template: `
      <div class="flex gap-2 p-4">
        <AntKeycap v-bind="args" :size="AntKeycapSize.xs">K</AntKeycap>
        <AntKeycap v-bind="args" :size="AntKeycapSize.sm">K</AntKeycap>
        <AntKeycap v-bind="args" :size="AntKeycapSize.md">K</AntKeycap>
        <AntKeycap v-bind="args" :size="AntKeycapSize.xs">Strg</AntKeycap>
        <AntKeycap v-bind="args" :size="AntKeycapSize.sm">Strg</AntKeycap>
        <AntKeycap v-bind="args" :size="AntKeycapSize.md">Strg</AntKeycap>
        <AntKeycap v-bind="args" :icon="faPlus" :size="AntKeycapSize.xs"/>
        <AntKeycap v-bind="args" :icon="faPlus" :size="AntKeycapSize.sm"/>
        <AntKeycap v-bind="args" :icon="faPlus" :size="AntKeycapSize.md"/>
      </div>
    `,
  }),
  args: {},
};
