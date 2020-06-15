import express from "express";
import query from "../database/mysqlQuery";
import verifyAuthToken from "../middleware/verifyAuthToken";

const router = express.Router();

router.get("/get-images", verifyAuthToken, async (req, res) => {
	try {
		let result;
		if (req.query.start && req.query.limit) {
			result = await query(
				`SELECT path FROM 
                (SELECT path FROM upload WHERE userId = ${req.user.userId}) AS u 
                LIMIT ${req.query.start}, ${req.query.limit};`
			);
		} else {
			result = await query(
				`SELECT path FROM upload WHERE userId=${req.user.userId}`
			);
		}
		res.status(200).send(result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error");
	}
});

export default router;
