import AntTooltip from '../AntTooltip.vue';
import AntFormGroup from '../forms/AntFormGroup.vue';
import AntFormGroupLabel from '../forms/AntFormGroupLabel.vue';
import {type Meta, type StoryObj} from '@storybook/vue3';
import {Position} from '../../enums/Position.enum';
import {InputState} from '../../enums';
import {expect, userEvent, waitFor, within} from '@storybook/test';

// TODO:: Test delay

const meta: Meta<typeof AntTooltip> = {
  title: 'Components/Tooltip',
  component: AntTooltip,
  parameters: {
    controls: {sort: 'requiredFirst'}
  },
  argTypes: {
    position: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InputState),
    }
  },
};

export default meta;

type Story = StoryObj<typeof AntTooltip>;

export const Docs: Story = {
  render: (args) => ({
    components: {AntTooltip},
    setup() {
      return {args};
    },
    template: `
			<div class="p-32 flex justify-center items-center">
				<AntTooltip v-bind="args">
					<template #content>Lorem ipsum dolor sit <br/>amet</template>
					<template #default>
						<div class="box">Hover me</div>
					</template>
				</AntTooltip>
			</div>
		`,
  }),
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const target = canvas.getByText('Hover me');

    function queryTooltip() {
      return canvas.queryByText('Lorem ipsum dolor sit amet');
    }

    await step('Hover over the target and expect showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).toBeInTheDocument(), {timeout: 600});
    });

    await step('Leave hover state and expect not showing the tooltip anymore', async () => {
      await userEvent.unhover(target);

      expect(queryTooltip()).not.toBeInTheDocument();
    });

    await step('Hover over the target, wait until the tooltip is visible, click the target and expect not showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).toBeInTheDocument(), {timeout: 600});
      await userEvent.click(target);

      expect(queryTooltip()).not.toBeInTheDocument();
    });

    await step('Hover over the target, click it while delay and expect not showing the tooltip', async () => {
      await userEvent.hover(target);
      await waitFor(() => expect(queryTooltip()).not.toBeInTheDocument(), {timeout: 200});
      await userEvent.click(target);

      expect(queryTooltip()).not.toBeInTheDocument();
    });
  },
  args: {
    delay: 600,
    position: Position.top
  },
};

/**
 * Make sure, no tooltip get shown if no content is provided.
 */
export const WithoutContent: Story = {
  render: (args) => ({
    components: {AntTooltip},
    setup() {
      return {args};
    },
    template: `
			<div class="p-32 flex justify-center items-center">
				<AntTooltip v-bind="args">
					<div class="box">Hover me</div>

					<template #content></template>
				</AntTooltip>
			</div>
		`,
  }),
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Hover over the target and expect not showing the tooltip', async () => {
      await userEvent.hover(canvas.getByText('Hover me'));

      await waitFor(() => expect(
        canvas.queryByText(
          'Lorem ipsum dolor sit amet',
        )
      ).not.toBeInTheDocument());
    });
  },
  args: {},
};

/**
 * Test multiple tooltips in one page to make sure that
 * each tooltips delay does not bug with others.
 */
export const Multiple: Story = {
  render: (args) => ({
    components: {AntTooltip},
    setup() {
      return {args};
    },
    template: `
      <div class="p-12 flex flex-col justify-center items-center gap-1">
        <div class="flex gap-1">
          <div
            v-for="row in 5"
            class="flex flex-col gap-1"
          >
            <AntTooltip v-for="item of 5">
              <div class="box">Hover me</div>

              <template #content>Lorem</template>
            </AntTooltip>
          </div>
        </div>
      </div>
		`,
  })
};

export const Summary: Story = {
  render: (args) => ({
    components: {
      AntTooltip,
      AntFormGroup,
      AntFormGroupLabel
    },
    setup() {
      return {args, Position, InputState};
    },
    template: `
			<AntFormGroup>
				<AntFormGroupLabel>Position</AntFormGroupLabel>
				<AntFormGroup direction="row" class="gap-x-32 py-16 dashed">
					<AntTooltip :position="Position.top">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.right">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.left">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>
				</AntFormGroup>

				<AntFormGroupLabel>Color type</AntFormGroupLabel>
				<AntFormGroup direction="row" class="pb-16 dashed">
					<AntTooltip :position="Position.bottom" :state="InputState.base">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom" :state="InputState.info">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom" :state="InputState.success">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom" :state="InputState.warning">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom" :state="InputState.danger">
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>
				</AntFormGroup>

				<AntFormGroupLabel>Expanded</AntFormGroupLabel>
				<AntFormGroup class="p-32 dashed gap-y-16">
					<AntTooltip :position="Position.top" expanded>
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.right" expanded>
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.bottom" expanded>
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>

					<AntTooltip :position="Position.left" expanded>
						<div class="box">Hover me</div>

						<template #content>Lorem</template>
					</AntTooltip>
				</AntFormGroup>
			</AntFormGroup>
		`,
  }),
  parameters: {
    chromatic: {disableSnapshot: false},
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Hover over the targets and expect showing the tooltips', async () => {
      const targets = canvas.getAllByText('Hover me');

      await Promise.all(targets.map(async (target) => {
        await userEvent.hover(target);
      }));

      await waitFor(() => expect(canvas.queryAllByText('Lorem')).toHaveLength(targets.length));
    });
  },
};
