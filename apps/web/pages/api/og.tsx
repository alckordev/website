// import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../../public/assets/fonts/poppins.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function habdler(res: NextRequest) {
  try {
    const fontData = await font;

    const { searchParams } = new URL(res.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")
      : "Aprende Programación Frontend y Backend";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: "url(https://alckor.dev/assets/og-image.png)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              marginTop: 176,
              marginLeft: 120,
              fontSize: 48,
              fontFamily: "Poppins",
              overflow: "hidden",
              lineHeight: 1,
              color: "#fff",
              maxWidth: 500,
              height: 278,
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Poppins",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (err: any) {
    console.log(err.message);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
