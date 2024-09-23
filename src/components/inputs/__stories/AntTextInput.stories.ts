import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {TextInputType} from '../__types/AntTextInput.types';
import {InputState} from '../../../enums';

const meta: Meta<typeof AntTextInput> = {
  title: 'Inputs/Text Input',
  component: AntTextInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
    type: {
      control: {type: 'select'},
      options: Object.values(TextInputType),
      table: {defaultValue: {summary: TextInputType.text}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTextInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      return {args};
    },
    template: `
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
      />`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      return {args, InputState};
    },
    template: `
      <div class="flex gap-2.5">
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.info"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.success"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.warning"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.danger"
        />
      </div>
      <div class="flex gap-2.5">
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.info"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.success"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.warning"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.danger"
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};
