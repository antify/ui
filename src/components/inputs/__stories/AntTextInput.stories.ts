import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';
import {TextInputType} from '../__types/AntTextInput.types';
import {InputState} from '../../../enums';
import {computed, reactive} from 'vue';

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

export const withValidator: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      const errorValidator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));
      const warningValidator = reactive(useFieldValidator(
        (val) => val?.length >= 1 && val?.length <= 4 ?
          'It`s recommended to have a value with a length greater than 4' : true));
      const infoValidator = reactive(useFieldValidator(
        (val) => val?.length >= 5 && val?.length <= 8 ?
          'Way better! But if you type in 4 characters more, the value is perfect!' : true));
      const successValidator = reactive(useFieldValidator(
        (val) => val?.length >= 9 ?
          'Yes! The value length is big enough now' : true));
      const state = computed(() => {
        if (args.state) {
          return args.state;
        }

        if (errorValidator.hasErrors()) {
          return InputState.danger;
        }

        if (warningValidator.hasErrors()) {
          return InputState.warning;
        }

        if (infoValidator.hasErrors()) {
          return InputState.info;
        }

        if (successValidator.hasErrors()) {
          return InputState.success;
        }

        return undefined;
      });
      const messages = computed(() => {
        if (args.messages) {
          return args.messages;
        }

        if (errorValidator.hasErrors()) {
          return errorValidator.getErrors();
        }

        if (warningValidator.hasErrors()) {
          return warningValidator.getErrors();
        }

        if (infoValidator.hasErrors()) {
          return infoValidator.getErrors();
        }

        if (successValidator.hasErrors()) {
          return successValidator.getErrors();
        }

        return undefined;
      });

      function validate(val: unknown) {
        errorValidator.validate(val);
        warningValidator.validate(val);
        infoValidator.validate(val);
        successValidator.validate(val);
      }

      return {
        args,
        validate,
        state,
        messages,
        InputState
      };
    },
    template: `
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :state="state"
        :messages="messages"
        @validate="validate"
      />`,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Focus in the element and blur out. After that, follow the error, warning, info and success instructions'
  },
};

export const limited: Story = {
  render: (args) => ({
    components: {AntTextInput},
    setup() {
      const validator = reactive(useFieldValidator([(val: string) => val.length <= 10 || 'Max. 10 characters allowed']));

      return {args, validator, InputState};
    },
    template: `
      <AntTextInput
        v-bind="args"
        v-model="args.modelValue"
        :state="args.state ? args.state : (validator.hasErrors() ? InputState.danger : undefined)"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />`
  }),
  args: {
    ...Docs.args,
    modelValue: 'A to long value',
    max: 10,
    limiter: true,
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
