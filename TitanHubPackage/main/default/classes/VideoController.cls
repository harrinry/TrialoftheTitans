public class VideoController {

	@AuraEnabled(cacheable=true)
    public static list<Video__c> getVideos()
    {
        List<Video__c> vids = new List<Video__c>();
        vids = [SELECT Name, YoutubeVideoLink__c, YoutubeThumbnailLink__c, IsCurrentVideo__c, Difficulty__c FROM Video__c];
    
	    return vids;
    }
}