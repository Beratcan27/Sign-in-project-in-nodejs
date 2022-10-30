const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const passport = require("passport");
require("../config/passport_local")(passport);

const registerGet = (req, res, next) => {
  console.log(req.flash("validation_error"));
  res.render("./admin/register", { layout: "../views/layouts/_admin.ejs" });
};

const registerPost = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);
    req.flash("name", req.body.name);
    req.flash("surname", req.body.surname);
    req.flash("password", req.body.password);
    req.flash("repassword", req.body.repassword);
    res.redirect("/auth/register");
  } else {
    try {
      const _user = await User.findOne({ email: req.body.email });
      if (_user) {
        req.flash("validation_error", [{ msg: "Bu mail kullanımda" }]);
        req.flash("email", req.body.email);
        req.flash("name", req.body.name);
        req.flash("surname", req.body.surname);
        req.flash("password", req.body.password);
        req.flash("repassword", req.body.repassword);
        res.redirect("/auth/register");
      } else {
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          password: req.body.password,
        });
        await newUser.save();
        console.log("Kullanıcı kaydedildi ");
        req.flash("succes_message", [{ msg: "Giriş Yapabilirsiniz" }]);
        res.redirect("/auth/login");
      }
    } catch (err) {}
  }
};

const loginGet = (req, res, next) => {
  res.render("./admin/login", { layout: "../views/layouts/_admin.ejs" });
};
const loginPost = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);
    res.redirect("/auth/login");
  }

  passport.authenticate("local", {
    successRedirect: "/yonetim",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
};

const forgetPasswordGet = (req, res, next) => {
  res.render("./admin/forget", { layout: "../views/layouts/_admin.ejs" });
};
const forgetPasswordPost = (req, res, next) => {
  res.render("./admin/forget", { layout: "../views/layouts/_admin.ejs" });
};


const logout= function(req,res,next){
    req.logout();
    req.session.destroy((error)=>{
      res.clearCokkie('connect.sid');
    })
     res.redirect('/auth/login');
    
}

module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  forgetPasswordGet,
  forgetPasswordPost,
  logout
};
