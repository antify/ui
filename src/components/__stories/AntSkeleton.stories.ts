import AntSkeleton from '../AntSkeleton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Grouped as _Grouped,
} from '../../enums/Grouped.enum';

const meta: Meta<typeof AntSkeleton> = {
  title: 'Components/Skeleton',
  component: AntSkeleton,
  argTypes: {
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(_Grouped),
      description: 'Where is this fields position in a group',
      table: {
        defaultValue: {
          summary: _Grouped.none,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSkeleton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntSkeleton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntSkeleton
        v-bind="args"
        class="h-5 w-full"
      />`,
  }),
  args: {},
};

export const Rounded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    rounded: true,
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left,
  },
};

export const Slot: Story = {
  render: (args) => ({
    components: {
      AntSkeleton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntSkeleton
        v-bind="args"
      >
        Test here
      </AntSkeleton>`,
  }),
  args: {},
};
