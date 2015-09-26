var router = require('express').Router();
var userController = require('../../controllers/user');

// route specific middleware
var verifyToken = require('../../middleware/verifyToken');
var authenticateUser = require('../../middleware/authenticateUser');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/:username', verifyToken, authenticateUser, userController.getProfile);

module.exports = router;
