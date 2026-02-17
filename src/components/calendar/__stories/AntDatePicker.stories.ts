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
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

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
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
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
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCalendar,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="p-4">
        <div class="dashed w-72.5">
          <AntCalendar
            v-bind="args"
            v-model="args.modelValue"
          />
        </div>
      </div>`,
  }),
  args: {
    modelValue: new Date().setHours(0, 0, 0, 0),
    specialDays: [
      {
        name: 'Special Day',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        color: 'success-300',
      },
    ],
  },
};

export const Summary: Story = {
  render: (args) => ({
    components: {
      AntCalendar,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const fixedDate = new Date('2026-01-01').getTime();
      const value = ref(fixedDate);

      return {
        value,
        args,
        fixedDate,
      };
    },
    template: `
      <AntFormGroup class="p-4 flex flex-col gap-4 w-fit">
        <AntFormGroup>
          <AntFormGroupLabel>Standard States</AntFormGroupLabel>

          <AntFormGroup class="grid grid-cols-4 gap-10">
            <div class="flex flex-col w-64 gap-2">
              <span>1. Working days only</span>
              <AntCalendar v-model="value" :show-weekend="false" />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>2. With Weekends</span>
              <AntCalendar v-model="value" :show-weekend="true" />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>3. With Week Numbers</span>
              <AntCalendar v-model="value" :show-week-numbers="true" />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>4. Weekends & Week Numbers</span>
              <AntCalendar v-model="value" :show-weekend="true" :show-week-numbers="true" />
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton States</AntFormGroupLabel>

          <AntFormGroup class="grid grid-cols-4 gap-10">
            <div class="flex flex-col w-64 gap-2">
              <span>1. Basic Skeleton</span>
              <AntCalendar :model-value="fixedDate" skeleton />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>2. Skeleton + Weekends</span>
              <AntCalendar :model-value="fixedDate" skeleton :show-weekend="true" />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>3. Skeleton + Week Numbers</span>
              <AntCalendar :model-value="fixedDate" skeleton :show-week-numbers="true" />
            </div>

            <div class="flex flex-col w-64 gap-2">
              <span>4. Full Skeleton</span>
              <AntCalendar :model-value="fixedDate" skeleton :show-weekend="true" :show-week-numbers="true" />
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Special Days</AntFormGroupLabel>

          <AntFormGroup class="grid grid-cols-4 gap-4">
            <div class="flex flex-col gap-2 w-64 col-span-2">
              <span class="text-center">Calendar with highlights (Jan 2026)</span>
              <AntCalendar
                v-model="value"
                :show-weekend="true"
                :show-week-numbers="true"
                :special-days="args.specialDays"
              />
            </div>
          </AntFormGroup>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
  args: {
    modelValue: new Date('2026-01-01').getTime(),
    specialDays: [
      {
        name: 'New Year Day',
        date: '2026-01-01',
        color: 'danger-200',
      },
      {
        name: 'Success Event',
        date: '2026-01-05',
        color: 'success-200',
      },
      {
        name: 'Another Special',
        date: '2026-01-15',
        color: 'warning-200',
      },
    ],
  },
};

export const SpecificDateTest: Story = {
  render: (args) => ({
    components: {
      AntCalendar,
    },
    setup() {
      const value = ref(Number(args.modelValue));

      return {
        value,
        args,
      };
    },
    template: `
      <div class="p-4 w-72.5">
        <AntCalendar
          v-bind="args"
          v-model="value"
        />
        <div class="mt-2 text-xs text-gray-400">
          Raw Timestamp: {{ value }}
        </div>
      </div>`,
  }),
  args: {
    modelValue: new Date('2026-05-20').getTime(),
    showWeekend: true,
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: 'Timestamp in milliseconds',
    },
  },
};
