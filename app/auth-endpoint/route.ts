// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import liveblocks from "@/lib/liveblocks";
// import { adminDb } from "@/firebase-admin";

// export async function POS(req: NextRequest) {
//   const session = await auth();
//   if (!session || !session.sessionClaims?.email) {
//     throw new Error("Unauthorized");
//   }

//   //Get access to room;
//   const { room } = await req.json();

//   const { sessionClaims } = await auth();

//   const sessions = liveblocks.prepareSession(
//     // Ensure email exists and is a string
//     sessionClaims?.email || "",
//     {
//       userInfo: {
//         name: session?.sessionClaims?.fullName || "",
//         email: session?.sessionClaims?.email || "",
//         avatar: session?.sessionClaims?.image || "",
//       },
//     }
//   );

//   const usersInRoom = await adminDb
//     .collectionGroup("rooms")
//     .where("userId", "==", sessionClaims?.email)
//     .get();

//   const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
//   if (userInRoom?.exists) {
//     session.allow(room, session.FULL_ACCESS);
//     const { body, status } = await session.authorize();

//     return new Response(body, { status });
//   } else {
//     return NextResponse.json(
//       { message: "You are not in this room." },
//       { status: 403 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import liveblocks from "@/lib/liveblocks";
// import { adminDb } from "@/firebase-admin";

// export async function POST(req: NextRequest) {
//   const { userId, sessionClaims } = await auth();
//   if (!userId || !sessionClaims?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // Get access to room
//   const { room } = await req.json();

//   // Create Liveblocks session
//   const session = liveblocks.prepareSession(sessionClaims?.email, {
//     userInfo: {
//       name: sessionClaims?.fullName || "",
//       email: sessionClaims?.email || "",
//       avatar: sessionClaims?.image || "",
//     },
//   });

//   // Check if user has access to the room
//   const usersInRoom = await adminDb
//     .collectionGroup("rooms")
//     .where("userId", "==", sessionClaims.email)
//     .get();

//   const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

//   if (userInRoom?.exists) {
//     // Use the Liveblocks session methods
//     session.allow(room, session.FULL_ACCESS);
//     const { body, status } = await session.authorize();
//     console.log("You are in the room");
//     return new Response(body, { status });
//   } else {
//     return NextResponse.json(
//       { message: "You are not in this room." },
//       { status: 403 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";
import { adminDb } from "@/firebase-admin";
// import { UserJSON } from "@clerk/nextjs/server";

// Define an interface for the session claims
interface SessionClaims {
  email?: string;
  fullName?: string;
  image?: string;
}

export async function POST(req: NextRequest) {
  // Type assertion for auth result
  const { userId, sessionClaims } = (await auth()) as {
    userId: string | null;
    sessionClaims: SessionClaims | null;
  };

  if (!userId || !sessionClaims?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get access to room
  const { room } = await req.json();

  // Create Liveblocks session
  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullName || "",
      email: sessionClaims.email || "",
      avatar: sessionClaims.image || "",
    },
  });

  // Check if user has access to the room
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    // Use the Liveblocks session methods
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    console.log("You are in the room");
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room." },
      { status: 403 }
    );
  }
}
