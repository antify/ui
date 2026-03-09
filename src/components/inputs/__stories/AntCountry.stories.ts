import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCountry, {
  type CountryOption,
} from '../AntCountry.vue';
import {
  computed, ref,
} from 'vue';
import {
  InputState, Size,
} from '../../../enums';

const countries: CountryOption[] = [
  {
    value: 'DE',
    label: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
  },
  {
    value: 'US',
    label: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
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
    modelValue: {
      control: 'text',
      table: {
        type: {
          summary: 'string|null',
        },
      },
    },
    // Добавляем управление новым пропом searchable
    searchable: {
      control: 'boolean',
      description: 'Whether to show the search input in the dropdown',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder for the search input',
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
      options: Object.values(Size),
      table: {
        defaultValue: {
          summary: Size.md,
        },
      },
    },
    countries: {
      description: 'List of countries with flag and dial codes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCountry>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCountry,
    },
    setup() {
      const modelValue = computed({
        get: () => args.modelValue,
        set: (val) => (args.modelValue = val),
      });

      return {
        args,
        modelValue,
      };
    },
    template: `
      <div class="p-10 h-[400px]">
        <AntCountry v-bind="args" v-model="modelValue" />
        <div class="mt-4 text-sm text-gray-500">Selected Value: {{ modelValue }}</div>
      </div>
    `,
  }),
  args: {
    modelValue: 'DE',
    label: 'Country',
    countries,
    searchable: true,
    searchPlaceholder: 'Search for a country...',
    description: 'Select a country to see the dial code and flag integration.',
  },
};

export const WithoutSearch: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    label: 'Select Country (No Search)',
    searchable: false, // Теперь скроется только панель поиска внутри меню
    description: 'The dropdown is visible, but the search bar is hidden.',
  },
};

export const States: Story = {
  render: (args) => ({
    components: {
      AntCountry,
    },
    setup() {
      const val = ref('US');

      return {
        args,
        val,
        InputState,
      };
    },
    template: `
      <div class="p-10 flex flex-col gap-6">
        <AntCountry v-bind="args" v-model="val" :state="InputState.base" label="Base State" />
        <AntCountry v-bind="args" v-model="val" :state="InputState.info" label="Info State" />
        <AntCountry v-bind="args" v-model="val" :state="InputState.success" label="Success State" />
        <AntCountry v-bind="args" v-model="val" :state="InputState.warning" label="Warning State" />
        <AntCountry v-bind="args" v-model="val" :state="InputState.danger" label="Danger State" />
      </div>
    `,
  }),
  args: {
    countries,
    searchPlaceholder: 'Search...',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: {
      AntCountry,
    },
    setup() {
      const val = ref('GB');

      return {
        args,
        val,
        Size,
      };
    },
    template: `
      <div class="p-10 flex flex-col gap-6">
        <AntCountry v-bind="args" v-model="val" :size="Size.sm" label="Small" />
        <AntCountry v-bind="args" v-model="val" :size="Size.md" label="Medium" />
        <AntCountry v-bind="args" v-model="val" :size="Size.lg" label="Large" />
      </div>
    `,
  }),
  args: {
    countries,
    searchPlaceholder: 'Search...',
  },
};

export const DisabledAndReadonly: Story = {
  render: (args) => ({
    components: {
      AntCountry,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="p-10 flex flex-col gap-6">
        <AntCountry v-bind="args" model-value="FR" disabled label="Disabled" />
        <AntCountry v-bind="args" model-value="FR" readonly label="Readonly" />
        <AntCountry v-bind="args" model-value="FR" skeleton label="Skeleton" />
      </div>
    `,
  }),
  args: {
    countries,
    searchPlaceholder: 'Search...',
  },
};

export const EmptySearch: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    countries: [],
    label: 'Empty Country List',
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
