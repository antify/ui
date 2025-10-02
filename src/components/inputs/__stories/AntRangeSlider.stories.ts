import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntRangeSlider from '../AntRangeSlider.vue';
import {
  ref,
} from 'vue';
import {
  State,
} from '../../../enums';

const meta: Meta<typeof AntRangeSlider> = {
  title: 'Inputs/Range Slider',
  component: AntRangeSlider,
  parameters: {
    docs: {
      description: {
        component: 'WIP: waiting for design to finish',
      },
    },
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: 'Reactive value',
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntRangeSlider>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntRangeSlider,
    },
    setup() {
      const value = ref(1);

      return {
        args,
        value,
      };
    },
    template: `
      <AntRangeSlider v-bind="args" v-model="value"/>
    `,
  }),
  args: {
    label: 'Range slider',
    min: 10,
    max: 90,
    steps: 5,
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};
