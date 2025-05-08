import AntDropdown from '../AntDropdown.vue';
import AntButton from '../AntButton.vue';
import AntTextInput from '../inputs/AntTextInput.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  computed, onMounted, ref, type Ref,
} from 'vue';

const meta: Meta<typeof AntDropdown> = {
  title: 'Components/Dropdown',
  component: AntDropdown,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    contentPadding: {
      description: 'If the content require a paddingless dropdown to expand over the whole size, set this to false',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntDropdown>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntDropdown,
      AntButton,
      AntTextInput,
    },
    setup() {
      const showDropdown = computed({
        get() {
          return args.showDropdown;
        },
        set(val) {
          args.showDropdown = val;
        },
      });
      const scrollContainer: Ref<HTMLElement | undefined> = ref(undefined);

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollLeft = (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth ) / 2;
          scrollContainer.value.scrollTop = (scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight ) / 2;
        }
      });

      return {
        args,
        showDropdown,
        scrollContainer,
      };
    },
    template: `
      <div ref="scrollContainer" class="dashed overflow-scroll" :style="{height: '500px', width: '500px'}">
        <div class="flex justify-center items-center" :style="{height: '1000px', width: '1000px'}">
          <AntDropdown dropdown-classes="w-64" v-bind="args" v-model:show-dropdown="showDropdown">
            <AntButton @click="() => showDropdown = !showDropdown" filled>Click me</AntButton>

            <template #content>
              Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </template>
          </AntDropdown>
        </div>
      </div>
    `,
  }),
  args: {
    showDropdown: false,
  },
};
