import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ReactionComponent, ReactionData } from './reaction';
import './reaction';

const args = {
  isDisabled: false,
  reactionsMap: {} as Record<string, ReactionData>,
};

const meta: Meta<typeof ReactionComponent & typeof args> = {
  title: 'Components/Reaction',
  component: 'xui-reaction',
  render: ({
    isDisabled,
    reactionsMap,
  }: {
    isDisabled: boolean;
    reactionsMap: Record<string, ReactionData>;
  }) =>
    html`<xui-reaction
      isDisabled=${isDisabled || nothing}
      reactionsMap=${JSON.stringify(reactionsMap)}
    />`,
  args,
  argTypes: {
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    reactionsMap: { control: { type: 'object' } },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ReactionComponent & typeof args>;

export const Default: Story = {};

export const Preselected: Story = {
  args: {
    isDisabled: false,
    reactionsMap: {
      'U+1F923': {
        count: 2,
        unicode: 'U+1F923',
        name: 'joy',
        label: 'Rolling on floor laughing',
        reacted: false,
      },
      'U+1F973': {
        count: 1,
        unicode: 'U+1F973',
        name: 'celebrate',
        label: 'Celebrate face',
        reacted: true,
      },
      'U+1F914': {
        count: 10,
        unicode: 'U+1F914',
        name: 'thinking',
        label: 'Thinking face',
        reacted: true,
      },
    },
  },
};
