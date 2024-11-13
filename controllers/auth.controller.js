const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("User registered");
};

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
};
