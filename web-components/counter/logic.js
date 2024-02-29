import { LitElement, html } from 'https://cdn.skypack.dev/lit-element'

export default class MyCounter extends LitElement {
  static properties = {
    counter: {type: Number}
  }

  constructor() {
    super()
    this.counter = 0
  }

  increment() {
    this.counter++
  }

  decrement() {
    this.counter--
  }

  render() {
    return html`
      <button @click="${this.decrement}"> - Decrement </button>
      <div>${this.counter}</div>
      <button @click="${this.increment}"> + Increment </button>
    `
  }
}

customElements.define('my-counter', MyCounter)