import express from "express";
import "./dotenv";

//Import middlewares
import cookieParser from "cookie-parser";
import extractTokens from "./src/middleware/extractTokens";

//Import routes
import signup from "./src/routes/sign-up";
import signin from "./src/routes/sign-in";
import signout from "./src/routes/sign-out";
import refreshAuthToken from "./src/routes/refresh-auth-token";
import upload from "./src/routes/upload";
import imageCount from "./src/routes/image-count";
import getImages from "./src/routes/get-images";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(extractTokens);

//Add routes
app.use("/api/user", signup);
app.use("/api/user", signin);
app.use("/api/user", signout);
app.use("/api/user", refreshAuthToken);
app.use("/api/user", upload);
app.use("/api/user", imageCount);
app.use("/api/user", getImages);

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
