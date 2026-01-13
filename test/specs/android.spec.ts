import { expect } from '@wdio/globals'
import loginPage from '../pageobjects/Android/login.Screen'
import homePage from '../pageobjects/Android/home.screen'
import checkoutPage from '../pageobjects/Android/checkout.Page'

beforeEach(async () => {
    // Launch / bring app to foreground

    await driver.activateApp('com.swaglabsmobileapp');
});
afterEach(async () => {
    // Close app
    await driver.terminateApp('com.swaglabsmobileapp');
});

describe('SuaceLabs Android App', () => {

    it('should open SuaceLab app', async () => {
        const state = await driver.queryAppState(
            'com.swaglabsmobileapp'
        )
        expect(state).toBe(4) // RUNNING_IN_FOREGROUND
        // await YoutubePage.isOpened()
    })

    it('should open SuaceLab app and Login', async () => {

        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.clickAddToCartIcon()


    })

    it('Add to cart and checkout ', async () => {

        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.clickAddToCartIcon()

        await checkoutPage.clickCheckoutBtn()
        await checkoutPage.fillFirstName("Tester")
        await checkoutPage.fillLastName("Automator")
        await checkoutPage.fillZip("586554")
        await checkoutPage.clickContinue()
        await checkoutPage.clickFinish()
        await checkoutPage.isSuccessTextVisible()


    })

    it('Change Toggle', async () => {

        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();
        await homePage.changelayout()
        await homePage.verifyChangedLayout()


    })

    it('Swipe Up', async () => {


        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.swipe("up")


    })
    it('Swipe Up Down', async () => {


        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.swipe("up")
        await homePage.swipe("down")


    })
    it('Swipe Left Right', async () => {


        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.clickMenuBtn()
        await homePage.clickDrawingSection()

        // await homePage.swipe('up')
        await homePage.swipe("left", 1200)
        await homePage.swipe("right")


    })

    it('Allow Permission', async () => {


        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.clickMenuBtn()
        await homePage.clickzOnQR_CODE()
        await homePage.oneTimeAllowPermission()


    })

    it('Webview Context Switch', async () => {


        await loginPage.fillUsername();
        await loginPage.fillPassword();
        await loginPage.tapLogin();

        await homePage.tapAddToCartBtn()
        await homePage.clickMenuBtn()
        await homePage.clickWebView()
        await homePage.enterURL("www.google.com")
        await homePage.clickGoTO()
        await homePage.switchContext()
        expect(await driver.$("//*[text()='ALL']")).toBeDisplayed()


    })
})
