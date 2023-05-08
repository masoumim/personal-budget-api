// Require in express module
const express = require('express');

// Users array
const users = [
    {id: 1, userName: "Default user"}
];

// Create userRouter
const userRouter = express.Router();

// Router nesting: 
// Nest the budgetRouter in to the userRouter.
// This tells Express that the path to budgetRouter is the same as userRouter,
// but with the the additional path '/:userId/budgets'.
// This now allows for a new route like: /users/1/budgets.
// The result is that accessing the route: '/:userId/budgets',
// will trigger the budgetRouter.get('/') route.
const budgetRouter = require('./budget.js');
userRouter.use('/:userId/budgets', budgetRouter);  

// GET routes
userRouter.get('/', (req, res, next) => {
    // Return ALL users
    res.status(200).send(users);
});


// Export userRouter
module.exports = userRouter;