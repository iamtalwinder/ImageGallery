import jwt from "jsonwebtoken";
import query from "../database/mysqlQuery";
import signTokens from "../utils/signTokens";

const verifyAuthToken = async (req, res, next) => {
	try {
		const verified = jwt.verify(
			req.cookies.authToken,
			process.env.AUTH_TOKEN_SECRET
		);
		req.user = verified;
		next();
	} catch (err) {
		try {
			const verified = jwt.verify(
				req.cookies.refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);

			const result = await query(
				`SELECT userId FROM refreshToken WHERE refreshToken="${req.cookies.refreshToken}"`
			);

			if (!result.length) throw err;

			req.user = verified;

			const [authToken] = signTokens(req.user.userId);

			res.cookie("authToken", authToken, {
				httpOnly: true,
			});
			next();
		} catch (err) {
			console.log(err);
			return res.status(401).send("Invalid token!");
		}
	}
};

export default verifyAuthToken;
