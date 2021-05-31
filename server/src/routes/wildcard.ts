import { scrapeMetaTags } from "../handlers/handleUrlMeta";
import { Urls } from "../entity/Urls";
import express from "express";
const wildcardRoute = express.Router();

wildcardRoute.get("*", async (req, res) => {
  const slogan = req.url.substring(1);

  if (!slogan) {
    res.status(400).json({ message: "Slogan was empty" });
    return;
  } else if (slogan.trim().startsWith("/v1/url")) {
    res.status(400).json({ message: "Slogan can not start with /v1/url" });
    return;
  }

  const result = await Urls.findOne({ slogan: slogan.toLowerCase() });

  if (!result) {
    res.status(404).json({ message: "Slogan not found" });
    return;
  }

  res.redirect(result.originalUrl);
});

export { wildcardRoute };
