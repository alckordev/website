import { NextApiRequest, NextApiResponse } from "next";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_API_SERVER;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  const { email_address, status } = req.body;

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
  });

  try {
    const data = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address,
      status,
    });

    res.status(200).json({ email_address: data.email_address });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
