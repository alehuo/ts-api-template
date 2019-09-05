import Express from "express";
import Utils from "../modules/Utils.purs";

const GcdController = Express.Router();

const getGcd: Express.RequestHandler = (req, res) =>
    // @ts-ignore
    res.status(200).json({ gcd: Utils.gcd(req.params.first)(req.params.second) });

GcdController.get("/:first/:second", getGcd);

export default GcdController;
