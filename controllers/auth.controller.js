const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Username already exists!' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
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
