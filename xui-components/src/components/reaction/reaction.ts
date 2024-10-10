import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  render() {
    return html`<div><xui-reaction-trigger-button /></div>`;
  }
}
