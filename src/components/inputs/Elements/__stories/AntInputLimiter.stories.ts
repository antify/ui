import AntInputLimiter from '../AntInputLimiter.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../../enums/Size.enum';
import {
  InputState,
} from '../../../../enums';

const meta: Meta<typeof AntInputLimiter> = {
  title: 'Inputs/Elements/Ant Input Limiter',
  component: AntInputLimiter,
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
      table: {
        defaultValue: {
          summary: Size.md,
        },
      },
    },
    skeleton: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntInputLimiter>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntInputLimiter,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><AntInputLimiter v-bind="args">Description</AntInputLimiter></div>',
  }),
  args: {
    value: 0,
    maxValue: 10,
  },
};
