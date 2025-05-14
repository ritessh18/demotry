import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import cookieParser from "cookie-parser";
import useRoute from "./routes/user.route.js";
import cors from "cors";
import courseRoute from "./routes/course.route.js"

dotenv.config({});

// call database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

//
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//apis
app.use("/api/v1/user", useRoute); // (type of middleware)
app.use("/api/v1/course", courseRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
