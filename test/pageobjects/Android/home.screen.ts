import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    get firstItem() {
        return  $('-ios predicate string:label == "Sauce Labs Backpack - Black"');
    }

     get swipeItem() {
        return  $('-ios predicate string:name == "Sauce Labs Backpack - Violet"');
    }

    get menuIcon() {
        
        return  $('-ios predicate string:name == "Menu Icons"');
    }
    get logOut() {
        
        return  $('-ios predicate string:name == "LogOut-menu-item"');
    }
     get logIn() {
        
        return  $('-ios predicate string:name == "Login Button"');
    }
    
        
     get menu() {
        return $('~test-Menu');

    }
    get drawingSection() {
        return $('~test-DRAWING');

    }
    get toggleLayout() {
        return $('~test-Toggle');

    }

     get itemAfterToggle() {
        return $('android=new UiSelector().text("Test.allTheThings() T-Shirt (Red)")');

    }
    get allowPermission()
    {
        return $('id=com.android.permissioncontroller:id/permission_allow_one_time_button');

    }
    get QR_CODE()
    {
        return $('~test-QR CODE SCANNER')
    }
    get webView()
    {
        return $('~test-WEBVIEW')
    }
    get urlField()
    {
        return $('~test-enter a https url here...')
    }

    get gotoSite()
    {
        return $('~test-GO TO SITE')
    }

    async clickFirstItem() {
        await this.firstItem.click();
    }
    async clickMenuIcon() {
        await this.menuIcon.click();
    }
    async clickMenuBtn()
    {
        await this.menu.click()
    }
    async clickDrawingSection()
    {
        await this.drawingSection.click()
    }
    async clickLogin()
    {
        await this.logIn.click()
    }
    async clickLogOut()
    {
        await this.logOut.click()
    }
    async verifyChangedLayout()
    {
        await this.itemAfterToggle.waitForDisplayed({ timeout: 5000 });
        return await this.itemAfterToggle.isDisplayed();
    }
    async oneTimeAllowPermission()
    {
        await this.allowPermission.click();

    }

    async clickzOnQR_CODE()
    {
        await this.QR_CODE.click()
    }
      async clickWebView()
    {
        await this.webView.click()
    }
    async enterURL(url:string)
    {
        await this.urlField.setValue(url)
    }

     async clickGoTO()
    {
        await this.gotoSite.click()
    }
}

export default new HomePage();
