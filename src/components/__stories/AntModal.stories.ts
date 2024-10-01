import AntModal from '../AntModal.vue';
import AntButton from '../buttons/AntButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {computed} from 'vue';
import AntKeycap from '../AntKeycap.vue';

const meta: Meta<typeof AntModal> = {
  title: 'Components/Modal',
  component: AntModal,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntModal>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntModal, AntButton, AntKeycap},
    setup() {
      const open = computed({
        // @ts-ignore
        get: () => args.open,
        // @ts-ignore
        set: (val) => args.open = val
      });

      return {args, open};
    },
    template: `
      <div
        class="p-4 h-96 flex items-center justify-center relative"
        :class="{'border-b border-dashed': args.fullscreen}"
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
        <AntButton @click="() => open = true" state="primary">Open Modal</AntButton>

        <AntModal v-bind="args" v-model:open="open">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br/>
          sed diam nonumy eirmod tempor invidunt <br/>
          ut labore et dolore magna aliquyam erat, <br/>
          sed diam voluptua. At vero eos et accusam et <br/>
          justo duo dolores et ea rebum. Stet clita kasd

          <template #footer>
            <div class="flex justify-between items-center">
              <div>
                Press
                <AntKeycap>esc</AntKeycap>
                to close modal
              </div>

              <AntButton state="primary">Save</AntButton>
            </div>
          </template>
        </AntModal>
      </div>
    `,
  }),
  args: {
    title: 'Lorem ipsum dolor',
    open: false
  },
};

export const Fullscreen: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    open: true,
    fullscreen: true
  },
};
