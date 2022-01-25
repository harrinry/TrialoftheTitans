import { LightningElement } from 'lwc';

export default class LectureNotes extends LightningElement {

    img = 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/data_security/data_security_records/images/cac30d566a68bfc4a34f3b9607be2a66_record-access-triangle.png';
    isModalOpen = false;

    showModal(){
        this.isModalOpen = !this.isModalOpen;
    }
}