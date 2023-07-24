const mongoose=require('mongoose');
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
    subject:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    student_ids:{
        type:Array,
        ref:'student',
        require:true
    }
});

const faculty=mongoose.model('faculty',Schema);

module.exports=faculty;