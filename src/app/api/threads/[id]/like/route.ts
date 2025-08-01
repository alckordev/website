import server from "@/lib/server/firebase";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/server";

const db = server.database();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const threadId = (await params).id;

  if (!threadId) {
    return NextResponse.json({ error: "Missing thread id" }, { status: 400 });
  }

  // Get the currently authenticated user via session cookie
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const uid = user.uid;

  const threadRef = db.ref(`threads/${threadId}`);
  const userLikeRef = db.ref(`users/${uid}/threads/likes/${threadId}`);

  try {
    // Check if user already liked the thread
    const userLikeSnap = await userLikeRef.get();
    const hasLiked = userLikeSnap.exists();

    // Transactionally update the thread's like count
    const transactionResult = await threadRef.transaction((current) => {
      if (current == null) {
        // Initialize if missing
        return { likes: hasLiked ? 0 : 1 };
      }
      const currentLikes =
        typeof current.likes === "number" ? current.likes : 0;
      if (hasLiked) {
        current.likes = Math.max(currentLikes - 1, 0);
      } else {
        current.likes = currentLikes + 1;
      }
      return current;
    });

    if (transactionResult.committed === false) {
      console.warn("Thread like transaction not committed", threadId);
    }

    // Toggle the user's like record
    if (hasLiked) {
      await userLikeRef.remove();
    } else {
      await userLikeRef.set(true);
    }

    // Read final like count
    const updatedThreadSnap = await threadRef.get();
    const updatedLikes = updatedThreadSnap.val()?.likes ?? 0;

    return NextResponse.json({
      liked: !hasLiked,
      likes: updatedLikes,
    });
  } catch (err) {
    console.error("toggle like error:", err);
    return NextResponse.json(
      { error: "Failed to toggle like", details: String(err) },
      { status: 500 }
    );
  }
}
