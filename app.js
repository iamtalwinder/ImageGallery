import express from "express";
import dotenv from "./dotenv";
import query from "./src/utils/mysqlQuery";

const app = express();

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
