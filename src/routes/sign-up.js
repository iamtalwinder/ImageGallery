import express from "express";
import bcrypt from "bcryptjs";
import query from "../database/mysqlQuery";
import signupValidation from "../validation/signup";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
	const { error } = signupValidation(req.body);
	if (error) return res.status(406).send(error.details[0].message);

	if (req.body.password !== req.body.confirmPassword)
		return res
			.status(406)
			.send('"Password" and "Confirm Password" fileds must be same');

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const userInformation = [
			[req.body.fname, req.body.lname, req.body.email, hashedPassword],
		];

		await query("INSERT INTO user (fname, lname, email, password) VALUES ?", [
			userInformation,
		]);

		return res.status(201).send("User has been created.");
	} catch (err) {
		if (err.errno === 1062) {
			return res.status(400).send("User with the same email already exists");
		}

		console.log(err);
		return res.status(500).send("Internal server error");
	}
});

export default router;
