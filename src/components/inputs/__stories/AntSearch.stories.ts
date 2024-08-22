import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import AntSearch from '../AntSearch.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import {ref} from 'vue';

const meta: Meta<typeof AntSearch> = {
  title: 'Inputs/Search',
  component: AntSearch,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    modelValue: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    inputTimeout: {
      description:
        'How long is the timeout between inputs to update the value in milliseconds',
    },
    query: {
      description:
        'Read and write the value into url as urldecoded string. Using the given string as query name.',
    },
    placeholder: {
      table: {defaultValue: {summary: 'Search'}},
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSearch>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntSearch},
    setup() {
      return {args};
    },
    template: `
      <AntSearch v-bind="args" v-model="args.modelValue"/>
      <div class="text-xs mt-4">Reactive value: {{ args.modelValue }}</div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: 'Search',
  },
};

export const summary: Story = {
  render: (args) => ({
    components: {AntSearch, AntFormGroup, AntFormGroupLabel},
    setup() {
      const value = ref('Keyword');
      const noValue = ref('');

      return {args, Size, value, noValue};
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSearch v-bind="args" v-model="noValue" :size="Size.lg"/>
          <AntSearch v-bind="args" v-model="noValue" :size="Size.md"/>
          <AntSearch v-bind="args" v-model="noValue" :size="Size.sm"/>
          <AntSearch v-bind="args" v-model="noValue" :size="Size.xs"/>
          <AntSearch v-bind="args" v-model="noValue" :size="Size.xs2"/>
        </AntFormGroup>

        <AntFormGroupLabel>Size & Value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSearch v-bind="args" v-model="value" :size="Size.lg"/>
          <AntSearch v-bind="args" v-model="value" :size="Size.md"/>
          <AntSearch v-bind="args" v-model="value" :size="Size.sm"/>
          <AntSearch v-bind="args" v-model="value" :size="Size.xs"/>
          <AntSearch v-bind="args" v-model="value" :size="Size.xs2"/>
        </AntFormGroup>

        <AntFormGroupLabel>Disabled</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntSearch v-model="noValue" disabled/>
          <AntSearch v-model="value" disabled/>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <AntSearch v-model="value" skeleton label="Label" description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntSearch v-model="value"/>

        <AntFormGroupLabel>Label</AntFormGroupLabel>
        <AntSearch v-model="value" label="Label"/>

        <AntFormGroupLabel>Description</AntFormGroupLabel>
        <AntSearch v-model="value" description="Lorem ipsum dolor sit amet"/>

        <AntFormGroupLabel>Label & Description</AntFormGroupLabel>
        <AntSearch v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
      </AntFormGroup>
    `,
  }),
  args: {
    placeholder: 'Search',
  },
};
