import Page from './page.js';

class InventoryPage extends Page {

    //general
    get inventoryContainer() { return $('.inventory_container'); }
    get headerTitle() { return $('.title'); }
    //menu
    get menuBurger() { return $('#react-burger-menu-btn'); }
    get logout() { return $('[data-test="logout-sidebar-link"]'); }
    get menuItems() { return $$('.bm-item'); }
    //cart
    get cartBadge() { return $('[data-test="shopping-cart-badge"]'); }
    get cart() { return $('[data-test="shopping-cart-link"]'); }
    // products
    get btnAddBackpack() { return $('[data-test="add-to-cart-sauce-labs-backpack"]'); }
    get firstItemName() { return $$('[data-test="inventory-item-name"]')[0]; }
    get firstItemPrice() { return $$('[data-test="inventory-item-price"]')[0]; }
    get firstAddToCartBtn() { return $$('[data-test^="add-to-cart"]')[0]; }
    get sortContainer() { return $('[data-test="product-sort-container"]'); }
    get allItemPrices() { return $$('[data-test="inventory-item-price"]'); } // collect all prices
    get allItemNames() { return $$('[data-test="inventory-item-name"]'); }   // collect all names
    //footer
    get icoTwitter() { return $('[data-test="social-twitter"]'); }
    get icoFacebook() { return $('[data-test="social-facebook"]'); }
    get icoLinkedIn() { return $('[data-test="social-linkedin"]'); }

    async sortBy(value) { await this.sortContainer.selectByAttribute('value', value); }

    async getPrices() {
        return this.allItemPrices.map(async (el) => {
            const text = await el.getText();
            return parseFloat(text.replace('$', ''));
        });
    }

    async getNames() { return this.allItemNames.map(el => el.getText()); }

    async getFirstItemName() { return this.firstItemName.getText(); }

    async getFirstItemPrice() { return this.firstItemPrice.getText(); }

    async clickCart() { await this.cart.click(); }

    async clickBurgerMenu() { await this.menuBurger.click(); }

    async clickLogout() { await this.logout.click(); }

    async addBackpackToCart() { await this.btnAddBackpack.click(); }

    async addFirstItemToCart() { await this.firstAddToCartBtn.click(); }

    async checkSorting(option) {  // Options: 'lohi', 'hilo', 'az', 'za'
        await this.sortContainer.selectByAttribute('value', option);
        if (option === 'lohi' || option === 'hilo') {
            const prices = await this.getPrices();
            for (let i = 0; i < prices.length - 1; i++) {
                if (option === 'lohi') {
                    await expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
                } else {
                    await expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
                }
            }
        }
        else if (option === 'az' || option === 'za') {
            const names = await this.getNames();
            let sortedNames = [...names].sort();
            if (option === 'za') {
                sortedNames.reverse();
            }
            await expect(names).toEqual(sortedNames);
        }
        else { throw new Error(`[POM Error]: Invalid sorting option "${option}"`); }
    }

    async checkTwitterLink() { await this.#linkCheck(this.icoTwitter, /x\.com\/saucelabs/); }
    async checkFacebookLink() { await this.#linkCheck(this.icoFacebook, /facebook\.com\/saucelabs/); }
    async checkLinkedInLink() { await this.#linkCheck(this.icoLinkedIn, /linkedin\.com\/company\/sauce-labs/); }

    async #linkCheck(linkElement, expectedPattern) {
        const mainWindow = await browser.getWindowHandle();
        await linkElement.click();

        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        await expect(browser).toHaveUrl(expectedPattern);

        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);
        await expect(browser).toHaveUrl(/inventory\.html/);
    }
}
const inventoryPage = new InventoryPage();
export default inventoryPage;