import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Login Suite', () => {

    it('TestCase1: Valid Login', async () => {
        await loginPage.open()

        await loginPage.enterUserName('standard_user');

        await loginPage.enterPassword('secret_sauce');

        await loginPage.clickLogin();
        await expect(inventoryPage.inventoryContainer).toBeDisplayed()
        await expect(inventoryPage.headerTitle).toHaveText('Products')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    it('TestCase2: Login with invalid password', async () => {
        await loginPage.open();

        await loginPage.enterUserName('standard_user');

        await loginPage.enterPassword('wrong123');

        await loginPage.clickLogin();
        await loginPage.checkErrorStatus('Epic sadface: Username and password do not match any user in this service');
    });

    it('TestCase3: Login with locked out test login', async () => {
        await loginPage.open();

        await loginPage.enterUserName('locked_out_user');

        await loginPage.enterPassword('secret_sauce');

        await loginPage.clickLogin();
        await loginPage.checkErrorStatus(/Sorry, this user has been locked out/i);
    });

    it('TestCase4: Logout', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.clickBurgerMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);

        await inventoryPage.clickLogout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(loginPage.userName).toHaveValue('');
        await expect(loginPage.password).toHaveValue('');
    })
})