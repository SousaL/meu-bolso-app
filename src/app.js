const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoute");
const accountsRoutes = require("./routes/accountsRoute");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/accounts", accountsRoutes);


mongoose.connect("mongodb://localhost:27017/meu-bolso")
  .then(() => {
    console.log(" - Banco conectado com sucesso")
    app.listen(3000, () => {
      console.log(" - Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("NAO FOI POSSIVEL CONECTAR NO BANCO")
  })








