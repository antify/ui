import AntCalendar from '../AntDatePicker.vue';
import AntDateSwitcher from '../AntDateSwitcher.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  ref, watch,
} from 'vue';
import {
  addDays, format,
} from 'date-fns';

const meta: Meta<typeof AntCalendar> = {
  title: 'Components/Date Picker',
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
    modelValue: {
      control: 'date',
    },
    onSelect: {
      action: 'select',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
    },
    onChangeCurrentVisibleMonth: {
      action: 'changeCurrentVisibleMonth',
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
        <div class="dashed w-72.5">
          <AntCalendar
            v-bind="args"
            v-model="value"
          />
        </div>
      </div>`,
  }),
  args: {
    specialDays: [
      {
        name: 'Special Day',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        color: 'success-300',
      },
    ],
  },
};

export const WorkDaysOnly: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    showWeekend: false,
  },
};

export const ManySpecialDays: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    specialDays: [
      {
        name: 'Light Background (Dark Text)',
        date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        color: 'warning-200',
      },
      {
        name: 'Dark Background (White Text)',
        date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
        color: 'danger-200',
      },
      {
        name: 'Success Event',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        color: 'success-200',
      },
    ],
  },
};

export const WithWeekends: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    showWeekend: true,
  },
};

export const WithWeekNumbers: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    showWeekNumbers: true,
  },
};

export const WeekendsAndWeekNumbers: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    showWeekend: true,
    showWeekNumbers: true,
  },
};

export const SkeletonDays: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const SkeletonWeekends: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
    showWeekend: true,
  },
};

export const SkeletonWeekNumber: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
    showWeekNumbers: true,
  },
};

export const FullMonthMatrix: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: new Date(2025, 4, 1).getTime(),
    showWeekNumbers: true,
  },
};

export const ChangeableDate: Story = {
  render: (args) => ({
    components: {
      AntCalendar,
    },
    setup() {
      const value = ref(args.modelValue);

      watch(() => args.modelValue, (newValue) => {
        value.value = newValue;
      });

      return {
        value,
        args,
      };
    },
    template: `
      <div class="p-4">
        <div class="dashed w-72.5">
          <AntCalendar
            v-bind="args"
            v-model="value"
          />
        </div>
      </div>`,
  }),
  args: {
    ...Docs.args,
    modelValue: new Date(2026, 0, 1).getTime(),
  },
};
