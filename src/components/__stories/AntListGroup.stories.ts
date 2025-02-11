import AntListGroup from '../AntListGroup.vue';
import AntListGroupItem from '../AntListGroupItem.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  faDownload, faMessage, faUser, faCog,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntListGroup> = {
  title: 'Components/List Group',
  component: AntListGroup,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntListGroup>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntListGroup,
      AntListGroupItem,
    },
    setup() {
      return {
        args,
        faUser,
        faDownload,
        faMessage,
        faCog,
      };
    },
    template: `
          <div class="p-4 bg-base-100">
            <AntListGroup v-bind="args">
              <AntListGroupItem to="/example" :icon-left="faUser">Profile</AntListGroupItem>
              <AntListGroupItem to="/example" :icon-left="faDownload">Downloads</AntListGroupItem>
              <AntListGroupItem to="/example" :icon-left="faMessage">Messages</AntListGroupItem>
              <AntListGroupItem to="/example" :icon-left="faCog">Settings</AntListGroupItem>
            </AntListGroup>
          </div>
        `,
  }),
  args: {},
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
