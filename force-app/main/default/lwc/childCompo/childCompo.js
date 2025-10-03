import { LightningElement, api } from 'lwc';

export default class ChildCompo extends LightningElement {
    @api fullName;   // receives value from Parent
}
