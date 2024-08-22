import AntSpinner from '../AntSpinner.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {AntSpinnerSize} from '../__types/AntSpinner.types';
import {State} from '../../enums/State.enum';

const meta: Meta<typeof AntSpinner> = {
  title: 'Components/Spinner',
  component: AntSpinner,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(AntSpinnerSize),
      table: {defaultValue: {summary: AntSpinnerSize.md}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(State),
    },
    inverted: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntSpinner>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSpinner},
    setup() {
      return {args};
    },
    template: '<div class="p-4"><AntSpinner v-bind="args" /></div>',
  }),
  args: {},
};
