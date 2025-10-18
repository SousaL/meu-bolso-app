const mongoose = require('mongoose');

const config = require("./config/config");
const app = require("./app");
const logger = require("./config/logger");


mongoose
  .connect(config.mongoose.url)
  .then(() => {
    logger.info(" - Banco conectado com sucesso");
    app.listen(config.port, () => {
      logger.info(` - Servidor rodando na porta ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error("NAO FOI POSSIVEL CONECTAR NO BANCO");
  });
