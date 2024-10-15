import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import './trigger-button/trigger-button.ts';
import './sheet/sheet.ts';
import './list-button/list-button.ts';

import { sheetIconMap } from './sheet/icons.ts';

interface ReactionData {
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
    }

    #reactions-container {
      display: grid;
      grid-template-columns: var(--xui-reaction-trigger-button-width, 40px) repeat(
          var(--xui-reaction-max-columns, 13),
          minmax(var(--xui-reaction-list-button-max-width, 47px), auto)
        );
      gap: 4px;
    }
  `;

  @query('#trigger-button', true)
  private _triggerButton!: HTMLButtonElement;

  @state()
  private _isOpen = false;

  @state()
  private _reactionsMap: Record<string, ReactionData> = {
    'U+1F923': {
      count: 2,
      unicode: 'U+1F923',
      name: 'joy',
      label: 'Rolling on floor laughing',
      reacted: false,
    },
    'U+1F973': {
      count: 1,
      unicode: 'U+1F973',
      name: 'celebrate',
      label: 'Celebrate face',
      reacted: true,
    },
    'U+1F914': {
      count: 10,
      unicode: 'U+1F914',
      name: 'thinking',
      label: 'Thinking face',
      reacted: true,
    },
  };

  @property()
  set reactionsMap(val: Record<string, ReactionData>) {
    this._reactionsMap = val;
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

  private _reactionHandler(
    e: CustomEvent<{ unicode: string; source: string }>
  ) {
    const { unicode, source } = e.detail;

    if (source === 'sheet') {
      this._toggleOpen();
      this._handleFocus();
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
