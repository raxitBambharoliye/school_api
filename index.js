const express=require('express');
const app=express();
const db=require('./config/mongoose');
app.use(express.urlencoded());

//passport session
const passport=require('passport');
const passport_mid=require('./config/passport_jwt');
const session=require('express-session');

app.use(session({
    name:'admin',
    secret:'admin_api',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:100*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserAuthenticate);

app.use('/',require('./router/admin'));
app.listen(8009,(err)=>{
    if(err){
        console.log('!!!server is not running',err);
        return false;
    }
    console.log('server is running');
})