import { scrapeMetaTags } from "../handlers/handleUrlMeta";
import { Urls } from "../entity/Urls";
import express from "express";
const urlRoute = express.Router();

urlRoute.get("/url", async (req, res) => {
  const { slogan } = req.query;

  if (typeof slogan !== "string") {
    res.status(400).json({ message: "Params not specified" });
    return;
  } else if (slogan.trim().length == 0) {
    res.status(400).json({ message: "Slogan was empty" });
    return;
  }

  const result = await Urls.findOne({ slogan: slogan.toLowerCase() });

  if (!result) {
    res.status(404).json({ message: "Slogan not found" });
    return;
  }

  res.redirect(result.originalUrl);
});

urlRoute.get("/v1/url", async (req, res) => {
  const { slogan } = req.query;

  if (typeof slogan !== "string") {
    res.status(400).json({ message: "Params not specified" });
    return;
  } else if (slogan.trim().length == 0) {
    res.status(400).json({ message: "Slogan was empty" });
    return;
  }

  const result = await Urls.findOne({ slogan: slogan.toLowerCase() });

  if (!result) {
    res.status(404).json({ message: "Slogan not found" });
    return;
  }

  try {
    const data = await scrapeMetaTags(result.originalUrl);

    res.send({ ...data });
  } catch (error) {
    res.status(400).send(error);
  }
});

urlRoute.post("/url", async (req, res) => {
  const { originalUrl, slogan } = req.query;

  if (typeof slogan !== "string" || typeof originalUrl !== "string") {
    res.status(400).json({ message: "Params not specified" });
    return;
  } else if (slogan.trim().length == 0 || originalUrl.trim().length == 0) {
    res.status(400).json({ message: "Slogan or Original Url was empty" });
    return;
  }

  const result = await Urls.findOne({ slogan: slogan.toLowerCase() });

  if (result) {
    res.status(409).json({ message: "Slogan already in use" });
    return;
  }

  const url = Urls.create({
    slogan: slogan.toLowerCase(),
    originalUrl: originalUrl,
  });

  const urlRes = await Urls.save(url);

  res.json(urlRes);
});

export { urlRoute };
