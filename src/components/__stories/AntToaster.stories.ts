import AntButton from '../AntButton.vue';
import AntFormGroup from '../forms/AntFormGroup.vue';
import {
  CornerPosition, InputState,
} from '../../enums';
import {
  enumToPlainText,
} from '../../utils';
import AntToaster from '../AntToaster.vue';
import type {
  StoryObj,
} from '@storybook/vue3';
import {
  useToaster,
} from '../../composables/useToaster';
import type {
  Toast,
} from '../__types/AntToaster.types';

export default {
  title: 'Components/Toaster',
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    toasts: {
      description: 'The toasts to display',
      table: {
        type: {
          summary: 'Toast[]',
          // TODO:: Describe Toast more detailed
          detail: 'Toast[]',
        },
      },
    },
    position: {
      description: 'Defines where the toasts will appear',
      options: Object.values(CornerPosition),
      control: {
        type: 'select',
      },
      table: {
        defaultValue: {
          summary: 'CornerPosition.bottomRight',
        },
        type: {
          summary: 'CornerPosition',
          detail: enumToPlainText(CornerPosition, 'CornerPosition'),
        },
      },
    },
  },
};

type Story = StoryObj<typeof AntToaster>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntButton,
      AntToaster,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="dashed h-60 relative">
        <AntToaster v-bind="args"/>
      </div>
    `,
  }),
  args: {
    toasts: [
      {
        title: 'Title',
        content: 'Content here',
        type: InputState.success,
      },
    ],
  },
};

export const UseToaster: Story = {
  render: (args) => ({
    components: {
      AntButton,
      AntToaster,
      AntFormGroup,
    },
    setup() {
      const toaster = useToaster();
      const toasts: Toast[] = [
        {
          title: 'Title',
          content: 'Content here',
          type: InputState.base,
        },
        {
          title: 'Title',
          content: 'Content here',
          type: InputState.success,
        },
        {
          title: 'Title',
          content: 'Content here',
          type: InputState.danger,
        },
        {
          title: 'Title',
          content: 'Content here',
          type: InputState.warning,
        },
        {
          title: 'Title',
          content: 'Content here',
          type: InputState.info,
        },
      ];

      return {
        args,
        toasts,
        toaster,
      };
    },
    template: `
      <AntFormGroup
        class="justify-center"
        direction="row"
      >
        <AntButton
          v-for="toast in toasts"
          :state="toast.type"
          @click="toaster.toast(toast)"
        >
          Toast {{ toast.type }}
        </AntButton>
      </AntFormGroup>

      <AntToaster v-bind="args" :toasts="toaster.getToasts()"/>
    `,
  }),
};
