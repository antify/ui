import AntField from '../AntField.vue';
import AntBaseInput from '../../inputs/Elements/AntBaseInput.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Size} from '../../../enums/Size.enum';
import {computed, ref} from 'vue';
import {InputState} from '../../../enums';

const meta: Meta<typeof AntField> = {
  title: 'Forms/Field',
  component: AntField,
  parameters: {controls: {sort: 'requiredFirst'}},
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(Size),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState)
    },
    skeleton: {
      control: 'boolean',
      table: {defaultValue: {summary: false}},
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntField>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntField, AntBaseInput},
    setup: () => {
      const skeleton = computed({
        get() {
          return args.skeleton;
        },
        set(val) {
          args.skeleton = val;
        }
      });
      const size = computed({
        get() {
          return args.size;
        },
        set(val) {
          args.size = val;
        }
      });
      const value = ref<string | null>(null);

      return {args, value, skeleton, size, InputState};
    },
    template: `
      <AntField
        v-bind="args"
      >
        <AntBaseInput
          v-model="value"
          :skeleton="skeleton"
          :size="size"
          placeholder="Placeholder"
        />
      </AntField>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
  },
};

