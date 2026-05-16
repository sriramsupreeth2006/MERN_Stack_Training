import { Router } from "express";
import { ShortURL } from "../models/shorturl.model.js";
import { protect } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customUrl, linkTitle, expiryDate } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    const shortCode =
      customUrl?.trim() || Math.random().toString(36).substring(2, 8);

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const shortURL = await ShortURL.create({
      originalUrl,
      shortCode,
      userId: req.user.id,
      title: linkTitle || "",
      expiresAt: expiryDate || null,
    });

    return res.status(201).json({
      shortUrl: `${baseUrl}/api/short-url/s/${shortURL.shortCode}`,
      shortURL,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create short URL",
      error: error.message,
    });
  }
};

const redirectToLongUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const shortURL = await ShortURL.findOne({
      shortCode,
      isActive: true,
    });

    if (!shortURL) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    if (shortURL.expiresAt && new Date(shortURL.expiresAt) < new Date()) {
      return res.status(410).json({ message: "Short URL has expired" });
    }

    return res.redirect(shortURL.originalUrl);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to redirect short URL",
      error: error.message,
    });
  }
};

shortURLRouter.post("/", protect, createShortUrl);
shortURLRouter.get("/s/:shortCode", redirectToLongUrl);

export default shortURLRouter;