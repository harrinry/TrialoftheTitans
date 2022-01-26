import { LightningElement, track } from "lwc";

export default class NewsModal extends LightningElement {
    @track displayModal = false;

    toggleModal() {
        this.displayModal = !this.displayModal;
    }
}
