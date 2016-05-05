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

const BlinkDiff = require('blink-diff');

function diffImage(imageAPath, imageB, threshold, outputPath) {
  return new Promise((resolve, reject) => {
    var diff = new BlinkDiff({
      imageAPath: imageAPath, // Path
      imageB: imageB,         // Buffer
      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: threshold,
      imageOutputPath: outputPath
    });

    diff.run((err, result) => {
      if (err) {
        return reject(err);
      }
      var ifPassed = diff.hasPassed(result.code);
      console.log(ifPassed ? 'Image Comparison Passed' : 'Image Comparison Failed');
      console.log(`Found ${result.differences} pixel differences between two images.`);
      resolve(ifPassed);
    });
  });
}

module.exports = {
  diffImage
};
