import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import contactRoutes from "./routes/email.route.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

// const connection = mongoose.connection;

// try {
//   mongoose.connect(dbUrl);
// } catch (error) {
//   console.log(error.message);
// }

// connection.once("open", () => {
//   console.log("MongoDB connection successful");
// });

// connection.on("error", (error) => {
//   console.error("MongoDB connection error:", error);
// });

app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
