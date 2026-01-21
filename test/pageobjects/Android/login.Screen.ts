
class LoginPage {
    get loginButton() {
        return $('//XCUIElementTypeButton[@name="Login"]');
    }
    get userName() {
        return $('-ios predicate string:type == "XCUIElementTypeTextField"');
    }
    get password() {
        return $('-ios predicate string:type == "XCUIElementTypeSecureTextField"');
    
    }
     get autoLogin() {
        return $('//XCUIElementTypeButton[@name="bob@example.com"]');
    
    }


    async doLogin() {
        await this.autoLogin.click();
        await this.loginButton.click();
        
    }
    async fillUsername() {
      
        await this.userName.waitForDisplayed({ timeout: 30000 });
        await this.userName.click();
        await this.userName.setValue("bob@example.com")
    }
    async fillPassword() {
        
        await this.password.waitForDisplayed({ timeout: 30000 });
        await this.password.click();
        await this.password.setValue("10203040")
    }

}

export default new LoginPage();
