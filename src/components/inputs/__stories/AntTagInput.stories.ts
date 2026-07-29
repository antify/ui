import AntTagInput from '../AntTagInput.vue';
import type {
  Meta, StoryObj,
} from '@storybook/vue3';
import {
  type Ref, ref, computed,
} from 'vue';
import {
  InputState,
} from '../../../enums';
import type {
  SelectOption,
} from '../__types';
import {
  AntTagInputSize,
} from '../__types/AntTagInput.types';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntSearch from '../AntSearch.vue';
import AntButton from '../../AntButton.vue';
import {
  State, Grouped as GroupedEnum,
} from '../../../enums';

const meta: Meta<typeof AntTagInput> = {
  title: 'Inputs/Tag Input',
  component: AntTagInput,
  argTypes: {
    modelValue: {
      control: 'object',
      table: {
        type: {
          summary: '(string | number)[] | null',
        },
      },
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(AntTagInputSize),
      table: {
        defaultValue: {
          summary: AntTagInputSize.md,
        },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Disables editing, tag removal, and dropdown menu opening.',
    },
    allowCreate: {
      control: 'boolean',
      description: 'Allows creating custom tags on Enter press.',
    },
    maxTagsHeight: {
      control: 'text',
      description: 'Max height for the tags container (e.g. "80px").',
    },
    placeholder: {
      table: {
        defaultValue: {
          summary: 'Add new tag',
        },
      },
    },
    createCallback: {
      description: 'If allowCreate is true, optional callback to handle new option generation. Returns Promise<SelectOption>.',
      table: {
        type: {
          summary: '(item: string) => Promise<SelectOption>',
          detail: `
              Params:
              item: string - the label of the new tag

              Returns:
              Promise<SelectOption> - the new tag as a SelectOption
          `,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTagInput>;

const options: SelectOption[] = [
  {
    label: 'Tag',
    value: '1',
  },
  {
    label: 'Cat',
    value: '2',
  },
  {
    label: 'Tag1',
    value: '5',
  },
  {
    label: 'Cat',
    value: '6',
  },
  {
    label: 'Tag',
    value: '7',
  },
  {
    label: 'Cat',
    value: '8',
  },
  {
    label: 'Tag',
    value: '9',
  },
  {
    label: 'Cat',
    value: '10',
  },
  {
    label: 'Tag',
    value: '11',
  },
  {
    label: 'Dog',
    value: '3',
    isDeleted: true,
  },
  {
    label: 'Chicken',
    value: '4',
    isDeleted: true,
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
    },
    setup() {
      const value: Ref<string[]> = ref([]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `,
  }),
  args: {
    options,
    label: 'Default Tag Input',
  },
};

export const Readonly: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
    },
    setup() {
      const value: Ref<string[]> = ref([
        '1',
        '2',
      ]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `,
  }),
  args: {
    options,
    readonly: true,
    label: 'Readonly Mode',
    description: 'Input is locked, tags cannot be deleted, menu will not open.',
  },
};

export const withDeleted: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
    },
    setup() {
      const value: Ref<string[]> = ref([
        '3',
        '4',
      ]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `,
  }),
  args: {
    options,
    label: 'With Deleted Options',
    description: 'Displays strikethrough text for deleted tags.',
  },
};

export const AllowCreate: Story = {
  render: Docs.render,
  args: {
    options,
    allowCreate: true,
    label: 'Allow Create New Tags',
    description: 'Type any text and press Enter to create a new tag dynamically.',
    createCallback(item: string): Promise<SelectOption> {
      return new Promise((resolve) => {
        resolve({
          label: item,
          value: `custom-${Date.now()}-${item}`,
        });
      });
    },
  },
};

export const MaxTagsHeight: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
    },
    setup() {
      const value: Ref<string[]> = ref([
        '1',
        '2',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
      ]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `,
  }),
  args: {
    options,
    maxTagsHeight: '80px',
    label: 'Max Tags Container Height',
    description: 'Constrains container height and enables vertical scrollbar when tags overflow.',
  },
};

export const Nullable: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
    },
    setup() {
      const value = ref<string[] | null>([
        '1',
        '2',
      ]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `,
  }),
  args: {
    options,
    nullable: true,
    label: 'Nullable Tag Input',
    description: 'Displays a clear button when items are selected.',
  },
};

export const CustomSearchAndFilters: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
      AntSearch,
      AntButton,
    },
    setup() {
      const value: Ref<string[]> = ref([]);
      const searchTerm = ref('');
      const filterValue = ref('all');

      const allOptions: SelectOption[] = [
        {
          label: 'Dr. Smith (Zahnarzt)',
          value: 'doc_1',
        },
        {
          label: 'Anna (ZMP)',
          value: 'zmp_1',
        },
        {
          label: 'Dr. Jones (Zahnarzt)',
          value: 'doc_2',
        },
        {
          label: 'Maria (ZMP)',
          value: 'zmp_2',
        },
      ];

      const filteredOptions = computed(() => {
        return allOptions.filter(opt => {
          const matchesSearch = opt.label.toLowerCase().includes(searchTerm.value.toLowerCase());

          let matchesFilter = true;
          if (filterValue.value === 'practitioner') {
            matchesFilter = opt.label.includes('Zahnarzt');
          } else if (filterValue.value === 'pzrPractitioner') {
            matchesFilter = opt.label.includes('ZMP');
          }

          return matchesSearch && matchesFilter;
        });
      });

      function setFilter(type: string) {
        filterValue.value = type;
      }

      return {
        args,
        value,
        searchTerm,
        filterValue,
        allOptions,
        filteredOptions,
        setFilter,
        State,
        GroupedEnum,
      };
    },
    template: `
      <div style="width: 400px">
        <AntTagInput
          v-model="value"
          v-bind="args"
          :options="filteredOptions"
          :all-options="allOptions"
          placeholder="Mitarbeiter hinzufügen"
        >
          <template #contentBefore>
            <div class="flex p-2 border-b border-base-300 bg-white gap-2" @click.stop>
              <AntSearch v-model="searchTerm" placeholder="Suche..." />

              <div class="flex">
                <AntButton
                  :state="filterValue === 'all' ? State.primary : State.base"
                  :filled="filterValue === 'all'"
                  :grouped="GroupedEnum.left"
                  @click="setFilter('all')"
                >
                  Alle
                </AntButton>

                <AntButton
                  :state="filterValue === 'practitioner' ? State.primary : State.base"
                  :filled="filterValue === 'practitioner'"
                  :grouped="GroupedEnum.center"
                  @click="setFilter('practitioner')"
                >
                  Zahnarzt
                </AntButton>

                <AntButton
                  :state="filterValue === 'pzrPractitioner' ? State.primary : State.base"
                  :filled="filterValue === 'pzrPractitioner'"
                  :grouped="GroupedEnum.right"
                  @click="setFilter('pzrPractitioner')"
                >
                  ZMP
                </AntButton>
              </div>
            </div>
          </template>

          <template #empty>
            <div class="p-3 text-sm text-base-500">
              Es konnten keine Mitarbeiter gefunden werden
            </div>
          </template>
        </AntTagInput>
      </div>
    `,
  }),
  args: {
    label: 'Custom UI Implementation',
    description: 'Demonstrates custom filters alongside #contentBefore slot.',
  },
};

export const summary: Story = {
  render: (args) => ({
    components: {
      AntTagInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value: Ref<string[]> = ref([
        '1',
        '2',
      ]);
      const noValue: Ref<string[]> = ref([]);

      return {
        args,
        value,
        noValue,
        InputState,
        AntTagInputSize,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.info" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.success" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.warning" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.danger" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.info" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.success" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.warning" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.danger" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.lg" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.md" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.sm" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.lg" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.md" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.sm" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet." disabled/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet." disabled/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet." readonly/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet." readonly/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet." skeleton/>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48"/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"/>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48"
                     description="Lorem ipsum dolor sit amet."/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                     description="Lorem ipsum dolor sit amet."/>
      </AntFormGroup>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
