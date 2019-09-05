import express from "express";
import helmet from "helmet";
import GcdController from "./controllers/GcdController";
import PostController from "./controllers/PostController";
import { port } from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/posts", PostController);
app.use("/gcd", GcdController);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on("SIGINT", () => {
    console.error("Shutting down API");
    process.exit();
});
