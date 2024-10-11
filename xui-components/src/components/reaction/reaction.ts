import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';
import './sheet/sheet.ts';

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
    }
  `;
  @state()
  private isOpen = false;

  @property({
    type: Boolean,
    converter: (value, type) => {
      // `value` is a string
      // Convert it to a value of type `type` and return it
      // console.log('value and type: ', value, type);
      // console.log('typeof value: ', typeof value);
      return value === 'true'; // return Boolean(value)  does not work because it returns true for "false" string for some reason.
    },
  })
  isDisabled = 'false';

  private _toggleOpen(e: Event) {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`<div>
      <xui-reaction-sheet isOpen=${this.isOpen}></xui-reaction-sheet>
      <xui-reaction-trigger-button
        @click="${this._toggleOpen}"
        isDisabled=${this.isDisabled}
      ></xui-reaction-trigger-button>
    </div>`;
  }
}
