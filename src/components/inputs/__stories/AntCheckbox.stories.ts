import AntCheckbox from '../AntCheckbox.vue';
import {
  computed, ref,
} from 'vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  InputState, Size,
} from '../../../enums';
import AntFormGroup from '../../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../../forms/AntFormGroupLabel.vue';

const meta: Meta<typeof AntCheckbox> = {
  title: 'Inputs/Checkbox',
  component: AntCheckbox,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
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
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntCheckbox>;

export const Docs: Story = {
  render: (args: any) => ({
    components: {
      AntCheckbox,
    },
    setup() {
      const value = computed<boolean>({
        get() {
          return args.modelValue;
        },
        set(val) {
          // @ts-ignore
          args.modelValue = val;
        },
      });

      return {
        args,
        value,
      };
    },
    template: `
      <div class="m-2">
        <AntCheckbox v-bind="args" v-model="value"/>
        <span class="text-sm text-gray-500">Reactive value: {{ value }}</span>
      </div>
    `,
  }),
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntCheckbox,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      const offValue = ref(false);
      const onValue = ref(true);

      return {
        args,
        offValue,
        onValue,
        InputState,
        Size,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroupLabel>State & false</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :state="InputState.base"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :state="InputState.info"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :state="InputState.success"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :state="InputState.warning"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :state="InputState.danger"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
        </AntFormGroup>

        <AntFormGroupLabel>State & true</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :state="InputState.base"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :state="InputState.info"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :state="InputState.success"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :state="InputState.warning"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :state="InputState.danger"
            label="Label"
            description="Lorem ipsum dolor sit amet"
            :messages="['Message']"
          />
        </AntFormGroup>

        <AntFormGroupLabel>Size</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :size="Size.lg"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :size="Size.lg"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :size="Size.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :size="Size.md"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :size="Size.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :size="Size.sm"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :size="Size.xs"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :size="Size.xs"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            :size="Size.xs2"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            :size="Size.xs"
            label="Label"
            description="Lorem ipsum dolor sit amet"
          />
        </AntFormGroup>
        <AntFormGroup direction="row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntCheckbox
                v-model="offValue"
                class="w-28"
                label="Label"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                disabled>
                Value
              </AntCheckbox>
              <AntCheckbox
                v-model="onValue"
                class="w-28"
                label="Label"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base"
                disabled>
                Value
              </AntCheckbox>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Readonly</AntFormGroupLabel>
            <AntFormGroup direction="row">
              <AntCheckbox
                v-model="offValue"
                :readonly="true"
                class="w-28"
                label="Label"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base">
                Value
              </AntCheckbox>
              <AntCheckbox
                v-model="onValue"
                :readonly="true"
                class="w-28"
                label="Label"
                description="Lorem ipsum dolor sit amet."
                :state="InputState.base">
                Value
              </AntCheckbox>
            </AntFormGroup>
          </AntFormGroup>
          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
            <AntCheckbox
              v-model="offValue"
              class="w-28"
              label="Label"
              description="Lorem ipsum dolor sit amet."
              :state="InputState.base"
              skeleton>
              Value
            </AntCheckbox>
          </AntFormGroup>
        </AntFormGroup>
        <AntFormGroupLabel>Plain</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox v-model="offValue"/>
          <AntCheckbox v-model="onValue"/>
        </AntFormGroup>
        <AntFormGroupLabel>Label & label + value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox v-model="offValue" label="Label"/>
          <AntCheckbox v-model="onValue" label="Label"/>
          <AntCheckbox v-model="offValue" label="Label">
            Value
          </AntCheckbox>
          <AntCheckbox v-model="onValue" label="Label">
            Value
          </AntCheckbox>
        </AntFormGroup>
        <AntFormGroupLabel>Description & description + value</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet"/>
          <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet"/>
          <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet">
            Value
          </AntCheckbox>
          <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet">
            Value
          </AntCheckbox>
        </AntFormGroup>
        <AntFormGroupLabel>Content</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox v-model="offValue" class="w-28">
            Value
          </AntCheckbox>
          <AntCheckbox v-model="onValue" class="w-28">
            Value
          </AntCheckbox>
        </AntFormGroup>
        <AntFormGroupLabel>Label & Description</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox v-model="offValue" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
          <AntCheckbox v-model="onValue" class="w-28" description="Lorem ipsum dolor sit amet" label="Label"/>
        </AntFormGroup>
        <AntFormGroupLabel>Label & Description & Content</AntFormGroupLabel>
        <AntFormGroup direction="row">
          <AntCheckbox
            v-model="offValue"
            class="w-28"
            description="Lorem ipsum dolor sit amet"
            label="Label"
          >
            Value
          </AntCheckbox>
          <AntCheckbox
            v-model="onValue"
            class="w-28"
            description="Lorem ipsum dolor sit amet"
            label="Label"
          >
            Value
          </AntCheckbox>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
};
