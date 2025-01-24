import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntNumberInput from '../AntNumberInput.vue';
import {InputState} from '../../../enums/State.enum';
import {ref} from 'vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntNumberInput> = {
  title: 'Inputs/Number Input',
  component: AntNumberInput,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: {type: 'number'},
      table: {type: {summary: 'number|null'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
      table: {defaultValue: {summary: Size.md}},
    },
    placeholder: {
      table: {defaultValue: {summary: 'this.label'}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntNumberInput>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntNumberInput},
    setup() {
      return {args};
    },
    template: `
      <AntNumberInput
        v-bind="args"
        v-model="args.modelValue"
      />`
  }),
  args: {
    modelValue: null,
    steps: 1,
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

export const WithIndicators: Story = {
  render: (args) => ({
    components: {AntNumberInput, AntFormGroup, AntFormGroupLabel},
    setup() {
      return {args};
    },
    template: `
      <AntFormGroup>
        <AntFormGroup direction="column">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet" :steps="0.0001"/>
        </AntFormGroup>
      </AntFormGroup>`
  }),
  args: {
    ...Docs.args,
    indicators: true
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntNumberInput, AntFormGroup, AntFormGroupLabel},
    setup() {
      const value = ref(100.50);

      return {args, value, InputState, Size};
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>States</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                          :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.info"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.success"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.warning"/>
          <AntNumberInput v-bind="args" v-model="value" indicators label="Label"
                          description="Lorem ipsum dolor sit amet" :state="InputState.danger"/>
        </AntFormGroup>
        <AntFormGroupLabel>Sizes</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.lg" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.md" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.sm" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.xs" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" :size="Size.xs2" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.lg" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.md" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.sm" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.xs" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" v-model="args.modelValue" indicators :size="Size.xs2" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" disabled label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" disabled indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" readonly label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" readonly indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntNumberInput v-bind="args" v-model="args.modelValue" :skeleton="true" label="Label"
                            description="Lorem ipsum dolor sit amet"/>
            <AntNumberInput v-bind="args" v-model="args.modelValue" :skeleton="true" indicators label="Label"
                            description="Lorem ipsum dolor sit amet"/>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" placeholder="Placeholder"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" placeholder="Placeholder"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" label="Label"/>
        </AntFormGroup>
        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntFormGroup class="w-72">
          <AntNumberInput v-bind="args" v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
          <AntNumberInput v-bind="args" indicators v-model="args.modelValue" label="Label"
                          description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>
      </AntFormGroup>
    `
  }),
  args: {
    modelValue: null,
  }
};
