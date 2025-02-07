import AntPopover from '../AntPopover.vue';
import AntButton from '../buttons/AntButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  computed, onMounted, ref, type Ref,
} from 'vue';

const meta: Meta<typeof AntPopover> = {
  title: 'Components/Popover',
  component: AntPopover,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntPopover>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntPopover,
      AntButton,
    },
    setup() {
      const dummyText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
      const showPopover = computed({
        get() {
          return args.showPopover;
        },
        set(val) {
          args.showPopover = val;
        },
      });
      const scrollContainer: Ref<HTMLElement | undefined> = ref(undefined);

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollLeft = (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth ) / 2;
          scrollContainer.value.scrollTop = (scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight ) / 3;
        }
      });

      return {
        args,
        showPopover,
        dummyText,
        scrollContainer,
      };
    },
    template: `
      <div ref="scrollContainer" class="dashed overflow-scroll" :style="{height: '500px', width: '500px'}">
        <div class="flex justify-center items-center" :style="{height: '1000px', width: '1000px'}">
          <AntPopover popover-classes="w-64" v-bind="args" v-model:show-popover="showPopover">
            <AntButton @click="() => showPopover = !showPopover" filled>Click me</AntButton>

            <template #content>{{ dummyText }}</template>
            <template #title>{{ 'Title' }}</template>
          </AntPopover>
        </div>
      </div>
    `,
  }),
  args: {
    showPopover: true,
  },
};
