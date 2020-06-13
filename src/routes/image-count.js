import express from "express";
import query from "../database/mysqlQuery";
import verifyAuthToken from "../verification/verifyAuthToken";

const router = express.Router();

router.get("/image-count", verifyAuthToken, async (req, res) => {
	try {
		const result = await query(
			`SELECT count(path) AS count FROM (SELECT path FROM upload WHERE userId=${req.user.userId}) AS u`
		);

		res.status(200).send({ count: result[0].count });
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error");
	}
});

export default router;
