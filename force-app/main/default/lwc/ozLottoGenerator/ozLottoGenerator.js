import { LightningElement, track, wire } from 'lwc';
import getOZLottoBallList from '@salesforce/apex/BallPoolController.getOZLottoBallList';

export default class OzLottoGenerator extends LightningElement {
    @track drawNumber = []; //store string number 
    @track allBalls = []; //store promise object
    @track error;
    @track ballPool = []; //store number string
    @track luckyBalls = []; //store number string
    @track ballPoolLength = ballPool.length; //used in child button components 

    @wire(getOZLottoBallList)
    wiredBallPool({ error, data }) {
        if (data) {
            this.allBalls = data;
            data.forEach(element => this.ballPool.push(element.Name));
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
                this.allBalls = [];
                result.forEach(element => this.allBalls.push(element));
                this.ballPool = [];
                result.forEach(element => this.ballPool.push(element.Name));
                this.luckyBalls = [];
            })
            .catch(error => {
                this.error = error;
                console.log("handle reset err");
            });

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
    }


    //TODO: if there is only 7 button left, prevent user from remove more button.
    removeBallHandler(event) {

        if(this.ballPool.length > 6) {
            const buttonValue = event.detail;

            if(this.ballPool.includes(buttonValue)){
                this.ballPool.splice(this.ballPool.indexOf(buttonValue),1);
            }
        } else {
            console.log("Ball Pool is less than 7.");
        }
    }

    //change the style of the number want to exclude slogan style

    //TODO: css color yellow balls

    //TODO: a Save button to save generated records to Salesforce, a custom objects

    //TODO: similar to OUA's component, a collaspe

    //TODO: new component, search for draw and display the numbers and complementray numbers in the side panel

    //TODO: a component displaying past 10 draws statistics, numbers appearing and number never appear in these draws 

    //TODO: a button to allow user enter a specific range of the data lake, like a 滑动条， apex will get the data and render

    //a custom object to store the saved value of the generated balls

    //a aws database to store the value 

    //a api for allow to retrieve the value 

    //a salesforce method to get these value for external database, upsert, scheduled once a week

    //a refresh button to impretatively call the apex callout and update the data and front end



}