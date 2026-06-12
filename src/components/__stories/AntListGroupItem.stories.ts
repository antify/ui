import AntListGroupItem from '../AntListGroupItem.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  faUser, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  ListGroupItemState,
} from '../__types/AntListGroupItem.types';

const meta: Meta<typeof AntListGroupItem> = {
  title: 'Components/List Group Item',
  component: AntListGroupItem,
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
      options: Object.values(ListGroupItemState),
    },
    iconLeft: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed right to the default slot.<br>Use Font-awesome Icons.',
    },
    iconRight: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed right to the default slot.<br>Use Font-awesome Icons.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntListGroupItem>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntListGroupItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<div class="dashed"><AntListGroupItem v-bind="args">Item</AntListGroupItem></div>',
  }),
  args: {},
};

export const Link: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    to: '/example',
  },
};

export const IconLeft: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faUser,
  },
};

export const IconRight: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconRight: faChevronRight,
  },
};

export const IconLeftAndRight: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconLeft: faUser,
    iconRight: faChevronRight,
  },
};

// ---------------------------------------------------------------------------
// Матрица для импорта отдельных элементов списка в Figma
// ---------------------------------------------------------------------------
export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false, // Чистый холст без сайдбаров Сторибука
    },
  },
  render: () => ({
    components: {
      AntListGroupItem,
    },
    setup() {
      return {
        states: Object.values(ListGroupItemState),
        faUser,
        faChevronRight,
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-slate-100 min-h-screen font-sans text-slate-800">

        <div class="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Layout Content Variants</h2>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-xs font-mono text-slate-400">Text Only</span>
              <AntListGroupItem>Simple List Node Content</AntListGroupItem>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-xs font-mono text-slate-400">Icon Left (Used in our Patient Card)</span>
              <AntListGroupItem :icon-left="faUser">Patient Data Row</AntListGroupItem>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-xs font-mono text-slate-400">Icon Right (Navigation/Action indicator)</span>
              <AntListGroupItem :icon-right="faChevronRight">Interactive Link Node</AntListGroupItem>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-xs font-mono text-slate-400">Full Armor (Left & Right Icons)</span>
              <AntListGroupItem :icon-left="faUser" :icon-right="faChevronRight">Complex List Item Profile</AntListGroupItem>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Functional States & Themes</h2>
          <div class="flex flex-col gap-3">
            <div v-for="state in states" :key="state" class="flex flex-col gap-1">
              <span class="text-xs font-mono text-slate-400 font-bold uppercase">{{ state }}</span>
              <AntListGroupItem :state="state" :icon-left="faUser" :icon-right="faChevronRight">
                Status item mapped to {{ state }} theme
              </AntListGroupItem>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};
