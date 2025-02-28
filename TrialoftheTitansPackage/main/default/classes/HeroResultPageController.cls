/////////////////////////////////////////////////////
//
//  Name: HeroResultPageController.cls
//  Author: Wootae Yang
//  Description: Controller used in HeroHubPackage/aura/HeroResultPage
//
///////////////////////////////////////////////////


public with sharing class HeroResultPageController {
    @AuraEnabled(cacheable=true)
    public static List<Exam_Result__c> getResultList(){
        return [SELECT Id, Exam__r.Titan__r.Name, Account__r.Name,
            Exam__r.Name, Exam__r.Titan__c, Score__c, Total_Correct__c, 
            Total_Answers__c, Pass__c 
            FROM Exam_Result__c
          WHERE Account__r.Name = 'Gladius Maximus']; 
    }


    //Need to run in user context for future implementations instead of hard coded
    @AuraEnabled(cacheable=true)
    public static List<String> getTitanList() {
        String[] result = new List<String>();
        for(Exam__c theExam : [
            SELECT Titan__r.Name 
            FROM Exam__c 
            WHERE Id 
            IN (SELECT Exam__c FROM Exam_Result__c WHERE Account__r.Name = 'Gladius Maximus')]) { 
            String name = theExam.Titan__r.Name;
            if(!result.contains(name))
            result.add(name);
        }
        return result;
    }
}
