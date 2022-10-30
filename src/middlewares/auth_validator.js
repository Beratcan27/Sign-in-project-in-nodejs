const { body } = require("express-validator");

const authValidate = () => {
  return [
    body("name")
      .trim()
      .isLength({ max: 25 })
      .withMessage("İsim alanı en fazla 25 karakterlidir")
      .isLength({ min: 2 })
      .withMessage("İsim alanı en az 3 karakterlidir"),
    body("surname")
      .trim()
      .isLength({ max: 25 })
      .withMessage("Soyisim alanı en fazla 25 karakterlidir")
      .isLength({ min: 2 })
      .withMessage("Soyisim alanı en az 3 karakterlidir"),
    body("password")
      .trim()
      .isLength({ max: 25 })
      .withMessage("Şifre alanı en fazla 25 karakterlidir")
      .isLength({ min: 2 })
      .withMessage("Şifre alanı en az 3 karakterlidir"),
    body("repassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
    body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz !"),
  ];
};

const authLogin = () => {
  return [
    body("password")
      .trim()
      .isLength({ max: 25 })
      .withMessage("Şifre alanı en fazla 25 karakterlidir")
      .isLength({ min: 2 })
      .withMessage("Şifre alanı en az 3 karakterlidir"),

    body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz !"),
  ];
};

module.exports = {
  authValidate,
  authLogin
};
