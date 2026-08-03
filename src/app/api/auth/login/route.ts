import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // --------------------------------------------------------------------
  // ⚠️ LEARNING PROJECT ONLY: comparing the raw password with a plain
  // string equality check.
  //
  // In a real application, compare against a hash instead, e.g.:
  //
  //   import bcrypt from "bcrypt";
  //   const isValid = user && (await bcrypt.compare(password, user.password));
  // --------------------------------------------------------------------
  const isValid = user && user.password === password;

  if (!isValid) {
    // Same error for "no such user" and "wrong password" so we don't
    // leak which emails are registered.
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  await createSession({ userId: user.id, email: user.email });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
