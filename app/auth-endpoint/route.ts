import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";
import { adminDb } from "@/firebase-admin";

export async function POS(req: NextRequest) {
  const session = await auth();
  if (!session || !session.sessionClaims?.email) {
    throw new Error("Unauthorized");
  }

  //Get access to room;
  const { room } = await req.json();

  const { sessionClaims } = await auth();

  const sessions = liveblocks.prepareSession(
    // Ensure email exists and is a string
    sessionClaims?.email || "",
    {
      userInfo: {
        name: session?.sessionClaims?.fullName || "",
        email: session?.sessionClaims?.email || "",
        avatar: session?.sessionClaims?.image || "",
      },
    }
  );

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
  }
}
