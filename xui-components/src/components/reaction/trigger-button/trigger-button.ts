import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { triggerIcon } from './icons';

@customElement('xui-reaction-trigger-button')
export class ReactionTriggerButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }
    button {
      height: 32px;
      width: 40px;
      background-color: var(--xui-reaction-trigger-bg-color, #fafafa);
      border: 1px solid #cccccc;
      border-radius: 40px;
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      color: var(--xui-reaction-trigger-icon-base-color, #484848);
    }
    button:not(:disabled) {
      &:hover {
        cursor: pointer;
        color: var(--xui-reaction-trigger-icon-hover-color, #027baf);
      }
    }

    button:disabled {
      color: var(--xui-reaction-trigger-disabled, #828282);
    }
  `;

  @property({ type: String })
  name: string = 'Select a reaction';

  @property({
    type: Boolean,
  })
  isDisabled = false;

  render() {
    return html`<button
      disabled=${this.isDisabled || nothing}
      type="button"
      aria-label=${this.name}
    >
      ${triggerIcon}
    </button>`;
  }
}
