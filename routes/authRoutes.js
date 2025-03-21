const express = require('express');
const {registerUser, getAllUsers} = require('../controllers/registerController');
const protect = require("../middlewares/authMiddleware");
const{loginUser} = require('../controllers/loginController');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expensesController');

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", protect, getAllUsers);
router.post("/login", loginUser);
router.get('/getallexpenses', protect, getExpenses)
router.post('/addexpense', protect, addExpense )
router.delete('/deleteexpense/:id',protect, deleteExpense)


module.exports = router;