import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCountry from '../AntCountry.vue';
import {
  type CountryOption,
} from '../__types/AntCountry.types';
import {
  ref,
} from 'vue';
import {
  InputState, Size,
} from '../../../enums';

const countries: CountryOption[] = [
  {
    value: 'US',
    label: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
  },
  {
    value: 'DE',
    label: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    // isDefault: true,
  },
  {
    value: 'GB',
    label: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
  },
  {
    value: 'FR',
    label: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
  },
  {
    value: 'ES',
    label: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
  },
  {
    value: 'IT',
    label: 'Italy',
    flag: '🇮🇹',
    dialCode: '+39',
  },
  {
    value: 'UA',
    label: 'Ukraine',
    flag: '🇺🇦',
    dialCode: '+380',
  },
  {
    value: 'KZ',
    label: 'Kazakhstan',
    flag: '🇰🇿',
    dialCode: '+7',
  },
  {
    value: 'GE',
    label: 'Georgia',
    flag: '🇬🇪',
    dialCode: '+995',
  },
  {
    value: 'PL',
    label: 'Poland',
    flag: '🇵🇱',
    dialCode: '+48',
  },
];

const meta: Meta<typeof AntCountry> = {
  title: 'Inputs/Country',
  component: AntCountry,
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
  },
};

export default meta;
type Story = StoryObj<typeof AntCountry>;

const MainRender = (args: any) => ({
  components: {
    AntCountry,
  },
  setup() {
    const modelValue = ref(args.modelValue);

    return {
      args,
      modelValue,
    };
  },
  template: `
    <div class="p-10 h-[400px]">
      <AntCountry v-bind="args" v-model="modelValue" />
      <div class="mt-4 text-xs text-gray-400 font-mono">Value: {{ modelValue || 'null' }}</div>
    </div>
  `,
});

export const Docs: Story = {
  render: MainRender,
  args: {
    modelValue: 'DE',
    label: 'Country Selector',
    countries,
    searchable: true,
    searchPlaceholder: 'Search for a country...',
    description: 'Select a country to see the dial code and flag integration.',
  },
};

export const DefaultCountry: Story = {
  render: (args) => ({
    components: {
      AntCountry,
    },
    setup() {
      // Инициализируем null, чтобы увидеть как сработает автовыбор США в onMounted
      const val = ref(null);

      return {
        args,
        val,
      };
    },
    template: `
      <div class="p-10">
        <h3 class="mb-2 text-sm font-bold text-primary-500">Auto-selection Test (Initial value: null)</h3>
        <AntCountry v-bind="args" v-model="val" />
        <div class="mt-4 p-2 bg-gray-50 border rounded text-xs">
          Resulting v-model: <b>{{ val }}</b>
        </div>
      </div>
    `,
  }),
  args: {
    countries,
    modelValue: null,
    label: 'Default Country Logic',
    searchPlaceholder: 'Search...',
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
      AntCountry,
    },
    setup() {
      const val = ref('DE');

      return {
        args,
        val,
        InputState,
        Size,
      };
    },
    template: `
      <div class="p-4 flex flex-col gap-6">
        <div class="flex flex-wrap gap-4">
          <AntCountry v-bind="args" v-model="val" :state="InputState.base" label="Base" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :state="InputState.info" label="Info" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :state="InputState.success" label="Success" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :state="InputState.warning" label="Warning" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :state="InputState.danger" label="Danger" class="w-64"/>
        </div>

        <div class="flex items-end gap-4">
          <AntCountry v-bind="args" v-model="val" :size="Size.sm" label="Small" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :size="Size.md" label="Medium" class="w-64"/>
          <AntCountry v-bind="args" v-model="val" :size="Size.lg" label="Large" class="w-64"/>
        </div>

        <div class="flex gap-4">
          <AntCountry v-bind="args" model-value="FR" disabled label="Disabled" class="w-64" />
          <AntCountry v-bind="args" model-value="FR" readonly label="Readonly" class="w-64" />
          <AntCountry v-bind="args" model-value="FR" skeleton label="Skeleton" class="w-64" />
        </div>
      </div>
    `,
  }),
  args: {
    countries,
    searchPlaceholder: 'Search...',
  },
};
