import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  @property({
    type: Boolean,
    converter: (value, type) => {
      // `value` is a string
      // Convert it to a value of type `type` and return it
      console.log('value and type: ', value, type);
      console.log('typeof value: ', typeof value);
      return value === 'true';
    },
  })
  isDisabled = 'false';

  render() {
    return html`<div>
      <xui-reaction-trigger-button isDisabled=${this.isDisabled} />
    </div>`;
  }
}
