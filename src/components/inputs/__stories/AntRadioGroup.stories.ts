import {ref} from 'vue';
import AntRadioGroup from '../AntRadioGroup.vue';
import {InputState, Size} from '../../../enums';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {useFieldValidator} from '@antify/validate';
import {Direction} from '../../../enums/Direction.enum';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';

const meta: Meta<typeof AntRadioGroup> = {
  title: 'Inputs/Radio Group',
  component: AntRadioGroup,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    label: {
      description: 'The label for the radio widget',
    },
    description: {
      description: 'Description for the radio widget',
    },
    radioButtons: {
      description: 'Array of RadioButton',
      table: {
        type: {
          summary: 'AntRadioType[]',
          detail: `
{
  value: string;
  label?: string;
  disabled?: boolean;
  state?: InputState;
}
`
        },
      },
    },
    modelValue: {
      description:
        'Reactive value, contains the currently selected radio-button value',
      table: {
        type: {
          summary: 'string | null'
        }
      }
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(Direction)
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntRadioGroup>;

const simpleButtons = [
  {
    id: 'radio-1',
    label: 'Radio 1',
    value: 'radio-1',
  },
  {
    id: 'radio-2',
    label: 'Radio 2',
    value: 'radio-2',
  },
  {
    id: 'radio-3',
    label: 'Radio 3',
    value: 'radio-3',
  },
  {
    id: 'radio-4',
    label: 'Radio 4',
    value: 'radio-4',
  }
];

export const Docs: Story = {
  render: (args) => ({
    components: {AntRadioGroup},
    setup() {
      const value = ref<string>('');
      return {args, value};
    },
    template: `
      <AntRadioGroup v-bind="args" v-model="value"/>
      <span class="text-xs text-gray-500">Reactive value: {{ value }}</span>
    `
  }),
  args: {
    radioButtons: simpleButtons
  }
};

export const WithValidator: Story = {
  render: (args) => ({
    components: {AntRadioGroup},
    setup() {
      const value = ref(null);

      const validator = ref(useFieldValidator([
        (val: string) => val !== 'invalid-radio' || 'Choose other option!'
      ]));

      return {args, value, validator, InputState};
    },
    template: `
      <AntRadioGroup
        v-bind="args"
        v-model="value"
        :state="args.state ? args.state : (validator.hasErrors() ? InputState.danger : undefined)"
        :messages="Array.isArray(args.messages) ? args.messages : validator.getErrors()"
        @validate="(val) => validator.validate(val)"
      />
    `
  }),
  args: {
    radioButtons: [
      {
        id: 'radio-1',
        label: 'Radio 1',
        value: 'radio-1',
      },
      {
        id: 'radio-2',
        label: 'Radio 2',
        value: 'radio-2',
      },
      {
        id: 'invalid-radio',
        label: 'Invalid Radio',
        value: 'invalid-radio',
      },
      {
        id: 'radio-4',
        label: 'Radio 4',
        value: 'radio-4',
      }
    ]
  }
};

export const summary: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntRadioGroup, AntFormGroupLabel, AntFormGroup},
    setup() {
      const value = ref<string>('radio-3');
      return {args, value, InputState, Size};
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>State</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.danger"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
        </AntFormGroup>

        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.lg" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.md" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.sm" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             disabled/>
            </AntFormGroup>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             :readonly="true"/>
            </AntFormGroup>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                           :skeleton="true"/>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value"/>

        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" label="Label"/>

        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet"/>

        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
        <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
      </AntFormGroup>
    `
  }),
  args: {
    ...Docs.args,
  }
};
