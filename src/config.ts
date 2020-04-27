import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
    port: Number(process.env.API_PORT || 8080),
    sessionSecret: String(process.env.SESSION_SECRET),
};
export const dbConfig = {
    connectionString: String(process.env.DB_CONNECTION_STRING),
};
export const redisConfig = {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT || 6379),
    db: Number(process.env.REDIS_DB || 0),
    authPass: String(process.env.REDIS_AUTH_PASS),
};
