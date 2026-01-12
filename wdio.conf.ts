export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    path: '/wd/hub',
    specs: ['./test/specs/**/*.ts'],

    services: ['appium'],


    // capabilities: [{


    //     platformName: 'Android',
    //     // 'appium:deviceName': '98cefeb9 ',
    //     'appium:deviceName': 'emulator-5554',
    //     'appium:automationName': 'UiAutomator2',

    //     'appium:appPackage': 'com.swaglabsmobileapp',
    //     'appium:appActivity': 'com.swaglabsmobileapp.SplashActivity',

    //     // 🔑 APK PATH
    //     'appium:app': 'apps/SauceLabs.app.2.7.1.apk',
    //     // 🔑 FIX
    //     "appium:ignoreHiddenApiPolicyError": true,


    //     'appium:noReset': false,   // reinstall app every run
    //     'appium:fullReset': true,

    // }],
    capabilities: [{

        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        "appium:automationName": 'UiAutomator2',
        "appium:app": 'apps/SauceLabs.app.2.7.1.apk',

        // Increase timeouts
        "appium:adbExecTimeout": 60000,               // 60s for ADB commands like install/uninstall
        "appium:uiautomator2ServerInstallTimeout": 120000,  // 120s for UiAutomator2 server install
        "appium:newCommandTimeout": 300,

    }],
    mochaOpts: {
        timeout: 90 * 1000 // 60 seconds
    },

    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],


}
