import AntTooltip from '../AntTooltip.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {InputState} from '../../enums';
import AntButton from "../buttons/AntButton.vue";
import {onMounted, ref, type Ref} from "vue";
import {expect, userEvent, waitFor, within} from '@storybook/test';

// TODO:: Test delay

const meta: Meta<typeof AntTooltip> = {
  title: 'Components/Tooltip',
  component: AntTooltip,
  parameters: {
    controls: {sort: 'requiredFirst'}
  },
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntTooltip>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTooltip, AntButton},
    setup() {
      const scrollContainer: Ref<HTMLElement | undefined> = ref(undefined)

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollLeft =  (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth ) / 2;
          scrollContainer.value.scrollTop =  (scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight ) / 2;
        }
      })

      return {args, scrollContainer};
    },
    template: `
      <div ref="scrollContainer" class="dashed  h-[50vh] w-[50vw] overflow-scroll">
        <div class="flex flex-grow justify-center items-center h-screen w-[1000px]">
          <AntTooltip v-bind="args">
            <AntButton>Hover me</AntButton>

            <template #content>
              <div>
                Tooltip content
              </div>
            </template>
          </AntTooltip>
        </div>
      </div>
    `,
  }),
  play: async ({canvasElement, step, }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByText('Hover me');

    function queryTooltip() {
      return canvasElement.parentElement?.querySelector('[data-e2e="tooltip-content"]');
    }

    await step('Hover over the target and expect showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).toBeInTheDocument(), {timeout: 600});
    });

    await step('Leave hover state and expect not showing the tooltip anymore', async () => {
      await userEvent.unhover(target);

      await waitFor(() => expect(queryTooltip()).not.toBeInTheDocument(), {timeout: 600});
    });

    await step('Hover over the target, wait until the tooltip is visible, click the target and expect not showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).toBeInTheDocument(), {timeout: 600});
      await userEvent.click(target);

      await expect(queryTooltip()).not.toBeInTheDocument();
    });

    await step('Hover over the target, click it while delay and expect not showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).not.toBeInTheDocument(), {timeout: 200});
      await userEvent.click(target);

      await expect(queryTooltip()).not.toBeInTheDocument();
    });
  },
  args: {
  },
};

export const disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true
  },
};
