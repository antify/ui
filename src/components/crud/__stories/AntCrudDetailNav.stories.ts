import {type Meta, type StoryObj} from '@storybook/vue3';
import AntTabs from '../../tabs/AntTabs.vue';
import AntCrudDetailNav from '../AntCrudDetailNav.vue';
import {vueRouter} from 'storybook-vue3-router';

const meta: Meta<typeof AntCrudDetailNav> = {
  title: 'Crud/Crud Detail Nav',
  component: AntCrudDetailNav,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [
    () => ({template: '<div class="dashed"><story/></div>'}),
    vueRouter()
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntCrudDetailNav>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntCrudDetailNav
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntCrudDetailNav v-bind="args"/>',
  }),
  args: {
    getEntityName: () => 'Lorem ipsum',
    tabItems: [
      {
        id: '1',
        label: 'Main data',
      },
      {
        id: '2',
        label: 'Related data',
      },
      {
        id: '3',
        label: 'Related data',
      },
    ]
  }
};
