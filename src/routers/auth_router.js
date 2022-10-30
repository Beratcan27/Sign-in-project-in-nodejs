const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const authValidator = require('../middlewares/auth_validator');


router.get('/register',authController.registerGet);
router.post('/register',authValidator.authValidate(),authController.registerPost);

router.get('/login',authController.loginGet);
router.post('/login', authValidator.authLogin() ,authController.loginPost);


router.get('/forget-password',authController.forgetPasswordGet);
router.post('/forget-password',authController.forgetPasswordPost);

router.get('/logout',authController.logout);


module.exports = router;