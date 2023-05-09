// Require in express module
const express = require('express');

// Budgets array
const budgets = [
    {id: 1, name: "Groceries", balance: 100, userId: 1}
];

// Create budgetRouter
// mergeParams enables accessing route params belonging to to the 'parent route',
// which in this example is the userRouter.
// This requires nesting the budgetRouter (child) into the userRouter (parent),
// which is done in the user.js file.
const budgetRouter = express.Router({mergeParams: true});


// Intercept any request to a route handler with the :budgetId parameter,
// and check if the budgetId is valid or not.
budgetRouter.param('budgetId', (req, res, next, id) => {
    
    let budgetId = Number(id);
    
    // Check if a budget object with this ID already exists
    const budgetIndex = budgets.findIndex((element) => {
        return element.id === budgetId;
    });

    if (budgetIndex === -1) {
        res.status(404).send('That budget does not exit');
    }
    else {
        // creates a 'budgetIndex' on the request parameter and sets it's value.
        req.budgetIndex = budgetIndex;        
        next();
    }
});



// GET routes
budgetRouter.get('/', (req, res, next) => {
    if (req.params.userId) {
        // If the request contains a userId param, we only return the budgets belonging to that user.
        const userBudgets = budgets.filter((element) => element.userId === Number(req.params.userId));
        res.status(200).send(userBudgets);
    }
    else {
        // Return ALL budgets
        res.status(200).send(budgets);
    }
});



// Export budgetRouter
module.exports = budgetRouter;