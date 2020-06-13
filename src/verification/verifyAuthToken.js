import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
	const authToken = req.cookies.authToken;

	try {
		const verified = jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
};

export default verifyAuthToken;
