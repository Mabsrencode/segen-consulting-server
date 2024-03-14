require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.route.js");
const contactRoutes = require("./routes/email.route.js");
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: "*",
    origin: "http://localhost:4000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
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
