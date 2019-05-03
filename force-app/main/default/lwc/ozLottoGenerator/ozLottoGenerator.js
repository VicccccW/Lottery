import { LightningElement, track } from 'lwc';

export default class OzLottoGenerator extends LightningElement {
    @track inputDrawNumber = "enter a number";
    variant = "brand";

    //TODO:
    checkType(event) {
        let inputDrawNumber = event.target.value;
        console.log("entered draw number is " + inputDrawNumber);
        //reportValidity
    }

    handleToggleClick() {
        console.log("variant is " + this.variant);

        let variant = this.variant;

        if(variant === 'brand') {
            this.variant = 'Neutral';
        } else {
            this.variant = 'brand';
        }
    }


}