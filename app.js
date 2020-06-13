import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "./dotenv";

//Import routes
import signup from "./src/routes/signup";
import signin from "./src/routes/signin";

const app = express();

app.use(express.json());
app.use(cookieParser());

//Add routes
app.use("/api/user", signup);
app.use("/api/user", signin);

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
