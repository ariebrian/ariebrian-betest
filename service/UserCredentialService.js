const AuthService = require('../service/AuthService');
const authService = new AuthService('secretKey');
const bcrypt = require('bcryptjs');

class UserCredentialService {
    constructor(userCredentialRepository) {
      this.userCredentialRepository = userCredentialRepository;
    }
  
    async registerUser(userCredentialData) {
        const { username, email, password } = userCredentialData;
        console.log(username, email, password);
        
    
        // Check if user or email already exists
        const existingUser = await this.userCredentialRepository.findUserCredentialByUsername(username);
        if (existingUser) {
          throw new Error('Username is already taken');
        }
    
        const existingEmail = await this.userCredentialRepository.findUserCredentialByEmail(email);
        if (existingEmail) {
          throw new Error('Email is already registered');
        }
    
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);
        userCredentialData.password = hashedPassword;

        // Create new user
        const newUser = await this.userCredentialRepository.createUserCredential(userCredentialData);
    
        return {
          message: 'User registered successfully',
          userId: newUser._id,
        };
    }

    async loginUser(email, password) {
        let user = await this.userCredentialRepository.findUserCredentialByEmail(email);
        
        if (!user) {
            throw new Error('Email not found');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }        

        // Create a JWT token
        const token = authService.generateToken({ username: user.username, email});

        return {
            message: 'Login successful',
            token: token,
        };
    }
}
  
module.exports = UserCredentialService;
  