import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  ref,
  computed,
} from 'vue';
import {
  Size,
} from '../../../enums';
import {
  InputState,
} from '../../../enums';
import AntColorInput from './AntColorInput.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntColorInput> = {
  title: 'Inputs/ColorInput',
  component: AntColorInput,
  argTypes: {
    modelValue: {
      control: 'text',
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
    },
    colorsPerRow: {
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

const defaultOptions = [
  'primary-500',
  'red-500',
  'green-500',
  'blue-500',
  'yellow-500',
  'purple-500',
  'pink-500',
  'orange-500',
];

const lightColorOptions = [
  'primary-300',
  'red-300',
  'green-300',
  'blue-300',
  'yellow-300',
  'purple-300',
  'pink-300',
  'orange-300',
];

const bulkColorOptions = [
  'red-200',
  'red-300',
  'red-400',
  'red-500',
  'red-600',
  'red-700',
  'red-800',
  'red-900',
  'orange-200',
  'orange-300',
  'orange-400',
  'orange-500',
  'orange-600',
  'orange-700',
  'orange-800',
  'orange-900',
  'amber-200',
  'amber-300',
  'amber-400',
  'amber-500',
  'amber-600',
  'amber-700',
  'amber-800',
  'amber-900',
  'yellow-200',
  'yellow-300',
  'yellow-400',
  'yellow-500',
  'yellow-600',
  'yellow-700',
  'yellow-800',
  'yellow-900',
  'lime-200',
  'lime-300',
  'lime-400',
  'lime-500',
  'lime-600',
  'lime-700',
  'lime-800',
  'lime-900',
  'green-200',
  'green-300',
  'green-400',
  'green-500',
  'green-600',
  'green-700',
  'green-800',
  'green-900',
  'emerald-200',
  'emerald-300',
  'emerald-400',
  'emerald-500',
  'emerald-600',
  'emerald-700',
  'emerald-800',
  'emerald-900',
  'teal-200',
  'teal-300',
  'teal-400',
  'teal-500',
  'teal-600',
  'teal-700',
  'teal-800',
  'teal-900',
  'cyan-200',
  'cyan-300',
  'cyan-400',
  'cyan-500',
  'cyan-600',
  'cyan-700',
  'cyan-800',
  'cyan-900',
  'sky-200',
  'sky-300',
  'sky-400',
  'sky-500',
  'sky-600',
  'sky-700',
  'sky-800',
  'sky-900',
  'blue-200',
  'blue-300',
  'blue-400',
  'blue-500',
  'blue-600',
  'blue-700',
  'blue-800',
  'blue-900',
  'indigo-200',
  'indigo-300',
  'indigo-400',
  'indigo-500',
  'indigo-600',
  'indigo-700',
  'indigo-800',
  'indigo-900',
  'purple-200',
  'purple-300',
  'purple-400',
  'purple-500',
  'purple-600',
  'purple-700',
  'purple-800',
  'purple-900',
  'fuchsia-200',
  'fuchsia-300',
  'fuchsia-400',
  'fuchsia-500',
  'fuchsia-600',
  'fuchsia-700',
  'fuchsia-800',
  'fuchsia-900',
  'pink-200',
  'pink-300',
  'pink-400',
  'pink-500',
  'pink-600',
  'pink-700',
  'pink-800',
  'pink-900',
  'rose-200',
  'rose-300',
  'rose-400',
  'rose-500',
  'rose-600',
  'rose-700',
  'rose-800',
  'rose-900',
  'gray-200',
  'gray-300',
  'gray-400',
  'gray-500',
  'gray-600',
  'gray-700',
  'gray-800',
  'gray-900',
  'stone-200',
  'stone-300',
  'stone-400',
  'stone-500',
  'stone-600',
  'stone-700',
  'stone-800',
  'stone-900',
];

type Story = StoryObj<typeof AntColorInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntColorInput,
    },
    setup() {
      const modelValue = computed({
        get: () => args.modelValue,
        // @ts-expect-error expect read only
        set: (val) => args.modelValue = val,
      });

      return {
        modelValue,
        args,
      };
    },
    template: `
      <div class="h-[200px] p-[50px]">
        <AntColorInput v-bind="args" v-model="modelValue" />
      </div>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    options: bulkColorOptions,
    modelValue: 'entry-1',
    colorsPerRow: 8,
    dropdownWrapperClass: 'h-[100px] overflow-y-auto',
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
      AntColorInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const modelValue = computed({
        get: () => args.modelValue,
        // @ts-expect-error expect read only
        set: (val) => args.modelValue = val,
      });
      const skeleton = ref(true);
      const lightModelValue = ref('primary-300');

      return {
        args,
        modelValue,
        lightModelValue,
        lightColorOptions,
        InputState,
        skeleton,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                         :state="InputState.base"/>
          <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                         :state="InputState.info"/>
          <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                         :state="InputState.success"/>
          <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                         :state="InputState.warning"/>
          <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                         :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntColorInput v-bind="args" v-model="modelValue" label="Label" :size="Size.lg"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntColorInput v-bind="args" v-model="modelValue" label="Label" :size="Size.md"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntColorInput v-bind="args" v-model="modelValue" label="Label" :size="Size.sm"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntColorInput v-bind="args" v-model="modelValue" label="Label" :size="Size.xs"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntColorInput v-bind="args" v-model="modelValue" label="Label" :size="Size.xs2"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntColorInput v-bind="args" v-model="modelValue" :disabled="true" label="Label"
                           description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntColorInput v-bind="args" v-model="modelValue" :readonly="true" label="Label"
                           description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntColorInput v-bind="args" v-model="modelValue" :skeleton="true" label="Label"
                           description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntColorInput v-bind="args" v-model="modelValue"/>
        <AntFormGroupLabel>Light Color Options</AntFormGroupLabel>
        <AntColorInput v-model="lightModelValue" :options="lightColorOptions" />
        <AntFormGroupLabel>Nullable</AntFormGroupLabel>
        <AntColorInput v-bind="args" v-model="modelValue" nullable/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntColorInput v-bind="args" v-model="modelValue" label="Label"/>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntColorInput v-bind="args" v-model="modelValue"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntColorInput v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>
      </AntFormGroup>
    `,
  }),
  args: {
    options: defaultOptions,
    modelValue: 'primary-500',
  },
};
