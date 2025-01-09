import AntTable from '../AntTable.vue';
import {AntTableAlign, AntTableRowTypes, AntTableSize} from '../__types/TableHeader.types';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {ref} from 'vue';
import {faker} from '@faker-js/faker';
import AntSwitch from '../../inputs/AntSwitch.vue';

const meta: Meta<typeof AntTable> = {
  title: 'Components/Table',
  component: AntTable,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    headers: {
      description: 'List of header definitions. <br>If this value get changed from outside, because the table size should change, the change will take 350 ms to have a more smooth transition.',
      table: {
        type: {
          summary: 'TableHeader',
          detail: `
            type TableHeader = {
              identifier: string;
              headerClassList?: string;
              rowClassList?: string;
              title: string;
              type: AntTableRowTypes;
              links?: {
                to: string;
                label: string;
              }[];
            }`,
        },
      },
    },
    data: {
      description:
        'List of rows to be displayed in the table. The properties of the elements need to be equal to the identifier of a table row for it to be displayed<br>They will be updated as they are beeing moved inside the table.',
    },
    selectedRow: {
      description: 'Reactive value that contains the selected row.'
    },
    rowKey: {
      description: 'Prop name of a unique identifier in your data structure.'
    },
    loading: {
      description: 'If true will display skeleton rows instead of an empty table if there is no data provided, otherwise it will display an overlay.'
    },
    size: {
      control: {type: 'select'},
      options: Object.values(AntTableSize),
      table: {defaultValue: {summary: AntTableSize.md}},
    },
    // Slots
    afterCellContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: {type: {summary: 'HTML'}},
    },
    beforeCellContent: {
      description:
        'Slot to add custom elements to all cells. Gets {elem, header} as property.',
      table: {type: {summary: 'HTML'}},
    },
    emptyState: {
      description: 'Place for custom empty states.',
      table: {type: {summary: 'HTML'}},
    },
    headerContent: {
      description:
        'Overwrite for the default header items. Gets header as property.',
      table: {type: {summary: 'HTML'}},
    },
    headerFirstCell: {
      description: 'Space to add cells to the header.',
      table: {type: {summary: 'HTML'}},
    },
    headerLastCell: {
      description: 'Space to add cells to the header.',
      table: {type: {summary: 'HTML'}},
    },
    rowFirstCell: {
      description: 'Space to add cells to the beginning of a row. Be aware that you have to add headerFirstCells as well otherwise the headers will not match up to your cells.'
    },
    rowLastCell: {
      description:
        'Space to add cells to all rows. Gets the current element as property.',
      table: {type: {summary: 'HTML'}},
    },
    cellContent: {
      description: 'Is used if the ROW_TYPE = "SLOT". Gets the current element and the header element to identifier witch cell is currently displayed.',
      table: {
        type: {summary: 'HTML'}
      }
    },
    showLightVersion: {
      description: 'Switch between the normal version, which contains all columns, and the light version, which only contains all columns with the property `lightVersion` set to `true`.'
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTable>;

const testData = ref<{
  name: string,
  age: number,
  email: string,
  employed: boolean
}[]>([]);

for (let i = 0; i < 100; i++) {
  const randomName = faker.person.firstName() + ' ' + faker.person.lastName();
  const randomNumber = faker.number.int({min: 18, max: 60});
  const randomEmail = faker.internet.email();
  const randomBoolean = faker.datatype.boolean();

  testData.value.push({
    name: randomName,
    age: randomNumber,
    email: randomEmail,
    employed: randomBoolean,
  });
}

export const Docs: Story = {
  render: (args) => ({
    components: {AntTable, AntSwitch},
    setup() {
      const selected = ref();
      return {args, selected};
    },
    template: `
      <div class="h-96 border border-dashed border-base-300">
        <AntTable v-bind="args" v-model="selected" :selected-row="selected" @row-click="(val) => selected = val">
          <template #cellContent="{element: entry, header}">
            <div v-if="header.identifier === 'employeed'">
              <AntSwitch v-model="entry.employeed"/>
            </div>
          </template>
        </AntTable>
      </div>
    `,
  }),
  args: {
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        type: AntTableRowTypes.text,
        sortable: true,
        lightVersion: true,
      },
      {
        title: 'Age',
        identifier: 'age',
        type: AntTableRowTypes.text,
        align: AntTableAlign.right,
        lightVersion: true,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Employeed',
        identifier: 'employeed',
        rowClassList: '',
        type: AntTableRowTypes.slot,
      }
    ],
    data: testData.value,
  }
};

// TODO:: Stories for loading/custom/...
export const Empty: Story = {
  render: (args) => ({
    components: {AntTable, AntSwitch},
    setup() {
      const selected = ref();
      return {args, selected};
    },
    template: `
      <div class="flex flex-col gap-2">
        <div class="h-96 border border-dashed border-base-300">
          <AntTable v-bind="args" v-model="selected" :selected-row="selected" @row-click="(val) => selected = val">
            <template #cellContent="{element: entry, header}">
              <div v-if="header.identifier === 'employeed'">
                <AntSwitch v-model="entry.employeed"/>
              </div>
            </template>
          </AntTable>
          </div>

          <div class="h-96 border border-dashed border-base-300">
            <AntTable v-bind="args" v-model="selected" :selected-row="selected" @row-click="(val) => selected = val" empty-state-text="Custom Empty State Text">
              <template #cellContent="{element: entry, header}">
                <div v-if="header.identifier === 'employeed'">
                  <AntSwitch v-model="entry.employeed"/>
                </div>
              </template>
            </AntTable>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: []
  }
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    loading: true,
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: []
  }
};

export const Loading: Story = {
  render: Docs.render,
  args: {
    loading: true,
    headers: [
      {
        title: 'Name',
        identifier: 'name',
        headerClassList: 'font-bold',
        rowClassList: '',
        type: AntTableRowTypes.text,
        align: AntTableAlign.center,
        sortable: true,
      },
      {
        title: 'Title',
        identifier: 'title',
        headerClassList: '',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'E-Mail',
        identifier: 'email',
        rowClassList: '',
        type: AntTableRowTypes.text,
      },
      {
        title: 'Link',
        identifier: 'linkLabel',
        toProp: 'link',
        type: AntTableRowTypes.link,
      }
    ],
    data: testData.value
  }
};
