import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  // --------------------------------------------------------------------
  // ⚠️ LEARNING PROJECT ONLY: storing the raw password.
  //
  // In a real application, hash it first, e.g. with bcrypt:
  //
  //   import bcrypt from "bcrypt";
  //   const passwordHash = await bcrypt.hash(password, 12);
  //   ... then save `passwordHash` instead of `password` below.
  // --------------------------------------------------------------------
  const user = await prisma.user.create({
    data: {
      email,
      password, // plaintext — see warning above
    },
  });

  await createSession({ userId: user.id, email: user.email });

  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    { status: 201 }
  );
}
