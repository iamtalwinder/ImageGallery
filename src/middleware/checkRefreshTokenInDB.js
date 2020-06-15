import query from "../database/mysqlQuery";

const checkRefereshTokenInDB = async (req, res, next) => {
	try {
		await query(
			`SELECT userId FROM refreshToken WHERE refreshToken="${req.refreshToken}"`
		);
		next();
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
};

export default checkRefereshTokenInDB;
