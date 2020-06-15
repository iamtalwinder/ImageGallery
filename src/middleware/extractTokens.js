const extractTokens = (req, res, next) => {
	req.authToken = req.cookies.authToken;
	req.refershToken = req.cookies.refreshToken;
	next();
};

export default extractTokens;
