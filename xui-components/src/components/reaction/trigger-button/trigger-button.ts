import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { triggerIcon } from './icons';

@customElement('xui-reaction-trigger-button')
export class ReactionTriggerButton extends LitElement {
  static styles = css`
    button {
      height: 32px;
      width: 40px;
      background-color: #fafafa;
      border: 1px solid #cccccc;
      border-radius: 40px;
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      color: #484848;
    }
    button:hover {
      cursor: pointer;
      color: #027baf;
    }
  `;

  @property({ type: String })
  ariaLabel: string = 'Select a reaction';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`<button part="button" aria-label=${this.ariaLabel}>
      ${triggerIcon}
    </button>`;
  }
}
