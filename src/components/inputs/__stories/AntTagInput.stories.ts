import AntTagInput from '../AntTagInput.vue';
import type {Meta, StoryObj} from '@storybook/vue3';
import {type Ref} from 'vue';
import {ref} from 'vue';
import {InputState} from '../../../enums';
import type {SelectOption} from '../__types';
import {AntTagInputSize} from '../__types/AntTagInput.types';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntTagInput> = {
  title: 'Inputs/Tag Input',
  component: AntTagInput,
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(AntTagInputSize),
      table: {defaultValue: {summary: AntTagInputSize.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    },
    createCallback: {
      description: 'If allowCreate is true the createCallback needs to be specified. It will be called when the user creates a new tag. It should return a promise that resolves to a SelectOption.',
      table: {
        type: {
          summary: '(item: string) => Promise<SelectOption>',
          detail: `
Params:
item: string - the label of the new tag

Returns:
Promise<SelectOption> - the new tag as a SelectOption
          `
        }
      }
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntTagInput>;

const options: SelectOption[] = [
  {
    label: 'Tag',
    value: '1',
  },
  {
    label: 'Cat',
    value: '2',
  },
  {
    label: 'Dog',
    value: '3',
  },
  {
    label: 'Chicken',
    value: '4',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {AntTagInput},
    setup() {
      const value: Ref<string[]> = ref([]);

      return {
        args,
        value,
      };
    },
    template: `
      <div style="width: 360px">
        <AntTagInput v-model="value" v-bind="args"/>
      </div>
    `
  }),
  args: {
    options
  }
};

export const AllowCreate: Story = {
  render: Docs.render,
  args: {
    options,
    allowCreate: true,
    createCallback(item: string): Promise<SelectOption> {
      return new Promise((resolve) => {
        resolve({label: item, value: `${Math.random()}-${item}`});
      });
    },
  }
};

export const summary: Story = {
  render: (args) => ({
    components: {AntTagInput, AntFormGroup, AntFormGroupLabel},
    setup() {
      const value: Ref<string[]> = ref(['1', '2']);
      const noValue: Ref<string[]> = ref([]);

      return {
        args,
        value,
        noValue,
        InputState,
        AntTagInputSize
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.info" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.success" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.warning" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :state="InputState.danger" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.info" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.success" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.warning" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :state="InputState.danger" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.lg" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.md" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="noValue" :size="AntTagInputSize.sm" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup direction="row">
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.lg" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.md" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
            <AntTagInput v-bind="args" v-model="value" :size="AntTagInputSize.sm" class="w-48" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." disabled/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." disabled/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <!--TODO:: Add readonly prop if it is implemented-->
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet."/>
            <AntTagInput v-bind="args" v-model="value" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet."/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                         description="Lorem ipsum dolor sit amet." skeleton/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" value="value"/>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"/>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" value="Value"
                     description="Lorem ipsum dolor sit amet."/>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntTagInput v-bind="args" v-model="noValue" class="w-48" label="Label" value="Value"
                     description="Lorem ipsum dolor sit amet."/>
      </AntFormGroup>
    `
  }),
  args: {
    ...Docs.args
  }
};

