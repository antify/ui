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
      control: 'text',
      table: {
        type: {
          summary: 'string[]|null',
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
    placeholder: {
      table: {
        defaultValue: {
          summary: 'this.label',
        },
      },
    },
    createCallback: {
      description: 'If allowCreate is true the createCallback needs to be specified. It will be called when the user creates a new tag. It should return a promise that resolves to a SelectOption.',
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
  },
};

export const AllowCreate: Story = {
  render: Docs.render,
  args: {
    options,
    allowCreate: true,
    createCallback(item: string): Promise<SelectOption> {
      return new Promise((resolve) => {
        resolve({
          label: item,
          value: `${Math.random()}-${item}`,
        });
      });
    },
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
      <div>
        <AntTagInput
          v-model="value"
          v-bind="args"
          :options="filteredOptions"
          :all-options="allOptions"
          hide-input
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
    description: 'Demonstrates hide-input behavior alongside #contentBefore slot.',
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
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." disabled/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." disabled/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <!--TODO:: Add readonly prop if it is implemented-->
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet."/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet."/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." skeleton/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" value="value"/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"/>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" value="Value"
                     description="Lorem ipsum dolor sit amet."/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                     description="Lorem ipsum dolor sit amet."/>
      </AntFormGroup>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
