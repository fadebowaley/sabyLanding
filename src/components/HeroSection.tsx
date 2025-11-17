import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import {
  ArrowRight,
  Play,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

const HEADLINE_PRIMARY_WORDS = [
  "data",
  "payments",
  "systems",
  "operations",
  "intelligence",
  "insights",
  "networks",
  "workflow",
  "Africa",
  "enterprise",
];

const HEADLINE_SECONDARY_WORDS = [
  "decisions",
  "performance",
  "strategy",
  "advantage",
  "impact",
  "action",
  "intelligence",
  "innovation",
  "opportunity",
  "evolution",
];

const TYPE_SPEED = 65;
const BETWEEN_WORD_DELAY = 350;
const HOLD_DURATION = 1200;
const FADE_DELAY = 400;

interface HeroSectionProps {
  isDark: boolean;
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);
  const [primaryVisible, setPrimaryVisible] = useState(true);
  const [secondaryVisible, setSecondaryVisible] = useState(false);
  const [primaryDone, setPrimaryDone] = useState(false);
  const [secondaryDone, setSecondaryDone] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setPrimaryVisible(true);
    setSecondaryVisible(false);
    setPrimaryDone(false);
    setSecondaryDone(false);
  }, [cycleKey, mounted]);

  useEffect(() => {
    if (!mounted || !secondaryDone) return;

    const holdTimer = setTimeout(() => {
      setPrimaryVisible(false);
      setSecondaryVisible(false);
    }, HOLD_DURATION);

    const resetTimer = setTimeout(() => {
      setPrimaryIndex((prev) => (prev + 1) % HEADLINE_PRIMARY_WORDS.length);
      setSecondaryIndex((prev) => (prev + 1) % HEADLINE_SECONDARY_WORDS.length);
      setCycleKey((prev) => prev + 1);
    }, HOLD_DURATION + FADE_DELAY);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(resetTimer);
    };
  }, [secondaryDone, mounted]);

  const primaryWord = HEADLINE_PRIMARY_WORDS[primaryIndex];
  const secondaryWord = HEADLINE_SECONDARY_WORDS[secondaryIndex];

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? "bg-gray-950" : "bg-white"
      }`}>
      {/* Grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.85,
          backgroundImage: `linear-gradient(90deg, ${
            isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
          } 1px, transparent 1px), linear-gradient(180deg, ${
            isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
          } 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium mb-8">
          <span className="mr-2">🚀</span>
          New: AI-powered insights now available
        </div>

        {/* Main Headline */}
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 font-russo ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
          Turn your{" "}
          <span
            className={`text-blue-600 transition-opacity duration-500 ${
              primaryVisible ? "opacity-100" : "opacity-0"
            }`}>
            {mounted ? (
              <ReactTyped
                key={`primary-${cycleKey}`}
                strings={[primaryWord]}
                typeSpeed={TYPE_SPEED}
                backSpeed={0}
                showCursor={false}
                loop={false}
                onComplete={() => {
                  setPrimaryDone(true);
                  setSecondaryVisible(true);
                }}
              />
            ) : (
              primaryWord
            )}
          </span>{" "}
          into{" "}
          <span
            className={`text-blue-600 transition-opacity duration-500 ${
              secondaryVisible ? "opacity-100" : "opacity-0"
            }`}>
            {mounted && primaryDone ? (
              <ReactTyped
                key={`secondary-${cycleKey}`}
                strings={[secondaryWord]}
                typeSpeed={TYPE_SPEED}
                backSpeed={0}
                showCursor={false}
                loop={false}
                startDelay={BETWEEN_WORD_DELAY}
                onComplete={() => setSecondaryDone(true)}
              />
            ) : (
              secondaryWord
            )}
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
          Whether you're tracking payments, performance, or people, Saby helps
          you see the big picture. Our platform connects every node of your data
          ecosystem — sensors, APIs, forms, or databases — and transforms it
          into insights that predict, optimize, and guide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/subscribe"
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-colors">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-colors ${
              isDark
                ? "text-white hover:bg-gray-800"
                : "text-gray-900 hover:bg-gray-100"
            }`}>
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
              10K+
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
              Companies
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
              99.9%
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
              50M+
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
              Data Points
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
              24/7
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
              Support
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes binaryFlow {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
