import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/urls.routes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
      });
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });

// Welcome to Render Backend
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Render Backend!");
});

// Health Check Endpoint
app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

// Router Modules middlewares (These MUST be before notFound and errorHandler)
app.use("/api/user", userRouter);
app.use("/api/urls", urlRouter);






// Error handling middleware (These MUST be last)
app.use(notFound);
app.use(errorHandler);
