import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Inventory Suite', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('TestCase5: Saving the card after logout', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.addBackpackToCart();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.clickBurgerMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);

        await inventoryPage.clickLogout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(loginPage.userName).toHaveValue('');
        await expect(loginPage.password).toHaveValue('');

        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.clickCart();
        await expect(cartPage.cartItemName).toBeDisplayed();
        await expect(cartPage.cartItemName).toHaveText('Sauce Labs Backpack');

        await cartPage.clickRemoveBackpack();
        await expect(inventoryPage.cartBadge).not.toBeDisplayed();
    })

    it('TestCase6: Sorting', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.checkSorting('lohi');
        await inventoryPage.checkSorting('hilo');
        await inventoryPage.checkSorting('az');
        await inventoryPage.checkSorting('za');
    })

    it('TestCase7: Footer Links', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.checkTwitterLink();

        await inventoryPage.checkFacebookLink();

        await inventoryPage.checkLinkedInLink();
    })
})