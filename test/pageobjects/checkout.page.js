import { faker } from '@faker-js/faker';
import Page from './page.js';

class CheckoutPage extends Page {

    get firstName() { return $('[data-test="firstName"]'); }
    get lastName() { return $('[data-test="lastName"]'); }
    get postalCode() { return $('[data-test="postalCode"]'); }
    get continueBtn() { return $('[data-test="continue"]'); }
    get overviewItemName() { return $('.inventory_item_name'); }
    get overviewItemPrice() { return $('.inventory_item_price'); }
    get totalLabel() { return $('.summary_total_label'); } //
    get itemTotalLabel() { return $('.summary_subtotal_label'); }
    get finishBtn() { return $('[data-test="finish"]'); }
    get completeHeader() { return $('.complete-header'); }
    get backHomeBtn() { return $('[data-test="back-to-products"]'); }

    async clickContinue() { await this.continueBtn.click(); }

    async clickFinish() { await this.finishBtn.click(); }

    async clickBackHome() { await this.backHomeBtn.click(); }

    async setRandomFirstName() {
        const randomFirstName = faker.person.firstName();
        await this.firstName.setValue(randomFirstName);
        await expect(this.firstName).toHaveValue(randomFirstName);
    }

    async setRandomLastName() {
        const randomLastName = faker.person.lastName();
        await this.lastName.setValue(randomLastName);
        await expect(this.lastName).toHaveValue(randomLastName);
    }

    async setRandomZipCode() {
        const randomZipCode = faker.location.zipCode('#####');
        await this.postalCode.setValue(randomZipCode);
        await expect(this.postalCode).toHaveValue(randomZipCode);
    }

}
const checkoutPage = new CheckoutPage();
export default checkoutPage;