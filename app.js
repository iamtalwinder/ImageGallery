import express from "express";
import path from "path";
import "./dotenv";

//Import middlewares
import cookieParser from "cookie-parser";
import verifyAuthToken from "./src/middleware/verifyAuthToken";

//Import routes
import signup from "./src/routes/sign-up";
import signin from "./src/routes/sign-in";
import signout from "./src/routes/sign-out";
import upload from "./src/routes/upload";
import imageCount from "./src/routes/image-count";
import getImages from "./src/routes/get-images";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Add routes
app.use("/api/user/sign-up", signup);
app.use("/api/user/sign-in", signin);
app.use("/api/user/sign-out", verifyAuthToken, signout);
app.use("/api/user/upload", verifyAuthToken, upload);
app.use("/api/user/image-count", verifyAuthToken, imageCount);
app.use("/api/user/get-images", verifyAuthToken, getImages);

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
