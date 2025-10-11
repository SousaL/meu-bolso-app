const express = require("express");
const mongoose = require("mongoose");
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const { errorHandler } = require('./middleware/error');

const usersRoutes = require("./routes/usersRoute");
const accountsRoutes = require("./routes/accountsRoute");
const authRoutes = require("./routes/authRoute");


const dotenv = require('dotenv');
dotenv.config()

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/accounts", accountsRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info(" - Banco conectado com sucesso")
    app.listen(process.env.PORT, () => {
      logger.info(` - Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("NAO FOI POSSIVEL CONECTAR NO BANCO")
  })








