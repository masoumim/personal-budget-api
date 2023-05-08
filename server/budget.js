// Require in express module
const express = require('express');

// Envelopes (budgets) array
const envelopes = [
    {id: 1, name: "Groceries", balance: 100, userId: 1}
];

// Create budgetRouter
// mergeParams enables accessing route params belonging to to the 'parent route',
// which in this example is the userRouter.
// This requires nesting the budgetRouter (child) into the userRouter (parent),
// which is done in the user.js file.
const budgetRouter = express.Router({mergeParams: true});

// GET routes
budgetRouter.get('/', (req, res, next) => {
    // Return ALL envelopes
    res.status(200).send(envelopes);
});



// Export budgetRouter
module.exports = budgetRouter;