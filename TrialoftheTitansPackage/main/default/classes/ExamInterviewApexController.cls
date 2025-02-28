/**
 * @name              :  Exam Interview Apex Controller
 * @description       :  Controller for our Exam Interview component.This will be      pulling the exam and questions for display in Exam.
 * @author            : Jayvious Williams
 * @group             : 
 * @last modified on  : 10-03-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   2021-06-26   Jayvious Williams   Initial Version
**/

public class ExamInterviewApexController {
    // loads exam questions usind examID
    @AuraEnabled(cacheable=true)
    public static List<Exam_Question__c> examFinder(String examID){
        List<Exam_Question__c> theExam = [SELECT Question_Text__c, Question_Type__c, Options__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Titan__c != null];
        //exam = theExam[0].Exam__c;
        return theExam;  
    }

    // insert hero answers using answered exam questions
    @AuraEnabled
    public static void submitExam(String examId, String acctId){
        System.debug('submitted exam');
        System.debug(examId);
        // inserts exam related to the hero that took it and updates the exam result
        //Exam__c submittedExam = [SELECT Id FROM Exam__c WHERE Id = :examId LIMIT 1];
       
        //Account account = [SELECT Id FROM Account WHERE Name = 'Gladius Maximus' LIMIT 1];
       // System.debug(account);
       
        List<Exam_Result__c> examResult = [SELECT Id FROM Exam_Result__c WHERE Account__c = :acctId AND Status__c = 'Assigned' AND Exam__c = :examId];
        
        if(examResult!=null && examResult.size()>0){
            System.debug(examResult[0]);
            Exam_Result__c myExamResult = (Exam_Result__c) examResult[0];
            myExamResult.Status__c = 'Completed';
            update myExamResult;
        }
    }

    // created a new list of hero answers that is the same size as the amount of questions
    @AuraEnabled
    public static void submitAnswers(List<Exam_Question__c> examQuestionList, Map<String, String> examAnswerList, String examId){
        System.debug('submit answers in apex controller');
        System.debug(examQuestionList);
        System.debug(examQuestionList.size());
        System.debug(examQuestionList[0]);
        System.debug(examAnswerList.keySet());
        System.debug(examAnswerList.size());
        List<Exam_Result__c> myExamList =[SELECT Id FROM Exam_Result__c ORDER BY lastModifiedDate DESC LIMIT 1];
        Exam_Result__c myExam;
        if (myExamList.size()>0){
            myExam=myExamList[0];
        }
        // creates and populates a list of hero answers that are the same size as the number of wuestions
        List<Hero_Answer__c> heroAnswers = new List<Hero_Answer__c>();
        for(integer i=0; i<examQuestionList.size(); i++){
           Hero_Answer__c myHeroAnswer =new Hero_Answer__c(Exam_Question__c=examQuestionList[i].Id, Answer_Choice__c=examAnswerList.get(String.valueOf(i+1)));
          
            
            myHeroAnswer.Exam_Result__c =myExam.Id;
            
           if(myHeroAnswer.Answer_Choice__c == examQuestionList[i].Correct_Answer_s__c){
                myHeroAnswer.Correct__c = true;
            }
            heroAnswers.add(myHeroAnswer);
            
        }
        insert heroAnswers; 
        //this needs to be reworked
        //Exam_Result__c examId = [SELECT Id FROM Exam_Result__c ORDER BY lastModifiedDate DESC LIMIT 1];
        // fills out fields for each hero answer in the hero aanswers list
        //for(integer i=0; i<heroAnswers.size(); i++){
           // heroAnswers[i].Exam_Question__c = examQuestionList[i].Id;
            //heroAnswers[i].Answer_Choice__c = examAnswerList.get(String.valueOf(i+1));
            //heroAnswers[i].Exam_Result__c = examId.Id;
            // if(ExamQuestionList[i].Question_Type__c == 'Multiple Choice - multiple answers') {
            //     //system.debug(examQuestionList[i]);
            //     Set<String> heroSet = new Set<String>(heroAnswers[i].Answer_Choice__c.split('||'));
            //     //system.debug(heroAnswers);
            //     Set<String> answerSet = new Set<String>(examQuestionList[i].Correct_Answer_s__c.split('||'));
            //     //system.debug(answerSet);
            //     if(heroSet.Equals(answerSet)){
            //         heroAnswers[i].Correct__c = true;
            //     }
            // }
            // else if(heroAnswers[i].Answer_Choice__c == examQuestionList[i].Correct_Answer_s__c){
            //     heroAnswers[i].Correct__c = true;
                
            // }
            
       // }
       
    }    
}
