import AntAlert from '../AntAlert.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {InputState} from '../../enums';

const meta: Meta<typeof AntAlert> = {
  title: 'Components/Alert',
  component: AntAlert,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntAlert>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntAlert},
    setup() {
      function logClick() {
        console.log('Clicked close icon');
      }

      return {args, logClick};
    },
    template: `
			<AntAlert v-bind="args" @close="logClick">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br/>
				sed diam nonumy eirmod tempor invidunt <br/>
				ut labore et dolore magna aliquyam erat, <br/>
				sed diam voluptua. At vero eos et accusam et <br/>
				justo duo dolores et ea rebum. Stet clita kasd
			</AntAlert>
    `,
  }),
  args: {
    title: 'Lorem ipsum dolor',
  },
};

export const WithOutTitle: Story = {
  render: Docs.render,
  args: {
    title: '',
    dismissBtn: false,
    icon: false,
  },
};

export const WithContent: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
  },
};

export const WithoutContent: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="p-4">
        <AntAlert v-bind="args" @close="logClick"/>
      </div>
    `,
  }),
  args: {
    ...Docs.args
  },
};

export const WithQuestionIcon: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    questionMarkText: 'Lorem ipsum dolor'
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true
  },
};
