import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { sheetIconMap } from './icons.ts';

@customElement('xui-reaction-sheet')
export class ReactionSheet extends LitElement {
  @query('button', true) _buttonEl!: HTMLButtonElement;

  static styles = css`
    #container {
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 2px lightgrey;
      padding: 12px;
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
      background-color: #d4eff9;
    }
    svg {
      pointer-events: none;
    }
    #reaction-wrapper {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 12px;
    }
  `;

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    this._buttonEl.focus();
  }

  private _clickHandler(e: Event) {
    const unicode = (e.target as Element).getAttribute('key');

    if (unicode) {
      const options = {
        detail: { unicode, source: 'sheet' },
        bubbles: false,
        composed: false, // whether the event will trigger listeners outside of a shadow root
      };

      this.dispatchEvent(new CustomEvent('sheetReactionClick', options));
    }
  }

  render() {
    return html`<div id="container" role="tooltip">
      <div id="reaction-wrapper" @click=${this._clickHandler}>
        ${Object.values(sheetIconMap).map(
          (i) =>
            html`<button aria-label=${i.label} key=${i.unicode} type="button">
              ${i.svg}
            </button>`
        )}
      </div>
    </div>`;
  }
}
