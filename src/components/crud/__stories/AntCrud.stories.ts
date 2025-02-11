import {
  computed, ref, watch,
} from 'vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntTabs from '../../tabs/AntTabs.vue';
import AntCrud from '../AntCrud.vue';
import AntCrudTableNav from '../AntCrudTableNav.vue';
import AntTable from '../../table/AntTable.vue';
import AntCrudTableFilter from '../AntCrudTableFilter.vue';
import AntCrudDetail from '../AntCrudDetail.vue';
import {
  AntTableRowTypes,
} from '../../table/__types/TableHeader.types';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof AntCrud> = {
  title: 'Crud/Crud',
  component: AntCrud,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    fullscreen: true,
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

type Story = StoryObj<typeof AntCrud>;

function generateTableData(amount: number) {
  const tableData = [];

  for (let i = 0; i < amount; i++) {
    tableData.push({
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@gmail.com',
      streetAddress: '3670 New Road',
      city: 'Birmingham',
      country: 'United Kingdom',
    });
  }

  return tableData;
}

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntTable,
      AntCrudTableNav,
      AntCrud,
      AntCrudTableFilter,
      AntCrudDetail,
    },
    setup() {
      const selectedDataItem = ref(null);
      const fullWidth = computed(() => selectedDataItem.value === null && args.showDetail === false);

      watch(() => args.showDetail, (showDetail) => {
        if (showDetail === false) {
          selectedDataItem.value = null;
        }
      });

      return {
        args,
        fullWidth,
        tableData: generateTableData(50),
        tableHeaders: [
          {
            title: 'Name',
            identifier: 'name',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'Title',
            identifier: 'title',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'E-Mail',
            identifier: 'email',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Street Address',
            identifier: 'streetAddress',
            type: AntTableRowTypes.text,
          },
          {
            title: 'City',
            identifier: 'city',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Country',
            identifier: 'country',
            type: AntTableRowTypes.text,
          },
        ],
      };
    },
    template: `
      <AntCrud v-bind="args" :show-detail="!fullWidth">
        <template #search-section>
          <AntCrudTableFilter
            :full-width="fullWidth"
          />
        </template>

        <template #table-section>
          <AntTable
            :data="tableData"
            :headers="tableHeaders"
            :show-light-version="!fullWidth"
            selectable-rows
          />
        </template>

        <template #table-nav-section>
          <AntCrudTableNav
            :pages="(1000000 * 20)"
            :count="1000000"
            :full-width="fullWidth"
          />
        </template>

        <AntCrudDetail>
          <div class="m-2.5 slot">
            SLOT
          </div>
        </AntCrudDetail>
      </AntCrud>
    `,
  }),
  args: {},
};
