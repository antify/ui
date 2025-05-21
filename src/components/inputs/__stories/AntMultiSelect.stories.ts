import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntMultiSelect from '../AntMultiSelect.vue';
import {
  ref,
} from 'vue';
import {
  InputState,
} from '../../../enums';
import {
  type MultiSelectOption,
} from '../__types/AntMultiSelect.types';

const meta: Meta<typeof AntMultiSelect> = {
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
      const value = ref(null);

      return {
        args,
        value,
      };
    },
    template: `
        <div class="flex flex-col justify-center">
          <AntMultiSelect v-bind="args" v-model="value" expanded/>
        </div>
    `,
  }),
  args: {
    label: 'Label',
    options,
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};
