const dotenv = require("dotenv");
dotenv.config({quiet: true});

let config = {
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === "test" ? "-test" : ""),
  },
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SIGNATURE,
  }
};

module.exports = config;
