const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8, // Minimum length
        maxlength: 16, // Maximum length
        match: /^[a-zA-Z0-9]+$/, // Alphanumeric only
      },      
    password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
