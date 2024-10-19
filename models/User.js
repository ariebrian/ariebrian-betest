const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    userName: String,
    accountNumber: String,
    emailAddress: String,
    identityNumber: String,
});

userSchema.index({ accountNumber: 1 }, { unique: true });
userSchema.index({ identityNumber: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
