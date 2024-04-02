require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db.js");
const adminRoutes = require("./routes/user.route.js");
const contactRoutes = require("./routes/email.route.js");
const authRoutes = require("./routes/auth.route.js");
const jobOffers = require("./routes/offers.route");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

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
app.use("/job", jobOffers);
app.use("/admin", adminRoutes);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
