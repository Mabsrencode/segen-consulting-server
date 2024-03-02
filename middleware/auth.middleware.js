import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secretToken = process.env.REACT_APP_SECRET_TOKEN;
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing." });
    }

    let decodedData;

    try {
      decodedData = jwt.verify(token, secretToken);
      console.log("Decoded Data:", decodedData);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token." });
    }

    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export default auth;
