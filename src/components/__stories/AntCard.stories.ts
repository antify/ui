import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import AntCard from '../AntCard.vue';
import {
  Size,
} from '../../enums';
import AntFormGroup from '../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntCard> = {
  title: 'Components/Card',
  component: AntCard,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    padding: {
      control: {
        type: 'boolean',
      },
    },
    expanded: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCard>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntCard,
    },
    setup() {
      return {
        args,
        Size,
      };
    },
    template: `
      <AntCard v-bind="args">
        <div
          class="slot h-40"
          :class="args.expanded ? 'w-full' : 'w-48'"
        >
          SLOT
        </div>
      </AntCard>
    `,
  }),
  args: {},
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCard,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        Size,
      };
    },
    template: `
      <AntFormGroup direction="column">
        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCard v-bind="args" :size="Size.lg" :expanded="true">
            <div class="slot h-40">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.md" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.sm" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.xs" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :size="Size.xs2" :expanded="true">
            <div class="slot h-full">SLOT</div>
          </AntCard>
        </AntFormGroup>
        <AntFormGroupLabel>Paddingles</AntFormGroupLabel>
        <AntCard v-bind="args" :padding="false" class="w-48">
          <div class="slot h-40">SLOT</div>
        </AntCard>
        <AntFormGroupLabel>Expanded</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCard v-bind="args" class="w-48">
            <div class="slot h-40">SLOT</div>
          </AntCard>
          <AntCard v-bind="args" :expanded="true">
            <div class="slot h-40">SLOT</div>
          </AntCard>
        </AntFormGroup>
      </AntFormGroup>`,
  }),
  args: {},
};
