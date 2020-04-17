import { html } from 'lit-html';
import App from '../app';
export default class NotFound extends App {
  render() {
    return html` <div class="container mx-auto">
      <h1 class="text-2xl text-primary-500">404 not found</h1>
    </div>`;
  }
}
