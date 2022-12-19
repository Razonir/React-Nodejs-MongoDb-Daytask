const express = require('express');
const router = express.Router();
const HistoryTaskController = require('../controllers/historytask');
const auth = require('../middleware/auth');

router.get('/all',HistoryTaskController.getAll);
router.get('/user',auth, HistoryTaskController.getAllByJWT);

module.exports = router;