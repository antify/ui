import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import {
  Direction,
} from '../../../enums/Direction.enum';
import AntDateInput from '../AntDateInput.vue';
import {
  InputState,
} from '../../../enums';
import {
  AntDateInputTypes,
} from '../__types/AntDateInput.types';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntDateInput> = {
  title: 'Inputs/Date Input',
  component: AntDateInput,
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
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(AntDateInputTypes),
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

type Story = StoryObj<typeof AntDateInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntDateInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntDateInput
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};

export const WithDateLimits: Story = {
  render: (args) => ({
    components: {
      AntDateInput,
    },
    setup() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      const min = '2024-01-01';
      const max = `${year}-${month}-${day}`;

      return {
        args,
        min,
        max,
      };
    },
    template: `
      <div class="flex flex-col gap-4">
        <ul class="text-sm text-base-500">
          <li>Min-Date: <span class="font-bold">{{ min }}</span></li>
          <li>Max-Date: <span class="font-bold">{{ max }}</span></li>
        </ul>

        <AntDateInput
          v-bind="args"
          v-model="args.modelValue"
          :min="min"
          :max="max"
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
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
      AntDateInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        InputState,
        Size,
        AntDateInputType: AntDateInputTypes,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          State
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.success"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.danger"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Nullable
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            model-value="2025-01-01"
            nullable
          />
          <AntDateInput
            v-bind="args"
            model-value="2025-01-01"
            :state="InputState.info"
            nullable
          />
          <AntDateInput
            v-bind="args"
            model-value="2025-01-01"
            :state="InputState.success"
            nullable
          />
          <AntDateInput
            v-bind="args"
            model-value="2025-01-01"
            :state="InputState.warning"
            nullable
          />
          <AntDateInput
            v-bind="args"
            model-value="2025-01-01"
            :state="InputState.danger"
            nullable
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Type
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            label="Type date"
            :type="AntDateInputType.date"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            label="Type datetimeLocal"
            :type="AntDateInputType.datetimeLocal"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            label="Type month"
            :type="AntDateInputType.month"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            label="Type time"
            :type="AntDateInputType.time"
          />
          <AntDateInput
            v-bind="args"
            v-model="args.modelValue"
            label="Type week"
            :type="AntDateInputType.week"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Size
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntDateInput
            v-bind="args"
            value="2024-01-01"
            :size="Size.lg"
          />
          <AntDateInput
            v-bind="args"
            value="2018-06-12T19:30"
            :size="Size.md"
          />
          <AntDateInput
            v-bind="args"
            value="2024-12"
            :size="Size.sm"
          />
          <AntDateInput
            v-bind="args"
            value="14:28"
            :size="Size.xs"
          />
          <AntDateInput
            v-bind="args"
            value="2024-W18"
            :size="Size.xs2"
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};
