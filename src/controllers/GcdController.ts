import Express from "express";
import Utils from "../modules/Utils.purs";

const GcdController = Express.Router();

/**
 * @swagger
 * tags:
 *   name: GCD
 *   description: Calculating the greatest common divisor
 */

/**
 * @swagger
 * path:
 *  /gcd/{first}/{second}:
 *    get:
 *      summary: Calculates the greatest common divisor.
 *      tags: [GCD]
 *      parameters:
 *      - in: path
 *        name: first
 *        schema:
 *          type: integer
 *        required: true
 *      - in: path
 *        name: second
 *        schema:
 *          type: integer
 *        required: true
 *      responses:
 *       "200":
 *          description: The greatest common divisor.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  gcd:
 *                    type: integer
 *                    description: The greatest common divisor.
 *       "429":
 *          description: Rate limit
 */
const getGcd: Express.RequestHandler = (req, res) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    res.status(200).json({ gcd: Utils.gcd(req.params.first)(req.params.second) });

GcdController.get("/:first/:second", getGcd);

export default GcdController;
