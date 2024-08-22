import AntContent from '../AntContent.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';

const meta: Meta<typeof AntContent> = {
  title: 'Components/Content',
  component: AntContent,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AntContent>;

export const Docs: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntContent},
    setup() {
      return {args};
    },
    template: `
			<div class="outline outline-neutral-300">
				<AntContent v-bind="args" class="h-40">
					<div class="slot h-60">SLOT</div>
				</AntContent>
			</div>`,
  }),
  args: {}
}
