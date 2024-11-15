const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    try { 
        // Create a new user instance
        const newUser = new User({
          username,
          password,
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          res.status(400).json({ error: 'Username already exists!' });
        } else {
          // Other errors
          res.status(500).json({ error: 'An error occurred during registration.' });
        }
      }
  };

// exports.changePass = async (req, res) => {
//     const { userId, currentPassword, newPassword } = req.body;

//   try {
//     // Validate input
//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ error: 'Both current and new passwords are required' });
//     }

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Incorrect current password' });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     user.password = hashedNewPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully!' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Username not found' }); // User not found
      }
  
      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Password is incorrect' }); // Password incorrect
      }
  
      // Generate and return a token
      // Example with HS256 algorithm
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
