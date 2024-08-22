import AntTag from '../AntTag.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {AntTagSize, TagState} from '../__types/AntTag.types';
import {faTag} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntTag> = {
  title: 'Components/Tag',
  component: AntTag,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(AntTagSize),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(TagState),
    },
    iconLeft: {
      control: {type: 'none'},
      description:
        'Will be displayed left to the default slot.<br>Use Font-awesome Icons.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTag>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTag},
    setup() {
      function logClick() {
        console.log('Clicked close icon');
      }

      return {args, logClick};
    },
    template: '<div class="p-4"><AntTag v-bind="args" @close="logClick">Tag</AntTag></div>',
  }),
  args: {},
};

export const IconLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faTag,
  },
};
