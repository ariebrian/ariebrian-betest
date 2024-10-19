const redis = require('redis');

require('dotenv').config();

class CacheService {
  constructor() {
    this.client = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    this.redisName = process.env.REDIS_NAME || 'redis_ariebrian_betest';
    this.client.on('error', (err) => console.error('Redis error:', err));
    this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  _createKey(key) {
    return `${this.redisName}:${key}`;
  }

  async get(key) {
    await this.connect();
    const fullKey = this._createKey(key);
    return await this.client.get(fullKey);
  }

  async set(key, value) {
    await this.connect();
    const fullKey = this._createKey(key);
    await this.client.set(fullKey, JSON.stringify(value));
  }  
}

module.exports = CacheService;
