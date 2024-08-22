import AntField from '../AntField.vue';
import AntBaseInput from '../../inputs/Elements/AntBaseInput.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {computed, reactive, ref} from 'vue';
import {InputState} from '../../../enums';
import {isRequiredRule, notBlankRule, useFieldValidator} from '@antify/validate';

const meta: Meta<typeof AntField> = {
  title: 'Forms/Field',
  component: AntField,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    skeleton: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntField>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntField, AntBaseInput},
    setup: () => {
      const skeleton = computed({
        get() {
          return args.skeleton;
        },
        set(val) {
          args.skeleton = val;
        }
      });
      const size = computed({
        get() {
          return args.size;
        },
        set(val) {
          args.size = val;
        }
      });
      const state = computed({
        get() {
          return validator.hasErrors() ? InputState.danger : args.state;
        },
        set(val) {
          args.state = val;
        }
      });
      const value = ref<string | null>(null);
      const validator = reactive(useFieldValidator([isRequiredRule, notBlankRule]));

      return {args, value, validator, skeleton, size, state, InputState};
    },
    template: `
      <AntField
        v-bind="args"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        :state="state"
      >
        <AntBaseInput
          v-model="value"
          :skeleton="skeleton"
          :size="size"
          :state="state"
          placeholder="Placeholder"
          @validate="(val) => validator.validate(val)"
        />
      </AntField>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

