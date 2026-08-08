"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "signup" | "login";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";
  const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      if (isSignup) {
        // Account is created successfully, but we intentionally show a fake
        // failure message, clear the fields, and keep the user on the signup page.
        setEmail("");
        setPassword("");
        setError(
          "The email address or Password you entered isn't connected to an account, try again"
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-gray-400"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-[#3e3e3e] bg-[#1e1e1e] px-3.5 py-2.5 text-sm text-white placeholder-gray-500 shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-gray-400"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
          minLength={isSignup ? 8 : undefined}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-[#3e3e3e] bg-[#1e1e1e] px-3.5 py-2.5 text-sm text-white placeholder-gray-500 shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder={isSignup ? "At least 8 characters" : "Your password"}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? isSignup
            ? "Creating account..."
            : "Signing in..."
          : isSignup
            ? "Create account"
            : "Sign in"}
      </button>
    </form>
  );
}