import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
	try {
		const verified = jwt.verify(req.authToken, process.env.AUTH_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
};

export default verifyAuthToken;
