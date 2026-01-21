
import path = require("path");

export const config: WebdriverIO.Config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/', // Appium 2.x

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
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone 17',              // Simulator name
        'appium:platformVersion': '26.2',             // Simulator iOS version
        'appium:udid': process.env.SIM_UDID || '7F38DA72-BA59-458D-B586-E8FC3805657E',        // From `xcrun simctl list devices`
        
        'appium:app': 'apps/My Demo App.app', // .app file for simulator
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:wdaLaunchTimeout': 120000,
        'appium:newCommandTimeout': 300,
    }],

    connectionRetryTimeout: 300000,
   
    connectionRetryCount: 3,

    mochaOpts: {
        timeout: 120000
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
