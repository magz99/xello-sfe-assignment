import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';
import './sheet/sheet.ts';
import './list-button/list-button.ts';

import { sheetIconMap } from './sheet/icons.ts';

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
    }

    #reactions-container {
      display: grid;
      grid-template-columns: 40px repeat(
          var(--xui-reaction-list-column-size, 14),
          1fr
        );
      gap: 4px;
    }
  `;

  @state()
  private _isOpen = false;

  @property()
  private _reactionsList: {
    svg: TemplateResult<1>;
    unicode: string;
    name: string;
    label: string;
  }[] = [];

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

  private _reactionHandler(e: CustomEvent<{ unicode: string }>) {
    console.log('reaction is: ', e);
    this._toggleOpen();

    const unicodeValue = String(e.detail.unicode) as keyof typeof sheetIconMap;
    this._reactionsList.push(sheetIconMap[unicodeValue]);

    console.log('reactionsList: ', this._reactionsList);
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

        ${this._reactionsList.map(
          (reactionItem) =>
            html`<xui-reaction-list-button
              reactionIcon=${reactionItem.unicode}
              count="1"
              reacted="true"
            ></xui-reaction-list-button>`
        )}
      </div>
    </div>`;
  }
}
