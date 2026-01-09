import { BasePage } from "./basePage"

export class CheckOutPage extends BasePage {


    get checkoutBtn() {
        return $('android=new UiSelector().text("CHECKOUT")')

    }
     get firstName() {
        return $('~test-First Name')

    }
     get lastName() {
        return $('~test-Last Name')

    }
     get zip() {
       return $('~test-Zip/Postal Code')

    }
     get continue() {
        return $('~test-CONTINUE')

    }

     get finish() {
        return $('~test-FINISH')

    }

     get successText() {
        return $('android=new UiSelector().text("Your order has been dispatched, and will arrive just as fast as the pony can get there!")')

    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click()

    }
     public async fillFirstName(name: string) {
        await this.firstName.waitForDisplayed({ timeout: 5000 });
        await this.firstName.setValue(name);
    }

    /**
     * Fill last name
     */
    public async fillLastName(name: string) {
        await this.lastName.waitForDisplayed({ timeout: 5000 });
        await this.lastName.setValue(name);
    }

    /**
     * Fill ZIP/Postal Code
     */
    public async fillZip(code: string) {
        await this.zip.waitForDisplayed({ timeout: 5000 });
        await this.zip.setValue(code);
    }

    /**
     * Click Continue
     */
    public async clickContinue() {
      
        await this.continue.click();
    }

    /**
     * Click Finish
     */
    public async clickFinish() {
      
        await this.finish.click();
    }

    /**
     * Verify success text is visible
     */
    public async isSuccessTextVisible(): Promise<boolean> {
        await this.successText.waitForDisplayed({ timeout: 5000 });
        return await this.successText.isDisplayed();
    }

    // --------------------------
    // Full form helper
    // --------------------------
    public async fillCheckoutForm(first: string, last: string, zipCode: string) {
        await this.fillFirstName(first);
        await this.fillLastName(last);
        await this.fillZip(zipCode);
        await this.clickContinue();
    }

}
export default new CheckOutPage()