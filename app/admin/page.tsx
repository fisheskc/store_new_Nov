import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminGuard() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isAdmin) redirect("/");

  return null;
}