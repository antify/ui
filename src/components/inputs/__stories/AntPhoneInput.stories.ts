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
    clearCountryOnClear: {
      control: 'boolean',
      description: 'Determines if the country selection should be cleared when the phone number input is cleared.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    nullable: {
      control: 'boolean',
      description: 'Shows the clear icon in the input field.',
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
      const phoneDefault = ref(null);
      const countryDefault = ref(null);

      const phoneNumericDefault = ref(null);
      const countryNumericDefault = ref(null);

      const phone1 = ref(null);
      const country1 = ref(null);
      const phone2 = ref(null);
      const country2 = ref(null);
      const phone3 = ref(null);
      const country3 = ref(null);
      const phone4 = ref('123456');
      const country4 = ref('DE');

      const phonePaste = ref(null);
      const countryPaste = ref(null);

      const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
      };

      return {
        args,
        phoneDefault,
        countryDefault,
        phoneNumericDefault,
        countryNumericDefault,
        phone1,
        country1,
        phone2,
        country2,
        phone3,
        country3,
        phone4,
        country4,
        phonePaste,
        countryPaste,
        copyToClipboard,
      };
    },
    template: `
      <div class="grid grid-cols-2 gap-x-12 gap-y-12">
        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Default Country Prop</h3>
          <p class="mb-2 text-xs text-base-400 italic text-wrap">
            Initial values are null. Component selects Germany via <b>default-country-value="DE"</b> using the default "value" key.
          </p>
          <AntPhoneInput
            v-bind="args"
            v-model="phoneDefault"
            v-model:country-value="countryDefault"
            default-country-value="DE"
            :auto-select-default="true"
            placeholder="Initialized with DE"
          />
          <div class="mt-2 text-md text-base-500">
            Date: {{ countryDefault || 'null' }} | {{ phoneDefault || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Default by Numeric Code (49)</h3>
          <p class="mb-2 text-xs text-base-400 italic text-wrap">
            Initial values are null. Component selects Germany via <b>numericCode: 49</b>. We tell the component to use "numericCode" as the value key.
          </p>
          <AntPhoneInput
            v-bind="args"
            v-model="phoneNumericDefault"
            v-model:country-value="countryNumericDefault"
            :default-country-value="49"
            :auto-select-default="true"
            country-value-key="numericCode"
            placeholder="Initialized with 49"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ countryNumericDefault || 'null' }} | {{ phoneNumericDefault || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Auto-detect Country on Paste</h3>
          <p class="mb-2 text-xs text-base-400 italic text-wrap">
            Click a number to copy, then paste it (Ctrl+V) into the input to see auto-detection in action.
          </p>

          <div class="flex gap-2 mb-4">
            <button
              v-for="num in ['+4915211111111', '+3715211111111', '+3725211111111']"
              @click="copyToClipboard(num)"
              class="px-2 py-1 text-xs bg-white border border-base-300 rounded hover:bg-base-100 transition-colors text-base-600"
              title="Click to copy"
            >
              {{ num }}
            </button>
          </div>

          <AntPhoneInput
            v-bind="args"
            v-model="phonePaste"
            v-model:country-value="countryPaste"
            placeholder="Paste a number starting with +..."
          />

          <div class="mt-2 text-md text-base-500">
            Data: {{ countryPaste || 'null' }} | {{ phonePaste || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Keep Country on Clear</h3>
          <p class="mb-2 text-xs text-base-400 italic text-wrap">
            Try clicking the "X" icon. The phone number will be null, but the country (DE) will remain selected.
          </p>
          <AntPhoneInput
            v-bind="args"
            v-model="phone4"
            v-model:country-value="country4"
            :clear-country-on-clear="false"
            :nullable="true"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country4 || 'null' }} | {{ phone4 || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">With Search (Default)</h3>
          <AntPhoneInput
            v-bind="args"
            v-model="phone1"
            v-model:country-value="country1"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country1 || 'null' }} | {{ phone1 || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Without Search</h3>
          <AntPhoneInput
            v-bind="args"
            v-model="phone2"
            country-value-key="dialCode"
            v-model:country-value="country2"
            :searchable="false"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country2 || 'null' }} | {{ phone2 || 'null' }}
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold text-base-600 uppercase tracking-wider">Numeric Code Output</h3>
          <AntPhoneInput
            v-bind="args"
            v-model="phone3"
            v-model:country-value="country3"
            country-value-key="numericCode"
            country-placeholder="Select for numeric output"
          />
          <div class="mt-2 text-md text-base-500">
            Data: {{ country3 || 'null' }} | {{ phone3 || 'null' }}
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
    clearCountryOnClear: true,
    nullable: true,
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
          <h2 class="text-xl font-bold border-b pb-2 text-base-700">Input States</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.base" label="Base State" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.info" label="Info State" :messages="['Bitte geben Sie Ihre Mobilnummer ein']" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.success" label="Success State" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.warning" label="Warning State" :messages="['Prüfen Sie die Vorwahl']" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :state="InputState.danger" label="Danger State" :messages="['Ungültige Telefonnummer']" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 text-base-700">Sizes</h2>
          <div class="flex flex-col gap-4">
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.sm" label="Small (sm)" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.md" label="Medium (md)" />
            <AntPhoneInput v-bind="args" v-model="phone" v-model:country-value="country" :size="Size.lg" label="Large (lg)" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 text-base-700">Special Modes</h2>
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
