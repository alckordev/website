import { NextResponse } from "next/server";
import z from "zod/v4";

// curl -X POST \
//   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}/members?skip_merge_validation=<SOME_BOOLEAN_VALUE>' \
//   --user "anystring:${apikey}"' \
//   -d '{"email_address":"","email_type":"","status":"subscribed","merge_fields":{},"interests":{},"language":"","vip":false,"location":{"latitude":0,"longitude":0},"marketing_permissions":[],"ip_signup":"","timestamp_signup":"","ip_opt":"","timestamp_opt":"","tags":[]}'

const schema = z.object({
  email: z.email(),
  status: z.enum([
    "subscribed",
    "unsubscribed",
    "cleaned",
    "pending",
    "transactional",
  ]),
});

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER!;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID!;

if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER || !MAILCHIMP_LIST_ID) {
  throw new Error("Missing Mailchimp configuration in environment");
}

const getAuthHeader = () => {
  const token = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString(
    "base64"
  );
  return `Basic ${token}`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email: email_address, status } = parsed.data;

    const fetched = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members?skip_merge_validation=true`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address,
          status,
        }),
      }
    );

    const data = await fetched.json();

    if (!fetched.ok) {
      return NextResponse.json(
        { error: "Mailchimp error", ...data },
        { status: fetched.status }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        email: data.email_address,
        id: data.id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("subscribe error:", err);
    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 }
    );
  }
}
