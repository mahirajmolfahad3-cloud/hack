# Auth MVP

A minimal, clean authentication starter built with:

- **Next.js 15** (App Router) + React + **TypeScript** (strict)
- **Tailwind CSS**
- **PostgreSQL** hosted on **Supabase**
- **Prisma** ORM
- **Zod** for input validation
- Session auth via signed, **HttpOnly** cookies (JWT, using `jose`)
- Deployable to **Vercel**

> ⚠️ **This is a learning project, not production-ready.** Passwords are
> stored in **plaintext** on purpose, with comments marking exactly where
> to add hashing (bcrypt/argon2). See "Security notes" below before you
> put real user data anywhere near this.

---

## 1. Project structure

```
auth-mvp/
├── prisma/
│   └── schema.prisma          # User model (id, email, password, createdAt)
├── src/
│   ├── app/
│   │   ├── api/auth/
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── signup/page.tsx
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx  # protected page
│   │   ├── layout.tsx
│   │   ├── page.tsx            # redirects to /login or /dashboard
│   │   └── globals.css
│   ├── components/
│   │   ├── AuthForm.tsx        # shared signup/login form
│   │   └── LogoutButton.tsx
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── session.ts          # cookie/JWT session helpers
│   │   └── validations.ts      # Zod schemas
│   └── middleware.ts           # protects /dashboard
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → Database**.
3. Copy the **Connection string** in "Connection pooling" mode (port
   `6543`) — this is your `DATABASE_URL`.
4. Copy the **direct connection string** (port `5432`) — this is your
   `DIRECT_URL`, used only by Prisma Migrate.
5. Both are used in `prisma/schema.prisma` already (`url` +
   `directUrl`), so no schema changes are needed.

---

## 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in:

- `DATABASE_URL` — pooled Supabase connection string
- `DIRECT_URL` — direct Supabase connection string
- `SESSION_SECRET` — a long random string, e.g.:
  ```bash
  openssl rand -base64 32
  ```

---

## 4. Install & run locally

```bash
npm install

# Push the schema to your Supabase database
npm run db:push

npm run dev
```

Visit `http://localhost:3000` — you'll be redirected to `/login`.

---

## 5. How auth works

- **Signup** (`POST /api/auth/signup`): validates input with Zod,
  checks for an existing email, creates the user, then signs a JWT and
  sets it as an HttpOnly cookie via `createSession`.
- **Login** (`POST /api/auth/login`): validates input, looks up the
  user, checks the password, creates a session cookie the same way.
- **Session cookie**: HttpOnly, `sameSite: lax`, `secure` in
  production, 7-day expiry. It can't be read by client-side JS, which
  mitigates XSS-based session theft.
- **Route protection**: `src/middleware.ts` intercepts any request to
  `/dashboard/*`, verifies the session cookie, and redirects to
  `/login?from=/dashboard` if it's missing or invalid. The dashboard
  page itself also re-checks the session server-side as a second
  layer of defense.
- **Logout** (`POST /api/auth/logout`): deletes the session cookie.

---

## 6. Security notes (please read)

This project intentionally simplifies password storage for learning
purposes:

- Passwords are saved **as-is** in the `password` column
  (`prisma/schema.prisma`) and compared with plain string equality in
  `src/app/api/auth/login/route.ts`.
- Every spot that needs to change is marked with a `⚠️ LEARNING
  PROJECT ONLY` comment in:
  - `prisma/schema.prisma`
  - `src/lib/validations.ts`
  - `src/app/api/auth/signup/route.ts`
  - `src/app/api/auth/login/route.ts`

To make this production-appropriate, at minimum:

1. `npm install bcrypt @types/bcrypt`
2. On signup: `const passwordHash = await bcrypt.hash(password, 12)` and
   store `passwordHash` instead of `password`.
3. On login: `await bcrypt.compare(password, user.password)` instead of
   `user.password === password`.
4. Add rate limiting to the auth routes (e.g. via Upstash or Vercel's
   edge middleware) to slow down brute-force attempts.
5. Consider email verification and password-reset flows.
6. Rotate `SESSION_SECRET` and invalidate sessions on password change.

---

## 7. Deploy to Vercel

1. Push this project to a Git repository.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env` (`DATABASE_URL`,
   `DIRECT_URL`, `SESSION_SECRET`) in **Project Settings → Environment
   Variables**.
4. Deploy. Vercel runs `npm install` → `postinstall` (`prisma
   generate`) → `next build` automatically.
5. Run `npx prisma db push` once (locally, pointed at production env
   vars, or via a one-off script) to make sure the `users` table
   exists in your Supabase database before first use.

---

## 8. Extending this project

- Add more protected routes by adding their path prefix to
  `PROTECTED_PATHS` in `src/middleware.ts`.
- Add fields to `User` in `prisma/schema.prisma`, then run
  `npm run db:push` (or `npm run db:migrate` for a tracked migration).
- Add new Zod schemas in `src/lib/validations.ts` for any new forms.
- The `/api/auth/me` route is available for client components that
  need to check auth state without a full page load.
