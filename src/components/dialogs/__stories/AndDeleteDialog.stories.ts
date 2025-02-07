import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntDeleteDialog from '../AntDeleteDialog.vue';
import AntButton from '../../buttons/AntButton.vue';

const meta: Meta<typeof AntDeleteDialog> = {
  title: 'Components/Dialogs/Delete Dialog',
  component: AntDeleteDialog,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntDeleteDialog>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntDeleteDialog,
      AntButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <div class="h-96">
      <AntButton @click="() => args.open = true" state="danger">Delete</AntButton>

      <AntDeleteDialog
        v-model:open="args.open"
        :entity="args.entity"
        v-bind="args"
      />
    </div>
    `,
  }),
  args: {
    open: false,
    entity: 'Lorem ipsum',
  },
};
