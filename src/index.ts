import express from "express";
import helmet from "helmet";

// Including PureScript modules
// @ts-ignore
import Utils from "purs-loader?modules!./modules/Utils.purs";

import { getPosts } from "./controllers/PostController";

const app = express();
app.use(helmet());

const port = Number(process.env.PORT || 8080);

app.get("/posts", getPosts);

app.get("/", (req, res) => {
    return res.send("Try /posts or /gcd/:first/:second");
});

app.get("/gcd/:first/:second", (req, res) => {
    return res.status(200).json({ gcd: Utils.gcd(req.params.first)(req.params.second) });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
