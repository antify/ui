import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCheckboxGroup from '../AntCheckboxGroup.vue';
import {
  InputState, LayoutVariant, Size,
} from '../../../enums';
import {
  Direction,
} from '../../../enums/Direction.enum';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntCheckboxGroup> = {
  title: 'Inputs/Checkbox Group',
  component: AntCheckboxGroup,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      description: 'Contains the list of selected checkboxes (the value prop of the checkboxes)',
    },
    checkboxes: {
      description: 'List of checkboxes to be displayed',
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
    direction: {
      control: {
        type: 'select',
      },
      options: Object.values(Direction),
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

type Story = StoryObj<typeof AntCheckboxGroup>;

const checkboxOptions = [
  {
    label: 'Checkbox 1',
    value: 'checkbox-1',
  },
  {
    label: 'Checkbox 2',
    value: 'checkbox-2',
  },
  {
    label: 'Checkbox 3',
    value: 'checkbox-3',
  },
  {
    label: 'Checkbox 4',
    value: 'checkbox-4',
  },
];

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCheckboxGroup,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <div class="w-1/2">
          <AntCheckboxGroup v-bind="args" v-model="args.modelValue"/>
        </div>
      </div>

        <span class="text-xs text-gray-500">Reactive value: {{ args.modelValue }}</span>
    `,
  }),
  args: {
    modelValue: [],
    checkboxes: checkboxOptions,
  },
};

export const WithLongContent: Story = {
  render: (args) => ({
    components: {
      AntCheckboxGroup,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
        <div class="w-[150px]">
          <AntCheckboxGroup v-bind="args" v-model="args.modelValue"/>
        </div>
    `,
  }),
  args: {
    modelValue: [],
    checkboxes: [
      {
        label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        value: 'checkbox-1',
      },
      {
        label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        value: 'checkbox-2',
      },
      {
        label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        value: 'checkbox-3',
      },
      {
        label: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
        value: 'checkbox-4',
      },
    ],
  },
};

export const BlockVariant: Story = {
  render: Docs.render,
  args: {
    modelValue: [],
    checkboxes: checkboxOptions,
    layoutVariant: LayoutVariant.block,
  },
};

export const TabVariant: Story = {
  render: Docs.render,
  args: {
    modelValue: [],
    checkboxes: checkboxOptions,
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
      AntCheckboxGroup,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      const value = ref<string[]>([
        'checkbox-3',
      ]);

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
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.danger"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            :layout-variant="LayoutVariant.block"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
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
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.base"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.info"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.success"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
            v-bind="args"
            v-model="value"
            :state="InputState.warning"
            :layout-variant="LayoutVariant.tab"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckboxGroup
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
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.lg" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.md" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.sm" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.lg" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.md" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.sm" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label" :layout-variant="LayoutVariant.block"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup direction="row">
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.lg" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.md" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.sm" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
          <AntCheckboxGroup v-bind="args" v-model="value" :size="Size.xs2" label="Label" :layout-variant="LayoutVariant.tab"
                         description="Lorem ipsum dolor sit amet"/>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Disabled</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             disabled/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             disabled/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             disabled/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Readonly</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             :readonly="true"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             :readonly="true"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             :readonly="true"/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"
                             :skeleton="true"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"
                             :skeleton="true"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"
                             :skeleton="true"/>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With label</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" label="Label"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" label="Label" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" label="Label" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With description</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"/>
          </div>
          <div>
            <AntCheckboxGroup v-bind="args" v-model="value" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"/>
          </div>
        </AntFormGroup>

        <AntFormGroupLabel>With label + description</AntFormGroupLabel>
          <AntFormGroup direction="row">
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.block"/>
            </div>
            <div>
              <AntCheckboxGroup v-bind="args" v-model="value" label="Label" description="Lorem ipsum dolor sit amet" :layout-variant="LayoutVariant.tab"/>
            </div>
          </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
