import { LitElement, html, css } from 'lit';
import 'https://unpkg.com/@material/mwc-button?module';

class BreweryTemplate extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      .check {
        position: absolute;
        left: -1.5rem;
      }
    `
  }

  static get properties() {
    return {
      brewery: { type: Object },
      toggleVisitedStatus: {},
    };
  }

  render() {
    return html`
      <span class="check">${this.brewery.visited ? '✅' : ''}</span>
      <h3> ${this.brewery.name}</h3>
      <p><a href="${this.brewery.website_url}">${this.brewery.website_url}</a></p>
      <mwc-button @click=${this.toggleVisitedStatus}>
        Mark as ${this.brewery.visited ? 'not-visited' : 'visited'}
      </mwc-button>
  `;
  }
}

customElements.define('brewery-template', BreweryTemplate);