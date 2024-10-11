import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ReactionComponent } from './reaction';
import './reaction';

const args = {
  isDisabled: false,
};

const meta: Meta<typeof ReactionComponent & typeof args> = {
  title: 'Components/Reaction',
  component: 'xui-reaction',
  render: ({ isDisabled }: { isDisabled: boolean }) =>
    html`<xui-reaction isDisabled=${isDisabled} />`,
  args,
  argTypes: {
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReactionComponent & typeof args>;

export const Default: Story = {};
