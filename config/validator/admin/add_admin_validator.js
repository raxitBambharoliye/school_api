const joi=require('joi');
const admin_add_validator=(req,res,next)=>{
    const schema=joi.object().keys({
        username:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    })

    const {error}=schema.validate(req.body,{abortEarly:false});
    if(error){
        return res.json({status:300,error:error.details});
    }else{
        next();
    }
}

module.exports=admin_add_validator;