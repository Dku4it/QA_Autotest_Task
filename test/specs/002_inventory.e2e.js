import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Inventory Suite', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('TestCase5: Saving the card after logout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        
        // 1 Click on the "Add to cart" button near any product
        // Expected: The number near the cart at the top right increase by 1, product is added to cart
        await inventoryPage.addBackpackToCart();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // 2 Click on the "Burger" button at the top left corner
        // Expected: Menu are expanded, 4 items are displayed
        await inventoryPage.clickBurgerMenu();
        await expect($$('.bm-item')).toBeElementsArrayOfSize(4);

        // 3 Click on the "Logout" button
        // Expected: User are redirecred to the "Login" page. "Username" and "Password" field are empty
        await inventoryPage.clickLogout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')  // Check URL
        await expect(loginPage.userName).toHaveValue('');
        await expect(loginPage.password).toHaveValue('');

        // 4 Login to the account using the same valid login and password
        // Expected: User is redirected to the inventory page. Products and cart are displayed
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL

        // 5 Click on the "Cart" button at the top right corner
        // Expected: Cart page is displayed, product are the same as was added at step 1
        await inventoryPage.clickCart();
        await expect(inventoryPage.cartItemName).toBeDisplayed();
        await expect(inventoryPage.cartItemName).toHaveText('Sauce Labs Backpack');

        // postcondition
        await inventoryPage.removeBackpackBtn.click();
        await expect(inventoryPage.cartBadge).not.toBeDisplayed();
    })

    it('TestCase6: Sorting', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL

        // 1 Choose one of the sorting options {1.Price (low to high), 2.Price (high to low), 3.Name (A to Z), 4. Name (Z to A)}
        // Expected: All products was sorted due choosed sorting
        await inventoryPage.sortBy('lohi');
        let prices = await inventoryPage.getPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            await expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]); // comparing
        }

        // 2 Repeat steps 1-2 till all sorting will be verified
        // Expected: All sorting option are working as expected
        await inventoryPage.sortBy('hilo');
        prices = await inventoryPage.getPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            await expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]); // comparing
        }
        await inventoryPage.sortBy('az');
        let names = await inventoryPage.getNames();
        let sortedNames = [...names].sort();    // create copy and sort
        await expect(names).toEqual(sortedNames);
        await inventoryPage.sortBy('za');
        names = await inventoryPage.getNames();
        sortedNames = [...names].sort().reverse();
        await expect(names).toEqual(sortedNames);
    })

    it('TestCase7: Footer Links', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        
        // 1 Click on the "Twitter" icon on the footer
        // Expected: Twitter of the company is opened on the new tab
        let mainWindow = await inventoryPage.openFooterLink(inventoryPage.icoTwitter);
        await expect(browser).toHaveUrl(/x\.com\/saucelabs/);
        await inventoryPage.closeNewTabAndReturn(mainWindow);
        await expect(browser).toHaveUrl(/inventory\.html/);

        // 2 Return to the main page and click on the "Facebook" icon on the footer
        // Expected: Facebook of the company is opened on the new tab
        mainWindow = await inventoryPage.openFooterLink(inventoryPage.icoFacebook);
        await expect(browser).toHaveUrl(/facebook\.com\/saucelabs/);
        await inventoryPage.closeNewTabAndReturn(mainWindow);
        await expect(browser).toHaveUrl(/inventory\.html/);

        // 3 Return to the main page and click on the "Linkedin" icon on the footer
        // Expected: Linkedin of the company is opened on the new tab
        mainWindow = await inventoryPage.openFooterLink(inventoryPage.icoLinkedIn);
        await expect(browser).toHaveUrl(/linkedin\.com\/company\/sauce-labs/);
        await inventoryPage.closeNewTabAndReturn(mainWindow);
        await expect(browser).toHaveUrl(/inventory\.html/);
    }) 
})