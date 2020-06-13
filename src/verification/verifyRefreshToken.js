import jwt from "jsonwebtoken";

const verifyRefreshToken = (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid refresh token!");
	}
};

export default verifyRefreshToken;
