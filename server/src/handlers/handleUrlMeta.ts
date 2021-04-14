import getUrls from "get-urls";
import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from "fs";

export async function scrapeMetaTags(url: string) {
  const res = await fetch(url);

  const html = await res.text();
  const $ = cheerio.load(html);

  const getMetaTag = (name: string) =>
    $(`meta[name=${name}]`).attr("content") ||
    $(`meta[name="og:${name}"]`).attr("content") ||
    $(`meta[property="og:${name}"]`).attr("content");

  return {
    url,
    title: getMetaTag("title") ?? $("title").first().text(),
    favicon: $('link[rel="shortcut icon"]').attr("href"),
    description: getMetaTag("description"),
    image: getMetaTag("image"),
    hostname: getMetaTag("hostname"),
    site_name: getMetaTag("site_name"),
  };
}
