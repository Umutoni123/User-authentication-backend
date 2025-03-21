const Expenses = require('../models/expenses')
const authMiddleware = require ('../middlewares/authMiddleware');
const expenses = require('../models/expenses');


exports.addExpense = async (req, res) => {
    try {
        console.log("User in request:", req.user); // Debugging log

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const { amount, reason } = req.body;
        const userId = req.user.userId;

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
        const expenses = await Expenses.find({userId: req.user.userId})
        res.json(expenses)
        
    } catch (error) {
        console.error(error);
        
        res.status(500).json({message: "error occured while fetching expenses"})
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expenses.findOne({ 
            _id: req.params.id, 
            userId: req.user.userId 
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await expense.deleteOne();
        res.status(200).json({ message: "Expense deleted successfully" });

    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Error occurred while deleting the expense" });
    }
};
