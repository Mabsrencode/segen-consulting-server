require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./db.js");
const adminRoutes = require("./routes/user.route.js");
const contactRoutes = require("./routes/email.route.js");
const authRoutes = require("./routes/auth.route.js");
const jobOffers = require("./routes/offers.route");
const app = express();

// app.use((req, res, next) => {
//   if (req.headers.host.slice(0, 4) !== "www.") {
//     res.redirect(301, "https://www." + req.headers.host + req.url);
//   } else {
//     next();
//   }
// });
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
    frameguard: { action: "deny" },
    hsts: {
      maxAge: 31536000, // One year in seconds
      includeSubDomains: true, // Apply to all subdomains
      preload: true,
    },
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.removeHeader("Server");
  next();
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 200 requests per windows
});
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use((req, res, next) => {
//   if (req.protocol === "http") {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/job", jobOffers);
app.use("/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

const pingServer = () => {
  http
    .get("https://segen-consulting.onrender.com", (res) => {
      console.log("Pinged server, status code:", res.statusCode);
    })
    .on("error", (err) => {
      console.error("Error pinging server:", err.message);
    });
};
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
    cron.schedule("*/5 * * * *", pingServer);
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
