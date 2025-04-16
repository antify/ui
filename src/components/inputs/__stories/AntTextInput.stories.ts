import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntTextInput from '../AntTextInput.vue';
import {
  TextInputType,
} from '../__types/AntTextInput.types';
import {
  InputState,
} from '../../../enums';
import AntPasswordInput from '../AntPasswordInput.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntButton from '../../buttons/AntButton.vue';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntTextInput> = {
  title: 'Inputs/Text Input',
  component: AntTextInput,
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
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(TextInputType),
      table: {
        defaultValue: {
          summary: TextInputType.text,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTextInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTextInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntTextInput
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

export const Autofocus: Story = {
  render: (args) => ({
    components: {
      AntTextInput,
      AntFormGroup,
      AntButton,
    },
    setup: () => {
      const inputRef = ref<HTMLElement | null>(null);

      return {
        inputRef,
        clickAutofocus: () => {
          inputRef.value?.focus();
        },
        args,
      };
    },
    template: `
      <AntFormGroup>
        <AntButton @click="clickAutofocus">Focus element</AntButton>

        <AntTextInput
          v-model="args.modelValue"
          v-bind="args"
          v-model:input-ref="inputRef"
        />
      </AntFormGroup>
    `,
  }),
  args: {
    ...Docs.args,
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
      AntTextInput,
    },
    setup() {
      return {
        args,
        InputState,
      };
    },
    template: `
      <div class="flex gap-2.5">
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          readonly
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.info"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.success"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.warning"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.danger"
        />
      </div>
      <div class="flex gap-2.5">
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.info"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.success"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.warning"
        />
        <AntTextInput
          v-bind="args"
          v-model="args.modelValue"
          :state="InputState.danger"
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
