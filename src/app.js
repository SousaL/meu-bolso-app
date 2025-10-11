const express = require("express");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const morgan = require("./config/morgan");
const { errorHandler, errorConverter } = require("./middleware/error");

const { userRoute, accountRoute, authRoute } = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());

app.use("/users", userRoute);
app.use("/accounts", accountRoute);
app.use("/auth", authRoute);

app.use(errorConverter);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info(" - Banco conectado com sucesso");
    app.listen(process.env.PORT, () => {
      logger.info(` - Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("NAO FOI POSSIVEL CONECTAR NO BANCO");
  });
