import Express from "express";

const PostController = Express.Router();

const getPosts: Express.RequestHandler = (req, res) => res.status(200).json([]);

PostController.get("/", getPosts);

export default PostController;
