import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCrudDetail from '../AntCrudDetail.vue';
import AntCrudDetailNav from '../AntCrudDetailNav.vue';
import AntCrudDetailActions from '../AntCrudDetailActions.vue';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof AntCrudDetail> = {
  title: 'Crud/Crud Detail',
  component: AntCrudDetail,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  decorators: [
    () => ({
      template: '<div class="dashed h-80"><story/></div>',
    }),
    vueRouter(),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntCrudDetail>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCrudDetail,
      AntCrudDetailNav,
      AntCrudDetailActions,
    },
    setup() {
      return {
        args,
        overflowContent: false,
        tabItems: [
          {
            id: '1',
            label: 'Tab',
          },
          {
            id: '2',
            label: 'Tab',
          },
          {
            id: '3',
            label: 'Tab',
          },
        ],
      };
    },
    template: `
      <AntCrudDetail v-bind="args">
        <template #header>
          <AntCrudDetailNav
            :tab-items="tabItems"
            :get-entity-name="() => 'Lorem ipsum'"
          />
        </template>

        <div
          class="m-2.5 slot"
          :class="{'h-96': overflowContent}"
        >
          SLOT
        </div>

        <template #footer>
          <AntCrudDetailActions/>
        </template>
      </AntCrudDetail>
    `,
  }),
  args: {},
};

export const overflownContent: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    setup() {
      return {
        // @ts-ignore
        ...Docs.render(args, ctx).setup(),
        overflowContent: true,
      };
    },
    // @ts-ignore
    template: Docs.render(args, ctx).template,
  }),
  args: {
    ...Docs.args,
  },
};
