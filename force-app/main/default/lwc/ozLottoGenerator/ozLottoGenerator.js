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
        this.inclusion = this.ballNumbers;
        this.exclusion = [];

        const buttons = this.template.querySelectorAll('c-ball-button');
        buttons.forEach(button => {
            button.handleReset();
        });
    }

    addBallHandler(event) {
        const buttonValue = event.detail;
        this.inclusion.push(buttonValue);
        //this.exclusion = this.inclusion.filter(element => !this.ballNumbers.includes(element));
        this.exclusion.splice(this.exclusion.indexOf(buttonValue),1);
    }

    removeBallHandler(event) {
        const buttonValue = event.detail;
        this.exclusion.push(buttonValue);
        //this.inclusion = this.exclusion.filter(element => !this.ballNumbers.includes(element));
        this.inclusion.splice(this.inclusion.indexOf(buttonValue),1);

    }
}