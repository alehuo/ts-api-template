import Express from "express";

const PostController = Express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * path:
 *  /posts:
 *    get:
 *      summary: Get posts
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description: All posts
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The post ID.
 *                  text:
 *                    type: string
 *                    description: The contents of the post.
 *        "429":
 *          description: Rate limit
 */
const getPosts: Express.RequestHandler = (req, res) =>
    res.status(200).json([
        {
            id: 1,
            text: "Hello",
        },
        {
            id: 2,
            text: "World",
        },
    ]);

PostController.get("/", getPosts);

export default PostController;
