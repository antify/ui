import AntButton from '../AntButton.vue';
import AntFormGroupLabel from '../forms/AntFormGroupLabel.vue';
import AntFormGroup from '../forms/AntFormGroup.vue';
import {
  faCaretRight, faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Grouped as _Grouped,
} from '../../enums/Grouped.enum';
import {
  State, InputState, Position,
} from '../../enums';
import {
  within,
} from '@storybook/test';
import {
  ButtonSize,
} from '../__types/AntButton.types';

const meta: Meta<typeof AntButton> = {
  component: AntButton,
  title: 'Components/Button',
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
      options: Object.values(State),
    },
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(_Grouped),
      description: 'Where is this fields position in a group',
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(ButtonSize),
      description: 'Defines the size of the button',
    },
    iconLeft: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed left to the label or the default slot.<br>Use Font-awesome Icons.',
    },
    iconRight: {
      control: {
        type: 'none',
      },
      description:
        'Will be displayed right to the label or the default slot.<br>Use Font-awesome Icons.',
    },
    to: {
      control: {
        type: 'RouteLocationRaw',
      },
      description: 'If provided transforms the button into an a-tag with the provided link. Style is still the same as a button.',
      table: {
        type: {
          summary: 'string|object',
        },
      },
    },
    submit: {
      description: 'Change the button type to type="submit"',
    },
    tooltipPosition: {
      control: {
        type: 'select',
      },
      options: Object.values(Position),
      description: 'The tooltips position. Tooltip is only shown if a tooltip-content slot is provided.',
    },
    tooltipState: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
      description: 'The tooltips color type. Tooltip is only shown if a tooltip-content slot is provided.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AntButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<AntButton v-bind="args">Button</AntButton>',
  }),
  args: {},
};

export const Filled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    filled: true,
  },
};

export const Link: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    to: '/example',
  },
};

// TODO:: merge icon variants together
export const Icons: Story = {
  render: (args) => ({
    components: {
      AntButton,
      AntFormGroup,
      AntFormGroupLabel,
    },
    setup() {
      return {
        args,
        faCaretLeft,
        faCaretRight,
      };
    },
    template: `
			<AntFormGroup>
				<AntFormGroupLabel>Icons only</AntFormGroupLabel>

				<AntFormGroup direction="row">
					<AntButton v-bind="args" :icon-left="faCaretLeft"></AntButton>
					<AntButton v-bind="args" :icon-right="faCaretRight"></AntButton>
					<AntButton v-bind="args" :icon-left="faCaretLeft" :icon-right="faCaretRight"></AntButton>
				</AntFormGroup>

				<AntFormGroupLabel>Icons with text</AntFormGroupLabel>

				<AntFormGroup direction="row">
					<AntButton v-bind="args" :icon-left="faCaretLeft">Button</AntButton>
					<AntButton v-bind="args" :icon-right="faCaretRight">Button</AntButton>
					<AntButton v-bind="args" :icon-left="faCaretLeft" :icon-right="faCaretRight">Button</AntButton>
				</AntFormGroup>
			</AntFormGroup>
		`,
  }),
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const ReadOnly: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    readonly: true,
  },
};

export const Expanded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    expanded: true,
  },
};

export const WithoutBorder: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    filled: true,
    outlined: false,
  },
};

export const WithTooltip: Story = {
  render: (args) => ({
    components: {
      AntButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
			<AntButton v-bind="args">
				<template #default>Button</template>

				<template #tooltip-content>This is a button</template>
			</AntButton>`,
  }),
  play: async ({
    canvasElement, step,
  }) => {
    const canvas = within(canvasElement);

    // await step('Hover over the button, click it and expect not showing the tooltip', async () => {
    // 	await userEvent.hover(canvas.getByText('Button'));
    //
    // 	await waitFor(() => expect(
    // 		canvas.queryByText(
    // 			'This is a button',
    // 		),
    // 	).not.toBeInTheDocument(), {timeout: 600});
    //
    // 	await userEvent.click(canvas.getByText('Button'));
    //
    // 	await waitFor(() => expect(
    // 		canvas.queryByText(
    // 			'This is a button',
    // 		),
    // 	).not.toBeInTheDocument(), {timeout: 600});
    // });

    // await step('Hover over the button and expect showing the tooltip after 800 ms delay', async () => {
    // 	await userEvent.hover(canvas.getByText('Button'));
    //
    // 	await waitFor(() => expect(
    // 		canvas.queryByText(
    // 			'This is a button',
    // 		),
    // 	).toBeInTheDocument(), {timeout: 800});
    // });
  },
  args: {
    tooltipDelay: 800,
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const FigmaExport: Story = {
  parameters: {
    // Отключаем лишние элементы интерфейса Сторибука для чистого импорта
    chromatic: {
      disableSnapshot: false,
    },
    options: {
      showPanel: false,
    },
  },
  render: () => ({
    components: {
      AntButton,
    },
    setup() {
      // Регистрируем все иконки и перечисления, которые нужны для матрицы
      return {
        states: Object.values(State),
        sizes: Object.values(ButtonSize),
      };
    },
    template: `
      <div class="p-8 flex flex-col gap-12 bg-gray-50">
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold">Matrix: States & Types</h2>
          <div v-for="state in states" :key="state" class="flex gap-4 items-center">
            <span class="w-24 text-sm font-mono text-gray-500">{{ state }}</span>
            <AntButton :state="state" :filled="true">Filled</AntButton>
            <AntButton :state="state" :filled="false" :outlined="true">Outlined</AntButton>
            <AntButton :state="state" :filled="true" :outlined="false">No Border</AntButton>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold">Matrix: Sizes</h2>
          <div class="flex gap-4 items-end">
            <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-2">
              <AntButton state="primary" :size="size" :filled="true">Button {{ size }}</AntButton>
              <span class="text-xs font-mono text-gray-400">{{ size }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold">Matrix: Functional States</h2>
          <div class="flex gap-4">
            <AntButton state="primary" :filled="true" disabled>Disabled</AntButton>
            <AntButton state="primary" :filled="true" spinner>Loading</AntButton>
            <AntButton state="primary" :filled="true" skeleton>Skeleton</AntButton>
          </div>
        </div>
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
      AntButton,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
			<div class="flex flex-col gap-2.5">
				<AntFormGroup>
					<AntFormGroupLabel>
						Grouped | Filled | Outlined combinations
					</AntFormGroupLabel>
					<div class="flex">
						<AntButton v-bind="args" state="base" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="base" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="base" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="base" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="primary" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="primary" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="primary" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="primary" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="secondary" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="secondary" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="secondary" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="secondary" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="success" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="success" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="success" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="success" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="info" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="info" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="info" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="info" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="warning" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="warning" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="warning" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="warning" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
					<div class="flex">
						<AntButton v-bind="args" state="danger" grouped="left" :filled="true" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="danger" grouped="center" :filled="false" :outlined="false">
							Button
						</AntButton>
						<AntButton v-bind="args" state="danger" grouped="center" :filled="true" :outlined="true">
							Button
						</AntButton>
						<AntButton v-bind="args" state="danger" grouped="right" :filled="false" :outlined="true">
							Button
						</AntButton>
					</div>
				</AntFormGroup>

				<AntFormGroup>
					<AntFormGroupLabel>
						Size
					</AntFormGroupLabel>
					<AntFormGroup direction="row">
						<AntButton v-bind="args" size="lg">Button</AntButton>
						<AntButton v-bind="args" size="md">Button</AntButton>
						<AntButton v-bind="args" size="sm">Button</AntButton>
						<AntButton v-bind="args" size="xs">Button</AntButton>
						<AntButton v-bind="args" size="2xs">Button</AntButton>
					</AntFormGroup>
				</AntFormGroup>
			</div>
		`,
  }),
  args: {
    iconLeft: faCaretLeft,
    iconRight: faCaretRight,
  },
};
