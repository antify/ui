import AntCalendar from '../AntDatePicker.vue';
import AntDateSwitcher from '../AntDateSwitcher.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  ref,
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
    weekNumberTextColor: {
      control: 'text',
      description: "Color token e.g. 'base-300-font', 'primary-500-font'. Automatically calculates contrast text color.",
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'base-300-font',
        },
      },
    },
    weekNumberBackgroundColor: {
      control: 'text',
      description: "Color token e.g. 'base-300', 'primary-500'. Automatically calculates contrast text color.",
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'base-300',
        },
      },
    },
    showWeekNumbers: {
      control: 'boolean',
    },
    onSelect: {
      action: 'select',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCalendar>;

export const Docs: Story = {
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
        weekendColor: 'success-500',
      },
    ],
  },
};

export const WeekNumberStyling: Story = {
  render: (args) => ({
    components: {
      AntCalendar,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value = ref(new Date('2026-01-01').getTime());

      return {
        value,
        args,
      };
    },
    template: `
      <AntFormGroup class="p-4 flex gap-4 w-fit">
        <AntFormGroupLabel>Week Number Styling (Presets)</AntFormGroupLabel>

        <AntFormGroup class="grid grid-cols-4 gap-10">
          <div class="flex flex-col w-64 gap-2">
            <span class="text-sm font-medium text-for-white-bg-font">1. Default (Base 200)</span>
            <AntCalendar
              v-model="value"
              :show-week-numbers="true"
            />
          </div>

          <div class="flex flex-col w-64 gap-2">
            <span class="text-sm font-medium text-for-white-bg-font">2. Primary 900</span>
            <AntCalendar
              v-model="value"
              :show-week-numbers="true"
              week-number-text-color="primary-900-font"
              week-number-background-color="primary-900"
            />
          </div>

          <div class="flex flex-col w-64 gap-2">
            <span class="text-sm font-medium text-for-white-bg-font">3. Info 100</span>
            <AntCalendar
              v-model="value"
              :show-week-numbers="true"
              week-number-text-color="info-100-font"
              week-number-background-color="info-100"
            />
          </div>

          <div class="flex flex-col w-64 gap-2">
            <span class="text-sm font-medium text-for-white-bg-font">4. Success 500</span>
            <AntCalendar
              v-model="value"
              :show-week-numbers="true"
              week-number-text-color="success-500-font"
              week-number-background-color="success-500"
            />
          </div>

        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
};

export const WeekendSpecialDays: Story = {
  render: (args) => ({
    components: {
      AntCalendar,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const value = ref(new Date('2026-08-15').getTime());

      return {
        value,
        args,
      };
    },
    template: `
      <AntFormGroup class="p-4 flex flex-col gap-4 w-fit">
        <AntFormGroupLabel>Special Days with Weekend Alternate Colors (Aug 2026)</AntFormGroupLabel>

        <div class="flex flex-col gap-2 text-sm mb-2 p-3 bg-base-100 rounded-md">
          <span class="font-semibold text-for-white-bg-font">Legend:</span>

          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-yellow-100 border"></div>
              <span>School Holiday Weekday (yellow-100)</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-yellow-300 border"></div>
              <span>School Holiday Weekend (yellow-300)</span>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-success-300 border"></div>
              <span>Legal Holiday Weekday (success-300)</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-success-500 border"></div>
              <span>Legal Holiday Weekend (success-500)</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-72 gap-2">
          <AntCalendar
            v-model="value"
            :show-weekend="true"
            :show-week-numbers="true"
            :special-days="args.specialDays"
          />
        </div>
      </AntFormGroup>
    `,
  }),
  args: {
    specialDays: [
      {
        name: 'Sommerferien',
        date: '2026-07-30',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-07-31',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-10',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-11',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-12',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-13',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-14',
        color: 'yellow-100',
        weekendColor: 'yellow-300',
      },
      {
        name: 'Mariä Himmelfahrt',
        date: '2026-08-14',
        color: 'success-300',
        weekendColor: 'success-400',
      },
      {
        name: 'Mariä Himmelfahrt',
        date: '2026-08-15',
        color: 'success-300',
        weekendColor: 'success-400',
      },
      {
        name: 'Sommerferien',
        date: '2026-08-16',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-01',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-02',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-03',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-04',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-05',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
      {
        name: 'Sommerferien',
        date: '2026-09-06',
        color: 'yellow-100',
        weekendColor: 'yellow-200',
      },
    ],
  },
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
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
          <AntFormGroupLabel>Special Days with Weekend Variations</AntFormGroupLabel>

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
        weekendColor: 'danger-400',
      },
      {
        name: 'Weekend Event',
        date: '2026-01-03',
        color: 'success-200',
        weekendColor: 'success-400',
      },
      {
        name: 'Special Day',
        date: '2026-01-05',
        color: 'warning-200',
        weekendColor: 'warning-400',
      },
    ],
  },
};
