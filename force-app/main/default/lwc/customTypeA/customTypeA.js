import { LightningElement, api, track } from 'lwc';

export default class CustomTypeA extends LightningElement {

    @api recordId;
    @api customValueA;

    @track options;
    value;

    connectedCallback(){
        console.log('CustomTypeA');
        this.options = this.customValueA;

    }

    fireCustomTypeA() {
        let newCustomValueA = this.customValueA + 1;
        const event = new CustomEvent('customtypea', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                recordId: this.recordId,
                newCustomValueA: newCustomValueA
            },
        });
        this.dispatchEvent(event);
    }
}