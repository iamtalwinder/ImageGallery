import jwt from "jsonwebtoken";

export default (userId, authExpiration = "1m", refreshExpiration = "1d") => {
	const authToken = jwt.sign(
		{
			userId: userId,
		},
		process.env.AUTH_TOKEN_SECRET,
		{ expiresIn: authExpiration }
	);

	const refreshToken = jwt.sign(
		{
			userId: userId,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: refreshExpiration }
	);

	return [authToken, refreshToken];
};
