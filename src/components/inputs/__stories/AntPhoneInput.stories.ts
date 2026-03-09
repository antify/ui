import type {
  Meta, StoryObj,
} from '@storybook/vue3';
import AntPhoneInput from '../AntPhoneInput.vue';
import {
  Size, InputState,
} from '../../../enums';
import {
  ref,
} from 'vue';
import {
  COUNTRIES,
} from '../../../constants/countries';

const meta: Meta<typeof AntPhoneInput> = {
  title: 'Inputs/Phone Input',
  component: AntPhoneInput,
  parameters: {
    docs: {
      description: {
        component: 'Komponente zur Eingabe der Telefonnummer mit Auswahl von Land und Ländervorwahl.',
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    onValidate: {
      action: 'validate',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntPhoneInput>;

export const Default: Story = {
  render: (args) => ({
    components: {
      AntPhoneInput,
    },
    setup() {
      const phone1 = ref(null);
      const country1 = ref(null);
      const phone2 = ref(null);
      const country2 = ref(null);

      return {
        args,
        phone1,
        country1,
        phone2,
        country2,
      };
    },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-sm font-bold text-gray-500">With Search (Default)</h3>
          <AntPhoneInput
            v-bind="args"
            v-model="phone1"
            v-model:country-value="country1"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country1 || 'null' }} | {{ phone1 || 'null' }}
          </div>
        </div>

        <hr class="border-gray-200" />

        <div>
          <h3 class="mb-2 text-sm font-bold text-gray-500">Without Search</h3>
          <AntPhoneInput
            v-bind="args"
            v-model="phone2"
            v-model:country-value="country2"
            :searchable="false"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country2 || 'null' }} | {{ phone2 || 'null' }}
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    label: 'Phone Number',
    description: 'Enter your mobile phone number',
    placeholder: 'Enter digits',
    countryPlaceholder: 'Select your country',
    countries: COUNTRIES,
    autoSelectDefault: false,
    size: Size.md,
    state: InputState.base,
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
      AntPhoneInput,
    },
    setup() {
      const phone = ref(null);
      const country = ref('DE');

      return {
        args,
        phone,
        country,
        InputState,
        Size,
        COUNTRIES,
      };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 text-gray-700">Input States (Germany Case)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.base" label="Base State" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.info" label="Info State" :messages="['Bitte geben Sie Ihre Mobilnummer ein']" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.success" label="Success State" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.warning" label="Warning State" :messages="['Prüfen Sie die Vorwahl']" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.danger" label="Danger State" :messages="['Ungültige Telefonnummer']" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 text-gray-700">Sizes</h2>
          <div class="flex flex-col gap-4">
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.sm" label="Small (sm)" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.md" label="Medium (md)" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.lg" label="Large (lg)" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 text-gray-700">Special Modes</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AntPhoneInput v-bind="args" country-value="DE" model-value="1512345678" disabled label="Disabled" />
            <AntPhoneInput v-bind="args" country-value="DE" model-value="1512345678" readonly label="Readonly" />
            <AntPhoneInput v-bind="args" skeleton label="Skeleton" />
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    countries: COUNTRIES,
    countryPlaceholder: 'Land wählen',
    searchPlaceholder: 'Suchen...',
  },
};
