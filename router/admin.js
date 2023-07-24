const express=require('express');
const router=express.Router();
const controller=require('../controller/admin_controller');
const passport=require('passport');

// validation
const add_validation=require('../config/validator/admin/add_admin_validator')
const login_validation=require('../config/validator/admin/login_admin_validator')

router.get('/login_fail', (req, res) => {
    return res.json({ status: 400, msg: "you should login first" })
})

//1. register
router.post('/register',add_validation,controller.register);
//2.Login
router.post('/login',login_validation,controller.login);


//faculty
//2. view all faculty 
router.get('/fac_red',passport.authenticate('jwt',{failureRedirect:'/login_fail'}),controller.fac_red);
router.get('/all_faculty',passport.authenticate('jwt',{failureRedirect:'/login_fail'}),controller.all_faculty);
router.use('/faculty',require('./api/v1/faculty'));
router.use('/student',require('./api/v1/student'));
module.exports=router;