import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';
import './sheet/sheet.ts';
import './list-button/list-button.ts';

import { sheetIcons } from './sheet/icons.ts';

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
    }

    #reactions-container {
      display: flex;
    }

    #reactions-list {
      display: flex;
      margin-left: 4px;
    }
  `;

  @state()
  private _isOpen = false;

  @property()
  private _reactionsList = [
    {
      unicode: 'U+1F600',
      name: 'happy',
      label: 'Happy grinning',
    },
  ];

  @property({
    type: Boolean,
    converter: (value) => {
      return value === 'true'; // return Boolean(value) does not work in Storybook because it returns true for "false" string for some reason.
    },
  })
  isDisabled = 'false';

  private _toggleOpen() {
    this._isOpen = !this._isOpen;
  }

  private _reactionHandler(e: CustomEvent) {
    console.log('reaction is: ', e);
    this._toggleOpen();
  }

  render() {
    return html`<div>
      ${this._isOpen
        ? html`<xui-reaction-sheet
            @reactionClick=${this._reactionHandler}
          ></xui-reaction-sheet>`
        : ''}
      <div id="reactions-container">
        <xui-reaction-trigger-button
          @click="${this._toggleOpen}"
          isDisabled=${this.isDisabled}
        ></xui-reaction-trigger-button>
        <div id="reactions-list">
          ${this._reactionsList.map(
            (reactionItem) =>
              html`<xui-reaction-list-button
                reactionIcon=${reactionItem.unicode}
                count="1"
              ></xui-reaction-list-button>`
          )}
        </div>
      </div>
    </div>`;
  }
}
