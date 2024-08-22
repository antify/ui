import {type Meta, type StoryObj} from '@storybook/vue3';
import AntTabItem from '../AntTabItem.vue';
import {TabItemState} from '../__types/AntTabItem.types';
import {vueRouter} from 'storybook-vue3-router';

const meta: Meta<typeof AntTabItem> = {
  title: 'Components/Tab Item',
  component: AntTabItem,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [
    () => ({template: '<div class="dashed"><story /></div>'}),
    vueRouter()
  ],
  argTypes: {
    showIcon: {
      control: 'boolean',
      description:
        'Some InputStates can have an icon. Control with this property if it gets shown or not.',
    },
    state: {
      control: {type: 'select'},
      options: Object.values(TabItemState)
    },
  }
};

export default meta;

type Story = StoryObj<typeof AntTabItem>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTabItem},
    setup() {
      return {args};
    },
    template: '<AntTabItem v-bind="args"/>'
  }),
  args: {
    label: 'First tab',
    active: false
  }
};
