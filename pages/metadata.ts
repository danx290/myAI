// pages/api/metadata.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const { data } = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const $ = cheerio.load(data);

    const metadata = {
      title: $('meta[property="og:title"]').attr("content") || $("title").text(),
      description: $('meta[property="og:description"]').attr("content") || $("meta[name='description']").attr("content"),
      image: $('meta[property="og:image"]').attr("content") || $('link[rel="icon"]').attr("href"),
      url,
    };

    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
}