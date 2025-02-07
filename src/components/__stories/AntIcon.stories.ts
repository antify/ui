import AntIcon from '../AntIcon.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  faTag,
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
