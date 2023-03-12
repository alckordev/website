import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { ref, remove, set, push } from "firebase/database";
import { database } from "../../lib/firebase";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3`;
const YOUTUBE_PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
const NUMBER_OF_VIDEOS = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryEndpoint = `/playlistItems?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&maxResults=${NUMBER_OF_VIDEOS}`;

  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}${queryEndpoint}&key=${YOUTUBE_API_KEY}`
    );

    const data: any = await response.json();

    // Save last videos to firebase
    const videos = data.items.map((v: any) => v);

    const videosRef = ref(database, "videos");

    await remove(videosRef);

    for (const video of videos) {
      const videoRef = push(videosRef);

      await set(videoRef, video.snippet);
    }

    res.status(200).json({ status: 200, message: "Latest videos data stored" });
  } catch (err) {
    res.status(500).json(err);
  }
}
