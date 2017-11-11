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
