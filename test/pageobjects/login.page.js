import { $ } from '@wdio/globals'
import Page from './page.js';


 // sub page containing specific selectors and methods for a specific page

class LoginPage extends Page {

// define selectors

    get userName() { return $('[data-test="username"]'); }
    get password() { return $('[data-test="password"]'); }
    get loginBtn() { return $('[data-test="login-button"]'); }
    get errorBox() { return $('[data-test="error"]'); }
    get Xicon1() { return $('#login_button_container > div > form > div:nth-child(1) > svg'); }
    get Xicon2() { return $('#login_button_container > div > form > div:nth-child(2) > svg'); }


// quick log in
    async login(user, pass) {
        await this.userName.setValue(user);
        await this.password.setValue(pass);
        await this.loginBtn.click();
    }

    
    open () {
        return super.open('');
    }
}

export default new LoginPage();
