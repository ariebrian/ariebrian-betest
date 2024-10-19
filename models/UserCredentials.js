const mongoose = require('mongoose');

const userCredentialSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
});

userCredentialSchema.index({ username: 1 }, { unique: true });
userCredentialSchema.index({ email: 1 }, { unique: true });

const UserCredential = mongoose.model('UserCredential', userCredentialSchema);

module.exports = UserCredential;
