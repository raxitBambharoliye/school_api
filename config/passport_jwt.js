const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const model = require('../model/admin_model');
const faculty_model = require('../model/faculty_model');

const opts = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'admin'
}
const opts_faculty = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'faculty'
}

passport.use(new jwtStrategy(opts, async (user, done) => {
    let data = await model.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            done(null, data);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }
}))

passport.use('faculty', new jwtStrategy(opts_faculty, async (user, done) => {
    let data = await faculty_model.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            done(null, data);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let data = await model.findById(id);
    if (data) {
        done(null, data);
    } else {
        let faculty = await faculty_model.findById(id);
        if (faculty) {
            done(null, faculty);
        } else {
            done(null, false);
        }
    }
})

passport.setUserAuthenticate=(req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role=='admin'){
            res.locals.admin=req.user;
            console.log(req.user);
        }else{
            res.locals.faculty=req.user;
            console.log("faculty",req.user);
        }
    }
    next();
}

module.exports = passport;