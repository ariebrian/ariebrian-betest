const CacheService = require('./CacheService');
const cacheService = new CacheService();


class UserService {
    constructor(userRepository, cacheService) {
      this.userRepository = userRepository;
      this.cacheService = cacheService;
    }
  
    async createUser(data) {
        const checkAccountNumberExist = await this.userRepository.findUserByAccountNumber(data.accountNumber);
        const checkIdentityNumberExist = await this.userRepository.findUserByIdentityNumber(data.identityNumber);

        if (checkAccountNumberExist)
            throw new Error('User with same account number already exist');
        if (checkIdentityNumberExist)
            throw new Error('User with same identity number already exist');

        const user = await this.userRepository.createUser(data);

        // cache
        await this.cacheService.set(`user:account:${user.accountNumber}`, user);
        await this.cacheService.set(`user:identity:${user.identityNumber}`, user);

        return user;
    }
  
    async getUserByAccountNumber(accountNumber) {
        let user = await cacheService.get(`user:account:${accountNumber}`);
        if (user) {
            console.log('Serving from cache');
            return JSON.parse(user);
        }

        console.log('query');
        
        user = await this.userRepository.findUserByAccountNumber(accountNumber);
        if (user) {
            // Store the result in cache for future requests
            await cacheService.set(`user:account:${accountNumber}`, user);
        }
        return user;
    }
  
    async getUserByIdentityNumber(identityNumber) {
        let user = await this.cacheService.get(`user:identity:${identityNumber}`);
        if (user) {
            console.log('Serving from cache');
            return JSON.parse(user);
        }

        user = await this.userRepository.findUserByIdentityNumber(identityNumber);
        if (user) {
            // Store the result in cache for future requests
            await this.cacheService.set(`user:identity:${identityNumber}`, user);
        }
        return user;
    }
  
    async updateUser(id, data) {
        const updatedUser = await this.userRepository.updateUser(id, data);
        console.log('updatedUSer', updatedUser.accountNumber);
        

        await this.cacheService.set(`user:account:${updatedUser.accountNumber}`, updatedUser);
        await this.cacheService.set(`user:identity:${updatedUser.identityNumber}`, updatedUser);

        return updatedUser;
    }
  
    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
}
  
module.exports = UserService;
  