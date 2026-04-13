import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntNumberInput from '../AntNumberInput.vue';
import {
  InputState,
} from '../../../enums/State.enum';
import {
  ref,
} from 'vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import {
  fn,
} from '@storybook/test';

const meta: Meta<typeof AntNumberInput> = {
  title: 'Inputs/Number Input',
  component: AntNumberInput,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number|null',
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
      options: Object.values(Size),
      table: {
        defaultValue: {
          summary: Size.md,
        },
      },
    },
    steps: {
      control: {
        type: 'number',
      },
    },
    min: {
      control: {
        type: 'number',
      },
    },
    max: {
      control: {
        type: 'number',
      },
    },
    autocomplete: {
      control: {
        type: 'inline-radio',
      },
      options: [
        'on',
        'off',
      ],
      description: 'Enables or disables browser suggestions and autocomplete.',
      table: {
        defaultValue: {
          summary: 'off',
        },
      },
    },
    onlyInteger: {
      control: {
        type: 'boolean',
      },
      description: 'Forces the input to handle only whole numbers. Rounds fractional steps and inputs.',
      table: {
        category: 'Validation',
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntNumberInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntNumberInput v-bind="args" v-model="args.modelValue" />',
  }),
  args: {
    modelValue: null,
    steps: 1,
    label: 'Standard Number Input',
    description: 'Basic usage with manual entry or indicators',
    onValidate: fn(),
    autocomplete: 'off',
  },
};

export const SelectAllOnFocus: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const val = ref(999.99);

      return {
        args,
        val,
      };
    },
    template: `
      <AntFormGroup class="w-80">
        <AntFormGroupLabel>Select All on Focus</AntFormGroupLabel>
        <AntNumberInput
          v-bind="args"
          v-model="val"
          :selectAllOnFocus="true"
          label="Price"
          description="Click to select the entire number for quick replacement"
        />
      </AntFormGroup>
    `,
  }),
};

export const PrecisionAndSteps: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const intVal = ref(null);
      const floatVal = ref(0.5);

      return {
        args,
        intVal,
        floatVal,
      };
    },
    template: `
      <AntFormGroup direction="row">
        <AntFormGroup>
          <AntFormGroupLabel>Integer (Step 1)</AntFormGroupLabel>
          <AntNumberInput v-bind="args" :steps="1" v-model="intVal" />
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Currency Style (Step 0.01)</AntFormGroupLabel>
          <AntNumberInput v-bind="args" :steps="0.01" v-model="floatVal" indicators />
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>High Precision (Step 0.0005)</AntFormGroupLabel>
          <AntNumberInput v-bind="args" :steps="0.0005" v-model="floatVal" indicators />
        </AntFormGroup>
      </AntFormGroup>`,
  }),
};

export const Limits: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const limitedVal = ref(5);

      return {
        args,
        limitedVal,
      };
    },
    template: `
      <AntFormGroup class="w-96">
        <AntFormGroupLabel>Min: {{ args.min }} | Max: {{ args.max }}</AntFormGroupLabel>
        <AntNumberInput
          v-bind="args"
          v-model="limitedVal"
          label="Try to exceed limits"
        />
      </AntFormGroup>`,
  }),
  args: {
    min: 0,
    max: 10,
    indicators: true,
    limiter: true,
  },
};

export const WithIndicators: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
    },
    setup() {
      const val1 = ref(null);
      const val2 = ref(null);

      return {
        args,
        val1,
        val2,
      };
    },
    template: `
      <AntFormGroup direction="column">
        <AntNumberInput v-bind="args" v-model="val1" label="Step 1" :steps="1"/>
        <AntNumberInput v-bind="args" v-model="val2" label="Step 0.0001" :steps="0.0001"/>
      </AntFormGroup>`,
  }),
  args: {
    ...Docs.args,
    indicators: true,
  },
};

export const IntegerValidation: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const val1 = ref(10);
      const val2 = ref(10);

      return {
        args,
        val1,
        val2,
      };
    },
    template: `
      <AntFormGroup>
        <div class="grid grid-cols-2 gap-8">
          <AntFormGroup>
            <AntFormGroupLabel class="text-blue-600">Standard Mode (onlyInteger: false)</AntFormGroupLabel>
            <AntNumberInput
              v-bind="args"
              v-model="val1"
              :onlyInteger="false"
              label="Allows decimals"
              description="With step 0.5 this will result in 10.5"
              indicators
            />
            <div class="mt-2 text-sm text-gray-500">Value: {{ val1 }}</div>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel class="text-orange-600">Integer Mode (onlyInteger: true)</AntFormGroupLabel>
            <AntNumberInput
              v-bind="args"
              v-model="val2"
              :onlyInteger="true"
              label="Integers Only"
              description="Prevents '.' or ',' and rounds step results"
              indicators
            />
            <div class="mt-2 text-sm text-gray-500">Value: {{ val2 }}</div>
          </AntFormGroup>
        </div>

        <div class="mt-8 p-4 bg-gray-50 rounded border border-dashed border-gray-300">
          <h4 class="font-bold mb-2">How to test:</h4>
          <ul class="list-disc ml-5 text-sm space-y-1">
            <li>Set <b>steps</b> to <code>0.5</code> in Controls.</li>
            <li>Click <b>+</b> on both inputs.</li>
            <li>The left one will show <b>10.5</b>, the right one (if fixed) should show <b>11</b> (or stay 10 if steps < 1).</li>
            <li>Try to type a dot <code>.</code> in the right input — it should be blocked.</li>
          </ul>
        </div>
      </AntFormGroup>
    `,
  }),
  args: {
    steps: 0.5,
  },
};

export const InitialValueValidation: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const val = ref(10.75);

      return {
        args,
        val,
      };
    },
    template: `
      <AntFormGroup class="w-96">
        <AntFormGroupLabel>Parent provided 10.75 while onlyInteger is TRUE</AntFormGroupLabel>

        <AntNumberInput
          v-bind="args"
          v-model="val"
          :onlyInteger="true"
          label="Integer normalization test"
          description="Value will be normalized on first interaction or blur"
          indicators
        />

        <div class="mt-4 p-3 bg-amber-50 rounded border border-amber-200 text-sm">
          <strong>Current v-model value:</strong> {{ val }}
          <br/>
          <span class="text-xs text-amber-700">
            (If the component is "reliable", it should round 10.75 to 11 when you click +/- or blur the field)
          </span>
        </div>
      </AntFormGroup>
    `,
  }),
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value = ref(100.50);

      return {
        args,
        value,
        InputState,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.lg" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.md" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.sm" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.xs" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.xs2" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.lg" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.md" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.sm" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.xs" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.xs2" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" disabled label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" disabled indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" readonly label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" readonly indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" :skeleton="true" label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" :skeleton="true" indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" placeholder="Placeholder"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" placeholder="Placeholder"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" label="Label"/>
        </AntFormGroup>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
  },
};
