const isInProduction = process.env.NODE_ENV === "production";
const useSSL = process.env.useSSL?.trim() === "true" ? true : false;
const port = isInProduction ? 80 : 5000;
const mongoUrl = process.env.URL;

if (!mongoUrl || typeof mongoUrl !== "string") {
  throw new Error("Invalid Mongo Url");
}

enum Collections {
  urls = "urls",
}

export { Collections, isInProduction, useSSL, port, mongoUrl };
