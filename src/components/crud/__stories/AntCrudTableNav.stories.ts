import AntCrudTableNav from '../AntCrudTableNav.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof AntCrudTableNav> = {
  title: 'Crud/Crud Table Nav',
  component: AntCrudTableNav,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    pageQuery: {
      description: 'Which query parameter should be used, for writing the current page into it.',
    },
  },
  decorators: [
    vueRouter(),
  ],
};

export default meta;

type Story = StoryObj<typeof AntCrudTableNav>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCrudTableNav,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="dashed">
        <AntCrudTableNav v-bind="args"/>
      </div>
    `,
  }),
  args: {
    count: 1000015,
  },
};

export const fullWidth: Story = {
  render: (args) => ({
    components: {
      AntCrudTableNav,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="p-4 flex gap-4">
        <AntCrudTableNav v-bind="args"/>

        <div v-if="!args.fullWidth" class="w-full">
          Another content
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    fullWidth: false,
  },
};

export const skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
