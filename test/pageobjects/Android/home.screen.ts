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
}

export default new HomePage();
