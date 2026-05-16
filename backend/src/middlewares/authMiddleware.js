import jwt from "jsonwebtoken";
import { config } from "../config.js";

const authGuard = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "JWT token is missing" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyUser = authGuard;
export const protect = authGuard;