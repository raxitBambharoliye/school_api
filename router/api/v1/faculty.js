const express=require('express');
const router=express.Router();
const controller=require('../../../controller/api/v1/faculty_controller')
const passport=require('passport');

// validation
const add_validation=require('../../../config/validator/faculty/add_faculty_validator');
const login_validation=require('../../../config/validator/faculty/login_faculty_validator');
//4.login
router.post('/login',login_validation,controller.login);
//1. faculty add
router.post('/add_faculty',add_validation,passport.authenticate('jwt',{failureRedirect:'/login_fail'}),controller.add_faculty);
//3. faculty delete
router.delete('/del_faculty/:id',passport.authenticate('jwt',{failureRedirect:'/login_fail'}),controller.del_faculty);

//4.faculty profile
router.get('/profile',passport.authenticate('faculty',{failureRedirect:'/login_fail'}),controller.profile);

//profile_dea
router.get('/profile_dea',passport.authenticate('faculty',{failureRedirect:'/login_fail'}),controller.profile_dea)
module.exports=router;