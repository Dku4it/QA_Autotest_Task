import Page from './page.js';

class LoginPage extends Page {

    get userName() { return $('[data-test="username"]'); }
    get password() { return $('[data-test="password"]'); }
    get loginBtn() { return $('[data-test="login-button"]'); }
    get errorBox() { return $('[data-test="error"]'); }
    get Xicon1() { return $('#login_button_container > div > form > div:nth-child(1) > svg'); }
    get Xicon2() { return $('#login_button_container > div > form > div:nth-child(2) > svg'); }

    async login(user, pass) {
        await this.userName.setValue(user);
        await this.password.setValue(pass);
        await this.loginBtn.click();
    }

    async open() { return super.open(''); }

    async enterUserName(userName) {
        await this.userName.setValue(userName);
        await expect(this.userName).toHaveValue(userName);
    }

    async enterPassword(password) {
        await this.password.setValue(password);
        await expect(this.password).toHaveValue(password);
        await expect(this.password).toHaveAttribute('type', 'password');
    }

    async clickLogin() { await this.loginBtn.click(); }

    async checkErrorStatus(errormsg) {
        await expect(this.Xicon1).toBeDisplayed();
        await expect(this.Xicon2).toBeDisplayed();
        await expect(this.userName).toHaveElementClass('input_error');
        await expect(this.password).toHaveElementClass('input_error');
        await expect(this.errorBox).toBeDisplayed();
        await expect(this.errorBox).toHaveText(errormsg);
    }












}

const loginPage = new LoginPage();
export default loginPage;
