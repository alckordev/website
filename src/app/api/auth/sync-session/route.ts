import { getUser } from "@/lib/server";
import server from "@/lib/server/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  try {
    // Create custom token for client SDK
    const customToken = await server.auth().createCustomToken(user.uid);
    return NextResponse.json({ token: customToken });
  } catch (err) {
    console.error("failed to create custom token", err);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
}
