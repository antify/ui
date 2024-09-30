import AntScrollElement from '../AntScrollElement.vue';
import AntTextarea from "../inputs/AntTextarea.vue";
import {type Meta, type StoryObj} from '@storybook/vue3';
import {ref} from "vue";

const meta: Meta<typeof AntScrollElement> = {
  title: 'Components/ScrollElement',
  component: AntScrollElement,
  parameters: {
    controls: {sort: 'requiredFirst'}
  },
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof AntScrollElement>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntScrollElement, AntTextarea},
    setup() {
      const inputValue = ref('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.')

      return {args, inputValue};
    },
    template: `
      <div class="dashed h-[70vh] w-[70vw]">
        <AntScrollElement v-bind="args">
          <div class="h-[100vh] w-[100vw] p-2.5 bg-neutral-300">
            <div class="w-1/2">
              <AntTextarea v-model="inputValue" class="h-[100px]" label="Textarea"/>
            </div>
          </div>
        </AntScrollElement>
      </div>
    `,
  }),
  args: {
  },
};
