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
  argTypes: {
    color: {
      control: {
        type: 'text',
      },
      description: 'Use tailwind class to change background color e.g. "bg-primary-500"',
    },
  },
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
      <div class="dashed p-2 flex h-[50vh] flex-col gap-2.5">
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
  args: {
    height: '8px',
  },
};

export const Summary: Story = {
  render: (args) => ({
    components: {
      AntProgress,
      AntButton,
    },
    setup() {
      const progress1 = ref<number>(50);
      const progress2 = ref<number>(50);
      const progress3 = ref<number>(50);

      const increase = (number: number) => {
        if(number === 1) {
          if (progress1.value === 100) {
            return;
          }

          progress1.value += 10;
        } else if(number === 2) {
          if (progress2.value === 100) {
            return;
          }

          progress2.value += 10;
        } else {
          if (progress3.value === 100) {
            return;
          }

          progress3.value += 10;
        }
      };

      const decrease = (number: number) => {
        if(number === 1) {
          if (progress1.value === null || progress1.value === 0) {
            return;
          }

          progress1.value -= 10;
        } else if(number === 2) {
          if (progress2.value === null || progress2.value === 0) {
            return;
          }

          progress2.value -= 10;
        } else {
          if (progress3.value === null || progress3.value === 0) {
            return;
          }

          progress3.value -= 10;
        }
      };

      const onClickStart = (number: number) => {
        if(number === 1) {
          progress1.value = 0;

          const interval = setInterval(() => {
            if (progress1.value < 100) {
              progress1.value += 5;
            } else {
              clearInterval(interval);
            }
          }, 100);
        } else if(number === 2) {
          progress2.value = 0;

          const interval = setInterval(() => {
            if (progress2.value < 100) {
              progress2.value += 5;
            } else {
              clearInterval(interval);
            }
          }, 100);
        } else {
          progress3.value = 0;

          const interval = setInterval(() => {
            if (progress3.value < 100) {
              progress3.value += 5;
            } else {
              clearInterval(interval);
            }
          }, 100);
        }
      };

      return {
        args,
        faPlus,
        faMinus,
        Size,
        progress1,
        progress2,
        progress3,
        decrease,
        increase,
        onClickStart,
      };
    },
    template: `
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-col gap-2.5">
            <AntProgress v-bind="args" :progress="progress1" height="8px"/>

            <div class="flex gap-2.5 items-center">
              <AntButton
                :icon-left="faMinus"
                :size="Size.md"
                :disabled="progress1 <= 0"
                @click="decrease(1)"
              />

              <div>
                {{progress1}}%
              </div>

              <AntButton
                :icon-left="faPlus"
                :size="Size.md"
                :disabled="progress1 >= 100"
                @click="increase(1)"
              />

              <AntButton
                :size="Size.md"
                @click="onClickStart(1)"
              >
                Start
              </AntButton>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <AntProgress v-bind="args" :progress="progress2" height="12px" color="bg-secondary-500"/>

            <div class="flex gap-2.5 items-center">
              <AntButton
                :icon-left="faMinus"
                :size="Size.md"
                :disabled="progress2 <= 0"
                @click="decrease(2)"
              />

              <div>
                {{progress2}}%
              </div>

              <AntButton
                :icon-left="faPlus"
                :size="Size.md"
                :disabled="progress2 >= 100"
                @click="increase(2)"
              />

              <AntButton
                :size="Size.md"
                @click="onClickStart(2)"
              >
                Start
              </AntButton>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <AntProgress v-bind="args" :progress="progress3" height="18px" color="bg-amber-500"/>

            <div class="flex gap-2.5 items-center">
              <AntButton
                :icon-left="faMinus"
                :size="Size.md"
                :disabled="progress3 <= 0"
                @click="decrease(3)"
              />

              <div>
                {{progress3}}%
              </div>

              <AntButton
                :icon-left="faPlus"
                :size="Size.md"
                :disabled="progress3 >= 100"
                @click="increase(3)"
              />

              <AntButton
                :size="Size.md"
                @click="onClickStart(3)"
              >
                Start
              </AntButton>
            </div>
          </div>
        </div>
    `,
  }),
  args: {},
};
