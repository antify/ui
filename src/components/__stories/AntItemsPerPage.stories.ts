import AntItemsPerPage from '../AntItemsPerPage.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntItemsPerPage> = {
  title: 'Components/Items per page',
  component: AntItemsPerPage,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntItemsPerPage>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntItemsPerPage,
    },
    setup() {
      const ipp = ref(20);

      return {
        args,
        ipp,
      };
    },
    template: `
      <AntItemsPerPage v-bind="args" v-model="ipp"/>
    `,
  }),
  args: {
    amountOfItems: 5,
  },
};
