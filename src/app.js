const express = require("express");
const usersRoutes = require("./routes/usersRoute");
const app = express();

app.use(express.json());

//GET
//POST
//PUT
//DELETE


app.use("/users", usersRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
