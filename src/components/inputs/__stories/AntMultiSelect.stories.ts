import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntMultiSelect from '../AntMultiSelect.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import {
  ref,
} from 'vue';
import {
  Direction,
  Grouped,
  InputState,
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

const options: MultiSelectOption[] = [
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
  {
    label: 'Option 7',
    value: '7',
  },
  {
    label: 'Option 8',
    value: '8',
  },
  {
    label: 'Option 9',
    value: '9',
  },
  {
    label: 'Option 10',
    value: '10',
  },
  {
    label: 'Option 11',
    value: '11',
  },
  {
    label: 'Option 12',
    value: '12',
  },
  {
    label: 'Option 13',
    value: '13',
  },
  {
    label: 'Option 14',
    value: '14',
  },
  {
    label: 'Option 15',
    value: '15',
  },
  {
    label: 'Option 16',
    value: '16',
  },
  {
    label: 'Option 17',
    value: '17',
  },
  {
    label: 'Option 18',
    value: '18',
  },
  {
    label: 'Option 19',
    value: '19',
  },
  {
    label: 'Option 20',
    value: '20',
  },
  {
    label: 'Option 21',
    value: '21',
  },
  {
    label: 'Option 22',
    value: '22',
  },
  {
    label: 'Option 23',
    value: '23',
  },
  {
    label: 'Option 24',
    value: '24',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntMultiSelect,
    },
    setup() {
      const value = ref([
        '26',
      ]);

      return {
        args,
        value,
      };
    },
    template: `
        <div class="flex flex-col justify-center">
          <AntMultiSelect v-bind="args" v-model="value"/>
        </div>
    `,
  }),
  args: {
    label: 'Label',
    options,
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
    options,
  },
};
