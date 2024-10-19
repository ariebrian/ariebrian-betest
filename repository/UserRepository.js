const User = require('../models/User');

class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async createUser(data) {
        const newUser = new User(data);
        return await newUser.save();
    }

    async findUserByAccountNumber(accountNumber) {
        return await User.findOne({ accountNumber });
    }

    async findUserByIdentityNumber(identityNumber) {
        return await User.findOne({ identityNumber });
    }

    async updateUser(id, data) {
        return await User.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        );
    }

    async deleteUser(id) {
        return await User.deleteOne({ _id: id });
    }
}

module.exports = UserRepository;
