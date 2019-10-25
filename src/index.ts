import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

import GcdController from "./controllers/GcdController";
import PostController from "./controllers/PostController";

import { port, redis_host, redis_port, redis_db, redis_auth_pass, session_secret } from "./config";
import database from "./database";

const app = express();

const sessionRedisStore = connectRedis(session);

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(
    session({
        secret: session_secret,
        name: "_session",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        store: new sessionRedisStore({
            host: redis_host,
            port: redis_port,
            client: redis.createClient({
                host: redis_host,
                port: redis_port,
                db: redis_db,
                auth_pass: redis_auth_pass,
            }),
            ttl: 86400,
        }),
    }),
);

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 40, // 40 requests per minute
    store: RedisStore({
        client: redis.createClient({
            host: redis_host,
            port: redis_port,
            db: redis_db,
            auth_pass: redis_auth_pass,
        }),
    }),
});

app.use("/posts", limiter, PostController);
app.use("/gcd", limiter, GcdController);

database
    .authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((err: any) => {
        console.error("Unable to connect to the database:", err);
    });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on("SIGINT", () => {
    console.error("Shutting down API");
    process.exit();
});
