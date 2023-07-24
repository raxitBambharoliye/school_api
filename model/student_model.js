const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const single='/single_image';
const multi='/multi_image'
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    multi_image:{
        type:Array,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    faculty_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty',
        required:true
    }
})

const imgObj=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=='image'){
            cb(null,path.join(__dirname,'..',single));
        }else{
            cb(null,path.join(__dirname,'..',multi));
        }
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})


Schema.statics.upImg=multer({storage:imgObj}).fields([{name:'image',maxCount:1},{name:"multi_image",maxCount:3}]);
Schema.statics.singlePath=single;
Schema.statics.multiPath=multi;
const student=mongoose.model('student',Schema);
module.exports=student;

