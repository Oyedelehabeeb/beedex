import { auth } from "@clerk/nextjs/server";
import { RoomProvider } from "@liveblocks/react";

export default async function DocLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = await auth();
  if (!session || !session.sessionClaims?.email) {
    throw new Error("Unauthorized");
  }
  return <RoomProvider id={id}>{children}</RoomProvider>;
}
