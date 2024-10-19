const mongoose = require('mongoose');
const UserRepository = require('../repository/UserRepository');
const UserService = require('../service/UserService');


describe('UserService CRUD Operations', () => {
    let userService;
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository()
        userService = new UserService(userRepository);
    });

    it('should create a user', async () => {
        const user = await this.userService.createUser('createUser', '1', 'createUser@example.com', '2');
        expect(user).toHaveProperty('id');
        expect(user.userName).toBe('John Doe');
        expect(user.emailAddress).toBe('john@example.com');
        expect(user.accountNumber).toBe('1');
        expect(user.identityNumber).toBe('2');
    });

    it('should getUserByAccountNumber', async () => {
        const user = await userService.createUser('getUserAccount', '2', 'getUserAccount@example.com', '3');
        const getUser = await userService.getUserByAccountNumber('2');
        expect(getUser.accountNumber).toEqual('2');
    });

    it('should getUserByIdentityNumber', async () => {
        const user = await userService.createUser('getUserIdentity', '3', 'getUserIdentity@example.com', '4');
        const getUser = await userService.getUserByIdentityNumber('4');
        expect(getUser.identityNumber).toEqual('4');
    });

    it('should update user', async () => {
        const user = await userService.createUser('updateUser', '4', 'updateUser@example.com', '5');
        const updatedUser = await userService.updateUser(user.id, {userName: 'updatedUser', accountNumber: '5', emailAddress: 'updateUser@example.com', identityNumber: '6'});
        expect(updatedUser.userName).toEqual('updatedUser');
        expect(updatedUser.emailAddress).toEqual(user.emailAddress);
        expect(updatedUser.accountNumber).toEqual('5');
        expect(updatedUser.identityNumber).toEqual('6');
    });

    it('should delete a user', async () => {
        const user = await userService.createUser('deleteUser','100', 'deleteUser@example.com', '100');
        const deletedUser = await userService.deleteUser(user.id);
        expect(deletedUser).toEqual(user);
        expect(userService.getUserByAccountNumber(user.accountNumber)).toBeUndefined();
    });
})