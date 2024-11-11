const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, (req, res) => {
    res.send("Protected user profile");
});

module.exports = userRouter;
