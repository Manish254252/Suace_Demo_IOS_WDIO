exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || '**********',
  key: process.env.BROWSERSTACK_ACCESS_KEY || '***********',
  services: [
    [
      'browserstack',
      {
        accessibility: false,
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: true,
        opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-repo" },
        // for ios
        app: process.env.BROWSERSTACK_APP_PATH || './examples/BStackSampleApp.ipa',
        testObservability: true,
        testObservabilityOptions: {
          buildTag: ['bstack_sample'],
        }
      }
    ]
  ],
  capabilities: [{
    'bstack:options': {
      deviceName: 'iPhone 14 Pro Max',
      platformVersion: '16',
      platformName: 'ios',
    }
  }, {
    'bstack:options': {
      deviceName: 'iPhone XS',
      platformVersion: '15',
      platformName: 'ios',
    } }, {
    'bstack:options': {
      deviceName: 'iPhone 11',
      platformVersion: '14',
      platformName: 'ios',
    }
  }],
  commonCapabilities: {
    'bstack:options': {
      projectName: "BrowserStack Samples",
      buildName: 'browserstack build',
      sessionName: 'BStack parallel webdriverio-appium',
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0'
    }
  },
  maxInstances: 10,
  updateJob: false,
  specs: [
    'test/specs/**.spec.ts'
  ],
  exclude: [],
  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps:any){
  for(let key in exports.config.commonCapabilities)
    caps[key] = { ...caps[key], ...exports.config.commonCapabilities[key]};
});