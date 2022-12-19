const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task');
const auth = require('../middleware/auth');


router.post('/remove', TaskController.remove);
router.post('/add',auth, TaskController.add);
router.post('/done',auth, TaskController.done);
router.post('/allnot', TaskController.allNot);
router.get('/user',auth, TaskController.getAllByJWT);
router.get('/userdone',auth, TaskController.getAllDoneByJWT);
router.get('/all', TaskController.getAll);
router.get('/id', TaskController.getOne);

module.exports = router;