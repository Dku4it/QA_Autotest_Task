import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('Checkout Suite', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('TestCase8: Valid Checkout', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const productName = await inventoryPage.getFirstItemName();
        const productPrice = await inventoryPage.getFirstItemPrice();
        await inventoryPage.addFirstItemToCart();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.clickCart();
        await expect(cartPage.cartItemName).toHaveText(productName);
        await expect(cartPage.cartItemPrice).toHaveText(productPrice);

        await cartPage.clickCheckout();
        await expect(browser).toHaveUrl(/checkout-step-one\.html/);
        await expect(checkoutPage.firstName).toBeDisplayed();
        await expect(checkoutPage.lastName).toBeDisplayed();
        await expect(checkoutPage.postalCode).toBeDisplayed();

        await checkoutPage.setRandomFirstName();

        await checkoutPage.setRandomLastName();

        await checkoutPage.setRandomZipCode();

        await checkoutPage.clickContinue();
        await expect(checkoutPage.overviewItemName).toHaveText(productName);
        await expect(checkoutPage.overviewItemPrice).toHaveText(productPrice);
        const itemTotalText = await checkoutPage.itemTotalLabel.getText();
        await expect(itemTotalText).toContain(productPrice);

        await checkoutPage.clickFinish();
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

        await checkoutPage.clickBackHome();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.cartBadge).not.toBeDisplayed();
    })

    it.skip('TestCase9: Checkout without products (functional not realised!)', async () => {
        // NOTE:
        // Expected result in test case does not match actual application behavior.
        // SauceDemo allows checkout with empty cart. 
        // It's not possible to create autotest without realised functional.
        // No "Cart is empty" message is displayed.
    })
})