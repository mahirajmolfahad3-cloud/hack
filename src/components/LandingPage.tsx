"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
  type Easing,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Persona — Landing Page
 * Near-black canvas, one restrained violet accent, type-led hierarchy,
 * glass surfaces. Signature element: a floating "character stack" that
 * tilts toward the cursor. Depth comes from three bound layers — a
 * slow scroll-parallax video, a cursor-tracked ambient glow, and the
 * foreground content — rather than scattered decoration.
 */

const EASE: Easing = [0.16, 1, 0.3, 1] as const;

function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

/* Small hook: pulls a bounded element toward the cursor on hover. */
function useMagnetic(strength = 0.35, disabled = false) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.08] bg-black/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:h-20 lg:px-12">
        <a
          href="/"
          className="text-[15px] font-semibold tracking-[-0.02em] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
        >
          Persona
        </a>

      </div>
    </header>
  );
}

function CharacterStack({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const cards = [
    { name: "Aiko", role: "Creative partner" },
    { name: "Rho", role: "Debate coach" },
    { name: "Vale", role: "Late-night thinker" },
  ];

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14, mass: 0.5 });

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(py * -14);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      className="relative hidden h-[420px] w-full max-w-sm [perspective:1200px] lg:block"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {cards.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 40, rotate: -2 + i * 2 }}
            animate={{
              opacity: 1,
              y: [0, i % 2 === 0 ? -10 : 10, 0],
              rotate: -4 + i * 4,
            }}
            whileHover={{ scale: 1.035, zIndex: 20 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 + i * 0.15, ease: EASE },
              y: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              rotate: { duration: 0.8, delay: 0.5 + i * 0.15, ease: EASE },
              scale: { duration: 0.25, ease: EASE },
            }}
            className="absolute w-64 cursor-default overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            style={{
              top: `${i * 78}px`,
              left: `${i * 46}px`,
              zIndex: 10 - i,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-violet-400/70 to-fuchsia-500/40 ring-1 ring-white/20" />
              <div>
                <p className="text-[13px] font-medium text-white">{c.name}</p>
                <p className="text-[11px] text-white/45">{c.role}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  /* Ambient cursor-tracked glow */
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXs = useSpring(glowX, { stiffness: 80, damping: 20 });
  const glowYs = useSpring(glowY, { stiffness: 80, damping: 20 });
  const glowBg = useMotionTemplate`radial-gradient(560px circle at ${glowXs}px ${glowYs}px, rgba(139,92,246,0.14), transparent 70%)`;

  const onHeroMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  /* Slow parallax on the background video as the hero scrolls away */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "14%"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const primary = useMagnetic(0.25, !!prefersReducedMotion);

  return (
    <main
      ref={heroRef}
      onMouseMove={onHeroMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#07070a] text-white"
    >
      {/* Background video layer, slow parallax on scroll */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.video
          style={{ y: videoY }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/landing-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          className={`h-[112%] w-full object-cover opacity-[0.55] transition-opacity duration-[1200ms] ease-out ${
            videoReady ? "opacity-[0.55]" : "opacity-0"
          }`}
        >
          <source src="/videos/landing.mp4" type="video/mp4" />
        </motion.video>

        {/* Atmospheric wash, present even before/without video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 15% 20%, rgba(124,58,237,0.16) 0%, rgba(7,7,10,0) 55%), radial-gradient(90% 70% at 85% 80%, rgba(168,85,247,0.10) 0%, rgba(7,7,10,0) 55%)",
          }}
        />

        {/* Cursor-tracked ambient glow */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glowBg }} aria-hidden="true" />

        {/* Layered readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-[#07070a]/20 lg:bg-gradient-to-r lg:from-[#07070a] lg:via-[#07070a]/85 lg:to-[#07070a]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/60 via-transparent to-[#07070a]" />
      </div>

      {/* Filmic grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <Navbar />

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col-reverse items-center justify-end gap-10 px-6 pb-14 pt-28 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-12 lg:pb-0 lg:pt-0">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-full max-w-xl"
        >


          <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5rem]">
            <span className="block text-white">Talk to your</span>
            <span className="block bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              favorite character
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-md text-[15px] leading-7 text-white/55 lg:text-base"
          >
            Get access to
            your favorite characters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Primary CTA — magnetic pull toward cursor */}
            <motion.a
              href="/signup?provider=openai"
              onMouseMove={primary.onMouseMove}
              onMouseLeave={primary.onMouseLeave}
              style={primary.style}
              whileTap={{ scale: 0.97 }}
              className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-6 text-[14px] font-semibold text-black shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue with OpenAI
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-t from-violet-100 to-white transition-transform duration-500 group-hover:translate-y-0" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/signup?provider=meta"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-6 text-[14px] font-medium text-white/80 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <FacebookMark className="h-4 w-4 text-[#7c86ff] opacity-90" />
              Continue with Meta AI
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-8 text-[12px] leading-5 text-white/35"
          >
            By continuing, you agree to the{" "}
            <a href="/terms" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/60">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/60">
              Privacy Policy
            </a>
            .
          </motion.p>
        </motion.div>

        {/* Signature floating element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex w-full justify-center lg:w-auto lg:justify-end"
        >
          <CharacterStack prefersReducedMotion={!!prefersReducedMotion} />
        </motion.div>
      </section>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center lg:flex"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>

      {/* Bottom fade for scroll continuation cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#07070a] to-transparent" />
    </main>
  );
}