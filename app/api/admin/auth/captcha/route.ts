import { NextResponse } from "next/server";
import { makeCaptcha } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { question, token } = await makeCaptcha();
    const res = NextResponse.json({ question });
    res.cookies.set("fl_captcha", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 5 * 60,
    });
    return res;
  } catch (err) {
    console.error("captcha route error:", err);
    return NextResponse.json({ error: "Captcha no disponible" }, { status: 500 });
  }
}
