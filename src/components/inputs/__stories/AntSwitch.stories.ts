import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntSwitch from '../AntSwitch.vue';
import {
  ref,
} from 'vue';
import {
  InputState,
} from '../../../enums';
import {
  Size,
} from '../../../enums/Size.enum';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntSwitch> = {
  title: 'Inputs/Switch',
  component: AntSwitch,
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
  },
};

export default meta;

type Story = StoryObj<typeof AntSwitch>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntSwitch,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <AntSwitch v-bind="args"/>
    `,
  }),
  args: {
    modelValue: false,
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
      AntSwitch,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value = ref(true);
      const notValue = ref(false);

      return {
        args,
        value,
        notValue,
        InputState,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States & Messages & False value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.base">Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.info">Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.success">Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.warning">Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.danger">Content
          </AntSwitch>
        </AntFormGroup>
        <AntFormGroupLabel>States & Messages & True value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.base">Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.info">Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.success">Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.warning">Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Here is a message']"
            :state="InputState.danger">Content
          </AntSwitch>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch
            v-model="notValue"
            :size="Size.lg"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            :size="Size.lg"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            :size="Size.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            :size="Size.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            :size="Size.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            :size="Size.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            :size="Size.xs"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            :size="Size.xs"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="notValue"
            :size="Size.xs2"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            :size="Size.xs2"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntSwitch
                v-model="notValue"
                label="Label"
                description="Lorem ipsum dolor sit amet"
                :state="InputState.base"
                :disabled="true"
              >Content
              </AntSwitch>
              <AntSwitch
                v-model="value"
                label="Label"
                description="Lorem ipsum dolor sit amet"
                :state="InputState.base"
                :disabled="true"
              >Content
              </AntSwitch>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntSwitch
                v-model="notValue"
                label="Label"
                description="Lorem ipsum dolor sit amet"
                :state="InputState.base"
                :readonly="true"
              >Content
              </AntSwitch>
              <AntSwitch
                v-model="value"
                label="Label"
                description="Lorem ipsum dolor sit amet"
                :state="InputState.base"
                :readonly="true"
              >Content
              </AntSwitch>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntSwitch
              v-model="value"
              label="Label"
              description="Lorem ipsum dolor sit amet"
              :state="InputState.base"
              skeleton
            >Content
            </AntSwitch>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain & (Plain & Content)</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue"/>
          <AntSwitch v-model="value"/>
          <AntSwitch v-model="notValue">Content</AntSwitch>
          <AntSwitch v-model="value">Content</AntSwitch>
        </AntFormGroup>
        <AntFormGroupLabel>Label & (Label & Content)</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" label="Label"/>
          <AntSwitch v-model="value" label="Label"/>
          <AntSwitch v-model="notValue" label="Label">Content</AntSwitch>
          <AntSwitch v-model="value" label="Label">Content</AntSwitch>
        </AntFormGroup>
        <AntFormGroupLabel>Description & (Description & Content)</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" description="Lorem ipsum dolor sit amet"/>
          <AntSwitch v-model="value" description="Lorem ipsum dolor sit amet"/>
          <AntSwitch
            v-model="notValue"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
          <AntSwitch
            v-model="value"
            description="Lorem ipsum dolor sit amet"
          >Content
          </AntSwitch>
        </AntFormGroup>
        <AntFormGroupLabel>Label & Description & (Label & Description & Content)</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSwitch v-model="notValue" description="Lorem ipsum dolor sit amet" label="Label"/>
          <AntSwitch v-model="value" description="Lorem ipsum dolor sit amet" label="Label"/>
          <AntSwitch v-model="notValue" description="Lorem ipsum dolor sit amet" label="Label"
          >Content
          </AntSwitch>
          <AntSwitch v-model="value" description="Lorem ipsum dolor sit amet" label="Label"
          >Content
          </AntSwitch>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
};
