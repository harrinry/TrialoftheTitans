import { LightningElement, track, api, wire } from "lwc";
import getViewedWeekly from "@salesforce/apex/modalHelper.getViewedWeekly";
import getViewedWelcome from "@salesforce/apex/modalHelper.getViewedWelcome";
import closeNewsModal from "@salesforce/apex/modalHelper.closeNewsModal";
import closeWelcomeModal from "@salesforce/apex/modalHelper.closeWelcomeModal";
import Id from '@salesforce/user/Id';

import { 
  subscribe, 
  unsubscribe, 
  APPLICATION_SCOPE,
  createMessageContext,
  MessageContext
} from 'lightning/messageService';

import NOTIFICATION from "@salesforce/messageChannel/Notification__c";


export default class WelcomeModal extends LightningElement {
  // Variables needed to make the Modals display correctly with conditional logic
  @track hasViewedNews;
  @track hasViewedWelcome;
  @track error;

  // Variables for displaying dynamic messages for each user. Should pull value from LMS when complete. 
  @wire(MessageContext) messageContext;
  subscription = null;

    @track squadNews;
    @track cohortNews;
    @track leagueNews;
    @track questNews;

    // Squad News
    @api squadBest;
    @api squadBestScore;
    @api userSquad;
    

    // Cohort News
    @api bestSquad;
    @api bestSquadTeam;
    @api bestSquadScore;
    @api scoreDifference;
    @api userSquadScore; // Potentially unneeded if LMS passes the already calculated difference.

    // League News
    @api bestTeam;
    @api bestTeamWins;
    @api userTeam;
    @api userTeamWins;
    @api weeksRemaining;
    @api activeCohorts;

    // Quests
    @api bonusQuest;
    @api bonusMulitplier;


  // connectedCallback calls when the LWC is connected to the experience site and runs our getters for hasViewedNews and hasViewedWelcome
  connectedCallback(){ 
    

    this.subscribeMC();

    /* Arrow functions to call getViewedWeekly and getViewedWelcome, passing in the current user's ID. 
       These can not be called in the builder, and can only be tested by a proper user account.
       If they run, it sets the results. If it fails, it sets the error and logs it to console.
    */
    getViewedWeekly({userID: Id})
    .then(result => {
      this.hasViewedNews = result;
      this.error = undefined;
    })
    .catch(error => {
      console.log(result)
      this.error = error;
      console.log(this.error);
    });


    getViewedWelcome({userID: Id})
    .then(result => {this.hasViewedWelcome = result;
    })
    .catch(error => console.log(result));

    

  }

  // closeWelcome is called when the welcome Modal is closed, and calls the Apex Method to set the checkbox.
  closeWelcome() {
    this.hasViewedWelcome = true;
    closeWelcomeModal({userID: Id})
    .then(result => console.log(result))
    .catch(error => console.log(error));

  }

  // closeNews is called when the news Modal is closed, and calls the Apex Method to set the checkbox.
  closeNews(){
    this.hasViewedNews = true;
    closeNewsModal({userID: Id})
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  disconnectedCallback(){
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  subscribeMC(){
    if(this.subscription){
      return;
    } else{
      this.subscription = subscribe(
        this.messageContext,
        NOTIFICATION,
        (message) => {
          this.handleMessage(message);
        },
        {scope: APPLICATION_SCOPE}
      )
    }
  }

  handleMessage(message) {
    // With LMS these are to take the message and pull the respective values into the correct variables.
    this.squadBest = "Tester Testerson";
    this.squadBestScore = 999;
    this.userSquad = "Hapsburg Hopefuls";

    this.bestSquad = "Data Warriors";
    this.bestSquadTeam = "Vanquish";
    this.bestSquadScore = 5037;
    this.userSquadScore = 4360;
    this.scoreDifference = this.bestSquadScore - this.userSquadScore;

    this.bestTeam = "Vanquish";
    this.bestTeamWins = 34;
    this.userTeam = "Alchemy";
    this.userTeamWins = 25;
    this.weeksRemaining = 1;
    this.activeCohorts = 30;

    this.bonusQuest = "Proskero (Process Automation)";
    this.bonusMulitplier = "doubled";



    // Concatenate the variables into the news messages.
    this.squadNews = this.squadBest + " is leading the squad, " + this.userSquad + ", for this week with a total score of " + this.squadBestScore + "ar!";
    this.cohortNews = this.bestSquad + " squad of Team " + this.bestSquadTeam + " is leading the cohort with a combined score of " + this.bestSquadScore + "ar!" + "\n \n Your Squad, " + this.userSquad + ", is " + this.scoreDifference + "ar behind!";
    this.leagueNews = "Team " + this.bestTeam + " leads the league with " + this.bestTeamWins + " cohort victories. \n \nYour team, " + this.userTeam + ", is " + (this.bestTeamWins-this.userTeamWins) + " behind! There are " + this.weeksRemaining + " more weeks in this league, with " + this.activeCohorts + " ongoing cohorts.";
    this.questNews = "This week Arete gain from " + this.bonusQuest + " is " + this.bonusMulitplier;
  }
}
