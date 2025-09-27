const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Usuario registrado com sucesso!" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Erro ao registrar o usuário", details: err });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ error: "Credenciais invalidas"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ error: "Credenciais invalidas"});
    }


    const payload = {id: user._id, email: user.email};
    const signature = process.env.JWT_SIGNATURE
    const expiresIn = process.env.JWT_EXPIRES_IN
    const token = jwt.sign(payload, signature, { expiresIn: expiresIn});

    res.json({ token});

  } catch (err) {
    res.status(500).json({ error: "Erro no login", details: err });
  }
}

module.exports = { register, login };
