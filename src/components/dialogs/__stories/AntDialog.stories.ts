import AntDialog from '../AntDialog.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import AntButton from '../../buttons/AntButton.vue';
import {InputState} from '../../../enums';

const meta: Meta<typeof AntDialog> = {
  title: 'Components/Dialogs/Dialog',
  component: AntDialog,
  parameters: {controls: {sort: 'requiredFirst'}},
  decorators: [() => ({template: '<div class="border border-dashed border-base-300"><story/></div>'})],
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    },
    title: {
      control: 'text',
      table: {type: {summary: 'string|null'}},
    }
  }
};

export default meta;

type Story = StoryObj<typeof AntDialog>

export const Docs: Story = {
  render: (args) => ({
    components: {AntDialog, AntButton},
    setup() {
      return {args};
    },
    template: `
      <div
        class="h-96 flex items-center justify-center relative"
      >
        <div class="absolute inset-0">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br/>
          sed diam nonumy eirmod tempor invidunt <br/>
          ut labore et dolore magna aliquyam erat, <br/>
          sed diam voluptua. At vero eos et accusam et <br/>
          justo duo dolores et ea rebum. Stet clita kasd
        </div>

        <div class="absolute bottom-0 right-0">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br/>
          sed diam nonumy eirmod tempor invidunt <br/>
          ut labore et dolore magna aliquyam erat, <br/>
          sed diam voluptua. At vero eos et accusam et <br/>
          justo duo dolores et ea rebum. Stet clita kasd
        </div>

        <AntButton @click="args.open = true" state="primary">Open Dialog</AntButton>

        <AntDialog v-bind="args" v-model:open="args.open">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore
        </AntDialog>
      </div>
    `
  }),
  args: {
    open: false,
    title: 'Lorem ipsum dolor'
  },
};
