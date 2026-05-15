import { Router } from "express";
import { ShortURL } from "../models/shorturl.model.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();

shortURLRouter.post("/", verifyUser, async (req, res) => {
  try {
    const { originalUrl, customUrl, linkTitle, expiryDate } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    const shortCode = customUrl?.trim() || Math.random().toString(36).substring(2, 8);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const shortURL = await ShortURL.create({
      originalUrl,
      shortCode,
      userId: req.user.id,
      title: linkTitle || "",
      expiresAt: expiryDate || null,
    });

    return res.status(201).json({
      shortUrl: `${baseUrl}/api/s/${shortURL.shortCode}`,
      shortURL,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create short URL", error: error.message });
  }
});

shortURLRouter.patch("/s/:shortCode", verifyUser, async (req, res) => {
  try {
    const { shortCode } = req.params;
    const updates = req.body;

    const shortURL = await ShortURL.findOneAndUpdate(
      { shortCode, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!shortURL) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    return res.status(200).json({ shortURL });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update short URL", error: error.message });
  }
});

export default shortURLRouter;