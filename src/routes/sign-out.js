import express from "express";
import query from "../database/mysqlQuery";
import verifyAuthToken from "../verification/verifyAuthToken";

const router = express.Router();

router.delete("/sign-out", verifyAuthToken, async (req, res) => {
	try {
		await query(`DELETE FROM refreshToken WHERE userId="${req.user.userId}"`);
		res.clearCookie("authToken");
		res.clearCookie("refreshToken");
		return res.status(200).send("signout successful");
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal server error");
	}
});

export default router;
