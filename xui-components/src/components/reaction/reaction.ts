import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';
import './sheet/sheet.ts';
import './list-button/list-button.ts';

import { sheetIconMap } from './sheet/icons.ts';

export interface ReactionData {
  unicode: string;
  name: string;
  label: string;
  count: number;
  reacted: boolean;
}

@customElement('xui-reaction')
export class ReactionComponent extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    #reactions-container {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  `;

  @query('#trigger-button', true)
  private _triggerButton!: HTMLButtonElement;

  @state()
  private _isOpen = false;

  @state()
  private _reactionsMap: Record<string, ReactionData> = {};

  @property({ type: Object })
  set reactionsMap(val: Record<string, ReactionData>) {
    this._reactionsMap = { ...val };
  }

  get reactionsMap() {
    return this._reactionsMap;
  }

  @property({
    type: Boolean,
    converter: (value) => {
      return value === 'true'; // return Boolean(value) does not work in Storybook because it returns true for "false" string for some reason.
    },
  })
  isDisabled = 'false';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keyup', this._handleKeyup);
  }
  disconnectedCallback() {
    window.removeEventListener('keyup', this._handleKeyup);
    super.disconnectedCallback();
  }

  private _toggleOpen() {
    this._isOpen = !this._isOpen;
  }

  private _handleFocus() {
    if (!this._isOpen) {
      setTimeout(() => {
        this._triggerButton.shadowRoot?.querySelector('button')?.focus();
      }, 0);
    }
  }

  private _toggleAndFocus() {
    this._toggleOpen();
    this._handleFocus();
  }

  private _handleKeyup = (e: Event) => {
    const code = (e as KeyboardEvent).key;
    if (code === 'Escape') {
      if (this._isOpen) {
        this._toggleAndFocus();
      }
    }
  };

  private _reactionHandler(
    e: CustomEvent<{ unicode: string; source: string }>
  ) {
    const { unicode, source } = e.detail;

    if (source === 'sheet') {
      this._toggleAndFocus();
    }

    this._updateReactionsMap(unicode);
  }

  private _updateReactionsMap(unicodeValue: string) {
    const updatedReactionsMap = { ...this.reactionsMap };
    const reactionData: ReactionData | undefined =
      updatedReactionsMap[unicodeValue];

    if (!reactionData) {
      const { name, label, unicode } =
        sheetIconMap[unicodeValue as keyof typeof sheetIconMap];
      updatedReactionsMap[unicodeValue] = {
        name,
        label,
        unicode,
        count: 1,
        reacted: true,
      };
    } else {
      if (reactionData.reacted) {
        if (reactionData.count > 1) {
          updatedReactionsMap[unicodeValue] = {
            ...reactionData,
            count: --reactionData.count,
            reacted: false,
          };
        } else {
          // Remove the node completely
          delete updatedReactionsMap[unicodeValue];
        }
      } else {
        updatedReactionsMap[unicodeValue] = {
          ...reactionData,
          count: ++reactionData.count,
          reacted: true,
        };
      }
    }

    this.reactionsMap = { ...updatedReactionsMap };
  }

  render() {
    return html`<div>
      ${this._isOpen
        ? html`<xui-reaction-sheet
            id="reaction-sheet"
            @sheetReactionClick=${this._reactionHandler}
          ></xui-reaction-sheet>`
        : ''}
      <div id="reactions-container" @listReactionClick=${this._reactionHandler}>
        <xui-reaction-trigger-button
          id="trigger-button"
          @click="${this._toggleOpen}"
          isDisabled=${this.isDisabled}
        ></xui-reaction-trigger-button>

        ${Object.values(this.reactionsMap).map(
          (reactionItem: ReactionData) =>
            html`<xui-reaction-list-button
              reactionIcon=${reactionItem.unicode}
              count=${reactionItem.count}
              reacted=${reactionItem.reacted}
              unicode=${reactionItem.unicode}
              name=${reactionItem.label}
            ></xui-reaction-list-button>`
        )}
      </div>
    </div>`;
  }
}
