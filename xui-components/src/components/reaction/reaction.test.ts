import { expect, fixture, waitUntil } from '@open-wc/testing';
import { ReactionComponent, ReactionData } from './reaction';
import { html } from 'lit';

describe('Reaction component', () => {
  async function setup({
    data = undefined,
  }: {
    data?: Record<string, ReactionData>;
  }) {
    const element: ReactionComponent = await fixture(
      html`<xui-reaction></xui-reaction>`
    );

    if (data) {
      element.reactionsMap = data;
    }

    return { element };
  }

  it('should be defined', async () => {
    const { element } = await setup({});

    const triggerButton = element.shadowRoot?.querySelector(
      '#trigger-button'
    ) as HTMLButtonElement;

    expect(element).to.be.instanceOf(ReactionComponent);
    expect(triggerButton).not.to.be.null;
  });

  it('shows the sheet when the trigger button is clicked', async () => {
    const { element } = await setup({});

    const triggerButton = element.shadowRoot?.querySelector(
      '#trigger-button'
    ) as HTMLElement;

    triggerButton.click();

    await waitUntil(
      () => element.shadowRoot?.querySelector('#reaction-sheet'),
      'Element did not render children'
    );

    expect(element.shadowRoot?.querySelector('#reaction-sheet')).not.to.be.null;
  });

  it('displays preselected reactions when initial data is passed in', async () => {
    const initialData: Record<string, ReactionData> = {
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
    };

    const { element } = await setup({ data: initialData });

    const triggerButton = element.shadowRoot?.querySelector(
      '#trigger-button'
    ) as HTMLElement;
    const listButtons = element.shadowRoot?.querySelectorAll(
      'xui-reaction-list-button'
    );

    expect(triggerButton).not.to.be.null;
    expect(listButtons).to.have.lengthOf(3);
  });
});
