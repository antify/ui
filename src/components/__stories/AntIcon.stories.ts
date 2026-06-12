import AntIcon from '../AntIcon.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  faTag,
  faUser,
  faClock,
  faHouse,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import {
  IconSize,
} from '../__types/AntIcon.types';

const meta: Meta<typeof AntIcon> = {
  title: 'Components/Icon',
  component: AntIcon,
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
      options: Object.values(IconSize),
    },
    icon: {
      control: {
        type: 'none',
      },
      description:
        'Use Font-awesome Icons.',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'A text-* css class to change the color of the icon.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntIcon>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntIcon,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntIcon v-bind="args"/>',
  }),
  args: {
    icon: faTag,
  },
};

export const Size: Story = {
  render: (args) => ({
    components: {
      AntIcon,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="flex flex-col gap-2.5">
        <AntIcon v-bind="args" size="2xs"/>
        <AntIcon v-bind="args" size="xs"/>
        <AntIcon v-bind="args" size="sm"/>
        <AntIcon v-bind="args" size="md"/>
        <AntIcon v-bind="args" size="lg"/>
        <AntIcon v-bind="args" size="3xl"/>
      </div>
    `,
  }),
  args: {
    icon: faTag,
  },
};

export const Color: Story = {
  render: (args) => ({
    components: {
      AntIcon,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-primary-500"/>
        <span>primary</span>
      </div>
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-secondary-500"/>
        <span>secondary</span>
      </div>
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-info-500"/>
        <span>info</span>
      </div>
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-success-500"/>
        <span>success</span>
      </div>
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-info-500">Warning</AntIcon>
        <span>warning</span>
      </div>
      <div class="flex items-center gap-2.5">
        <AntIcon v-bind="args" color="text-danger-500"/>
        <span>danger</span>
      </div>
    `,
  }),
  args: {
    icon: faTag,
  },
};

export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false,
    },
  },
  render: () => ({
    components: {
      AntIcon,
    },
    setup() {
      return {
        sizes: Object.values(IconSize),
        sampleIcons: [
          {
            label: 'User',
            definition: faUser,
          },
          {
            label: 'Clock',
            definition: faClock,
          },
          {
            label: 'House',
            definition: faHouse,
          },
          {
            label: 'Hourglass',
            definition: faHourglassHalf,
          },
        ],
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-slate-100 min-h-screen font-sans text-slate-800">

        <div class="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Icon Sizes & Bounding Containers</h2>
          <div class="grid grid-cols-6 gap-4 text-center">
            <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span class="text-xs font-mono font-bold text-slate-400">{{ size }}</span>
              <div class="bg-blue-100/50 p-2 rounded flex items-center justify-center">
                <AntIcon :icon="sampleIcons[0].definition" :size="size" color="text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Glyph Swapping & System Colors</h2>
          <div class="flex flex-col gap-4">
            <div v-for="item in sampleIcons" :key="item.label" class="flex gap-6 items-center border-b pb-3 last:border-none last:pb-0 border-slate-100">
              <span class="w-24 text-sm font-mono text-slate-400 font-bold">{{ item.label }}</span>
              <div class="flex gap-4 items-center">
                <AntIcon :icon="item.definition" size="sm" color="text-slate-400" />
                <AntIcon :icon="item.definition" size="sm" color="text-primary-500" />
                <AntIcon :icon="item.definition" size="sm" color="text-secondary-500" />
                <AntIcon :icon="item.definition" size="sm" color="text-info-500" />
                <AntIcon :icon="item.definition" size="sm" color="text-success-500" />
                <AntIcon :icon="item.definition" size="sm" color="text-warning-500" />
                <AntIcon :icon="item.definition" size="sm" color="text-danger-500" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-fit">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Functional States</h2>
          <div class="flex gap-8 items-center">
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs font-mono text-slate-400">Default (sm)</span>
              <AntIcon :icon="sampleIcons[1].definition" size="sm" color="text-slate-700" />
            </div>
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs font-mono text-slate-400">Skeleton (sm)</span>
              <AntIcon :icon="sampleIcons[1].definition" size="sm" :skeleton="true" />
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};
