import AntProgress from '../AntProgress.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntButton from '../buttons/AntButton.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  ref,
} from 'vue';
import {
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntProgress> = {
  title: 'Components/Progress',
  component: AntProgress,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntProgress>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntProgress,
      AntButton,
    },
    setup() {
      const progress = ref<number>(0);

      const increase = () => {
        if (progress.value === 100) {
          return;
        }

        progress.value += 10;
      };

      const decrease = () => {
        if (progress.value === null || progress.value === 0) {
          return;
        }

        progress.value -= 10;
      };

      const onClickStart = () => {
        progress.value = 0;

        const interval = setInterval(() => {
          if (progress.value < 100) {
            progress.value += 5;
          } else {
            clearInterval(interval);

            return console.log('Done');
          }
        }, 100);
      };

      return {
        args,
        faPlus,
        faMinus,
        Size,
        progress,
        decrease,
        increase,
        onClickStart,
      };
    },
    template: `
      <div class="dashed p-2 flex w-[50vw] flex-col gap-2.5">
        <AntProgress v-bind="args" :progress="progress"/>

        <div class="flex gap-2.5 items-center">
          <AntButton
            :icon-left="faMinus"
            :size="Size.md"
            :disabled="progress <= 0"
            @click="decrease"
          />

          <div>
            {{progress}}%
          </div>

          <AntButton
            :icon-left="faPlus"
            :size="Size.md"
            :disabled="progress >= 100"
            @click="increase"
          />

          <AntButton
            :size="Size.md"
            @click="onClickStart"
          >
            Start
          </AntButton>
        </div>
      </div>
    `,
  }),
  args: {},
};
