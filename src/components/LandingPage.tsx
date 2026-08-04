"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiFacebook } from "react-icons/si";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full scale-110 object-cover lg:scale-100"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/80 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/45 lg:to-black/10" />

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-5 py-5 lg:px-10">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          Persona
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/signup"
            className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 lg:block"
          >
            Sign up to chat
          </Link>

          <Link
            href="/login"
            className="text-sm font-semibold text-white transition hover:text-fuchsia-300"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-end px-6 pb-10 lg:items-center lg:px-24 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[430px]"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              font-black
              text-4xl
              leading-[0.95]
              tracking-[-0.05em]
              sm:text-5xl
              lg:text-6xl
            "
          >
            <span className="text-white">
              Get access to
              <br />
              your favorite{" "}
            </span>

            <span
              className="
                animate-aurora
                bg-gradient-to-r
                from-white
                via-fuchsia-200
                via-violet-300
                to-fuchsia-500
                bg-[length:200%_200%]
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_18px_rgba(217,70,239,.35)]
              "
            >
              characters.
            </span>
          </motion.h1>

          {/* Desktop description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 hidden text-lg leading-7 text-gray-300 lg:block"
          >
            Sign up in just ten seconds.
          </motion.p>

          {/* Buttons */}
          <div className="mt-8 space-y-3 lg:mt-10 lg:space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="
                  group
                  flex
                  h-12
                  lg:h-14
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  lg:rounded-2xl
                  bg-white
                  px-5
                  lg:px-6
                  font-semibold
                  text-gray-900
                  shadow-[0_10px_35px_rgba(0,0,0,.35)]
                "
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  Continue with OpenAI
                </span>

                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="
                  group
                  flex
                  h-12
                  lg:h-14
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  lg:rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  px-5
                  lg:px-6
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition
                  hover:bg-white/15
                "
              >
                <span className="flex items-center gap-3">
                  <SiFacebook className="h-5 w-5 text-[#1877F2]" />
                  Continue with Meta AI
                </span>

                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Terms */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xs leading-5 text-gray-400 lg:mt-8 lg:text-sm"
          >
            By continuing, you agree to the{" "}
            <Link
              href="/terms"
              className="text-gray-300 underline underline-offset-2 hover:text-fuchsia-300"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-gray-300 underline underline-offset-2 hover:text-fuchsia-300"
            >
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}