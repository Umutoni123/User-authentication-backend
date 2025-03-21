const mongoose = require('mongoose')


const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: {type: Number, required: true},
    reason:{type: String, required: true}
})

module.exports = mongoose.model("Expenses", expenseSchema)