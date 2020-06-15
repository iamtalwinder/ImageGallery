import express from "express";
import jwt from "jsonwebtoken";

import verifyRefreshToken from "../middleware/verifyRefreshToken";
import checkRefereshTokenInDB from "../middleware/checkRefreshTokenInDB";

const router = express.Router();

router.get(
	"/refresh-auth-token",
	verifyRefreshToken,
	checkRefereshTokenInDB,
	(req, res) => {
		const authToken = jwt.sign(
			{
				userId: req.user.userId,
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);

		res.cookie("authToken", authToken, {
			httpOnly: true,
		});

		return res.status(200).send("Auth token has been refreshed.");
	}
);

module.exports = router;
