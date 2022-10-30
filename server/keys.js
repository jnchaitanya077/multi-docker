module.exports = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    pgUserName: process.env.DB_USER,
    pgPassword: process.env.DB_PASSWORD,
    pgPort: process.env.DB_PORT,
    pgDatabase: process.env.DATABASE,
    pgHost: process.env.DB_HOST,
    servePort: process.env.PORT
}