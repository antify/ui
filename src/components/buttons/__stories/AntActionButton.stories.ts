import AntActionButton from '../AntActionButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Grouped as _Grouped} from '../../../enums/Grouped.enum';
import {State, InputState, Position, Size} from '../../../enums';

const meta: Meta<typeof AntActionButton> = {
  title: 'Components/Buttons/Action Button',
  component: AntActionButton,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(State),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size)
    },
    grouped: {
      control: {type: 'select'},
      options: Object.values(_Grouped),
    },
    tooltipPosition: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
    tooltipState: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    submit: {
      description: 'Change the button type to type="submit"',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntActionButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntActionButton},
    setup() {
      return {args};
    },
    template: `
      <AntActionButton v-bind="args">
        <template #default>Action Button</template>
        <template #tooltipContent>This is an action button</template>
        <template #invalidPermissionTooltipContent>You have no permission <br>to click this button</template>
      </AntActionButton>`,
  }),
  args: {
    tooltipPosition: Position.right
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true
  },
};

export const Expanded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    expanded: true
  },
};

export const WithoutPermission: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    hasPermission: false,
  },
};

// TODO:: write summary
