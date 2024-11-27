import {type Meta, type StoryObj} from '@storybook/vue3';
import AntTabs from '../AntTabs.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import {ref} from 'vue';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import {TabItemState} from '../__types/AntTabItem.types';
import {vueRouter} from 'storybook-vue3-router';

const meta: Meta<typeof AntTabs> = {
  title: 'Components/Tabs',
  component: AntTabs,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [vueRouter()],
  argTypes: {
    modelValue: {
      control: 'text',
      table: {
        type: {
          summary: 'string | undefined'
        }
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof AntTabs>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTabs},
    setup() {
      return {args};
    },
    template: `
      <div class="dashed">
        <AntTabs v-bind="args" v-model="args.modelValue"/>
      </div>
    `
  }),
  args: {
    tabItems: [
      {
        id: '1',
        label: 'First tab',
      },
      {
        id: '2',
        label: 'Second tab',
      },
      {
        id: '3',
        label: 'Third tab',
      },
      {
        id: '4',
        label: 'Fourth tab',
      },
    ]
  }
};

export const FixedHeight: Story = {
  render: (args) => ({
    components: {AntTabs},
    setup() {
      return {args};
    },
    template: `
      <div class="dashed h-20">
        <AntTabs v-bind="args" v-model="args.modelValue"/>
      </div>
    `
  }),
  args: Docs.args
};

export const HorizontalScrolling: Story = {
  render: (args) => ({
    components: {AntTabs, AntFormGroupLabel, AntFormGroup},
    setup() {
      return {args};
    },
    template: `
      <AntFormGroup>

        <AntFormGroupLabel>Default Small</AntFormGroupLabel>
        <AntFormGroup class="dashed max-w-[320px] overflow-hidden">
          <AntTabs v-bind="args" v-model="args.modelValue" />
        </AntFormGroup>

        <AntFormGroupLabel>Expanded Small</AntFormGroupLabel>
        <AntFormGroup class="dashed max-w-[320px] overflow-hidden">
          <AntTabs v-bind="args" v-model="args.modelValue" expanded />
        </AntFormGroup>

        <AntFormGroupLabel>Default Large</AntFormGroupLabel>
        <AntFormGroup class="dashed">
          <AntTabs v-bind="args" v-model="args.modelValue" />
        </AntFormGroup>

        <AntFormGroupLabel>Expanded Large</AntFormGroupLabel>
        <AntFormGroup class="dashed">
          <AntTabs v-bind="args" v-model="args.modelValue" expanded />
        </AntFormGroup>

      </AntFormGroup>
    `
  }),
  args: {
    tabItems: [
      {
        id: '1',
        label: 'First tab',
      },
      {
        id: '2',
        label: 'Second tab',
      },
      {
        id: '3',
        label: 'Third tab',
        state: TabItemState.warning,
      },
      {
        id: '4',
        label: 'Fourth tab',
        state: TabItemState.danger,
      },
      {
        id: '5',
        label: 'Fifth tab',
      },
      {
        id: '6',
        label: 'Sixth tab',
      },
    ]
  }
};

export const DifferentStates: Story = {
  render: Docs.render,
  args: {
    tabItems: [
      {
        id: '1',
        label: 'First tab',
      },
      {
        id: '2',
        label: 'Second tab',
      },
      {
        id: '3',
        label: 'Third tab',
        state: TabItemState.warning,
      },
      {
        id: '4',
        label: 'Fourth tab',
        state: TabItemState.danger,
      },
      {
        id: '5',
        label: 'Fifth tab',
        state: TabItemState.info,
      },
    ]
  }
};

export const Summary: Story = {
  render: (args) => ({
    components: {AntTabs, AntFormGroupLabel, AntFormGroup},
    setup() {
      const value_1 = ref();
      const value_2 = ref();
      const value_3 = ref('2');
      const value_4 = ref();

      const tabItems_1 = [
        {
          id: '1',
          label: 'My account',
        },
      ];
      const tabItems_2 = [
        {
          id: '1',
          appendIcon: faUserCircle,
          label: 'My account',
        },
        {
          id: '2',
          prependIcon: faUserCircle,
          label: 'Downloads',
        },
      ];
      const tabItems_3 = [
        {
          id: '1',
          appendIcon: faUserCircle,
          prependIcon: faUserCircle,
          label: 'My account',
          to: '/#'
        },
        {
          id: '2',
          prependIcon: faUserCircle,
          appendIcon: faUserCircle,
          label: 'Downloads',
          to: '/#'
        },
        {
          id: '3',
          appendIcon: faUserCircle,
          prependIcon: faUserCircle,
          label: 'Messages',
          to: '/#'
        },
      ];

      const tabItems_4 = [
        {
          id: '1',
          label: 'First tab',
        },
        {
          id: '2',
          label: 'Second tab',
        },
        {
          id: '3',
          label: 'Third tab',
          state: TabItemState.warning,
        },
        {
          id: '4',
          label: 'Fourth tab',
          state: TabItemState.danger,
        },
        {
          id: '5',
          label: 'Fifth tab',
          state: TabItemState.info,
        },
        {
          id: '6',
          label: 'Sixth tab',
        },
      ];

      return {
        args,
        value_1,
        value_2,
        value_3,
        value_4,
        tabItems_1,
        tabItems_2,
        tabItems_3,
        tabItems_4
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>Default</AntFormGroupLabel>
        <AntFormGroup>
          <div class="dashed"><AntTabs v-model="value_1" :tab-items="tabItems_1"/></div>
          <div class="dashed"><AntTabs v-model="value_2" :tab-items="tabItems_2"/></div>
          <div class="dashed"><AntTabs v-model="value_3" :tab-items="tabItems_3"/></div>
        </AntFormGroup>

        <AntFormGroupLabel>Expanded</AntFormGroupLabel>
        <AntFormGroup>
          <div class="dashed"><AntTabs v-model="value_1" :tab-items="tabItems_1" expanded/></div>
          <div class="dashed"><AntTabs v-model="value_2" :tab-items="tabItems_2" expanded/></div>
          <div class="dashed"><AntTabs v-model="value_3" :tab-items="tabItems_3" expanded/></div>
        </AntFormGroup>

        <AntFormGroupLabel>Larger container</AntFormGroupLabel>
        <div class="h-16 dashed">
          <AntTabs v-model="value_3" :tab-items="tabItems_3" expanded/>
        </div>

        <AntFormGroupLabel>Different States</AntFormGroupLabel>
        <div class="dashed">
          <AntTabs v-model="value_4" :tab-items="tabItems_4" />
        </div>

        <AntFormGroupLabel>Default Small Parent Container</AntFormGroupLabel>
        <AntFormGroup class="dashed max-w-[320px] overflow-hidden">
          <AntTabs v-model="value_4" :tab-items="tabItems_4" />
        </AntFormGroup>

        <AntFormGroupLabel>Expanded Small Parent Container</AntFormGroupLabel>
        <AntFormGroup class="dashed max-w-[320px] overflow-hidden">
          <AntTabs v-model="value_4" :tab-items="tabItems_4" expanded />
        </AntFormGroup>
      </AntFormGroup>
    `
  }),
  args: {}
};
