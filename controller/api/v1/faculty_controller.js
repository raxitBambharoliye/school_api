const faculty = require('../../../model/faculty_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//login

module.exports.login = async (req, res) => {
    try {
        let email = await faculty.findOne({ email: req.body.email });
        if (email) {
            if (await bcrypt.compare(req.body.password, email.password)) {
                let token = jwt.sign({ data: email }, 'faculty', { expiresIn: 84600 });
                return res.json({ status: 200, msg: "login successfully ", token: token });
            }
        } else {
            return res.json({ status: 400, mag: "invalid email id" });
        }
    } catch (err) {
        console.log('login err in faculty : ', err);

    }
}

//add faculty
module.exports.add_faculty = async (req, res) => {
    try {
        let email = await faculty.findOne({ email: req.body.email });
        if (email) {
            return res.json({ status: 400, msg: 'email already used ' });
        } else {
            req.body.role='faculty';
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let data = await faculty.create(req.body);
            if (data) {
                return res.json({ status: 200, msg: 'faculty added successfully ' });
            } else {
                return res.json({ status: 400, msg: 'Enter All information' });
            }
        }

    } catch (err) {
        console.log('add faculty err : ', err);
    }
}

//view_profile
module.exports.profile_dea = async (req, res) => {
    try {
        let faculty_data=await faculty.findById(req.user.id).populate('student_ids').exec();
        return res.json({ status: 200, msg:faculty_data});
    } catch (err) {
        console.log('profile err in faculty', err);
    }
}
module.exports.profile = async (req, res) => {

    return res.redirect('/faculty/profile_dea');
}
//delete faculty
module.exports.del_faculty = async (req, res) => {
    try {
        let data = await faculty.findById(req.params.id);
        if (data) {
            let del = await faculty.findByIdAndDelete(req.params.id);
            if (del) {
                return res.json({ status: 200, msg: 'faculty deleted successfully ' });
            } else {
                return res.json({ status: 500, msg: 'faculty not deleted ' });
            }
        } else {
            return res.json({ status: 400, msg: 'faculty not excited' });
        }
    } catch (error) {
        console.log('delete faculty err :', error);
    }
}