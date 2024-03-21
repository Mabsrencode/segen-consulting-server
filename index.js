require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db.js");
const userRoutes = require("./routes/user.route.js");
const contactRoutes = require("./routes/email.route.js");
const authRoutes = require("./routes/auth.route.js");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: "*",
    origin: "http://localhost:3000",
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

app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
