const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    image: String,
    role: { type: String, default: 'user' }, // 'user' | 'admin'
    gender: String,
    birthday: Date,
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

