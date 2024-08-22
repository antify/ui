import AntInputLabel from '../AntInputLabel.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../../enums/Size.enum';
import AntBaseInput from '../AntBaseInput.vue';

const meta: Meta<typeof AntInputLabel> = {
  title: 'Inputs/Elements/Ant Input Label',
  component: AntInputLabel,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    label: {
      control: 'text'
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    skeleton: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntInputLabel>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
export const Docs: Story = {
  render: (args) => ({
    components: {AntInputLabel},
    setup: () => ({args}),
    template: '<div class="p-4"><AntInputLabel v-bind="args"></AntInputLabel></div>',
  }),
  args: {
    label: 'Label'
  },
};

export const WithContent: Story = {
  render: (args) => ({
    components: {AntInputLabel, AntBaseInput},
    setup() {
      return {args};
    },
    template: '<div class="p-4"><AntInputLabel v-bind="args"><AntBaseInput value="Example" :size="args.size"></AntBaseInput></AntInputLabel></div>',
  }),
  args: {
    ...Docs.args,
    label: 'Label'
  },
};
