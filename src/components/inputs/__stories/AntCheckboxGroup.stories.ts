import {type Meta, type StoryObj} from '@storybook/vue3';
import AntCheckboxGroup from '../AntCheckboxGroup.vue';
import {reactive} from 'vue';
import {InputState, Size} from '../../../enums';
import {Direction} from '../../../enums/Direction.enum';
import {useFieldValidator} from '@antify/validate';

const meta: Meta<typeof AntCheckboxGroup> = {
  title: 'Inputs/Checkbox Group',
  component: AntCheckboxGroup,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      description: 'Contains the list of selected checkboxes (the value prop of the checkboxes)'
    },
    checkboxes: {
      description: 'List of checkboxes to be displayed'
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(Direction)
    }
  }
};

export default meta;

type Story = StoryObj<typeof AntCheckboxGroup>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntCheckboxGroup},
    setup() {
      return {args};
    },
    template: `
      <AntCheckboxGroup v-bind="args" v-model="args.modelValue"/>
    `
  }),
  args: {
    modelValue: [],
    checkboxes: [{
      label: 'Checkbox 1',
      value: 'checkbox-1'
    }, {
      label: 'Checkbox 2',
      value: 'checkbox-2'
    }, {
      label: 'Checkbox 3',
      value: 'checkbox-3'
    }, {
      label: 'Checkbox 4',
      value: 'checkbox-4'
    }]
  }
};

export const WithValidator: Story = {
  render: (args) => ({
    components: {AntCheckboxGroup},
    setup() {
      const validator = reactive(useFieldValidator((val) => val.length >= 2 || 'Select at least 2'));

      return {
        args,
        validator,
        InputState
      };
    },
    template: `
      <AntCheckboxGroup
        v-bind="args"
        v-model="args.modelValue"
        :state="args.state ? args.state : (validator.hasErrors() ? InputState.danger : undefined)"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
    `
  }),
  args: {
    ...Docs.args,
    modelValue: null
  }
};
