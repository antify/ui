import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import {
  InputState,
} from '../../../enums';
import AntPasswordInput from '../AntPasswordInput.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntPasswordInput> = {
  title: 'Inputs/Password Input',
  component: AntPasswordInput,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      control: 'text',
      table: {
        type: {
          summary: 'string|null',
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

type Story = StoryObj<typeof AntPasswordInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntPasswordInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntPasswordInput
        v-bind="args"
        v-model="args.modelValue"
      />`,
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
      AntPasswordInput,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        InputState,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>
          State
        </AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
            message="asdf"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.success"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.danger"
          />
        </AntFormGroup>

        <AntFormGroupLabel>
          Size
        </AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :size="Size.lg"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.info"
            :size="Size.md"
          />
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :state="InputState.success"
            :size="Size.sm"
          />
          <AntPasswordInput
            v-bind="args"
            v-model="args.modelValue"
            :state="InputState.warning"
            :size="Size.xs"
          />
          <AntPasswordInput
            v-bind="args"
            value="1234"
            :state="InputState.danger"
            :size="Size.xs2"
          />
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};
