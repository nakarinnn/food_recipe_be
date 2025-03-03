// import Redis from 'ioredis';

// // กำหนดค่าการเชื่อมต่อ Redis
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT || '6379'),
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD,
//   tls: { rejectUnauthorized: false }
// });

// const redis = new Redis(process.env.REDIS_url as string);


// กำหนดค่าการเชื่อมต่อ Redis
// const redis = new Redis({
//   host: '127.0.0.1',
//   port: 6379,
//   // password: process.env.REDIS_PASSWORD, // ถ้ามี
// });

// redis.connect(() => {
//   console.log('Connected to Redis');
// })

import { createClient } from 'redis';

const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-17302.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com',
        port: 17302
    }
});

redis.on('error', err => console.log('Redis Client Error', err));

// Log when the client is successfully connected
redis.on('ready', () => {
    console.log('Connected to Redis');
});

redis.connect();

export default redis;

