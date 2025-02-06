import AntSaveButton from '../AntSaveButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Position, Grouped as _Grouped, Size,
} from '../../../enums';

const meta: Meta<typeof AntSaveButton> = {
  title: 'Components/Buttons/Save Button',
  component: AntSaveButton,
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
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(_Grouped),
    },
    tooltipPosition: {
      control: {
        type: 'select',
      },
      options: Object.values(Position),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSaveButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntSaveButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntSaveButton v-bind="args"/>',
  }),
  args: {
    tooltipPosition: Position.right,
  },
};

export const IconVariant: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconVariant: true,
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const Expanded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    expanded: true,
  },
};

export const InvalidPermission: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    canSave: false,
  },
};
