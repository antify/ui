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
      <AntColorInput v-bind="args" v-model="modelValue" />
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    options: defaultOptions,
    modelValue: 'entry-1',
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

      return {
        args,
        modelValue,
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
