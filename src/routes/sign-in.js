import express from "express";
import bcrypt from "bcryptjs";
import query from "../database/mysqlQuery";
import signinValidation from "../validation/signin";
import signTokens from "../utils/signTokens";

const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = signinValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		let result = await query(
			`SELECT *FROM user WHERE email="${req.body.email}"`
		);

		//No email found
		if (!result.length) {
			return res.status(400).send("Wrong E-mail or password.");
		}

		//Compare password
		const validPass = await bcrypt.compare(
			req.body.password,
			result[0].password
		);

		//Incorrect password
		if (!validPass) {
			return res.status(400).send("Wrong E-mail or password.");
		}

		const [authToken, refreshToken] = signTokens(result[0].userId);

		//Push token in database
		await query(
			`INSERT INTO refreshToken VALUES (${result[0].userId}, "${refreshToken}")`
		);

		res.cookie("authToken", authToken, {
			httpOnly: true,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
		});

		res.status(200).send({
			expiresIn: 15,
			message: `Welcome ${result[0].fname} ${result[0].lname}`,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal server error");
	}
});

export default router;
