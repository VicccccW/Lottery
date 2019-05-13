import { LightningElement, track } from 'lwc';

export default class OzLottoGenerator extends LightningElement {
    @track drawNumber;
    @track ballPool = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    @track luckyBalls = ["1", "2", "3", "4", "5", "6", "7"];
    allBalls = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

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
        this.ballPool = this.allBalls;
        //this.exclusion = [];
        this.luckBalls = [];

        //reset button
        const buttons = this.template.querySelectorAll('c-ball-button');
        buttons.forEach(button => {
            button.handleReset();
        });

        //reset generated balls

    }

    handleGenerator() {
        if(this.ballPool.length() > 6) {
            this.luckBalls = [];
            
            if() {
                this.luckBalls.push(this.ballPool.getRandomIndex());
            }
        } else {
            console.log("generator error");
        }
    }

    //error handling, if null/ undefined
    getRandomIndex() {
        return Math.floor(Math.random() * this.ballPool.length());
    }

    addBallHandler(event) {
        const buttonValue = event.detail;

        if(!this.ballPool.includesp(buttonValue)) {
            this.ballPool.push(buttonValue);

            console.log("ballPool -->" + this.ballPool);
        }
        //this.exclusion = this.ballPool.filter(element => !this.allBalls.includes(element));
    }

    removeBallHandler(event) {
        const buttonValue = event.detail;

        if(this.ballPool.includes(buttonValue)){
            this.ballPool.splice(this.ballPool.indexOf(buttonValue),1);

            console.log("ballPool -->" + this.ballPool);
        }
    }
}