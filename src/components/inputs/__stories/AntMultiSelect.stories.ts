import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntMultiSelect from '../AntMultiSelect.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntButton from '../../AntButton.vue';
import {
  ref,
} from 'vue';
import {
  Direction,
  Grouped,
  InputState,
  State,
} from '../../../enums';
import {
  type MultiSelectOption,
} from '../__types/AntMultiSelect.types';

const meta: Meta<typeof AntMultiSelect> = {
  computed: {
    Direction() {
      return Direction;
    },
  },
  title: 'Inputs/Multi Select',
  component: AntMultiSelect,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      table: {
        type: {
          summary: 'string|null',
        },
      },
    },
    options: {
      description: 'List of SelectOptions',
      table: {
        type: {
          summary: 'SelectOption[]',
          detail: 'type SelectOption = {label: string; value: string | number;}',
        },
      },
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(Grouped),
      table: {
        defaultValue: {
          summary: Grouped.none,
        },
      },
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
    placeholder: {
      table: {
        defaultValue: {
          summary: 'this.label',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntMultiSelect>;

const options1: MultiSelectOption[] = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
  {
    label: 'Option 3',
    value: '3',
  },
];

const options2: MultiSelectOption[] = [
  {
    label: 'Option 4',
    value: '4',
  },
  {
    label: 'Option 5',
    value: '5',
  },
  {
    label: 'Option 6',
    value: '6',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntMultiSelect,
      AntButton,
    },
    setup() {
      const value = ref([
        '26',
        '3',
      ]);

      const currentOptions = ref(options1);
      const selectOptions = (number?: number) => currentOptions.value = number === 1 ? options1 : options2;

      return {
        args,
        value,
        State,
        currentOptions,
        selectOptions,
      };
    },
    template: `
        <div class="flex flex-col justify-center gap-2.5">
          <div class="flex gap-2.5">
            <AntButton
              :state="currentOptions[0].value === '1' ? State.primary : State.base"
              :filled="currentOptions[0].value === '1'"
              @click="selectOptions(1)"
            >
              Options 1
            </AntButton>
            <AntButton
              :state="currentOptions[0].value === '4' ? State.primary : State.base"
              :filled="currentOptions[0].value === '4'"
              @click="selectOptions()"
            >
              Options 2
            </AntButton>
          </div>
          <AntMultiSelect v-bind="args" v-model="value" :options="currentOptions"/>
        </div>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    nullable: true,
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
      AntMultiSelect,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value = ref([
        '1',
        '2',
        '3',
      ]);

      return {
        args,
        value,
        Direction,
        InputState,
        Size,
        Grouped,
      };
    },
    template: `
        <AntFormGroup>
          <AntFormGroupLabel>State</AntFormGroupLabel>

          <AntFormGroup :direction="Direction.row">
                <AntMultiSelect v-bind="args" v-model="value"/>
                <AntMultiSelect v-bind="args" v-model="value" :state="InputState.info"/>
                <AntMultiSelect v-bind="args" v-model="value" :state="InputState.success"/>
                <AntMultiSelect v-bind="args" v-model="value" :state="InputState.warning"/>
                <AntMultiSelect v-bind="args" v-model="value" :state="InputState.danger"/>
          </AntFormGroup>

          <AntFormGroupLabel>Size</AntFormGroupLabel>

          <AntFormGroup :direction="Direction.row">
            <AntMultiSelect v-bind="args" v-model="value" :size="Size.lg"/>
            <AntMultiSelect v-bind="args" v-model="value" :size="Size.md"/>
            <AntMultiSelect v-bind="args" v-model="value" :size="Size.sm"/>
            <AntMultiSelect v-bind="args" v-model="value" :size="Size.xs"/>
            <AntMultiSelect v-bind="args" v-model="value" :size="Size.xs2"/>
          </AntFormGroup>

          <AntFormGroupLabel>Disabled, Skeleton, Nullable</AntFormGroupLabel>

          <AntFormGroup :direction="Direction.row">
            <AntMultiSelect v-bind="args" v-model="value" disabled/>
            <AntMultiSelect v-bind="args" v-model="value" skeleton/>
            <AntMultiSelect v-bind="args" v-model="value" nullable/>
          </AntFormGroup>

          <AntFormGroupLabel>Label</AntFormGroupLabel>
          <AntMultiSelect v-bind="args" v-model="value" label="Label"/>

          <AntFormGroupLabel>Description</AntFormGroupLabel>
          <AntMultiSelect v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>

          <AntFormGroupLabel>Labe + Description</AntFormGroupLabel>
          <AntMultiSelect v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"/>
        </AntFormGroup>
    `,
  }),
  args: {
    placeholder: 'Placeholder',
    options1,
  },
};
