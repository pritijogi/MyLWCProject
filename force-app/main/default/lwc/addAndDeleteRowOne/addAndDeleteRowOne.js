import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountControllerOne.createAccount';
import deleteAccount from '@salesforce/apex/AccountControllerOne.deleteAccount';

export default class AddAndDeleteRowOne extends LightningElement {
    @track Records = [];
    accName;
    accRating;
    accNumber;

    changeHandler(event) {
        if (event.target.label === 'Name') {
            this.accName = event.target.value;
        }
        if (event.target.label === 'Rating') {
            this.accRating = event.target.value;
        }
        if (event.target.label === 'Account Number') {
            this.accNumber = event.target.value;
        }
    }

    async addHandler() {
        try {
            const account = await createAccount({
                accName: this.accName,
                accIndustry: this.accRating, // Replace with Rating
                accPhone: this.accNumber, // Replace with Account Number
            });

            this.Records.push({
                id: account.Id,
                name: account.Name,
                rating: account.Industry, // Map Industry to Rating
                accountNumber: account.Phone, // Map Phone to Account Number
            });

            this.accName = '';
            this.accRating = '';
            this.accNumber = '';
        } catch (error) {
            console.error('Error creating account:', error);
        }
    }

    async deleteHandler(event) {
        const rowIndex = event.target.dataset.index;
        const accountId = this.Records[rowIndex].id;

        try {
            await deleteAccount({ accountId });
            this.Records.splice(rowIndex, 1);
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    }

    get disableDelete() {
        return this.Records.length === 1;
    }
}
