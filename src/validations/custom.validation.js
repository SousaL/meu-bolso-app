const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Senha deve ter pelo menos 8 caracteres");
  }

  return value;
};


module.exports = {
    password
}