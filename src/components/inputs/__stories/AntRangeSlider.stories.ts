import {type Meta, type StoryObj} from '@storybook/vue3';
import AntRangeSlider from '../AntRangeSlider.vue';
import {reactive, ref} from 'vue';
import {InputState} from '../../../enums';
import {useFieldValidator} from '@antify/validate';

const meta: Meta<typeof AntRangeSlider> = {
  title: 'Inputs/Range Slider',
  component: AntRangeSlider,
  parameters: {
    docs: {
      description: {
        component: 'WIP: waiting for design to finish'
      },
    },
    controls: {
      sort: 'requiredFirst'
    }
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: 'Reactive value'
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
  }
};

export default meta;

type Story = StoryObj<typeof AntRangeSlider>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntRangeSlider},
    setup() {
      const value = ref(1);

      return {args, value};
    },
    template: `
      <AntRangeSlider v-bind="args" v-model="value"/>
    `
  })
};

export const withValidator: Story = {
  render: (args) => ({
    components: {AntRangeSlider},
    setup() {
      const value = ref(1);
      const validator = reactive(useFieldValidator(
        val => val > 80 || 'The value must be bigger than 80!'
      ));

      return {args, value, validator, InputState};
    },
    template: `
      <AntRangeSlider
        v-bind="args"
        v-model="value"
        :state="args.state ? args.state : (validator.hasErrors() ? InputState.danger : undefined)"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
      <span class="text-sm text-gray-500">Reactive value: {{ value }}</span>
    `
  }),
  args: {
    max: 100,
    description: 'Lorem ipsum dolor sit amet',
  }
};
