const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user, expiresIn) => {
  const payload = { id: user._id, email: user.email };
  const signature = process.env.JWT_SIGNATURE;
  return jwt.sign(payload, signature, { expiresIn: expiresIn });
};

const generateAccessToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRES_IN_ACCESS;
  return generateToken(user, expiresIn);
};

const generateRefreshToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRES_IN_REFRESH;
  return generateToken(user, expiresIn);
};

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

    if (!user) {
      return res.status(400).json({ error: "Credenciais invalidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Credenciais invalidas" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: "Erro no login", details: err });
  }
}

async function refresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token nao fornecido" });
  }

  jwt.verify(refreshToken, process.env.JWT_SIGNATURE, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Refresh Token Invalido" });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
}

async function profile(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, profile, refresh };
