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
    onSelectCountry: {
      action: 'select-country',
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
      const phoneNumber = ref('');
      const countryCode = ref('KZ');

      return {
        args,
        phoneNumber,
        countryCode,
      };
    },
    template: `
      <AntPhoneInput
        v-bind="args"
        v-model="phoneNumber"
        v-model:country-value="countryCode"
      />
      <div class="mt-4 text-xs text-gray-500">
        Output: {{ countryCode }} {{ phoneNumber }}
      </div>
    `,
  }),
  args: {
    label: 'Phone Number',
    description: 'Enter your mobile phone number',
    placeholder: '707 123 45 67',
    countries: COUNTRIES,
    size: Size.md,
    state: InputState.base,
  },
};

export const States: Story = {
  render: () => ({
    components: {
      AntPhoneInput,
    },
    setup() {
      return {
        COUNTRIES,
        InputState,
      };
    },
    template: `
      <div class="flex flex-col gap-6">
        <AntPhoneInput
          label="Success State"
          :state="InputState.success"
          :countries="COUNTRIES"
          model-value="7012223344"
          country-value="KZ"
        />
        <AntPhoneInput
          label="Danger State"
          :state="InputState.danger"
          :countries="COUNTRIES"
          :messages="['This phone number is already registered']"
          model-value="7012223344"
          country-value="KZ"
        />
        <AntPhoneInput
          label="Disabled"
          disabled
          :countries="COUNTRIES"
          model-value="7012223344"
          country-value="DE"
        />
      </div>
    `,
  }),
};

export const Skeleton: Story = {
  args: {
    label: 'Phone Number',
    skeleton: true,
    countries: COUNTRIES,
  },
};

export const Sizes: Story = {
  render: () => ({
    components: {
      AntPhoneInput,
    },
    setup() {
      return {
        Size,
        COUNTRIES,
      };
    },
    template: `
      <div class="flex flex-col gap-4">
        <AntPhoneInput :size="Size.sm" label="Small" :countries="COUNTRIES" />
        <AntPhoneInput :size="Size.md" label="Medium" :countries="COUNTRIES" />
        <AntPhoneInput :size="Size.lg" label="Large" :countries="COUNTRIES" />
      </div>
    `,
  }),
};
