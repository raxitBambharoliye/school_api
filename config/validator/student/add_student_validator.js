const joi = require('joi');
const add_student_validator = (req, res, next) => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        city: joi.string().required(),
        hobby: joi.array().required(),
        gender: joi.string().valid("male", "female"),
        description: joi.string().required(),
        image: joi.string().required(),
        multi_image: joi.string().required(),
    }
    ).unknown(false);

    const {error}=schema.validate(req.body,{abortEarly:false});
    if(error){
        return res.json({status:300,error:error.details});
    }else{
        next();
    }
}
module.exports=add_student_validator;