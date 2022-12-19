const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/contact', UserController.contact);
router.post('/reset', UserController.reset);
router.get('/user',auth, UserController.getUserByJWT);
router.get('/all', UserController.getAll);
router.post('/remove', auth, UserController.remove);

module.exports = router;