import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Login Suite', () => {

    it('TestCase1: Valid Login', async () => {
        // Precondition: User is on the login page
        await loginPage.open()

        // 1 Enter valid login into Login field "standard_user"
        // Expected: Data is entered to the field
        await loginPage.enterUserName('standard_user');
        await expect(loginPage.userName).toHaveValue('standard_user');

        // 2 Enter valid password into Password field "secret_sauce"
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await loginPage.enterPassword('secret_sauce');
        await expect(loginPage.password).toHaveValue('secret_sauce');
        await expect(loginPage.password).toHaveAttribute('type', 'password');

        // 3 Click "Login" button
        // Expected: User is redirected to the inventory page. Products and cart are displayed
        await loginPage.clickLogin();
        await expect(inventoryPage.inventoryContainer).toBeDisplayed()
        await expect(inventoryPage.headerTitle).toHaveText('Products')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    it('TestCase2: Login with invalid password', async () => {
        // Precondition: User is on the login page
        await loginPage.open();

        // 1 Enter valid login into Login field "standard_user"
        // Expected: Data is entered to the field
        await loginPage.enterUserName('standard_user');
        await expect(loginPage.userName).toHaveValue('standard_user');

        // 2 Enter invalid password into "Password" field
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await loginPage.enterPassword('wrong123');
        await expect(loginPage.password).toHaveValue('wrong123');
        await expect(loginPage.password).toHaveAttribute('type', 'password');

        // 3 Click "Login" button
        // Expected: "X" icons are displayed on the "Login" and "Password" fields, the fields are highlighted with red. 
        // "Epic sadface: Username and password do not match any user in this service" error message is displayed"
        await loginPage.clickLogin();
        await expect(loginPage.Xicon1).toBeDisplayed();  // "X" icon1 is displayed
        await expect(loginPage.Xicon2).toBeDisplayed();  // "X" icon2 is displayed
        await expect(loginPage.userName).toHaveElementClass('input_error');  // Red underline
        await expect(loginPage.password).toHaveElementClass('input_error');  // Red underline
        await expect(loginPage.errorBox).toBeDisplayed(); // Error message displayed
        await expect(loginPage.errorBox).toHaveText('Epic sadface: Username and password do not match any user in this service'); // MSG
    });

    it('TestCase3: Login with locked out test login', async () => {
        // Precondition: User is on the login page
        await loginPage.open();

        // 1 Enter valid login into Login field "locked_out_user"
        // Expected: Data is entered to the field
        await loginPage.enterUserName('locked_out_user');
        await expect(loginPage.userName).toHaveValue('locked_out_user');

        // 2 Enter valid password into Password field "secret_sauce"
        // Expected: Data is entered to the field, data is reprresented as dots instead of characters
        await loginPage.enterPassword('secret_sauce');
        await expect(loginPage.password).toHaveValue('secret_sauce');
        await expect(loginPage.password).toHaveAttribute('type', 'password');

        // 3 Click "Login" button
        // Expected: "X" icons are displayed on the "Login" and "Password" fields, the fields are highlighted with red. 
        // "Epic sadface: Sorry, this user has been locked out" error message is displayed"
        await loginPage.clickLogin();
        await expect(loginPage.Xicon1).toBeDisplayed();  // "X" icon1 is displayed
        await expect(loginPage.Xicon2).toBeDisplayed();  // "X" icon2 is displayed
        await expect(loginPage.userName).toHaveElementClass('input_error');  // Red underline
        await expect(loginPage.password).toHaveElementClass('input_error');  // Red underline
        await expect(loginPage.errorBox).toBeDisplayed(); // Error message displayed
        await expect(loginPage.errorBox).toHaveText(/Sorry, this user has been locked out/i); // MSG partial
    });

    it('TestCase4: Logout', async () => {
        // Precondition: User is on the logined into account. User is on the inventory page
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  // Check URL
        
        // 1 Click on the Burger button at the top left corner
        // Expected: Menu is expanded, 4 items are displayed
        await inventoryPage.clickBurgerMenu();
        await expect($$('.bm-item')).toBeElementsArrayOfSize(4);
        
        // 2 Click on the "Logout" button
        // Expected: User are redirecred to the Login page, "Username" and "Password" field are empty
        await inventoryPage.clickLogout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')  // Check URL
        await expect(loginPage.userName).toHaveValue('');
        await expect(loginPage.password).toHaveValue('');
    })
})