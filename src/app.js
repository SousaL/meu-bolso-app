const express = require("express");
const morgan = require("./config/morgan");
const config = require("./config/config");
const { errorHandler, errorConverter } = require("./middleware/error");
const { userRoute, accountRoute, authRoute } = require("./routes");
const { jwtStrategy } = require("./config/passport");
const passport = require("passport");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use("/users", userRoute);
app.use("/accounts", accountRoute);
app.use("/auth", authRoute);

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
