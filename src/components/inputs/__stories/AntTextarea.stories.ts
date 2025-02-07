import {
  Grouped as _Grouped,
} from '../../../enums/Grouped.enum';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntTextarea from '../AntTextarea.vue';
import {
  InputState,
} from '../../../enums';

const meta: Meta<typeof AntTextarea> = {
  title: 'Inputs/Textarea',
  component: AntTextarea,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
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
    placeholder: {
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
        'Some InputStates can has an icon. Control with this property if it get shown or not.',
      table: {
        type: {
          summary: 'Type',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntTextarea>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTextarea,
    },
    setup: () => {
      return {
        args,
      };
    },
    template: `
      <div class="h-screen">
        <AntTextarea
          v-bind="args"
          v-model="args.modelValue"
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

export const summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="pb-10 flex flex-col gap-2">
        <div class="flex gap-2">
          <AntTextarea v-bind="args" v-model="modelValue" state="base"/>
          <AntTextarea v-bind="args" v-model="modelValue" state="info"/>
          <AntTextarea v-bind="args" v-model="modelValue" state="success"/>
          <AntTextarea v-bind="args" v-model="modelValue" state="warning"/>
          <AntTextarea v-bind="args" v-model="modelValue" state="danger"/>
        </div>

        <div class="flex gap-2">
          <AntTextarea v-bind="args" v-model="modelValue" :show-icon="false" state="base"/>
          <AntTextarea v-bind="args" v-model="modelValue" :show-icon="false" state="info"/>
          <AntTextarea v-bind="args" v-model="modelValue" :show-icon="false" state="success"/>
          <AntTextarea v-bind="args" v-model="modelValue" :show-icon="false" state="warning"/>
          <AntTextarea v-bind="args" v-model="modelValue" :show-icon="false" state="danger"/>
        </div>

        <div class="flex gap-[-2px]">
          <AntTextarea v-bind="args" v-model="modelValue" grouped="left"/>
          <AntTextarea v-bind="args" v-model="modelValue" grouped="center" state="danger"/>
          <AntTextarea v-bind="args" v-model="modelValue" grouped="right" state="info"/>
        </div>
      </div>`,
  }),
  args: Docs.args,
};
