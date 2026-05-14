import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Checkout Suite', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('TestCase8: Valid Checkout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        const randomFirstName = await inventoryPage.getRandomFirstName();
        const randomLastName = await inventoryPage.getRandomLastName();
        const randomZipCode = await inventoryPage.getRandomZipCode();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        // 1 Click on the "Add to cart" button near any product
        // Expected: Number near the cart at the top right increase by 1, product is added to cart
        const productName = await inventoryPage.firstItemName.getText();
        const productPrice = await inventoryPage.firstItemPrice.getText();
        await inventoryPage.addFirstItemToCart();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // 2 Click on the "Cart" button at the top right corner
        // Expected: Cart page is displayed, product are the same as was added at step 1
        await inventoryPage.clickCart();
        await expect(inventoryPage.cartItemName).toHaveText(productName);
        await expect(inventoryPage.cartItemPrice).toHaveText(productPrice);

        // 3 Click on the "Checkout" button
        // Expected: Checkout form are displayed
        await inventoryPage.checkoutBtn.click();
        await expect(browser).toHaveUrl(/checkout-step-one\.html/);
        await expect(inventoryPage.firstName).toBeDisplayed();
        await expect(inventoryPage.lastName).toBeDisplayed();
        await expect(inventoryPage.postalCode).toBeDisplayed();

        // 4 Fill the "First Name" field with valid data - Any random First Name
        // Expected: Data is entered to the field
        await inventoryPage.firstName.setValue(randomFirstName);
        await expect(inventoryPage.firstName).toHaveValue(randomFirstName);

        // 5 Fill the "Second Name" field with valid data - Any random Second Name
        // Expected: Data is entered to the field
        await inventoryPage.lastName.setValue(randomLastName);
        await expect(inventoryPage.lastName).toHaveValue(randomLastName);

        // 6 Fill the "Postal Code" field with valid data - Any random Postal Code
        // Expected: Data is entered to the field
        await inventoryPage.postalCode.setValue(randomZipCode);
        await expect(inventoryPage.postalCode).toHaveValue(randomZipCode);

        // 7 Click on the "Continue" button
        // Expected: User is redirected to the "Overview" page, Products from step 1 is displayed. Total price = price of products from step 1
        await inventoryPage.continueBtn.click();
        await expect(inventoryPage.overviewItemName).toHaveText(productName);
        await expect(inventoryPage.overviewItemPrice).toHaveText(productPrice);
        const itemTotalText = await inventoryPage.itemTotalLabel.getText();
        await expect(itemTotalText).toContain(productPrice);

        // 8 Click on the "Finish" button
        // Expected: User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed
        await inventoryPage.finishBtn.click();
        await expect(inventoryPage.completeHeader).toHaveText('Thank you for your order!');

        // 9 Click on the "Back Home" button
        // Expected: User is redirected to the inventory page. Products are displayed. Cart is empty
        await inventoryPage.backHomeBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.cartBadge).not.toBeDisplayed();
    })

    it.skip('TestCase9: Checkout without products (functional not realised!)', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        // 1 Click on the "Cart" button at the top right corne
        // Expected: Cart page is displayed, products are not displayed
        await inventoryPage.clickCart();
        const cartItems = await $$('.cart_item');
        await expect(cartItems.length).toBe(0);

        // 2 Click on the "Checkout" button
        // Expected: User are located on the "Cart" Page, error message "Cart is empty" is displayed
        await inventoryPage.checkoutBtn.click();
        await expect(browser).toHaveUrl(/checkout-step-one\.html/);

        // NOTE:
        // Expected result in test case does not match actual application behavior.
        // SauceDemo allows checkout with empty cart. 
        // It's not possible to create autotest without realised functional.
        // No "Cart is empty" message is displayed.
    })
})