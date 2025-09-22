import AntCalendar from '../AntDatePicker.vue';
import AntDateSwitcher from '../AntDateSwitcher.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntCalendar> = {
  title: 'Components/DatePicker',
  component: AntCalendar,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  subcomponents: {
    AntDateSwitcher,
  },
  argTypes: {
    onSelect: {
      action: 'select',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCalendar>;

export const Docs: Story = {
  parameters: {
    chromatic: {
      // disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCalendar,
    },
    setup() {
      const value = ref(Date.now());

      return {
        value,
        args,
      };
    },
    template: `
      <div class="p-4">
        <div class="dashed w-64">
          <AntCalendar
            v-bind="args"
            v-model="value"
          />
        </div>
      </div>`,
  }),
  args: {},
};
