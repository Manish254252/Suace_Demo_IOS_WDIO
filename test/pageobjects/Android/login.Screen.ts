
class LoginPage {
    get loginButton() {
        return $('~test-LOGIN');
    }
    get userName() {
        return $('~test-Username');
    }
    get password() {
        return $('~test-Password');
    }


    async tapLogin() {
        await this.loginButton.waitForDisplayed({ timeout: 30000 });
        await this.loginButton.click();
    }
    async fillUsername() {
        await this.userName.waitForDisplayed({ timeout: 30000 });
        await this.userName.click();
        await this.userName.setValue("standard_user")
    }
    async fillPassword() {
        await this.password.waitForDisplayed({ timeout: 30000 });
        await this.password.click();
        await this.password.setValue("secret_sauce")
    }

}

export default new LoginPage();
