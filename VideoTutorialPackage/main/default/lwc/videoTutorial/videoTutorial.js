import { LightningElement, track, wire } from 'lwc';
import Left_Arrow from '@salesforce/resourceUrl/arrow_left_large';
import Right_Arrow from '@salesforce/resourceUrl/arrow_right_large';
import getVideos from '@salesforce/apex/VideoController.getVideos';

export default class VideoTutorial extends LightningElement {
    
    right = Right_Arrow;
    left = Left_Arrow;

    currentFirstSlotNumber = 0;
    imagesToDisplay = 3;

    // @wire(getVideos) fullList;
    fullList = [];
    @track arrayList = [];

    @track customCarouselImages = [];

    connectedCallback()
    {
        this.init();
    }

    async init()
    {
        try{
            this.fullList = await getVideos();
        } 
        catch (error){
            console.log(error);
        }
        finally{
            this.fullList.forEach(element => {
                let temp = {
                    youtubeURL: element.YoutubeVideoLink__c,
                    bool: false,
                    youtubeThumbnail: element.YoutubeThumbnailLink__c,
                    title: element.Name
                };
                this.arrayList.push(temp);
            });
            this.arrayList[0].bool = true;
            for(let i = 0; i < this.imagesToDisplay; ++i)
            {
                this.customCarouselImages.push(this.arrayList[i]);
            }
        }
    }

    selectVideo(event)
    {
        // console.table(JSON.stringify(this.arrayList));
        let newElement = this.arrayList.find(ele => ele.youtubeThumbnail == event.target.dataset.thumb);
        let currentElement = this.arrayList.find(ele => ele.bool == true);

        currentElement.bool = false;
        newElement.bool = true;
    }

    plusSlides(event)
    {
        if(this.currentFirstSlotNumber + 1 <= this.arrayList.length)
        {
            this.currentFirstSlotNumber += 1;
        }
        else{
            this.currentFirstSlotNumber = 0;
        }
        this.moveCarousel();
    }
    
    minusSlides(event)
    {
        if(this.currentFirstSlotNumber - 1 >= 0)
        {
            this.currentFirstSlotNumber -= 1;
        }
        else{
            this.currentFirstSlotNumber = this.arrayList.length - 1;
        }
        this.moveCarousel();
    }

    moveCarousel()
    {
        for (let index = 0; index < this.imagesToDisplay; ++index) 
        {
            let newLocation = this.currentFirstSlotNumber + index;
            if(this.currentFirstSlotNumber + index < this.arrayList.length)
            {
                this.customCarouselImages[index] = this.arrayList[newLocation];
            }
            else
            {
                this.customCarouselImages[index] = this.arrayList[newLocation - this.arrayList.length];
            }
        }
    }
}