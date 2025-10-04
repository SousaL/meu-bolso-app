const Joi = require('joi')

// Codigo do PICK



const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if(object && Object.prototype.hasOwnProperty.call(object, key)){
            obj[key] = object[key];
        }
        return obj
    }, {})
}



const validate = (schema) => (req, res, next) => {
    // console.log(pick(req, ['body', 'params', 'query']));
    const validSchema = pick(schema, ['params', 'query', 'body']);
    console.log(validSchema);
    console.log(Object.keys(validSchema));
    const object = pick(req, Object.keys(validSchema));
    console.log(object)
    const { value, error} = Joi.compile(validSchema)
        .prefs({ errors: { label: "key"}, abortEarly: false})
        .validate(object)

    if(error){
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next();
    }

    Object.assign(req, value)
    console.log(req)
    return next();
}


module.exports = validate;