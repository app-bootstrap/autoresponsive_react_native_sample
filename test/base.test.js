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

var fs = require('fs');
var path = require('path');

var diffImage = require('./utils.js').diffImage;

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
    timeout: 500 * 60 * 1000
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

  it('#1 login picture should be the same.', function() {
    return driver
      .sleep(10000)
      .waitForElementByName('autoresponsive')
      .takeScreenshot()
      .then(imgData => {
        var newImg = new Buffer(imgData, 'base64');
        var screenshotFolder = path.resolve(__dirname, '../screenshot');
        var oldImgPath = path.join(screenshotFolder, process.env.platform === 'android' ? 'android.png' : 'ios.png');
        var diffImgPath = path.join(screenshotFolder, process.env.platform === 'android' ? 'android-diff.png' : 'ios-diff.png');
        return diffImage(oldImgPath, newImg, 0.1, diffImgPath);
      })
      .then(result => {
        result.should.be.true();
      })
  });
});
