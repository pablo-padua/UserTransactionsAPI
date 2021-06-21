const Redis = require('ioredis');

class cache {
    redis: any;
    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
            keyPrefix: "Token: ",
        })
    }
    async get(token: any) {
        const value = await this.redis.get(token);
        return value ? JSON.parse(value) : null;
    }

    set(key: any, value: any, timeExp: number) {
        return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
    }

    del(key: any) {
        return this.redis.del(key);
    }

    async delPrefix(prefix: any) {
        const key = (await this.redis.keys(`Token: ${prefix}`)).map((key: any) => {
            key.replace("Token", "");
        });
        return this.del(key);
    }

}

export default (new cache());