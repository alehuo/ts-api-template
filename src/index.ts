import express from "express";
import helmet from "helmet";

import { getPosts } from "./controllers/PostController";

const app = express();
app.use(helmet());

const port = Number(process.env.PORT || 8080);

app.get("/posts", getPosts);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
