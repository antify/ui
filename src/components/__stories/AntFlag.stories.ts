import AntFlag from '../AntFlag.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  FlagSize,
} from '../__types/AntFlag.types';

const meta: Meta<typeof AntFlag> = {
  title: 'Components/Flag',
  component: AntFlag,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    isoCode: {
      control: {
        type: 'text',
      },
      description: 'ISO 3166-1 alpha-2 country code.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(FlagSize),
    },
    skeleton: {
      control: {
        type: 'boolean',
      },
    },
    round: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntFlag>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntFlag,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntFlag v-bind="args"/>',
  }),
  args: {
    isoCode: 'UA',
    size: FlagSize.md,
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: {
      AntFlag,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="2xs"/> <span>2xs</span></div>
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="xs"/> <span>xs</span></div>
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="sm"/> <span>sm</span></div>
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="md"/> <span>md</span></div>
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="lg"/> <span>lg</span></div>
        <div class="flex items-center gap-2"><AntFlag v-bind="args" size="3xl"/> <span>3xl</span></div>
      </div>
    `,
  }),
  args: {
    isoCode: 'US',
  },
};

export const Shapes: Story = {
  render: (args) => ({
    components: {
      AntFlag,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs text-gray-500 mb-2">Default (Rectangle 4:3)</p>
          <div class="flex items-center gap-4">
            <AntFlag isoCode="UA" size="lg"/>
            <AntFlag isoCode="US" size="lg"/>
            <AntFlag isoCode="GB" size="lg"/>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-2">Circle (1:1)</p>
          <div class="flex items-center gap-4">
            <AntFlag isoCode="UA" :round="true" size="lg"/>
            <AntFlag isoCode="US" :round="true" size="lg"/>
            <AntFlag isoCode="GB" :round="true" size="lg"/>
          </div>
        </div>
      </div>
    `,
  }),
};
