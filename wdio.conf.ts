export const config: WebdriverIO.Config = {
    runner: 'local',

    // 🔑 Appium 2.x base path
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',   // ❗ NOT /wd/hub

    specs: ['./test/specs/**/*.ts'],

    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                logLevel: 'info',
            }
        }]
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',

        // APK
        'appium:app': 'apps/SauceLabs.app.2.7.1.apk',
        'appium:appActivity': '.MainActivity',


        // Stability flags
        'appium:autoGrantPermissions': true,
        'appium:ignoreHiddenApiPolicyError': true,
        'appium:noReset': true,
        'appium:fullReset': false,

        // ⏱ CI-safe timeouts
        'appium:adbExecTimeout': 180000,                     // 3 minutes
        'appium:uiautomator2ServerInstallTimeout': 300000,   // 5 minutes
        'appium:newCommandTimeout': 300,
    }],

    connectionRetryTimeout: 300000,
    connectionRetryCount: 3,

    mochaOpts: {
        timeout: 120000 // 2 minutes per test
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
};
