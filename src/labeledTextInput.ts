import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('labeled-text-input')
class LabeledTextInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    label {
      display: flex;
      gap: 0.5em;
      border: 1px solid var(--c-border);
      border-radius: 0.5em;
      padding: 0.5em;

      & > span {
        display: block;
      }

      & > div {
        display: block;
        flex-grow: 1;
        overflow: hidden;

        & > input {
          margin: 0;
          padding: 0;
          background: none;
          border: none;
          border-radius: 0;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          font-size: inherit;
          width: 100%;
        }
      }
    }

    label:has(> input:focus) {
      outline: 1px solid black;
    }
  `;

  @property({ type: String })
  dirname?: string;

  @property({ type: Boolean })
  disabled?: boolean;

  @property({ type: Array })
  list?: string[];

  @property({ type: String })
  form?: string;

  @property({ type: String })
  name?: string;

  @property({ type: String })
  pattern?: string;

  @property({ type: String })
  placeholder?: string;

  @property({ type: Boolean })
  readonly?: boolean;

  @property({ type: Boolean })
  required?: boolean;

  @property({ type: Number })
  size?: number;

  @property({ type: String })
  value: string = '';

  handleInput(e: InputEvent) {
    const target = e.target;
    if(target === null) {
      return;
    }

    this.value = (target as HTMLInputElement).value;
    this.dispatchEvent(new Event('input'));
  }

  render() {
    return html`
      <label class="labeled-text-input">
        <span><slot></slot></span>
        <div>
          <input
            dirname=${this.dirname ?? nothing}
            disabled=${this.disabled ?? nothing}
            form=${this.form ?? nothing}
            name=${this.name ?? nothing}
            pattern=${this.pattern ?? nothing}
            placeholder=${this.placeholder ?? nothing}
            ?readonly=${this.readonly ?? nothing}
            ?required=${this.required ?? nothing}
            size=${this.size ?? nothing}
            .value=${this.value}
            @input=${this.handleInput}
            @change=${() => this.dispatchEvent(new Event('change'))}
          />
        </div>
      </label>
    `
  }
}

export default LabeledTextInput;
