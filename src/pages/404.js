import { html } from 'lit-html';
import Page from '../page';
export default class NotFound extends Page {
  render() {
    return html` <div class="container mx-auto">
      <h1 class="text-2xl text-primary-500">404 not found</h1>
    </div>`;
  }
}
