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
    clearOnFocus: {
      control: {
        type: 'boolean',
      },
      description: 'Clears the input or sets to defaultValue when focused',
    },
    defaultValue: {
      control: {
        type: 'number',
      },
      description: 'The value used when resetting or as a starting point for indicators',
    },
    placeholder: {
      table: {
        defaultValue: {
          summary: 'this.label',
        },
      },
    },
    integer: {
      control: {
        type: 'boolean',
      },
      description: 'Restricts input to whole numbers only',
    },
    maxPrecision: {
      control: {
        type: 'number',
      },
      description: 'Limits the number of decimal places',
    },
    maxLength: {
      control: {
        type: 'number',
      },
      description: 'Maximum character length to prevent JS Number overflow bugs',
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
    setup() { return {
      args,
    }; },
    template: '<AntNumberInput v-bind="args" v-model="args.modelValue" />',
  }),
  args: {
    modelValue: null,
    steps: 1,
    label: 'Standard Number Input',
    description: 'Basic usage with manual entry or indicators',
  },
};

export const SpecialBehaviors: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const val1 = ref(42);
      const val2 = ref(100);

      return {
        args,
        val1,
        val2,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup direction="column">
          <AntFormGroup>
            <AntFormGroupLabel>Clear on Focus (to 0)</AntFormGroupLabel>
            <AntNumberInput
              v-bind="args"
              v-model="val1"
              :clearOnFocus="true"
              :defaultValue="0"
              label="Click me"
              description="Value will reset to 0 when you focus the input"
            />
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Clear on Focus (to Default 100)</AntFormGroupLabel>
            <AntNumberInput
              v-bind="args"
              v-model="val2"
              :clearOnFocus="true"
              :defaultValue="100"
              label="Reset to 100"
              description="Focus to see it jump back to 100"
            />
          </AntFormGroup>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
};

export const ClearToNullOnFocus: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const myValue = ref(12345);

      return {
        args,
        myValue,
      };
    },
    template: `
      <AntFormGroup class="w-80">
        <AntFormGroupLabel>Case: Full Clear on Focus</AntFormGroupLabel>
        <AntNumberInput
          v-bind="args"
          v-model="myValue"
          :clearOnFocus="true"
          placeholder="Enter new number..."
          label="Amount"
          description="Click in the field to make the existing value (12345) disappear"
        />
        <p class="text-xs text-gray-500 mt-2">
          Model value: <span class="font-mono text-primary-600">{{ myValue ?? 'null' }}</span>
        </p>
      </AntFormGroup>
    `,
  }),
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
        <AntFormGroupLabel>Case: Select All on Focus</AntFormGroupLabel>
        <AntNumberInput
          v-bind="args"
          v-model="val"
          :selectAllOnFocus="true"
          label="Price"
          description="Click to select the entire number for quick replacement"
        />
        <p class="text-xs text-gray-500 mt-2">
          Focus the input to see the selection effect.
        </p>
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
      const floatVal = ref(0.5);

      return {
        args,
        floatVal,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Integer (Step 1)</AntFormGroupLabel>
            <AntNumberInput v-bind="args" :steps="1" v-model="args.modelValue" />
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Currency Style (Step 0.01)</AntFormGroupLabel>
            <AntNumberInput v-bind="args" :steps="0.01" v-model="floatVal" indicators />
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>High Precision (Step 0.0005)</AntFormGroupLabel>
            <AntNumberInput v-bind="args" :steps="0.0005" v-model="floatVal" indicators />
          </AntFormGroup>
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
        <AntFormGroupLabel>Min: 0 | Max: 10</AntFormGroupLabel>
        <AntNumberInput
          v-bind="args"
          v-model="limitedVal"
          :min="0"
          :max="10"
          indicators
          limiter
          label="Try to exceed limits"
        />
      </AntFormGroup>`,
  }),
};

export const WithIndicators: Story = {
  render: (args) => ({
    components: {
      AntNumberInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup direction="column">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet" :steps="0.0001"/>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
  args: {
    ...Docs.args,
    indicators: true,
  },
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
