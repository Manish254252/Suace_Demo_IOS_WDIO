import { BasePage } from "./basePage";

class HomePage extends BasePage {
    get addToCart() {
        return $('android=new UiSelector().text("ADD TO CART")');

    }

    get cartIcon() {

        return $('//android.view.ViewGroup[@content-desc="test-Cart"]//android.widget.ImageView');
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

    async tapAddToCartBtn() {
        await this.addToCart.click();
    }
    async clickAddToCartIcon() {
        await this.cartIcon.click();
    }
    async clickMenuBtn()
    {
        await this.menu.click()
    }
    async clickDrawingSection()
    {
        await this.drawingSection.click()
    }
    async changelayout()
    {
        await this.toggleLayout.click()
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
