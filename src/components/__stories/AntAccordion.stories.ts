import AntAccordion from '../AntAccordion.vue';
import AntAccordionItem from '../AntAccordionItem.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {CollapseStrategy} from '../__types/AntAccordion.types';

const meta: Meta<typeof AntAccordion> = {
  title: 'Components/Accordion',
  component: AntAccordion,
  subcomponents: {AntAccordionItem},
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    collapseStrategy: {
      control: {type: 'select'},
      options: Object.values(CollapseStrategy)
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntAccordion>;

export const Docs: Story = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  render: (args) => ({
    components: {AntAccordion, AntAccordionItem},
    setup() {
      return {args};
    },
    template: `
      <div class="p-4">
        <AntAccordion v-bind="args"/>
      </div>`,
  }),
  args: {
    items: [
      {
        label: 'First entry',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
      {
        label: 'Second entry',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        iconLeft: true
      },
      {
        label: 'Third entry',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
      {
        label: 'Fourth entry',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
    ]
  }
};

export const CustomContent: Story = {
  render: (args) => ({
    components: {AntAccordion, AntAccordionItem},
    setup() {
      return {args};
    },
    template: `
      <div class="p-4">
        <AntAccordion v-bind="args">
          <template #item-content="{item, index}">
            <div class="text-danger-500">{{ item.content }}</div>
          </template>
        </AntAccordion>
      </div>`,
  }),
  args: {
    ...Docs.args,
  },
};

export const MultipleCollapseStrategy: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    collapseStrategy: CollapseStrategy.multiple,
  },
};

export const htmlInContent: Story = {
  render: Docs.render,
  args: {
    items: [
      {
        label: 'First entry',
        content:
          `Lorem <strong>ipsum</strong> dolor sit amet, consetetur sadipscing elitr, <br/>
                    sed diam nonumy eirmod tempor invidunt <br/>
                    ut labore et dolore magna aliquyam erat, <br/>
                    sed diam voluptua. At vero eos et accusam et <br/>
                    justo duo dolores et ea rebum. Stet clita kasd`
      },
      {
        label: 'Second entry',
        content:
          `Lorem <strong>ipsum</strong> dolor sit amet, consetetur sadipscing elitr, <br/>
                    sed diam nonumy eirmod tempor invidunt <br/>
                    ut labore et dolore magna aliquyam erat, <br/>
                    sed diam voluptua. At vero eos et accusam et <br/>
                    justo duo dolores et ea rebum. Stet clita kasd`
      },
    ]
  },
};
