import { LightningElement, track } from 'lwc';

export default class OzLottoGenerator extends LightningElement {
    @track drawNumber;
    //figure why cannot use @api
    @track exclusion = [];
    @track inclusion = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    ballNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    //TODO:
    checkType(event) {
        let drawNumber = event.target.value;
        console.log("entered draw number is " + drawNumber);
        //reportValidity
    }

    handleReset() {
        //clear input field 
        const inputElement = this.template.querySelector('lightning-input');
        inputElement.value = '';

        //reset property
        console.log("ballNumbers is " + this.ballNumbers);
        console.log("inclusion 1 is " + this.inclusion);

        this.inclusion = this.ballNumbers;
        console.log("inclusion 2 is " + this.inclusion);
        this.exclusion = [];
        console.log("exclusion is " + this.exclusion);

        //reset all ball buttons 
        const buttons = this.template.querySelectorAll('c-ball-button');
        console.log("buttons " + buttons);

        buttons.forEach(button => {
            console.log("b1" + button);

            if(button.classList.contains("slds-button_neutral")) {

                button.classList.remove("slds-button_neutral");
                button.classList.add("slds-button_brand");
            }
        });
    }

    addBallHandler(event) {
        const buttonValue = event.detail;
        this.inclusion.push(buttonValue);
        //this.exclusion = this.inclusion.filter(element => !this.ballNumbers.includes(element));
        this.exclusion.splice(this.exclusion.indexOf(buttonValue),1);
        console.log("inlcusion: " + this.inclusion);
        console.log("exclusion: " + this.exclusion);
    }

    removeBallHandler(event) {
        const buttonValue = event.detail;
        this.exclusion.push(buttonValue);
        //this.inclusion = this.exclusion.filter(element => !this.ballNumbers.includes(element));
        this.inclusion.splice(this.inclusion.indexOf(buttonValue),1);
        console.log("inlcusion: " + this.inclusion);
        console.log("exclusion: " + this.exclusion);
    }


    //handleToggleClick() {
        //console.log("code reach here");
        // const ballsInclude = Array.from(
        //         this.template.querySelectorAll('c-ball-button')
        //     )
        //     .filter(element => {
        //         return element.template.querySelectorAll('button')
        //     });
        
        // console.log("1ballsInclude" + ballsInclude);

        // this.inclusion = ballsInclude.join(', ');
        // console.log("2ballsInclude" + ballsInclude);
    //}

    //get ball list from Salesforce data
    //render this list, and catch 

    //use layout item to display 

    //generate a 7 ramdom number 
    //display 

    //generate 2 ramdom
    //display 

    //save button, save it as a salesforce record
}