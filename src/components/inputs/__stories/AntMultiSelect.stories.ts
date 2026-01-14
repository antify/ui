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

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntMultiSelect,
      AntButton,
    },
    setup() {
      const value = ref([
        '1',
        '2',
        '3',
      ]);

      return {
        args,
        State,
        value,
      };
    },
    template: `
          <AntMultiSelect v-bind="args" v-model="value"/>
    `,
  }),
  args: {
    options:[
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
    ],
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
    options: [
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
    ],
  },
};
