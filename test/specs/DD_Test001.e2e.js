import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('SauceDemo Test Suite', () => {



    it('TestCase1: Valid Login', async () => {
        // Precondition: User is on the login page
        await LoginPage.open()
        

        // 1 Enter valid login into Login field "standard_user"
        // Expected: Data is entered to the field
        await LoginPage.userName.setValue('standard_user');
        await expect(LoginPage.userName).toHaveValue('standard_user');


        // 2 Enter valid password into Password field "secret_sauce"
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await LoginPage.password.setValue('secret_sauce');
        await expect(LoginPage.password).toHaveValue('secret_sauce');
        await expect(LoginPage.password).toHaveAttribute('type', 'password');


        // 3 Click "Login" button
        // Expected: User is redirected to the inventory page. Products and cart are displayed
        await LoginPage.loginBtn.click();
        await expect(InventoryPage.inventoryContainer).toBeDisplayed()
        await expect(InventoryPage.headerTitle).toHaveText('Products')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })



    it('TestCase2: Login with invalid password', async () => {
        // Precondition: User is on the login page
        await LoginPage.open();


        // 1 Enter valid login into Login field "standard_user"
        // Expected: Data is entered to the field
        await LoginPage.userName.setValue('standard_user');
        await expect(LoginPage.userName).toHaveValue('standard_user');


        // 2 Enter invalid password into "Password" field
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await LoginPage.password.setValue('wrong123');
        await expect(LoginPage.password).toHaveValue('wrong123');
        await expect(LoginPage.password).toHaveAttribute('type', 'password');


        // 3 Click "Login" button
        // Expected: "X" icons are displayed on the "Login" and "Password" fields, the fields are highlighted with red. 
        // "Epic sadface: Username and password do not match any user in this service" error message is displayed"
        await LoginPage.loginBtn.click();

        await expect(LoginPage.Xicon1).toBeDisplayed();  // "X" icon1 is displayed
        await expect(LoginPage.Xicon2).toBeDisplayed();  // "X" icon2 is displayed

        await expect(LoginPage.userName).toHaveElementClass('input_error');  // Red underline
        await expect(LoginPage.password).toHaveElementClass('input_error');  // Red underline

        await expect(LoginPage.errorBox).toBeDisplayed(); // Error message displayed
        await expect(LoginPage.errorBox).toHaveText('Epic sadface: Username and password do not match any user in this service'); // MSG
    });



    it('TestCase3: Login with locked out test login', async () => {
        // Precondition: User is on the login page
        await LoginPage.open();


        // 1 Enter valid login into Login field "locked_out_user"
        // Expected: Data is entered to the field
        await LoginPage.userName.setValue('locked_out_user');
        await expect(LoginPage.userName).toHaveValue('locked_out_user');


        // 2 Enter valid password into Password field "secret_sauce"
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await LoginPage.password.setValue('secret_sauce');
        await expect(LoginPage.password).toHaveValue('secret_sauce');
        await expect(LoginPage.password).toHaveAttribute('type', 'password');


        // 3 Click "Login" button
        // Expected: "X" icons are displayed on the "Login" and "Password" fields, the fields are highlighted with red. 
        // "Epic sadface: Sorry, this user has been locked out" error message is displayed"
        await LoginPage.loginBtn.click();

        await expect(LoginPage.Xicon1).toBeDisplayed();  // "X" icon1 is displayed
        await expect(LoginPage.Xicon2).toBeDisplayed();  // "X" icon2 is displayed

        await expect(LoginPage.userName).toHaveElementClass('input_error');  // Red underline
        await expect(LoginPage.password).toHaveElementClass('input_error');  // Red underline

        await expect(LoginPage.errorBox).toBeDisplayed(); // Error message displayed
        await expect(LoginPage.errorBox).toHaveText(/Sorry, this user has been locked out/i); // MSG partial
    });


    it('TestCase4: Logout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        

        // 1 Click on the Burger button at the top left corner
        // Expected: Menu is expanded, 4 items are displayed
        await InventoryPage.menuBurger.click();
        await expect($$('.bm-item')).toBeElementsArrayOfSize(4);
        

        // 2 Click on the "Logout" button
        // Expected: User are redirecred to the Login page, "Username" and "Password" field are empty
        await InventoryPage.Logout.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')  // Check URL

        await expect(LoginPage.userName).toHaveValue('');
        await expect(LoginPage.password).toHaveValue('');
    })



    it('TestCase5: Saving the card after logout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        

        // 1 Click on the "Add to cart" button near any product
        // Expected: The number near the cart at the top right increase by 1, product is added to cart
        await InventoryPage.btnAddBackpack.click();
        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText('1');
        

        // 2 Click on the "Burger" button at the top left corner
        // Expected: Menu are expanded, 4 items are displayed
        await InventoryPage.menuBurger.click();
        await expect($$('.bm-item')).toBeElementsArrayOfSize(4);


        // 3 Click on the "Logout" button
        // Expected: User are redirecred to the "Login" page. "Username" and "Password" field are empty
        await InventoryPage.Logout.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')  // Check URL

        await expect(LoginPage.userName).toHaveValue('');
        await expect(LoginPage.password).toHaveValue('');


        // 4 Login to the account using the same valid login and password
        // Expected: User is redirected to the inventory page. Products and cart are displayed
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL


        // 5 Click on the "Cart" button at the top right corner
        // Expected: Cart page is displayed, product are the same as was added at step 1
        await InventoryPage.cart.click();
        await expect(InventoryPage.cartItemName).toBeDisplayed();
        await expect(InventoryPage.cartItemName).toHaveText('Sauce Labs Backpack');


        // postcondition
        await InventoryPage.removeBackpackBtn.click();
        await expect(InventoryPage.cartBadge).not.toBeDisplayed();
    })



    it('TestCase6: Sorting', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL


        // 1 Choose one of the sorting options {1.Price (low to high), 2.Price (high to low), 3.Name (A to Z), 4. Name (Z to A)}
        // Expected: All products was sorted due choosed sorting
        await InventoryPage.sortContainer.selectByAttribute('value', 'lohi');

        let prices = await Promise.all(await InventoryPage.allItemPrices.map(async (el) => {
            const text = await el.getText();
            return parseFloat(text.replace('$', '')); // turn to num
        }));

        for (let i = 0; i < prices.length - 1; i++) {
            await expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]); // comparing
        }


        // 2 Repeat steps 1-2 till all sorting will be verified
        // Expected: All sorting option are working as expected
        await InventoryPage.sortContainer.selectByAttribute('value', 'hilo');
        prices = await Promise.all(await InventoryPage.allItemPrices.map(async (el) => {
            const text = await el.getText();
            return parseFloat(text.replace('$', '')); // turn to num
        }));
        for (let i = 0; i < prices.length - 1; i++) {
            await expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]); // comparing
        }

        await InventoryPage.sortContainer.selectByAttribute('value', 'az');
        let names = await Promise.all(await InventoryPage.allItemNames.map(el => el.getText()));
        let sortedNames = [...names].sort();    // create copy and sort
        await expect(names).toEqual(sortedNames);

        await InventoryPage.sortContainer.selectByAttribute('value', 'za');
        names = await Promise.all(await InventoryPage.allItemNames.map(el => el.getText()));
        sortedNames = [...names].sort().reverse();
        await expect(names).toEqual(sortedNames);
    })



    it('TestCase7: Footer Links', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        const mainWindow = await browser.getWindowHandle();
        

        // 1 Click on the "Twitter" icon on the footer
        // Expected: Twitter of the company is opened on the new tab
        await InventoryPage.icoTwitter.click();
        let handles = await browser.getWindowHandles(); // take all tabs
        await browser.switchToWindow(handles[1]); // switch to tab 2 (index 1)
        await expect(browser).toHaveUrl(/x\.com\/saucelabs/); // check URL with Containing
        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);


        // 2 Return to the main page and click on the "Facebook" icon on the footer
        // Expected: Facebook of the company is opened on the new tab
        await InventoryPage.icoFacebook.click();
        handles = await browser.getWindowHandles(); // take all tabs
        await browser.switchToWindow(handles[1]); // switch to tab 2 (index 1)
        await expect(browser).toHaveUrl(/facebook\.com\/saucelabs/); // check URL with Containing
        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);


        // 3 Return to the main page and click on the "Linkedin" icon on the footer
        // Expected: Linkedin of the company is opened on the new tab
        await InventoryPage.icoLinkedIn.click();
        handles = await browser.getWindowHandles(); // take all tabs
        await browser.switchToWindow(handles[1]); // switch to tab 2 (index 1)
        await expect(browser).toHaveUrl(/linkedin\.com\/company\/sauce-labs/); // check URL with Containing
        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);
    }) 



    it('TestCase8: Valid Checkout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        
        // 1 Click on the "Add to cart" button near any product
        // Expected: Number near the cart at the top right increase by 1, product is added to cart
        const productName = await InventoryPage.firstItemName.getText();
        const productPrice = await InventoryPage.firstItemPrice.getText();
        
        await InventoryPage.firstAddToCartBtn.click();
        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText('1');


        // 2 Click on the "Cart" button at the top right corner
        // Expected: Cart page is displayed, product are the same as was added at step 1
        await InventoryPage.cart.click();
        await expect(InventoryPage.cartItemName).toHaveText(productName);
        await expect(InventoryPage.cartItemPrice).toHaveText(productPrice);


        // 3 Click on the "Checkout" button
        // Expected: Checkout form are displayed
        await InventoryPage.checkoutBtn.click();
        await expect(browser).toHaveUrl(/checkout-step-one\.html/);
        await expect(InventoryPage.firstName).toBeDisplayed();
        await expect(InventoryPage.lastName).toBeDisplayed();
        await expect(InventoryPage.postalCode).toBeDisplayed();


        // 4 Fill the "First Name" field with valid data - Any random First Name
        // Expected: Data is entered to the field
        await InventoryPage.firstName.setValue('John');
        await expect(InventoryPage.firstName).toHaveValue('John');


        // 5 Fill the "Second Name" field with valid data - Any random Second Name
        // Expected: Data is entered to the field
        await InventoryPage.lastName.setValue('Smith');
        await expect(InventoryPage.lastName).toHaveValue('Smith');


        // 6 Fill the "Postal Code" field with valid data - Any random Postal Code
        // Expected: Data is entered to the field
        await InventoryPage.postalCode.setValue('12345');
        await expect(InventoryPage.postalCode).toHaveValue('12345');


        // 7 Click on the "Continue" button
        // Expected: User is redirected to the "Overview" page, Products from step 1 is displayed. Total price = price of products from step 1
        await InventoryPage.continueBtn.click();
        await expect(InventoryPage.overviewItemName).toHaveText(productName);
        await expect(InventoryPage.overviewItemPrice).toHaveText(productPrice);
        // check total price
        const itemTotalText = await InventoryPage.itemTotalLabel.getText();
        await expect(itemTotalText).toContain(productPrice);


        // 8 Click on the "Finish" button
        // Expected: User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed
        await InventoryPage.finishBtn.click();
        await expect(InventoryPage.completeHeader).toHaveText('Thank you for your order!');

        // 9 Click on the "Back Home" button
        // Expected: User is redirected to the inventory page. Products are displayed. Cart is empty
        await InventoryPage.backHomeBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        
        await expect(InventoryPage.cartBadge).not.toBeDisplayed();
    })



    it('TestCase9: Checkout without products (functional not realised!)', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        

        // 1 Click on the "Cart" button at the top right corne
        // Expected: Cart page is displayed, products are not displayed
        await InventoryPage.cart.click();
        const cartItems = await $$('.cart_item');
        await expect(cartItems.length).toBe(0);


        // 2 Click on the "Checkout" button
        // Expected: User are located on the "Cart" Page, error message "Cart is empty" is displayed
        await InventoryPage.checkoutBtn.click();
        await expect(browser).toHaveUrl(/checkout-step-one\.html/);

        // NOTE:
        // Expected result in test case does not match actual application behavior.
        // SauceDemo allows checkout with empty cart. 
        // It's not possible to create autotest without realised functional.
        // No "Cart is empty" message is displayed.
     })    
})