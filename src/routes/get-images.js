import express from "express";
import query from "../database/mysqlQuery";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		let result;
		if (req.query.start && req.query.limit) {
			result = await query(
				`SELECT path FROM 
                (SELECT path FROM upload WHERE userId = ${req.user.userId} ORDER BY date) AS u 
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
