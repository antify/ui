import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntFormGroup from '../AntFormGroup.vue';
import AntFormGroupLabel from '../AntFormGroupLabel.vue';
import AntTextInput from '../../inputs/AntTextInput.vue';
import AntButton from '../../buttons/AntButton.vue';
import {
  Direction,
} from '../../../enums/Direction.enum';

const meta: Meta<typeof AntFormGroup> = {
  title: 'Forms/Form Group',
  component: AntFormGroup,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    direction: {
      control: {
        type: 'select',
      },
      options: Object.values(Direction),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntFormGroup>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntFormGroup,
      AntFormGroupLabel,
      AntTextInput,
      AntButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntFormGroup v-bind="args">
        <AntFormGroupLabel>Example label</AntFormGroupLabel>
        <AntTextInput label="Example"/>
        <AntButton state="primary">Submit</AntButton>
      </AntFormGroup>
    `,
  }),
  args: {},
};
