function userValidate(req, res, next) {
    const {name, email} = req.body;
    if(!name || !email){
        return res.status(400).json({error: "Nome e email sao obrigatorios"});
    }

    console.log("Passou na validacao");
    next();
}

module.exports = userValidate;