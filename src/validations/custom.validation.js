const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Senha deve ter pelo menos 8 caracteres");
  }

  if(!value.match(/\d/) || !value.match(/[a-zA-Z]/))
  { 
    return helpers.message("Deve ter pelo menos uma letra e um numero")
  }

  return value;
};


module.exports = {
    password
}