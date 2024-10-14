import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sheetIconMap } from '../sheet/icons.ts';
import { classMap } from 'lit/directives/class-map.js';

@customElement('xui-reaction-list-button')
export class ReactionTriggerButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }
    button {
      height: 32px;
      width: auto;
      background-color: var(--xui-reaction-trigger-bg-color, #fafafa);
      border: 1px solid #cccccc;
      border-radius: 40px;
      padding: 0;
      font-size: 12px;

      color: var(--xui-reaction-trigger-icon-base-color, #484848);
    }
    button:not(:disabled) {
      &:hover {
        cursor: pointer;
        color: var(--xui-reaction-trigger-icon-hover-color, #027baf);
      }
    }

    button:disabled {
      color: var(--xui-reaction-trigger-disabled, #828282);
    }

    button.clicked {
      backgrounc-color: var(--xui-reaction-trigger-clicked-bg-color, #e9f7fc);
      border-color: var(--xui-reaction-trigger-clicked-border-color, #027baf);
    }

    #icon-wrapper {
      height: 16px;
      width: 16px;
      margin-right: 4px;
    }

    svg {
      width: 100%;
      height: auto;
    }

    #reaction-wrapper {
      margin: 4px 9px;
      display: flex;
      align-items: center;
    }
  `;

  @property({ type: String })
  name: string = 'Select a reaction';

  @property({ type: String })
  reactionIcon!: string;

  @property({ type: Number })
  count!: number;

  @property({ type: Boolean })
  reacted = false;

  render() {
    const classes = { clicked: this.reacted };

    return html`<button
      type="button"
      class=${classMap(classes)}
      aria-label=${this.name}
    >
    <span id="reaction-wrapper">
      <span id="icon-wrapper"
        >${
          sheetIconMap[this.reactionIcon as keyof typeof sheetIconMap].svg
        }</span
      ><span>${this.count}</span><span>
    </button>`;
  }
}
