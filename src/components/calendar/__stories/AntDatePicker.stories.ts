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

const realWorldHolidaysMock = [
  {
    name: 'Herbstferien',
    date: '2026-11-02',
    color: 'success-100',
  },
  {
    name: 'Herbstferien',
    date: '2026-11-03',
    color: 'success-100',
  },
  {
    name: 'Herbstferien',
    date: '2026-11-04',
    color: 'success-100',
  },
  {
    name: 'Herbstferien',
    date: '2026-11-05',
    color: 'success-100',
  },
  {
    name: 'Herbstferien',
    date: '2026-11-06',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-03',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-04',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-05',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-06',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-07',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-08',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-09',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-10',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-11',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-12',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-13',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-14',
    color: 'success-100',
  },
  {
    name: 'Mariä Himmelfahrt',
    date: '2026-08-15',
    color: 'success-300',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-16',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-17',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-18',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-19',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-20',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-21',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-22',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-23',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-24',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-25',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-26',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-27',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-28',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-29',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-30',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-08-31',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-01',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-02',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-03',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-04',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-05',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-06',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-07',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-08',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-09',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-10',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-11',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-12',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-13',
    color: 'success-100',
  },
  {
    name: 'Sommerferien',
    date: '2026-09-14',
    color: 'success-100',
  },
  {
    name: 'Frühjahrsferien',
    date: '2026-02-16',
    color: 'success-100',
  },
  {
    name: 'Frühjahrsferien',
    date: '2026-02-17',
    color: 'success-100',
  },
  {
    name: 'Frühjahrsferien',
    date: '2026-02-18',
    color: 'success-100',
  },
  {
    name: 'Frühjahrsferien',
    date: '2026-02-19',
    color: 'success-100',
  },
  {
    name: 'Frühjahrsferien',
    date: '2026-02-20',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-22',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-23',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-24',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-25',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-26',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-27',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-28',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-29',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-30',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2025-12-31',
    color: 'success-100',
  },
  {
    name: 'Neujahr',
    date: '2026-01-01',
    color: 'success-300',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-01-02',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-01-03',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-01-04',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-01-05',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-24',
    color: 'success-100',
  },
  {
    name: '1. Weihnachtstag',
    date: '2026-12-25',
    color: 'success-300',
  },
  {
    name: '2. Weihnachtstag',
    date: '2026-12-26',
    color: 'success-300',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-27',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-28',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-29',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-30',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2026-12-31',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-01',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-02',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-03',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-04',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-05',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-06',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-07',
    color: 'success-100',
  },
  {
    name: 'Weihnachtsferien',
    date: '2027-01-08',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-26',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-27',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-28',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-29',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-30',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-05-31',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-06-01',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-06-02',
    color: 'success-100',
  },
  {
    name: 'Pfingstferien',
    date: '2026-06-03',
    color: 'success-100',
  },
  {
    name: 'Fronleichnam',
    date: '2026-06-04',
    color: 'success-300',
  },
  {
    name: 'Pfingstferien',
    date: '2026-06-05',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-03-30',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-03-31',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-01',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-02',
    color: 'success-100',
  },
  {
    name: 'Karfreitag',
    date: '2026-04-03',
    color: 'success-300',
  },
  {
    name: 'Osterferien',
    date: '2026-04-04',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-05',
    color: 'success-100',
  },
  {
    name: 'Ostermontag',
    date: '2026-04-06',
    color: 'success-300',
  },
  {
    name: 'Osterferien',
    date: '2026-04-07',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-08',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-09',
    color: 'success-100',
  },
  {
    name: 'Osterferien',
    date: '2026-04-10',
    color: 'success-100',
  },
  {
    name: 'Heilige Drei Könige',
    date: '2026-01-06',
    color: 'success-300',
  },
  {
    name: 'Tag der Arbeit',
    date: '2026-05-01',
    color: 'success-300',
  },
  {
    name: 'Christi Himmelfahrt',
    date: '2026-05-14',
    color: 'success-300',
  },
  {
    name: 'Pfingstmontag',
    date: '2026-05-25',
    color: 'success-300',
  },
  {
    name: 'Tag der deutschen Einheit',
    date: '2026-10-03',
    color: 'success-300',
  },
  {
    name: 'Allerheiligen',
    date: '2026-11-01',
    color: 'success-300',
  },
];

export const HolidaysExample: Story = {
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
        <AntFormGroupLabel>Real World Data: School & Legal Holidays (Aug 2026)</AntFormGroupLabel>

        <div class="flex gap-4 mb-2 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-success-100 border border-success-200"></div>

            <span class="text-base-300-font">School Holidays (success-100)</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-success-300 border border-success-400"></div>

            <span class="text-base-300-font">Legal Holidays (success-300)</span>
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
    specialDays: realWorldHolidaysMock,
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
