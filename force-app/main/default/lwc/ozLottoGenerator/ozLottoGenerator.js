import { LightningElement, track, wire } from 'lwc';
import getOZLottoBallList from '@salesforce/apex/BallPoolController.getOZLottoBallList';

export default class OzLottoGenerator extends LightningElement {
    @track drawNumber;
    @track allBalls;
    @track error;
    @track ballPool = ["1", "2", "3", "4", "5", "6", "7"];
    @track luckyBalls = []; //TODO: add if ture, false in html

    @wire(getOZLottoBallList)
    wiredBallPool({ error, data }) {
        if (data) {
            this.allBalls = data;
            this.error = undefined;
        } else if (error) {
            this.allBalls = undefined;
            this.error = error;
        }
    }

    //TODO:
    checkType(event) {
        let drawNumber = event.target.value;
        console.log("entered draw number is " + drawNumber);
        //reportValidity
    }

    //this handleReset() is different from the button.handleReset();
    handleReset() {
        //clear input field 
        const inputElement = this.template.querySelector('lightning-input');
        inputElement.value = null;

        //reset property
        getOZLottoBallList()
            .then(result => {
                this.allBalls = result;
            })
            .catch(error => {
                this.error = error;
            })

        //reset button
        const buttons = this.template.querySelectorAll('c-ball-button');
        buttons.forEach(button => button.handleReset());
    }

    handleGenerator() {
        
        if(this.ballPool.length > 6) {
            this.luckyBalls = [];

            let indexArr = this.getRandomIndexArray(this.ballPool.length);

            indexArr.forEach(element => this.luckyBalls.push(this.ballPool[element]));
        } else {
            console.log("handleGenerator error");
        }
    }

    //get a random array for lucky ball array index
    getRandomIndexArray(ballPoolLength) {
        const indexArr = [];

        while(indexArr.length < 7){
            let r = Math.floor(Math.random() * ballPoolLength);

            if(indexArr.indexOf(r) === -1) {
                indexArr.push(r);
            }
        }

        return indexArr;
    }

    addBallHandler(event) {
        const buttonValue = event.detail;

        if(!this.ballPool.includes(buttonValue)) {
            this.ballPool.push(buttonValue);
        }
        //this.exclusion = this.ballPool.filter(element => !this.allBalls.includes(element));
        console.log("ball pool is add" + this.ballPool);
    }


    //TODO: if there is only 7 button left, prevent user from remove more button.
    removeBallHandler(event) {
        const buttonValue = event.detail;

        if(this.ballPool.includes(buttonValue)){
            this.ballPool.splice(this.ballPool.indexOf(buttonValue),1);
        }
        console.log("ball pool is remove" + this.ballPool);
    }

    //TODO: logic for 2 complementry balls

    //TODO: css color for green and yellow balls

    //TODO: a Save button to save generated records to Salesforce, a custom objects

    //TODO: similar to OUA's component, a collaspe

}