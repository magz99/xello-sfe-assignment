import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { sheetIconMap } from './icons.ts';
import { classMap } from 'lit/directives/class-map.js';

@customElement('xui-reaction-sheet')
export class ReactionSheet extends LitElement {
  @query('button', true) _buttonEl!: HTMLButtonElement;

  @state()
  private _position = 'top';

  static styles = css`
    #container {
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 2px lightgrey;
      padding: 12px;
      display: block;
      position: absolute;
    }
    #container.show-top {
      bottom: 111%;
    }
    #container.show-bottom {
      top: 111%;
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

  connectedCallback() {
    super.connectedCallback();

    this._setSheetPosition();
  }

  private _setSheetPosition() {
    const parentRect = this.parentElement?.getBoundingClientRect();

    if ((parentRect?.top ?? 0) < 192) {
      this._position = 'bottom';
    }
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
    const classes = {
      'show-top': this._position === 'top',
      'show-bottom': this._position === 'bottom',
    };

    return html`<div class=${classMap(classes)} id="container" role="tooltip">
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
