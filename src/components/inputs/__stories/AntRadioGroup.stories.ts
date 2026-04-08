import {
  ref,
} from 'vue';
import AntRadioGroup from '../AntRadioGroup.vue';
import {
  InputState, Size, LayoutVariant,
} from '../../../enums';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Direction,
} from '../../../enums/Direction.enum';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';

const meta: Meta<typeof AntRadioGroup> = {
  title: 'Inputs/Radio Group',
  component: AntRadioGroup,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
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
`,
        },
      },
    },
    modelValue: {
      description:
        'Reactive value, contains the currently selected radio-button value',
      table: {
        type: {
          summary: 'string | null',
        },
      },
    },
    direction: {
      control: {
        type: 'select',
      },
      options: Object.values(Direction),
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
    layoutVariant: {
      control: {
        type: 'select',
      },
      options: Object.values(LayoutVariant),
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
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntRadioGroup,
    },
    setup() {
      const value = ref<string>('');

      return {
        args,
        value,
      };
    },
    template: `
        <AntRadioGroup v-bind="args" v-model="value"/>
        <span class="text-xs text-gray-500">Reactive value: {{ value }}</span>
    `,
  }),
  args: {
    radioButtons: simpleButtons,
  },
};

export const BlockVariant: Story = {
  render: Docs.render,
  args: {
    radioButtons: simpleButtons,
    layoutVariant: LayoutVariant.block,
  },
};

export const TabVariant: Story = {
  render: Docs.render,
  args: {
    radioButtons: simpleButtons,
    layoutVariant: LayoutVariant.tab,
  },
};

export const summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntRadioGroup,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      const value = ref<string>('radio-3');

      return {
        args,
        value,
        InputState,
        Size,
        LayoutVariant,
      };
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

        <AntFormGroup direction="row">
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.danger"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntRadioGroup
            v-bind="args"
            v-model="value"
            :state="InputState.danger"
            :layout-variant="LayoutVariant.tab"
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
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.lg" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.md" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.sm" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.lg" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.md" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.sm" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntRadioGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Disabled</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             disabled/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             disabled/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             disabled/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Readonly</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             :readonly="true"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             :readonly="true"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             :readonly="true"/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             :skeleton="true"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             :skeleton="true"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             :skeleton="true"/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntRadioGroup v-bind="args" v-model="value"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntRadioGroup v-bind="args" v-model="value" label="Label"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" label="Label" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" label="Label" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntRadioGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntRadioGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"/>
            </div>
            <div>
              <AntRadioGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"/>
            </div>
          </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
