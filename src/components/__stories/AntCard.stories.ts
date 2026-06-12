import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCard from '../AntCard.vue';
import {
  Size,
} from '../../enums';
import AntFormGroup from '../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntCard> = {
  title: 'Components/Card',
  component: AntCard,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    padding: {
      control: {
        type: 'boolean',
      },
    },
    expanded: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCard>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCard,
    },
    setup() {
      return {
        args,
        Size,
      };
    },
    template: `
      <AntCard v-bind="args">
        <div
          class="slot h-40"
          :class="args.expanded ? 'w-full' : 'w-48'"
        >
          SLOT
        </div>
      </AntCard>
    `,
  }),
  args: {},
};

export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false, // Чистый холст без панелей Storybook
    },
  },
  render: () => ({
    components: {
      AntCard,
    },
    setup() {
      return {
        sizes: Object.values(Size),
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-slate-100 min-h-screen font-sans text-slate-800">

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-200">Matrix: Sizes & Padding Behavior</h2>
          <div class="grid grid-cols-[100px_1fr_1fr] gap-6 items-center font-mono text-sm text-slate-500 mb-2">
            <div>Size Enum</div>
            <div>With Padding (padding: true)</div>
            <div>Paddingless (padding: false)</div>
          </div>

          <div v-for="size in sizes" :key="size" class="grid grid-cols-[100px_1fr_1fr] gap-6 items-center">
            <span class="text-sm font-mono text-slate-500 font-bold">{{ size }}</span>

            <AntCard :size="size" :padding="true" class="w-64 border-slate-300">
              <div class="bg-blue-50 border border-dashed border-blue-300 text-blue-600 text-xs font-mono p-4 text-center rounded">
                Content Area
              </div>
            </AntCard>

            <AntCard :size="size" :padding="false" class="w-64 border-slate-300">
              <div class="bg-amber-50 border border-dashed border-amber-300 text-amber-600 text-xs font-mono p-4 text-center">
                Content Area (No Padding)
              </div>
            </AntCard>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-200">Matrix: Behavior & States</h2>

          <div class="flex flex-col gap-4">
            <span class="text-sm font-mono text-slate-500 font-bold">Functional States (Default vs Skeleton)</span>
            <div class="flex gap-6">
              <AntCard :padding="true" class="w-64 border-slate-300">
                <div class="h-12 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center text-xs text-slate-400">Ready</div>
              </AntCard>

              <AntCard :padding="true" :skeleton="true" class="w-64 border-slate-300">
                <div class="h-12">Loading...</div>
              </AntCard>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <span class="text-sm font-mono text-slate-500 font-bold">Expansion Layout (expanded: true)</span>
            <div class="w-full max-w-xl bg-white p-4 rounded-lg border border-slate-200 shadow-inner">
              <AntCard :expanded="true" class="border-slate-300">
                <div class="bg-emerald-50 border border-dashed border-emerald-300 text-emerald-600 text-xs font-mono p-3 text-center rounded">
                  Full Width Container (expanded=true)
                </div>
              </AntCard>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCard,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        Size,
      };
    },
    template: `
      <AntFormGroup direction="column">
        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCard v-bind="args" :size="Size.lg" :expanded="true">
            <div class="slot h-40">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.md" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.sm" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.xs" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.xs2" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
        </AntFormGroup>
        <AntFormGroupLabel>Paddingles</AntFormGroupLabel>
        <AntCard v-bind="args" :padding="false" class="w-48">
          <div class="slot h-40">SLOT</div>
        </AntCard>
        <AntFormGroupLabel>Expanded</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCard v-bind="args" class="w-48">
            <div class="slot h-40">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :expanded="true">
            <div class="slot h-40">SLOT</div>
          </AntCard>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
  args: {},
};
