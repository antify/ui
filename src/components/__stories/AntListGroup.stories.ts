import AntListGroup from '../AntListGroup.vue';
import AntListGroupItem from '../AntListGroupItem.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  faDownload, faMessage, faUser, faCog,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntListGroup> = {
  title: 'Components/List Group',
  component: AntListGroup,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntListGroup>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntListGroup,
      AntListGroupItem,
    },
    setup() {
      return {
        args,
        faUser,
        faDownload,
        faMessage,
        faCog,
      };
    },
    template: `
      <AntListGroup v-bind="args">
        <AntListGroupItem to="/example" :icon-left="faUser">Profile</AntListGroupItem>
        <AntListGroupItem to="/example" :icon-left="faDownload">Downloads</AntListGroupItem>
        <AntListGroupItem to="/example" :icon-left="faMessage">Messages</AntListGroupItem>
        <AntListGroupItem to="/example" :icon-left="faCog">Settings</AntListGroupItem>
      </AntListGroup>`,
  }),
  args: {},
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

// ---------------------------------------------------------------------------
// Матрица для импорта структуры списков в Figma
// ---------------------------------------------------------------------------
export const FigmaExport: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false, // Чистый экран без лишних панелей
    },
  },
  render: () => ({
    components: {
      AntListGroup,
      AntListGroupItem,
    },
    setup() {
      return {
        faUser,
        faDownload,
        faMessage,
        faCog,
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-slate-100 min-h-screen font-sans text-slate-800">

        <!-- Сетка: Обычное состояние структуры против Скелетона -->
        <div class="flex flex-col gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Default Structure & Spacing</h2>

          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono text-slate-400 font-bold uppercase">Ready State (Default)</span>
            <!-- Рендерим чистую группу списков для замера гапов и паддингов -->
            <AntListGroup class="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <AntListGroupItem :icon-left="faUser">Profile Node</AntListGroupItem>
              <AntListGroupItem :icon-left="faDownload">Storage Downloads</AntListGroupItem>
              <AntListGroupItem :icon-left="faMessage">Direct Messages</AntListGroupItem>
            </AntListGroup>
          </div>
        </div>

        <!-- Сетка: Состояние загрузки всей группы -->
        <div class="flex flex-col gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md">
          <h2 class="text-xl font-bold border-b pb-2 border-slate-100">Matrix: Functional States</h2>

          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono text-slate-400 font-bold uppercase">Loading State (skeleton: true)</span>
            <!-- Показывает, как ИИ-агенту отображать блочные заглушки вместо контента строк -->
            <AntListGroup :skeleton="true" class="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <AntListGroupItem :icon-left="faUser">Profile Node</AntListGroupItem>
              <AntListGroupItem :icon-left="faDownload">Storage Downloads</AntListGroupItem>
              <AntListGroupItem :icon-left="faMessage">Direct Messages</AntListGroupItem>
            </AntListGroup>
          </div>
        </div>

      </div>
    `,
  }),
};
