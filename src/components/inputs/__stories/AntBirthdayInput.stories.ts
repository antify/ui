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
import AntBirthdayInput from '../AntBirthdayInput.vue';
import {
  InputState,
} from '../../../enums';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntBirthdayInput> = {
  title: 'Inputs/Birthday Input',
  component: AntBirthdayInput,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      control: {
        type: 'text',
      },
      description: 'Format: YYYY-MM-DD',
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

type Story = StoryObj<typeof AntBirthdayInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntBirthdayInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntBirthdayInput
        v-bind="args"
        v-model="args.modelValue"
      />
    `,
  }),
  args: {
    modelValue: null,
    label: 'Date of Birth',
    description: 'Please select your birthday',
  },
};

export const InvalidValues: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntBirthdayInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          Invalid Format (e.g. 01994-002-0023)
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="01994-002-0023"
            description="Falls back to placeholder due to strict format validation"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Impossible Date (e.g. 2023-02-29)
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="2023-02-29"
            description="2023 is not a leap year"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Impossible Date (e.g. 2023-04-31)
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="2023-04-31"
            description="April only has 30 days"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Random String (e.g. "not-a-date")
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="not-a-date"
            description="Fails RegEx test"
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    label: 'Date of Birth',
  },
};

export const Skeleton: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntBirthdayInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        Size,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          Skeleton
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            skeleton
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Date of Birth',
    description: 'Please select your birthday',
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
      AntBirthdayInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        InputState,
        Size,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          State
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntBirthdayInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
          />
          <AntBirthdayInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.success"
          />
          <AntBirthdayInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
          />
          <AntBirthdayInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.danger"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Nullable
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="1990-05-15"
            nullable
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1990-05-15"
            :state="InputState.info"
            nullable
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1990-05-15"
            :state="InputState.success"
            nullable
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1990-05-15"
            :state="InputState.warning"
            nullable
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1990-05-15"
            :state="InputState.danger"
            nullable
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Size
        </AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBirthdayInput
            v-bind="args"
            model-value="1985-12-01"
            :size="Size.lg"
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1992-08-24"
            :size="Size.md"
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="2000-01-01"
            :size="Size.sm"
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="1998-11-11"
            :size="Size.xs"
          />
          <AntBirthdayInput
            v-bind="args"
            model-value="2005-04-20"
            :size="Size.xs2"
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Date of Birth',
    description: 'Please select your birthday',
  },
};
