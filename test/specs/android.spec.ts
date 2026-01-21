import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/Android/login.Screen'
import homePage from '../pageobjects/Android/home.screen'
import { hideKeyboardByReturnPredicate } from '../../utils/utilities';
import { ItemScreen } from '../pageobjects/Android/item.screen';
import { CheckoutPage } from '../pageobjects/Android/checkout';
import homeScreen from '../pageobjects/Android/home.screen';


beforeEach(async () => {
    // Launch / bring app to foreground

    await driver.activateApp('com.saucelabs.mydemo.app.ios');

});
afterEach(async () => {
    // Close app
    await driver.terminateApp('com.saucelabs.mydemo.app.ios');
});

describe('SuaceLabs Android App', () => {

    it('should open SuaceLab app', async () => {
        const state = await driver.queryAppState(
            'com.saucelabs.mydemo.app.ios'
        )
        expect(state).toBe(4) // RUNNING_IN_FOREGROUND
        // // await YoutubePage.isOpened()
        



    })

    it('should open SuaceLab app and Login', async () => {

        await homePage.clickMenuIcon();
        await homePage.clickLogin();
        await loginPage.doLogin();
        await homePage.firstItem.waitForDisplayed({ timeout: 30000 });
        await expect(await homePage.firstItem.isDisplayed()).toBeTruthy();
        // Assuming a text field is active and keyboard is open
       


    })

    it('Add to cart and checkout ', async () => {

        await homePage.clickMenuIcon();
        await homePage.clickLogin();
        await loginPage.doLogin();
        await homePage.firstItem.waitForDisplayed({ timeout: 30000 });
        expect(await homePage.firstItem.isDisplayed()).toBeTruthy();
        await homePage.clickFirstItem();
        await new ItemScreen().addItemToCart();
        await new CheckoutPage().clickCartIcon();
        await new CheckoutPage().proceedToCheckout();
        await new CheckoutPage().fillCountry();
        await new CheckoutPage().fillCity();
        await new CheckoutPage().fillZipCode();
        await new CheckoutPage().fillFullName();
        await new CheckoutPage().fillAddress();
        await driver.execute('mobile: tap', { x: 100, y: 100 });

        
        await new CheckoutPage().goToPayment();
    })

    it.only('Change Toggle', async () => {

        await homePage.clickMenuIcon();
        await homePage.clickLogin();
        await loginPage.doLogin();
        await homePage.swipeUpUntilVisible(homePage.swipeItem,3);



    })

    it('Swipe Up', async () => {




    })
    it('Swipe Up Down', async () => {


     


    })
    it('Swipe Left Right', async () => {


       


    })

    it('Allow Permission', async () => {




    })

    it('Webview Context Switch', async () => {


        


    })
})
