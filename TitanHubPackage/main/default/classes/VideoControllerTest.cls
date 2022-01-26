@isTest
public class VideoControllerTest {
    @isTest private static void testGetVideos()
    {
        Video__c vid = new Video__c(Name = 'test1', YoutubeThumbnailLink__c = 'linkTest', YoutubeVideoLink__c = 'vidTest', Difficulty__c = 'Beginner');

        insert vid;
        
        List<Video__c> vidList = new List<Video__c>();
        
        vidList = VideoController.getVideos();
        
        System.assertEquals(vid.Name, vidList[0].Name);
        System.assertNotEquals('failure', vidList[0].Name);
    }
}