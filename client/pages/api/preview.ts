import { NextApiRequest, NextApiResponse } from "next";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  // Validate the incoming request.
  // if (req.query.secret !== process.env.PREVIEW_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  const location = await resolveHomePage();

  // Enable Preview Mode.
  res.setPreviewData({});

  // Redirect to the page.
  res.writeHead(307, { Location: location });
  res.end();
};

async function resolveHomePage(): Promise<string> {
  return "/";
}
