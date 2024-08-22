import type {Meta, StoryObj} from '@storybook/vue3';
import AntNavbar from '../AntNavbar.vue';
import AntNavbarItem from '../AntNavbarItem.vue';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof AntNavbar> = {
  title: 'Components/Navbar',
  component: AntNavbar,
  subcomponents: AntNavbarItem,
  parameters: {
    fullscreen: true
  }
};

export default meta;

type Story = StoryObj<typeof AntNavbar>

export const Docs: Story = {
  render: (args) => ({
    components: {AntNavbar},
    setup() {
      return {
        args
      };
    },
    template: `
      <div class="w-64 dashed">
        <AntNavbar v-bind="args" />
      </div>
    `
  }),
  args: {
    navbarItems: [{
      icon: faUserCircle,
      label: 'Navbar item',
      children: [{
        label: 'Child'
      }]
    }, {
      icon: faBook,
      label: 'Navbar item',
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      icon: faBook,
      label: 'Navbar item',
      active: true,
      children: [{
        label: 'Child',
        icon: faBook,
      }]
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }, {
      label: 'Navbar item'
    }]
  }
};
