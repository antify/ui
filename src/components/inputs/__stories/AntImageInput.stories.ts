import {
  type Meta,
  type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntImageInput from '../AntImageInput.vue';
import {
  InputState,
} from '../../../enums';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntImageInput> = {
  title: 'Inputs/Image Input',
  component: AntImageInput,
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
  },
};

export default meta;

type Story = StoryObj<typeof AntImageInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntImageInput,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntImageInput
        v-bind="args"
        v-model="args.modelValue"
      />`,
  }),
  args: {
    modelValue: '/avatar.jpg',
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};

export const Empty: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: null,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => ({
    components: {
      AntFormGroupLabel,
      AntImageInput,
      AntFormGroup,
      ref,
    },
    setup() {
      const valuedModelValue = ref('/avatar.jpg');
      const emptyModelValue = ref(null);

      return {
        valuedModelValue,
        emptyModelValue,
      };
    },
    template: `
     <AntFormGroup>
       <AntFormGroupLabel>Default</AntFormGroupLabel>
       <AntImageInput
         v-model="valuedModelValue"
         label="Label"
         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
       />
       <AntFormGroupLabel>Empty</AntFormGroupLabel>
       <AntImageInput
         v-model="emptyModelValue"
         label="Label"
         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
       />
       <AntFormGroupLabel>Disabled</AntFormGroupLabel>
       <AntImageInput
         v-model="valuedModelValue"
         label="Label"
         description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
       />
     </AntFormGroup>
    `,
  }),
};
