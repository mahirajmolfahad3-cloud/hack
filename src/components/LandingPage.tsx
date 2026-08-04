"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiFacebook } from "react-icons/si";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 lg:from-black/75 lg:via-black/30 lg:to-transparent" />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10 lg:justify-start lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[430px]"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md"
          >
            AI Experience
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-5xl font-black leading-tight text-white lg:text-6xl"
          >
            Welcome
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 text-base leading-7 text-gray-300 lg:text-lg"
          >
            Create your account and begin your personalized AI experience.
          </motion.p>

          {/* Buttons */}
          <div className="mt-10 space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="group flex h-14 w-full items-center justify-between rounded-2xl bg-white px-6 font-semibold text-gray-900 shadow-2xl transition"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Continue with OpenAI
                </span>

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="group flex h-14 w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-6 font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <span className="flex items-center gap-3">
                  <SiFacebook className="h-5 w-5 text-[#1877F2]" />
                  Continue with Meta AI
                </span>

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-10 text-sm text-gray-300"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Sign in
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}