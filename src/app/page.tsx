import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCookieName } from "../lib/cookies";
import { verifyToken } from "../lib/jwt";

export default async function Home() {
  const token = (await cookies()).get(getCookieName())?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token);
    redirect("/dashboard");
  } catch {
    redirect("/login");
  }
}
