import { LightningElement } from 'lwc';

export default class LectureNotes extends LightningElement {

    img = 'http://placehold.jp/3d4070/ffffff/500x500.png';
    isModalOpen = false;

    showModal(){
        this.isModalOpen = !this.isModalOpen;
    }
}