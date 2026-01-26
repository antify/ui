import AntPagination from '../AntPagination.vue';
import {
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  ref,
} from 'vue';

const meta: Meta<typeof AntPagination> = {
  title: 'Components/Pagination',
  component: AntPagination,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntPagination>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntPagination,
    },
    setup() {
      const page = ref(1);

      return {
        args,
        faAngleRight,
        page,
      };
    },
    template: '<AntPagination v-bind="args" v-model="page"/>',
  }),
  args: {
    pages: 20,
  },
};

export const LightVersion: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    lightVersion: true,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
