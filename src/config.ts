export const port = Number(process.env.API_PORT || 8080);
export const dbConnectionString = String(process.env.DB_CONNECTION_STRING);
export const redis_host = String(process.env.REDIS_HOST);
export const redis_port = Number(process.env.REDIS_PORT || 6379);
export const redis_db = Number(process.env.REDIS_DB || 0);
export const redis_auth_pass = String(process.env.REDIS_AUTH_PASS);
export const session_secret = String(process.env.SESSION_SECRET);
