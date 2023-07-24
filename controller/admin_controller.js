const model = require('../model/admin_model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const faculty = require('../model/faculty_model')
//Register (add admin ) post
module.exports.register = async (req, res) => {
    try {
        let data = await model.findOne({ email: req.body.email });
        if (data) {
            return res.json({ status: 400, msg: "email already used " })
        } else {
            let pas = await bcrypt.hash(req.body.password, 10);
            req.body.role='admin';
            req.body.password = pas;
            let admin = await model.create(req.body);
            if (admin) {
                return res.json({ status: 200, msg: "admin Add successfully" })
            } else {
                return res.json({ status: 400, msg: "enter all information" })
            }
        }
    } catch (err) {
        console.log('admin register err :', err);
    }
}

//all faculty
module.exports.all_faculty = async (req, res) => {
    return res.redirect('/fac_red');
}
module.exports.fac_red = async (req, res)=>{
    try {
        console.log(req.user.id);
        let data = await faculty.find({});
        if (data) {
            return res.json({ status: 200, msg: 'all faculty data', faculty_data: data });
        } else {
            return res.json({ status: 500, msg: 'data not fid ' });
        }
    } catch (err) {
        console.log('ass faculty err: ', err);
    }
}

//login post
module.exports.login = async (req, res) => {
    try {
        let email = await model.findOne({ email: req.body.email });
        if (email) {
            if (await bcrypt.compare(req.body.password, email.password)) {
                let token = jsonwebtoken.sign({ data: email }, 'admin', { expiresIn: 82600 });
                return res.json({ status: 200, token: token })
            } else {
                return res.json({ status: 400, msg: "invalid Password" });
            }
        } else {
            return res.json({ status: 400, msg: "invalid email" });
        }
    } catch (err) {
        console.log('login err : ', err);
    }
}
