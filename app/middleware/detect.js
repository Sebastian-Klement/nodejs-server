const MobileDetect = require("mobile-detect");

exports.detect = function (requestObject) {
  mobileDetectd = new MobileDetect(requestObject);
  if (!mobileDetectd.mobile()) {
    console.log("is browser!");
    response.status(400).json({ message: "uuups ... please use the app" });
  }
  console.log("is mobile");
};
