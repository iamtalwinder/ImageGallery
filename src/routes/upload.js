import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import query from "../database/mysqlQuery";

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `./uploads/`);
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.split(" ").join("-");
		cb(null, uuidv4() + "-" + fileName);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(null, false);
			cb({ message: "jpeg or jpg or png or gif only" });
		}
	},
}).array("file");

router.post("/", (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			res.status(400).send(err.message);
		} else if (!req.files.length) {
			res.status(400).send("Select atleast one file");
		} else {
			try {
				let files = [];
				for (let file of req.files) {
					files.push([req.user.userId, file.path]);
				}
				await query("INSERT INTO upload (userId, path) VALUES ?", [files]);
				res.status(200).send("uploaded");
			} catch (err) {
				console.log(err);
				for (let file of req.files) {
					fs.unlink(file.path, (err) => {
						if (err) console.log(err);
					});
				}
				res.status(500).send("Internal server error");
			}
		}
	});
});

export default router;
