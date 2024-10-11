import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { triggerIcon } from './icons';

@customElement('xui-reaction-trigger-button')
export class ReactionTriggerButton extends LitElement {
  // TODO: Some of the colours should be css vars for theming.
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
    button:not(:disabled) {
      &:hover {
        cursor: pointer;
        color: #027baf;
      }
    }

    button:disabled {
      color: var(--xui-reaction-trigger-disabled, #828282);
    }
  `;

  @property({ type: String })
  ariaLabel: string = 'Select a reaction';

  @property({
    type: Boolean,
    converter: (value, type) => {
      // `value` is a string
      // Convert it to a value of type `type` and return it
      console.log('button: value and type: ', value, type);
      console.log('button typeof value: ', typeof value);
      return value === 'true';
    },
  })
  isDisabled: boolean = false;

  render() {
    return html`<button
      ?disabled=${this.isDisabled}
      part="button"
      aria-label=${this.ariaLabel}
    >
      ${triggerIcon}
    </button>`;
  }
}
