import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MyElement } from './my-element';
import './my-element';

const meta: Meta<typeof MyElement> = {
  title: 'Components/MyElement',
  component: 'my-element',
  render: () => html`<my-element>
    <h1>Vite + Lit</h1>
  </my-element>`,
};

export default meta;

type Story = StoryObj<typeof MyElement>;

export const Default: Story = {};
