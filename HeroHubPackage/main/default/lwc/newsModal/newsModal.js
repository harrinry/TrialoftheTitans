import { LightningElement, track } from "lwc";

export default class NewsModal extends LightningElement {
  @track hasViewedNews = false;
  @track hasViewedWelcome = true;

  toggleModal() {
    this.hasViewedNews = true;
  }
}
