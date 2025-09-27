const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ error: "Token nao fornecido"});
    }

    jwt.verify(token, process.env.JWT_SIGNATURE, (err, user) => {
        if(err){
            return res.status(403).json({ error: "Token Invalido"});
        }

        req.user = user; // Adicionar na requisicao o user.
        next();
    })
}

module.exports = authMiddleware;