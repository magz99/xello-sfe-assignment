import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ReactionComponent } from './reaction';
import './reaction';

const meta: Meta<typeof ReactionComponent> = {
  title: 'Components/Reaction',
  component: 'xui-reaction-',
  render: () => html`<xui-reaction />`,
};

export default meta;

type Story = StoryObj<typeof ReactionComponent>;

export const Default: Story = {};
