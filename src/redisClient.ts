import Redis from 'ioredis';

// กำหนดค่าการเชื่อมต่อ Redis
const redis = new Redis({
  host: '127.0.0.1', // ที่อยู่ Redis Server
  port: 6379,        // พอร์ตของ Redis
  // password: 'your_password', // ใช้ถ้ามีการตั้งค่ารหัสผ่าน
});

// ตรวจจับข้อผิดพลาด
redis.on('error', (err) => {
  console.error('Redis Error:', err);
});

// ตรวจสอบเมื่อเชื่อมต่อสำเร็จ
redis.on('connect', () => {
  console.log('Connected to Redis');
});

// ปิดการเชื่อมต่อ Redis เมื่อแอปปิด
process.on('SIGINT', async () => {
  await redis.quit();
  console.log('Redis client disconnected');
  process.exit(0);
});

export default redis;
