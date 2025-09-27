const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoute");
const accountsRoutes = require("./routes/accountsRoute");
const authRoutes = require("./routes/authRoute");

const dotenv = require('dotenv');
dotenv.config()

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/accounts", accountsRoutes);
app.use("/auth", authRoutes);


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(" - Banco conectado com sucesso")
    app.listen(process.env.PORT, () => {
      console.log(` - Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("NAO FOI POSSIVEL CONECTAR NO BANCO")
  })








