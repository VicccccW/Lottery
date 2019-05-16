import { LightningElement, api } from 'lwc';

export default class BallButton extends LightningElement {
   @api ball;
   @api ballPoolLength;

   handleToggleClick() {
      const button = this.template.querySelector('button');

      if(button.classList.contains("slds-button_brand")) {
         button.classList.remove("slds-button_brand");
         button.classList.add("slds-button_neutral");
         this.dispatchEvent(new CustomEvent('removeball', { detail : button.value }));
      } else {
         button.classList.remove("slds-button_neutral");
         button.classList.add("slds-button_brand");
         this.dispatchEvent(new CustomEvent('addball', { detail : button.value }));
      }
   }

   @api 
   handleReset() {
      const button = this.template.querySelector('button');

      if(button.classList.contains("slds-button_neutral")) {
         button.classList.remove("slds-button_neutral");
         button.classList.add("slds-button_brand");
      }
   }
}