import AntAlert from '../AntAlert.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  InputState,
} from '../../enums';

const meta: Meta<typeof AntAlert> = {
  title: 'Components/Alert',
  component: AntAlert,
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
      options: Object.values(InputState),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntAlert>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntAlert,
    },
    setup() {
      function logClick() {
        console.log('Clicked close icon');
      }

      return {
        args,
        logClick,
      };
    },
    template: `
			<AntAlert v-bind="args" @close="logClick">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br/>
				sed diam nonumy eirmod tempor invidunt <br/>
				ut labore et dolore magna aliquyam erat, <br/>
				sed diam voluptua. At vero eos et accusam et <br/>
				justo duo dolores et ea rebum. Stet clita kasd
			</AntAlert>
    `,
  }),
  args: {
    title: 'Lorem ipsum dolor',
  },
};

export const WithOutTitle: Story = {
  render: Docs.render,
  args: {
    title: '',
    dismissBtn: false,
    icon: false,
  },
};

export const WithContent: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
  },
};

export const WithoutContent: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="p-4">
        <AntAlert v-bind="args" @close="logClick"/>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
  },
};

export const WithQuestionIcon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    questionMarkText: 'Lorem ipsum dolor',
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false, // Очищаем интерфейс для удобного скриншота/импорта
    },
  },
  render: () => ({
    components: {
      AntAlert,
    },
    setup() {
      return {
        states: Object.values(InputState),
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-slate-100 min-h-screen font-sans text-slate-800">

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-200">Matrix: States & Layout Density</h2>

          <div v-for="state in states" :key="state" class="flex flex-col gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <span class="text-sm font-mono text-slate-400 font-bold uppercase">{{ state }}</span>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400 font-mono">With Title & Body</span>
                <AntAlert :state="state" title="Notification Header">
                  Detailed notification text block explaining the current system event or status.
                </AntAlert>
              </div>

              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400 font-mono">Text Only (Compact)</span>
                <AntAlert :state="state">
                  Short single-line status text.
                </AntAlert>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-200">Matrix: Functional Options</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span class="text-xs font-mono text-slate-400 font-bold">Skeleton Loader</span>
              <AntAlert state="base" :skeleton="true">Loading context...</AntAlert>
            </div>

            <div class="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span class="text-xs font-mono text-slate-400 font-bold">With Context Help</span>
              <AntAlert state="info" title="Need Help?" questionMarkText="This text appears inside the helper popover.">
                Hover the question icon.
                </AntAlert>
            </div>

            <div class="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span class="text-xs font-mono text-slate-400 font-bold">Clean Strip (No Icons/Dismiss)</span>
              <AntAlert state="danger" :icon="false" :dismissBtn="false">
                Strict embedded warning layout without active controls.
              </AntAlert>
            </div>

          </div>
        </div>

      </div>
    `,
  }),
};
