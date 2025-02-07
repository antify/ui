import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  computed, ref,
} from 'vue';
import {
  Size,
} from '../../../enums';
import {
  InputState,
} from '../../../enums';
import AntSwitcher from '../AntSwitcher.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntSwitcher> = {
  title: 'Inputs/Switcher',
  component: AntSwitcher,
  argTypes: {
    modelValue: {
      control: 'text',
    },
    options: {
      table: {
        type: {
          summary: 'string | SwitcherOption[]',
          detail: `
type SwitcherOption = {
  label: string;
  value: string | number;
  [key: string]: unknown;
}
          `,
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
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSwitcher>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntSwitcher,
    },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val,
      });

      return {
        args,
        modelValue,
      };
    },
    template: `
      <AntSwitcher v-bind="args" v-model="modelValue"/>
    `,
  }),
  args: {
    options: [
      {
        label: 'Entry 1',
        value: 'entry-1',
      },
      {
        label: 'Entry 2',
        value: 'entry-2',
      },
      {
        label: 'Entry 3',
        value: 'entry-3',
      },
      {
        label: 'Entry 4',
        value: 'entry-4',
      },
    ],
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
      AntSwitcher,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
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
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :state="InputState.base"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :state="InputState.info"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :state="InputState.success"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :state="InputState.warning"/>
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                       :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :size="Size.lg"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :size="Size.md"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :size="Size.sm"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :size="Size.xs"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
          <AntSwitcher v-bind="args" v-model="modelValue" label="Label" :size="Size.xs2"
                       description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
          />
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntSwitcher v-bind="args" v-model="modelValue" :disabled="true" label="Label" class="w-60"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntSwitcher v-bind="args" v-model="modelValue" :readonly="true" label="Label" class="w-60"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntSwitcher v-bind="args" v-model="modelValue" :skeleton="true" label="Label" class="w-60"
                         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntSwitcher v-bind="args" v-model="modelValue" class="w-60"/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntSwitcher v-bind="args" v-model="modelValue" label="Label" class="w-60"/>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntSwitcher v-bind="args" v-model="modelValue" class="w-60"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntSwitcher v-bind="args" v-model="modelValue" label="Label" class="w-60"
                     description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>
      </AntFormGroup>
    `,
  }),
  args: {
    options: [
      {
        label: 'Entry 1',
        value: 'entry-1',
      },
      {
        label: 'Entry 2',
        value: 'entry-2',
      },
      {
        label: 'Entry 3',
        value: 'entry-3',
      },
      {
        label: 'Entry 4',
        value: 'entry-4',
      },
    ],
    modelValue: 'entry-1',
  },
};
