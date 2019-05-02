import { LightningElement, track } from 'lwc';

export default class OzLottoGenerator extends LightningElement {
    @track inputDrawNumber = "enter a number";

    //TODO:
    checkType(event) {
        let inputDrawNumber = event.target.value;
        console.log("entered draw number is " + inputDrawNumber);
        //reportValidity
    }


}