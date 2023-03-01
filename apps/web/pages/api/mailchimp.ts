import { NextApiRequest, NextApiResponse } from "next";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_API_SERVER;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  const { email_address } = req.body;

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
  });

  try {
    const res = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address,
      status: "subscribed",
    });

    res.status(200).end(`Done ${res.email_address}`);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).end(err.message);

    res.status(500).end(err);
  }
}
