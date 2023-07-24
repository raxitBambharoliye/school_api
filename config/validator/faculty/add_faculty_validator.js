const joi=require('joi');

const faculty_validator=(req,res,next)=>{
    const schema=joi.object().keys({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        subject:joi.string().valid("node js","js","c language","c++").required(),
        salary:joi.number().required(),
        time:joi.string().required()
    })

    const { error }=schema.validate(req.body,{abortEarly:false});
    if(error){
        return res.json({status:300,error:error.details});
    }else{
        next();
    }
}

module.exports=faculty_validator;