"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import ApplicationForm from "@/components/ApplicationForm";
import HUDFeatures from "@/components/HUDFeatures";

// Placeholder startup logos
const trustedLogos = [
  { name: "TechFlow", initials: "TF" },
  { name: "NeuralOps", initials: "NO" },
  { name: "ArcLabs", initials: "AL" },
  { name: "PixelMind", initials: "PM" },
  { name: "DataForge", initials: "DF" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"info" | "apply">("info");

  return (
    <LayoutWrapper>
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-card-border px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === "info"
              ? "bg-primary text-background"
              : "bg-card text-text-secondary hover:text-white"
              }`}
          >
            Why Wiro?
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === "apply"
              ? "bg-primary text-background"
              : "bg-card text-text-secondary hover:text-white"
              }`}
          >
            Apply Now →
          </button>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Value Props (Hidden on mobile when "Apply" tab is active) */}
        <div className={`w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start px-6 lg:px-12 py-8 lg:py-12 overflow-y-auto ${activeTab === "apply" ? "hidden lg:flex" : "flex"
          }`}>
          <div className="max-w-lg">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></span>
              <span className="text-sm text-primary font-medium">Now accepting applications</span>
            </div>

            {/* H1 - Top Priority */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Powering the Next Generation of AI Startups.
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-text-secondary mb-6 leading-relaxed">
              Build apps with 100+ Generative AI models using{" "}
              <span className="text-primary font-semibold">One API</span>. No server management. Startups get up to{" "}
              <span className="text-primary font-semibold">$10,000</span> in API credits.
            </p>

            {/* Trusted By Strip */}
            <div className="mb-8">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
                Powering next-gen AI startups:
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {trustedLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="w-10 h-10 rounded-lg bg-surface-elevated border border-card-border flex items-center justify-center opacity-50 hover:opacity-80 transition-opacity"
                    title={logo.name}
                  >
                    <span className="text-xs font-bold text-text-muted">{logo.initials}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HUD Features Grid */}
            <HUDFeatures />
          </div>
        </div>

        {/* Right Side - Form (Hidden on mobile when "Info" tab is active) */}
        <div className={`w-full lg:w-[60%] min-h-screen flex items-start justify-center px-6 lg:px-12 py-8 lg:py-24 ${activeTab === "info" ? "hidden lg:flex" : "flex"
          }`}>
          <div className="w-full max-w-xl glass-card p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-2">Apply for Credits</h2>
            <p className="text-text-secondary mb-8">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <ApplicationForm />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
