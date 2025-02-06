import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntTabs from '../../tabs/AntTabs.vue';
import AntNavLeftLayout from '../AntNavLeftLayout.vue';

const meta: Meta<typeof AntNavLeftLayout> = {
  title: 'Layouts/NavLeftLayout',
  component: AntNavLeftLayout,
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

type Story = StoryObj<typeof AntNavLeftLayout>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntNavLeftLayout,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntNavLeftLayout v-bind="args">
        <template #logo-image>
          <img src="/logo.svg" class="h-full w-full"/>
        </template>

        <div class="slot m-2.5 h-full !text-white !border-white">SLOT</div>
      </AntNavLeftLayout>
    `,
  }),
  args: {
    logoRoute: '/',
    navbarItems: [
      {
        label: 'User',
        active: true,
      },
      {
        label: 'Invoice',
      },
      {
        label: 'Settings',
      },
    ],
  },
};

export const WithoutLogo: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntNavLeftLayout,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntNavLeftLayout v-bind="args">
        <div class="slot m-2.5">SLOT</div>
      </AntNavLeftLayout>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
