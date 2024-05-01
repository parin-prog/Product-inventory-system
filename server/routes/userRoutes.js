const express = require('express');
const { updateUser, getUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/find/', verifyToken, getUser);
router.put('/', verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);


module.exports = router;