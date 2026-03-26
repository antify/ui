import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCountryInput from '../AntCountryInput.vue';
import AntField from '../../../components/forms/AntField.vue';
import {
  ref,
} from 'vue';
import {
  InputState, Size, Grouped,
} from '../../../enums';
import {
  COUNTRIES,
} from '../../../constants/countries';

const meta: Meta<typeof AntCountryInput> = {
  title: 'Inputs/Country Input',
  component: AntCountryInput,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: Object.values(InputState),
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    locale: {
      control: 'inline-radio',
      options: [
        'en',
        'de',
      ],
      description: 'Language for country labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AntCountryInput>;

const MainRender = (args: any) => ({
  components: {
    AntCountryInput,
  },
  setup() {
    const modelValue = ref(args.modelValue);

    return {
      args,
      modelValue,
    };
  },
  template: `
    <div>
      <AntCountryInput v-bind="args" v-model="modelValue" />

      <div class="mt-2 text-md text-base-400">
        Selected Value ({{ args.optionValueKey || 'default' }}):
        <span class="text-blue-500 font-bold">{{ modelValue === null ? 'null' : modelValue }}</span>
      </div>
    </div>
  `,
});

export const Docs: Story = {
  render: MainRender,
  args: {
    modelValue: null,
    label: 'Country Selector',
    countries: COUNTRIES,
    searchable: true,
    searchPlaceholder: 'Search for a country...',
    description: 'Select a country to see the dial code and flag integration.',
  },
};

export const ValueKeyNumericCode: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'Value as Numeric Code',
    description: 'Using the numericCode field from the data as the model value.',
    optionValueKey: 'numericCode',
    countries: COUNTRIES,
  },
};

export const DefaultCountry: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'Default Country Logic',
    description: 'Automatically selects Germany (DE) as it is marked as isDefault: true in our data.',
    modelValue: 'DE',
  },
};

export const DefaultByNumericCode: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'Default by Numeric Code',
    description: 'Using numericCode: 33 (France) as the default value.',
    optionValueKey: 'numericCode',
    modelValue: 33,
  },
};

export const Localization: Story = {
  render: (args: any) => ({
    components: {
      AntCountryInput,
    },
    setup() {
      const modelValue = ref('DE');

      return {
        args,
        modelValue,
      };
    },
    template: `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-xs text-base-400 mb-1">Current Locale: <b>{{ args.locale }}</b></p>
        <AntCountryInput v-bind="args" v-model="modelValue" />
      </div>

      <div class="p-4 border border-dashed border-base-300 rounded-md bg-base-50">
        <p class="text-sm italic text-base-500">
          Try switching the <b>locale</b> control in the panel below to see labels change between
          "Germany" (EN) and "Deutschland" (DE).
        </p>
      </div>
    </div>
  `,
  }),
  args: {
    ...Docs.args,
    label: 'Localized Selector',
    locale: 'de',
    searchPlaceholder: 'Land suchen...',
    description: 'The labels and search logic adapt based on the provided locale.',
  },
};

export const WithoutSearch: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'No Search Field',
    searchable: false,
  },
};

export const WithoutFlags: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'No Flags Mode',
    showFlags: false,
  },
};

export const GroupedMode: Story = {
  render: (args) => ({
    components: {
      AntCountryInput,
      AntField,
    },
    setup() {
      const modelValue = ref(args.modelValue);

      return {
        args,
        modelValue,
      };
    },
    template: `
      <div>
        <AntField
          :label="args.label"
          :description="args.description"
          :size="args.size"
          :state="args.state"
        >
          <div class="flex items-center">
            <AntCountryInput
              v-bind="args"
              v-model="modelValue"
              class="w-fit flex-shrink-0"
            />

            <div
              class="flex-grow border border-l-0 p-2 text-sm text-base-400 bg-base-50 border-base-300 rounded-r-md h-[36px] flex items-center"
            >
              Input area...
            </div>
          </div>
        </AntField>

        <div class="mt-2 text-md text-base-400">
          Value: {{ modelValue || null }}
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    label: 'Grouped Mode (Phone Input Style)',
    description: 'When isGrouped is true, label and description must be provided by a parent AntField.',
    isGrouped: true,
    grouped: Grouped.left,
    modelValue: 'DE',
    countries: COUNTRIES,
  },
};

export const GermanEmptyState: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    label: 'German Empty State',
    description: 'Custom empty state message: "Keine Länder gefunden". Open the dropdown to see it.',
    searchPlaceholder: 'Land suchen...',
    emptyStateMessage: 'Keine Länder gefunden',
    countries: [],
  },
};

export const Skeleton: Story = {
  render: MainRender,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCountryInput,
    },
    setup() {
      const val = ref('DE');

      return {
        args,
        val,
        InputState,
        Size,
        COUNTRIES,
      };
    },
    template: `
      <div class="p-4 flex flex-col gap-6">
        <div class="flex flex-wrap gap-4">
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :state="InputState.base" label="Base" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :state="InputState.info" label="Info" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :state="InputState.success" label="Success" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :state="InputState.warning" label="Warning" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :state="InputState.danger" label="Danger" class="w-64"/>
        </div>

        <div class="flex items-end gap-4">
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :size="Size.sm" label="Small" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :size="Size.md" label="Medium" class="w-64"/>
          <AntCountryInput v-bind="args" v-model="val" :countries="COUNTRIES" :size="Size.lg" label="Large" class="w-64"/>
        </div>

        <div class="flex gap-4">
          <AntCountryInput v-bind="args" :countries="COUNTRIES" model-value="FR" disabled label="Disabled" class="w-64" />
          <AntCountryInput v-bind="args" :countries="COUNTRIES" model-value="FR" readonly label="Readonly" class="w-64" />
          <AntCountryInput v-bind="args" :countries="COUNTRIES" model-value="FR" skeleton label="Skeleton" class="w-64" />
        </div>
      </div>
    `,
  }),
  args: {
    searchPlaceholder: 'Search...',
  },
};
