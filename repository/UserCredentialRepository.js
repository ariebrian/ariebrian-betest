const UserCredentialModel = require('../models/UserCredentials');

class UserCredentialRepository {
    constructor(UserCredentialModel) {
        this.UserCredentialModel = UserCredentialModel;
    }

    async createUserCredential(data) {
        const newData = new UserCredentialModel(data);
        return await newData.save();
    }

    async findUserCredentialByEmail(email) {
        return await UserCredentialModel.findOne({ 
            email: email,
        });
    }

    async findUserCredentialByUsername(username) {
        return await UserCredentialModel.findOne({ 
            username: username,
        });
    }
}

module.exports = UserCredentialRepository;
