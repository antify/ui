import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../../enums/Size.enum';
import {
  BaseInputType,
} from '../__types/AntBaseInput.types';
import AntBaseInput from '../AntBaseInput.vue';
import AntButton from '../../../buttons/AntButton.vue';
import AntIcon from '../../../AntIcon.vue';
import {
  Grouped as _Grouped,
} from '../../../../enums/Grouped.enum';
import {
  faSearch, faEye,
} from '@fortawesome/free-solid-svg-icons';
import {
  InputState,
} from '../../../../enums';
import AntFormGroup from '../../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../../forms/AntFormGroupLabel.vue';
import {
  Direction,
} from '../../../../enums/Direction.enum';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntBaseInput> = {
  computed: {
    Direction() {
      return Direction;
    },
  },
  components: {
    AntFormGroup,
  },
  title: 'Inputs/Elements/Base Input',
  component: AntBaseInput,
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
      table: {
        type: {
          summary: 'string|number|null',
        },
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(BaseInputType),
      table: {
        defaultValue: {
          summary: BaseInputType.text,
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
      control: 'text',
      table: {
        defaultValue: {
          summary: 'this.label',
        },
      },
    },
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(_Grouped),
      description: 'Where is this fields position in a group',
      table: {
        defaultValue: {
          summary: _Grouped.none,
        },
      },
    },
    wrapperClass: {
      control: 'text',
      description:
        'Class for the first element because the attribute "class" would affect the input element.',
      table: {
        type: {
          summary: 'string|object',
        },
      },
    },
    showIcon: {
      control: 'boolean',
      description:
        'Some InputStates can have an icon. Control with this property if it gets shown or not.',
    },
    iconLeft: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed left to the input text.<br>Use Font-awesome Icons.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntBaseInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntBaseInput,
    },
    setup: () => {
      return {
        args,
      };
    },
    template: `
      <AntBaseInput
        v-model="args.modelValue"
        v-bind="args"
      />`,
  }),
  args: {
    modelValue: null,
    placeholder: 'Placeholder',
  },
};

export const Nullable: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    nullable: true,
  },
};

export const IconLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faSearch,
  },
};

export const IconRight: Story = {
  render: (args) => ({
    components: {
      AntBaseInput,
      AntIcon,
    },
    setup: () => {
      return {
        args,
        faEye,
      };
    },
    template: `
      <AntBaseInput
        v-model="args.modelValue"
        v-bind="args"
      >
        <template #icon-right>
          <AntIcon :icon="faEye"/>
        </template>
      </AntBaseInput>`,
  }),
  args: {
    ...Docs.args,
  },
};

export const Autofocus: Story = {
  render: (args) => ({
    components: {
      AntBaseInput,
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

        <AntBaseInput
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
      AntBaseInput,
      AntButton,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup: () => {
      return {
        args,
        faSearch,
        Direction,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>State</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" v-model="modelValue" state="base"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="info"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="success"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="warning"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" v-model="modelValue" state="base" :size="Size.lg"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="info" :size="Size.md"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="success" :size="Size.sm"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="warning" :size="Size.xs"/>
          <AntBaseInput v-bind="args" v-model="modelValue" state="danger" :size="Size.xs2"/>
        </AntFormGroup>

        <AntFormGroupLabel>Value</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" value="A value" state="base"/>
          <AntBaseInput v-bind="args" value="A value" state="info"/>
          <AntBaseInput v-bind="args" value="A value" state="success"/>
          <AntBaseInput v-bind="args" value="A value" state="warning"/>
          <AntBaseInput v-bind="args" value="A value" state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Disabled</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" value="A value" disabled state="base"/>
          <AntBaseInput v-bind="args" value="A value" disabled state="info"/>
          <AntBaseInput v-bind="args" value="A value" disabled state="success"/>
          <AntBaseInput v-bind="args" value="A value" disabled state="warning"/>
          <AntBaseInput v-bind="args" value="A value" disabled state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Value & Nullable</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" value="A value" nullable state="base"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="info"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="success"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="warning"/>
          <AntBaseInput v-bind="args" value="A value" nullable state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Value & Nullable & Disabled</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" value="A value" nullable disabled state="base"/>
          <AntBaseInput v-bind="args" value="A value" nullable disabled state="info"/>
          <AntBaseInput v-bind="args" value="A value" nullable disabled state="success"/>
          <AntBaseInput v-bind="args" value="A value" nullable disabled state="warning"/>
          <AntBaseInput v-bind="args" value="A value" nullable disabled state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Placeholder</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" v-model="modelValue" :show-icon="false" state="base"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :show-icon="false" state="info"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :show-icon="false" state="success"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :show-icon="false" state="warning"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :show-icon="false" state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Icon left</AntFormGroupLabel>
        <AntFormGroup :direction="Direction.row">
          <AntBaseInput v-bind="args" v-model="modelValue" :icon-left="faSearch" state="base"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :icon-left="faSearch" state="info"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :icon-left="faSearch" state="success"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :icon-left="faSearch" state="warning"/>
          <AntBaseInput v-bind="args" v-model="modelValue" :icon-left="faSearch" state="danger"/>
        </AntFormGroup>

        <AntFormGroupLabel>Grouped</AntFormGroupLabel>
        <div class="flex gap-[-2px]">
          <AntBaseInput v-bind="args" v-model="modelValue" grouped="left"/>
          <AntBaseInput v-bind="args" v-model="modelValue" grouped="center" state="danger"/>
          <AntBaseInput v-bind="args" v-model="modelValue" grouped="right" state="info"/>
        </div>
      </AntFormGroup>`,
  }),
  args: {
    placeholder: 'Placeholder',
  },
};
