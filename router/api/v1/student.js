const express=require('express');
const Student = require('../../../model/student_model');
const router=express.Router();
const controller=require('../../../controller/api/v1/student_controller');
const passport=require('passport');
const add_student_validator = require('../../../config/validator/student/add_student_validator');

router.post('/add_student',add_student_validator,passport.authenticate('faculty',{failureRedirect:'/login_fail'}),Student.upImg,controller.add_student);

router.delete('/del_student/:id',passport.authenticate('faculty',{failureRedirect:'/login_fail'}),controller.del_student);

module.exports=router;