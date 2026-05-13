import Page from './page.js';

class InventoryPage extends Page {

    //general
    get inventoryContainer () { return $('.inventory_container'); }
    get headerTitle () { return $('.title'); }
    //menu
    get menuBurger () { return $('#react-burger-menu-btn'); }
    get logout () { return $('[data-test="logout-sidebar-link"]'); }
    //cart
    get cartBadge () { return $('[data-test="shopping-cart-badge"]'); }
    get cart () { return $('[data-test="shopping-cart-link"]'); }
    // products
    get btnAddBackpack () { return $('[data-test="add-to-cart-sauce-labs-backpack"]'); }
    get firstItemName () { return $$('[data-test="inventory-item-name"]')[0]; }
    get firstItemPrice () { return $$('[data-test="inventory-item-price"]')[0]; }
    get firstAddToCartBtn () { return $$('[data-test^="add-to-cart"]')[0]; }
    //cart page
    get cartItemName () { return $('[data-test="inventory-item-name"]'); } // name in the cart
    get cartItemPrice () { return $('.inventory_item_price'); } // price in the cart
    get removeBackpackBtn () { return $('[data-test="remove-sauce-labs-backpack"]');}
    // checkout
    get checkoutBtn () { return $('[data-test="checkout"]'); }
    get firstName () { return $('[data-test="firstName"]'); }
    get lastName () { return $('[data-test="lastName"]'); }
    get postalCode () { return $('[data-test="postalCode"]'); }
    get continueBtn () { return $('[data-test="continue"]'); }
    //overviev
    get overviewItemName () { return $('.inventory_item_name'); }
    get overviewItemPrice () { return $('.inventory_item_price'); }
    get totalLabel () { return $('.summary_total_label'); } //
    get itemTotalLabel () { return $('.summary_subtotal_label'); }
    get finishBtn () { return $('[data-test="finish"]'); }
    // complete
    get completeHeader () { return $('.complete-header'); }
    get backHomeBtn () { return $('[data-test="back-to-products"]'); }
    //sorting
    get sortContainer () { return $('[data-test="product-sort-container"]'); }
    get allItemPrices () { return $$('[data-test="inventory-item-price"]'); } // collect all prices
    get allItemNames () { return $$('[data-test="inventory-item-name"]'); }   // collect all names
    //footer
    get icoTwitter () { return $('[data-test="social-twitter"]'); }
    get icoFacebook () { return $('[data-test="social-facebook"]'); }
    get icoLinkedIn () { return $('[data-test="social-linkedin"]'); }
    async sortBy(value) {
    await this.sortContainer.selectByAttribute('value', value);
}

async getPrices() {
    return this.allItemPrices.map(async (el) => {
        const text = await el.getText();
        return parseFloat(text.replace('$', ''));
    });
}

async getNames() {
    return this.allItemNames.map(el => el.getText());
}

async openFooterLink(linkElement) {
    const mainWindow = await browser.getWindowHandle();
    await linkElement.click();
    await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    return mainWindow;
}

async closeNewTabAndReturn(mainWindow) {
    await browser.closeWindow();
    await browser.switchToWindow(mainWindow);
}

async clickCart() {
    await this.cart.click();
}

async clickBurgerMenu() {
    await this.menuBurger.click();
}

async clickLogout() {
    await this.logout.click();
}

async addBackpackToCart() {
    await this.btnAddBackpack.click();
}
async addFirstItemToCart() {
    await this.firstAddToCartBtn.click();
}
}
const inventoryPage = new InventoryPage();
export default inventoryPage;