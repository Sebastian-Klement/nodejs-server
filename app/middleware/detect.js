const MobileDetect = require("mobile-detect");

exports.detect = function (requestObject) {
  md = new MobileDetect(requestObject);

  if (!md.mobile()) {
    console.log("is browser!");
    response.status(400).json({ message: "uuups ... please use the app" });
  }
  console.log("is mobile");
};
