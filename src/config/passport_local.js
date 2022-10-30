const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user_model");
const passport = require('passport');

module.exports = function (passport) {
  const options = {
    usernameField: "email",
    passwordField: "password",
  };
  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User Bulunamadı !" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "şifre hatalı" });
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
};

passport.serializeUser(function (user, done) {
  console.log("sess" + user.id);
  done(null, user.id);//cookie de saklanması
});

passport.deserializeUser(function (id, done) {
  console.log("veritabanı bulundu");
  User.findById(id, function (err, user) {
    //cookiden okunan değeri döndürme
    const newUser = {
      id : user.id,
      email : user.email,
      ad:user.name,
      soyad:user.surname
    }
    done(err, newUser);
  });
});
