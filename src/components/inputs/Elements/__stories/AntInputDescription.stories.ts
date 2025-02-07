import AntInputDescription from '../AntInputDescription.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../../enums/Size.enum';
import {
  InputState,
} from '../../../../enums';

const meta: Meta<typeof AntInputDescription> = {
  title: 'Inputs/Elements/Ant Input Description',
  component: AntInputDescription,
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

type Story = StoryObj<typeof AntInputDescription>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntInputDescription,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="p-4"><AntInputDescription v-bind="args">Description</AntInputDescription></div>',
  }),
  args: {},
};
