import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import query from "../utils/mysqlQuery";
import signinValidation from "../validation/signin";

const router = express.Router();

router.post("/sign-in", async (req, res) => {
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

		//Create auth token
		const authToken = jwt.sign(
			{
				userId: result[0].userId,
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);

		//Create refresh token
		const refreshToken = jwt.sign(
			{
				userId: result[0].userId,
			},
			process.env.REFRESH_TOKEN_SECRET
		);

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
