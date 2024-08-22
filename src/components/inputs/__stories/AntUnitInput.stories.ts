import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntUnitInput from '../AntUnitInput.vue';
import {faEuroSign} from '@fortawesome/free-solid-svg-icons';
import {InputState} from '../../../enums';
import {isRequiredRule, useFieldValidator} from '@antify/validate';
import {reactive} from 'vue';

const meta: Meta<typeof AntUnitInput> = {
  title: 'Inputs/Unit Input',
  component: AntUnitInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      table: {type: {summary: 'number|null'}},
    },
    unit: {
      control: 'text',
      description:
        'Will be displayed right to the input.<br>Use text or Font-awesome Icons.',
      table: {type: {summary: 'string|IconDefinition'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
    wrapperClass: {
      control: 'text',
      description:
        'Class for the first element because the attribute "class" would affect the input element.',
      table: {type: {summary: 'string|object'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntUnitInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntUnitInput},
    setup() {
      return {args};
    },
    template: `
      <AntUnitInput
        v-bind="args"
        v-model="args.modelValue"
        :unit="args.unit"
      />`,
  }),
  args: {
    modelValue: null,
    unit: '€',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const withValidator: Story = {
  render: (args) => ({
    components: {AntUnitInput},
    setup() {
      const validator = reactive(useFieldValidator([isRequiredRule]));

      return {args, validator, InputState};
    },
    template: `
      <AntUnitInput
        v-bind="args"
        v-model="args.modelValue"
        :unit="args.unit"
        :state="args.state ? args.state : (validator.hasErrors() ? InputState.danger : undefined)"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    modelValue: null,
    unit: '€',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const Limited: Story = {
  render: (args) => ({
    components: {AntUnitInput},
    setup() {
      const validator = reactive(useFieldValidator([
        isRequiredRule,
        (val: number) => val <= 10 || 'Value should not be bigger than 10',
        (val: number) => val <= 11 || 'It should be really not bigger than 10!!!!'
      ]));

      return {args, validator};
    },
    template: `
      <AntUnitInput
        v-bind="args"
        v-model="args.modelValue"
        :unit="args.unit"
        :errors="Array.isArray(args.errors) ? args.errors : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`,
  }),
  args: {
    ...Docs.args,
    modelValue: 50,
    limiter: true,
    max: 10,
  },
};

export const UnitAsIcon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    unit: faEuroSign,
  },
};
