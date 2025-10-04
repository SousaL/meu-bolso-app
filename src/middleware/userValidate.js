function userValidate(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Nome, Email e senha sao obrigatorios" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Senha deve ter pelo menos 6 caracteres" });
  }

  next();
}

module.exports = userValidate;
