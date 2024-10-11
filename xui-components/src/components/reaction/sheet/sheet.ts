import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sheetIcons } from './icons.ts';

@customElement('xui-reaction-sheet')
export class ReactionSheet extends LitElement {
  // TODO: Some of the colours should be css vars for theming.
  static styles = css`
    #container {
      display: none;
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 2px lightgrey;
      padding: 12px;

      &.active {
      display: block;
      position: absolute;
      bottom: 111%;
    }
    
    button {
      height: 24px;
      width: 24px;
      background-color: var(--xui-reaction-sheet-button-bg-color, #ffffff);
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button:hover {
      cursor: pointer;
      color: var(--xui-reaction-trigger-icon-hover-color, #027baf);
    }

    #reaction-wrapper {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 12px;
    }
  `;

  @property({
    type: Boolean,
    reflect: true,
    converter: (value, type) => {
      // `value` is a string
      // Convert it to a value of type `type` and return it
      console.log('sheet: value and type: ', value, type);
      console.log('sheet typeof value: ', typeof value);
      return value === 'true';
    },
  })
  isOpen: boolean = false;

  render() {
    return html`<div
      id="container"
      class=${this.isOpen ? 'active' : ''}
      role="tooltip"
    >
      <div id="reaction-wrapper">
        ${sheetIcons.map((i) => html`<button type="button">${i}</button>`)}
      </div>
    </div>`;
  }
}
