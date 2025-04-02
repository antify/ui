import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
} from '../../../enums/Size.enum';
import AntSelect from '../AntSelect.vue';
import AntIcon from '../../AntIcon.vue';
import AntDropdown from '../Elements/AntSelectMenu.vue';
import {
  faCake,
} from '@fortawesome/free-solid-svg-icons';
import {
  computed, onMounted, ref, type Ref,
} from 'vue';
import {
  type SelectOption,
} from '../__types/AntSelect.types';
import {
  InputState,
} from '../../../enums';

const meta: Meta<typeof AntSelect> = {
  title: 'Inputs/Select',
  component: AntSelect,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      table: {
        type: {
          summary: 'string|null',
        },
      },
    },
    options: {
      description: 'List of SelectOptions',
      table: {
        type: {
          summary: 'SelectOption[]',
          detail: 'type SelectOption = {label: string; value: string | number;}',
        },
      },
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
      table: {
        defaultValue: {
          summary: Size.md,
        },
      },
    },
    placeholder: {
      table: {
        defaultValue: {
          summary: 'this.label',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntSelect>;

const options: SelectOption[] = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
  {
    label: 'Option 3',
    value: '3',
  },
  {
    label: 'Option 4',
    value: '4',
  },
];

const manySelectOptions: SelectOption[] = [
  ...Array(24).keys(),
].map((key) => ({
  label: `Option ${Number(key) + 1}`,
  value: Number(key) + 1,
}));

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntSelect,
      AntDropdown,
    },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val,
      });
      const scrollContainer: Ref<HTMLElement | undefined> = ref(undefined);

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = (scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight ) / 2;
        }
      });

      return {
        args,
        modelValue,
        scrollContainer,
      };
    },
    template: `
      <div ref="scrollContainer" class="overflow-y-auto h-[100vh] p-2.5 dashed">
        <div class="flex items-center h-[200vh]">
          <AntSelect v-bind="args" v-model="modelValue"/>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    options,
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};

export const WithSlots: Story = {
  render: (args) => ({
    components: {
      AntSelect,
      AntDropdown,
      AntIcon,
    },
    setup() {
      const modelValue = computed({
        // @ts-ignore
        get: () => args.modelValue,
        // @ts-ignore
        set: (val) => args.modelValue = val,
      });
      const scrollContainer: Ref<HTMLElement | undefined> = ref(undefined);

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = (scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight ) / 2;
        }
      });

      return {
        args,
        modelValue,
        scrollContainer,
        faCake,
      };
    },
    template: `
      <div ref="scrollContainer" class="overflow-y-auto h-[100vh] p-2.5 dashed">
        <div class="flex items-center h-[200vh]">
          <AntSelect v-bind="args" v-model="modelValue">
            <template #contentLeft="option">
              <img v-if="option.imgUrl" class="w-6 h-6 rounded-full"  :src="option.imgUrl" :alt="option.label"/>
            </template>
            <template #contentRight="option">
              <img v-if="option.imgUrl" class="w-6 h-6 rounded-full"  :src="option.imgUrl" :alt="option.label"/>
            </template>
          </AntSelect>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Label',
    options: [
      {
        label: 'Option 1',
        value: 1,
        imgUrl: 'https://fastly.picsum.photos/id/972/200/200.jpg?hmac=TeAvfwW2T9YMpPW-sWWTeAiseERb12wSeR3mYzuG6TE',
      },
      {
        label: 'Option 2',
        value: 2,
        imgUrl: 'https://fastly.picsum.photos/id/314/200/200.jpg?hmac=bCAc2iO5ovLPrvwDQV31aBPS13QTyv33ut2H2wY4QXU',
      },
      {
        label: 'Option 3',
        value: 3,
        imgUrl: 'https://fastly.picsum.photos/id/972/200/200.jpg?hmac=TeAvfwW2T9YMpPW-sWWTeAiseERb12wSeR3mYzuG6TE',
      },
      {
        label: 'Option 4',
        value: 4,
        imgUrl: 'https://fastly.picsum.photos/id/165/200/200.jpg?hmac=tQGrY9pm5ze9soSsZ5CNBt87zqnHfFwdPv_khau12Sw',
      },
    ],
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  },
};

export const manyOptions: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    options: manySelectOptions,
  },
};

export const nullable: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    modelValue: '1',
    nullable: true,
  },
};

export const skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    nullable: true,
    skeleton: true,
  },
};

export const disabled: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div ref="scrollContainer" class="overflow-y-auto h-[100vh] p-2.5 dashed">
        <div class="flex flex-col gap-4 justify-center h-[200vh]">
          <AntSelect v-bind="args" v-model="modelValue"/>
          <AntSelect v-bind="args" v-model="modelValue" nullable/>
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    modelValue: '1',
    disabled: true,
  },
};

export const grouped: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <AntSelect v-bind="args" v-model="modelValue"/>
    `,
  }),
  args: {
    label: 'Label',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    options: [
      {
        label: 'Group 1',
        isGroupLabel: true,
      },
      {
        label: 'Option 1.1',
        value: 1,
        imgUrl: 'https://fastly.picsum.photos/id/972/200/200.jpg?hmac=TeAvfwW2T9YMpPW-sWWTeAiseERb12wSeR3mYzuG6TE',
      },
      {
        label: 'Option 2.1',
        value: 2,
        imgUrl: 'https://fastly.picsum.photos/id/314/200/200.jpg?hmac=bCAc2iO5ovLPrvwDQV31aBPS13QTyv33ut2H2wY4QXU',
      },
      {
        label: 'Group 2',
        isGroupLabel: true,
      },
      {
        label: 'Option 2.1',
        value: 3,
        imgUrl: 'https://fastly.picsum.photos/id/972/200/200.jpg?hmac=TeAvfwW2T9YMpPW-sWWTeAiseERb12wSeR3mYzuG6TE',
      },
      {
        label: 'Option 2.2',
        value: 4,
        imgUrl: 'https://fastly.picsum.photos/id/165/200/200.jpg?hmac=tQGrY9pm5ze9soSsZ5CNBt87zqnHfFwdPv_khau12Sw',
      },
    ],
    modelValue: 1,
  },
};

export const withPlaceholder: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    placeholder: 'Lorem ipsum dolor sit amet',
  },
};
export const ellipsisText: Story = {
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="px-4 pt-4 pb-72 flex gap-2.5">
        <div class="w-1/6 flex flex-col gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" v-model="modelValue"/>
          <AntSelect v-bind="args" value="5"/>
        </div>
        <div class="w-2/6 flex flex-row gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" v-model="modelValue"/>
          <AntSelect v-bind="args" value="5"/>
        </div>
        <div class="flex flex-row gap-2.5 border border-info-500 border-dashed">
          <AntSelect v-bind="args" wrapper-class="w-1/6" v-model="modelValue"/>
          <AntSelect v-bind="args" wrapper-class="w-1/6" value="5"/>
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    nullable: true,
  },
};
export const summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args, ctx) => ({
    // @ts-ignore
    components: Docs.render(args, ctx).components,
    // @ts-ignore
    setup: Docs.render(args, ctx).setup,
    template: `
      <div class="p-4 flex flex-col gap-2.5">
        <div class="flex w-2/5 gap-2.5">
          <AntSelect v-bind="args"
                     v-model="modelValue"
                     placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"/>
          <AntSelect v-bind="args" v-model="modelValue"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" state="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="base" disabled/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="info" disabled/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="success" disabled/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="warning" disabled/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="danger" disabled/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="base" disabled nullable/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="info" disabled nullable/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="success" disabled nullable/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="warning" disabled nullable/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" state="danger" disabled nullable/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" grouped="none"/>
          <AntSelect v-bind="args" v-model="modelValue" grouped="right"/>
          <AntSelect v-bind="args" v-model="modelValue" grouped="center"/>
          <AntSelect v-bind="args" v-model="modelValue" grouped="left"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="md" nullable state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" nullable state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" nullable state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" nullable state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="md" nullable state="danger"/>
        </div>
        <div class="flex gap-2.5">
          <AntSelect v-bind="args" v-model="modelValue" size="sm" nullable state="base"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" nullable state="info"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" nullable state="success"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" nullable state="warning"/>
          <AntSelect v-bind="args" v-model="modelValue" size="sm" nullable state="danger"/>
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
  },
};
