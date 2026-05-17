import Page from './page.js';

class CartPage extends Page {

    get cartItemName() { return $('[data-test="inventory-item-name"]'); }
    get cartItemPrice() { return $('.inventory_item_price'); }
    get removeBackpackBtn() { return $('[data-test="remove-sauce-labs-backpack"]'); }
    get checkoutBtn() { return $('[data-test="checkout"]'); }

    async clickRemoveBackpack() { await this.removeBackpackBtn.click(); }
    async clickCheckout() { await this.checkoutBtn.click(); }

}
const cartPage = new CartPage();
export default cartPage;