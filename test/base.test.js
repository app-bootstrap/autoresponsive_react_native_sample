/* ================================================================
 * autoresponsive_react_native_sample by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2015 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var path = require('path');

var appPath = path.resolve(process.env.APP_PATH);

var iOSOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  app: appPath
};

var androidOpts = {
  platformName: 'android',
  app: appPath
};

var wd = require('webdriver-client')(process.env.platform === 'android' ? androidOpts : iOSOpts);

describe('base', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.initPromiseChain();

  driver.configureHttp({
    timeout: 1200000
  });

  before(function() {
    return driver
      .initDriver();
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should login success', function() {
    return driver
      .sleep(1000);
  });
});
