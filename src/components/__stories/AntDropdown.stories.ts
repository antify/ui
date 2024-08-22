import AntDropdown from '../AntDropdown.vue';
import AntButton from '../buttons/AntButton.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Position} from '../../enums/Position.enum';
import {computed} from 'vue';

const meta: Meta<typeof AntDropdown> = {
  title: 'Components/Dropdown',
  component: AntDropdown,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    position: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
    contentPadding: {
      description: 'If the content require a paddingless dropdown to expand over the whole size, set this to false',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntDropdown>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntDropdown, AntButton},
    setup() {
      const showDropdown = computed({
        get() {
          return args.showDropdown
        },
        set(val) {
          args.showDropdown = val;
        }
      });

      return {args, showDropdown};
    },
    template: `
          <div class="p-64 flex justify-center items-center">
            <AntDropdown dropdown-classes="w-64" v-bind="args" v-model:show-dropdown="showDropdown">
              <template #content>
                Lorem ipsum dolor sit amet, consetetur sadipscing
                elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
              </template>
              <template #default>
                <AntButton @click="() => showDropdown = !showDropdown" filled>Click me</AntButton>
              </template>
            </AntDropdown>
          </div>
        `,
  }),
  args: {
    showDropdown: true
  },
};
