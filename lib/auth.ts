import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "social-app-session";

interface SessionPayload {
  userId: string;
  email: string;
}

export async function createSession(payload: SessionPayload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function destroySession() {
  (await cookies()).set(COOKIE_NAME, "", { expires: new Date(0), path: "/" });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    destroySession();
    return null;
  }
}

export async function protectRoute() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
