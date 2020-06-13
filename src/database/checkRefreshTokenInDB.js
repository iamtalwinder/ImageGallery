import query from "./mysqlQuery";

const checkRefereshTokenInDB = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		await query(
			`SELECT userId FROM refreshToken WHERE refreshToken="${refreshToken}"`
		);
		next();
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
};

export default checkRefereshTokenInDB;
