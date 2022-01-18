import { LightningElement, track } from "lwc";

export default class WelcomeModal extends LightningElement {
  @track displayModal = true;

  toggleModal() {
    this.displayModal = !this.displayModal;
  }
}
