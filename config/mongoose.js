const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/api_pr1');
const db=mongoose.connection;
db.once('open',(err)=>{
    if(err){
        console.log("db not connected : ",err);
        return false;
    }
    console.log("db is connected");
})

module.exports=db;