import AntCrudTableFilter from '../AntCrudTableFilter.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof AntCrudTableFilter> = {
  title: 'Crud/Crud Table Filter',
  component: AntCrudTableFilter,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
  decorators: [
    vueRouter(),
  ],
};

export default meta;

type Story = StoryObj<typeof AntCrudTableFilter>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCrudTableFilter,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="dashed">
        <AntCrudTableFilter
          v-model:search="args.search"
          v-bind="args"
        />
      </div>
    `,
  }),
  args: {},
};
