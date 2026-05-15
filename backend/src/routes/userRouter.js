import { Router } from "express";
import { ShortURL } from "../models/shorturl.model.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/my/urls", verifyUser, async (req, res) => {
  try {
    const shortURLs = await ShortURL.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ shortURLs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user URLs", error: error.message });
  }
});

export default userRouter;