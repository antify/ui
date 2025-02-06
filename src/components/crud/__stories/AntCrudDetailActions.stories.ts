import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntTabs from '../../tabs/AntTabs.vue';
import AntCrudDetailActions from '../AntCrudDetailActions.vue';

const meta: Meta<typeof AntCrudDetailActions> = {
  title: 'Crud/Crud Detail Actions',
  component: AntCrudDetailActions,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  decorators: [
    () => ({
      template: '<div class="border border-dashed border-base-300"><story/></div>',
    }),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntCrudDetailActions>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntCrudDetailActions,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntCrudDetailActions v-bind="args"/>',
  }),
  args: {},
};
