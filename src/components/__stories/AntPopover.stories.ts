import AntPopover from '../AntPopover.vue';
import AntButton from '../buttons/AntButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Position} from '../../enums/Position.enum';
import {computed} from 'vue';

const meta: Meta<typeof AntPopover> = {
  title: 'Components/Popover',
  component: AntPopover,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    position: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntPopover>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntPopover, AntButton},
    setup() {
      const dummyText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
      const showPopover = computed({
        get() {
          return args.showPopover
        },
        set(val) {
          args.showPopover = val;
        }
      });

      return {args, showPopover, dummyText};
    },
    template: `
          <div class="p-64 flex justify-center items-center">
            <AntPopover popover-classes="w-64" v-bind="args">
              <template #content>{{ dummyText }}</template>
              <template #default>
                <AntButton @click="() => showPopover = !showPopover" filled>Click me</AntButton>
              </template>
            </AntPopover>
          </div>
        `,
  }),
  args: {
    showPopover: true,
    title: 'Title'
  },
};
