const joi=require('joi');

const login_validator_faculty= (req,res,next)=>{
    const schema=joi.object().keys({
        email:joi.string().email().required(),
        password:joi.string().required()
    })

    const {error}= schema.validate(req.body,{abortEarly:false});
    if(error){
        return res.json({status:300,error:error.details});
    }else{
        next();
    }
}
module.exports=login_validator_faculty;
