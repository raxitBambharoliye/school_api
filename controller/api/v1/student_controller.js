const model = require('../../../model/student_model');
const path = require('path');
const fs = require('fs');
const faculty=require('../../../model/faculty_model');
module.exports.add_student = async (req, res) => {
    try {
        req.body.role='student';    
        let email = await model.findOne({ email: req.body.email });
        if (email) {
            return res.json({ status: 400, msg: "email already exicted .. " });
        } else {
            single_image = '';
            if (req.files.image) {
                single_image = model.singlePath + '/' + req.files.image[0].filename;
            }
            multi_image = [];
            if (req.files.multi_image) {
                for (var i = 0; i < req.files.multi_image.length; i++) {
                    multi_image.push(model.multiPath + '/' + req.files.multi_image[i].filename)
                }
            }

            req.body.image = single_image;
            req.body.multi_image = multi_image;

            let data = await model.create(req.body);

            let faculty_data=await faculty.findById(req.body.faculty_id);
            faculty_data.student_ids.push(data.id);
            let update=await faculty.findByIdAndUpdate(faculty_data.id,({student_ids:faculty_data.student_ids}));
            if (1) {
                return res.json({ status: 200, msg: 'student added successfully' });
            } else {
                return res.json({ status: 400, msg: '!!! Add All information ' });
            }
        }
    } catch (err) {
        console.log('add_student err :', err);
    }
}

//delete student 
module.exports.del_student = async (req, res) => {
    try {
        let data = await model.findById(req.params.id);
        if (data) {
            //delete single image
            let si = path.join(__dirname, '../../../', data.image);
            fs.unlinkSync(si);
            //delete multiple image 
            for (var i = 0; i < data.multi_image.length; i++) {
                let mi = path.join(__dirname, '../../../', data.multi_image[i]);
                fs.unlinkSync(mi);
            }
            let del = await model.findByIdAndDelete(req.params.id);
            if (del) {
                return res.json({ status: 200, msg: 'student deleted successfully' });
            } else {
                return res.json({ status: 200, msg: 'some thing was rong ...' });
            }
        } else {
            return res.json({ status: 400, msg: 'student not excited ' });
        }
    } catch (err) {
        console.log('student delete err in student : ', err);
    }
}