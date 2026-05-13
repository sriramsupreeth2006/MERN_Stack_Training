import { Router } from "express";

const shortURLRouter = Router();

shortURLRouter.post("/", (req, res) => {
  res.status(200).json({ shortUrl: "example" });
});

export default shortURLRouter;