import { driver } from "@wdio/globals";

export class CheckoutPage {
    get cartIcon() {
        return $(`~Cart-tab-item`);
    }
    get checkoutButton() {
        return $(`~ProceedToCheckout`);
    }
    get fullNameField() {
        return $(`-ios predicate string: value == "Rebecca Winter"`);
    }
    get addressField() {
        return $(`-ios predicate string:value == "Mandorley 112"`);
    }
    get cityField() {
        return $(`-ios predicate string:value == "Truro"`);
    }   
    get zipCodeField() {
        return $(`-ios predicate string:value == "89750"`);
    }
    get countryField() {
        return $(`-ios predicate string:value == "United Kingdom"`);
    }
    get toPayMentButton() {
        return $(`//XCUIElementTypeButton[@name="To Payment"]`);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
    async clickCartIcon() {
        await this.cartIcon.click();
    }
    async fillFullName(name: string='John Doe') {
        // await this.fullNameField.click();
        await this.fullNameField.setValue(name);
        await browser.keys('Return');   
        await driver.pause(5000)
    }

    async fillAddress(address: string='123 Main St') {
        // await this.addressField.click();
        await this.addressField.setValue(address);
        await browser.keys('Return');   
        await driver.pause(5000)
    }
    
    async fillCity(city: string='Anytown') {
        await this.cityField.click();
        await this.cityField.setValue(city);
        await browser.keys('Return');   
        await driver.pause(5000)
    }   
    async fillZipCode(zip: string='12345') {
        await this.zipCodeField.click();
        await this.zipCodeField.setValue(zip);
        await browser.keys('Return');   
        await driver.pause(5000)
    }
    async fillCountry(country: string='USA') {
        await this.countryField.click();
        await this.countryField.setValue(country);
        await browser.keys('Return');   
        await driver.pause(5000)
    }
    async goToPayment() {
        await this.toPayMentButton.click();
    }
}