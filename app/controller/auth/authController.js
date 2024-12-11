const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserAdmin = require("../../models/auth/auth")
const db = require("../../config/db")

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await UserAdmin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserAdmin({ username, email, password: hashPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getRegisterById = async (req, res) => {
  try {
    const { id } = req.params;

    const register = await UserAdmin.findById(id);
    if (!register) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(register);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserAdmin.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Ensure jwtSecret has a valid value
    const token = jwt.sign({ id: user._id }, db.jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message });
  }
};
