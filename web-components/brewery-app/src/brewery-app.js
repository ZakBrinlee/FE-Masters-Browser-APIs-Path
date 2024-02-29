import { LitElement, html, css } from 'lit';
import 'https://unpkg.com/@material/mwc-button?module';
import './brewery-template.js';

class BreweryApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 60em;
        margin-inline: auto;
        padding: 2rem;
      }
      ul {
        list-style-type: none;
        padding-left: 0;
      }
      li + li {
        border-top: 1px solid #ccc;
        margin-block: 1.5rem;
      }
    `
  }

  static get properties() {
    return {
      loading: { type: Boolean },
      breweries: { type: Array },
      filter: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this.loading = true;
    const response = await fetch('https://api.openbrewerydb.org/breweries/search?query=minneapolis');
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html` <p>Loading...</p> `;
    }

    const totalVisited = this.breweries.filter(b => b.visited).length;
    const totalNotVisited = this.breweries.length - totalVisited;
    const breweries = this.breweries.filter(brewery => {
      if (!this.filter) {
        return true;
      }
      return this.filter === 'visited' ? brewery.visited : !brewery.visited;
    });

    return html`
      <h1>Breweries App</h1>

      <h2>Breweries</h2>
      <p>(${totalVisited} visited and ${totalNotVisited} still to go)</p>

      <mwc-button @click=${() => {this.filter = null}}>Filter none</mwc-button>
      <mwc-button @click=${() => {this.filter = 'visited'}}>Filter visited</mwc-button>
      <mwc-button @click=${() => {this.filter = 'not-visited'}}>Filter not-visited</mwc-button>

      <ul>
        ${breweries.map(
          brewery => html`
            <li>
              <brewery-template
                .brewery="${brewery}"
                .toggleVisitedStatus=${() => this.toggleVisitedStatus(brewery)}>
              </brewery-template>
            </li>
          `,
        )}
      </ul>
    `;
  }

  toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery => brewery === breweryToUpdate
      ? { ...brewery, visited: !brewery.visited }
      : brewery);
  }
}

customElements.define('brewery-app', BreweryApp);