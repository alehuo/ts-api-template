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

import swaggerUi from "swagger-ui-express";

import GcdController from "./controllers/GcdController";
import PostController from "./controllers/PostController";

import { redisConfig, appConfig } from "./config";
import database from "./database";
import { swaggerSpec } from "./swagger";

const app = express();

const sessionRedisStore = connectRedis(session);

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(
    session({
        secret: appConfig.sessionSecret,
        name: "_session",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        store: new sessionRedisStore({
            host: redisConfig.host,
            port: redisConfig.port,
            client: redis.createClient({
                host: redisConfig.host,
                port: redisConfig.port,
                db: redisConfig.db,
                // eslint-disable-next-line @typescript-eslint/camelcase
                auth_pass: redisConfig.authPass,
            }),
            ttl: 86400,
        }),
    }),
);

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 40, // 40 requests per minute
    store: new RedisStore({
        client: redis.createClient({
            host: redisConfig.host,
            port: redisConfig.port,
            db: redisConfig.db,
            // eslint-disable-next-line @typescript-eslint/camelcase
            auth_pass: redisConfig.authPass,
        }),
    }),
});

app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
    }),
);

app.use("/posts", limiter, PostController);
app.use("/gcd", limiter, GcdController);

database
    .authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

app.listen(appConfig.port, () => {
    console.log(`App listening on port ${appConfig.port}`);
});

process.on("SIGINT", () => {
    console.error("Shutting down API");
    process.exit();
});
