const Expenses = require('../models/expenses')
const authMiddleware = require ('../middlewares/authMiddleware')


exports.addExpense = async (req, res) => {
    try {
        console.log("User in request:", req.user); // Debugging log

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const { amount, reason } = req.body;
        const userId = req.user.id;

        const expense = new Expenses({ userId, amount, reason });
        await expense.save();

        res.status(201).json(expense);
    } catch (error) {
        console.error("Error in addExpense:", error); // Log full error
        res.status(500).json({ message: "An error occurred while adding the expense" });
    }
};


exports.getExpenses = async(req, res) =>{
    try {
        const expenses = await Expenses.find({user: req.user.id})
        res.json(expenses)
        
    } catch (error) {
        console.error(error);
        
        res.status(500).json({message: "error occured while fetching expenses"})
    }
}