"use client";

const creditTiers = [
    {
        name: "IGNITION",
        credits: "$500",
        subtext: "For pre-revenue & hobbyists.",
        isHighest: false,
    },
    {
        name: "VELOCITY",
        credits: "$2,000",
        subtext: null,
        isHighest: false,
    },
    {
        name: "HYPERDRIVE",
        credits: "$10,000",
        subtext: "Custom engineering included.",
        isHighest: true,
    },
];

export default function HUDFeatures() {
    return (
        <div className="space-y-6">
            {/* 1. We Build Models For You - Key Value Prop (Highlighted) */}
            <div className="p-5 rounded-xl bg-card border border-primary/40 hover:border-primary/60 transition-colors group">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg
                            className="w-6 h-6 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                            We Build Models For You.
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Need a custom fine-tune? We don&apos;t just give you an API, we engineer the model for your use case.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Switching Bonus Card */}
            <div className="p-4 rounded-xl bg-card border border-primary/30 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">🎁</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-1">Switching Bonus</h3>
                        <p className="text-sm text-text-secondary">
                            Switching providers? We match your API spend{" "}
                            <span className="text-primary font-semibold">+ 20% bonus</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. The Wiro Multiplier - Credit Tiers */}
            <div className="p-5 rounded-xl bg-card border border-card-border">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">
                        Credit Tiers
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                    The Wiro Multiplier
                </h3>
                <p className="text-xs text-text-muted mb-5">
                    Get more credits than anywhere else.
                </p>

                {/* Tier Rows */}
                <div className="space-y-3">
                    {creditTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`p-4 rounded-lg bg-surface-elevated border ${tier.isHighest ? "border-primary/40" : "border-transparent"
                                }`}
                        >
                            {/* Tier Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white tracking-wide">
                                        {tier.name}
                                    </span>
                                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary rounded-full">
                                        2x Market Std.
                                    </span>
                                </div>
                                <span className={`text-lg font-bold text-primary ${tier.isHighest ? "animate-pulse-price text-glow" : ""}`}>
                                    {tier.credits}
                                </span>
                            </div>

                            {/* Subtext */}
                            {tier.subtext && (
                                <p className="mt-2 text-xs text-text-muted">{tier.subtext}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <p className="mt-5 pt-4 border-t border-card-border text-xs text-text-secondary text-center">
                    We match <span className="text-primary font-medium">2x the credits</span> of any other provider.
                </p>
            </div>

            {/* 4. Inference Speed Benchmark */}
            <div className="p-5 rounded-xl bg-card border border-card-border">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">
                        Live Benchmark
                    </span>
                </div>

                <h3 className="text-sm font-medium text-text-secondary mb-4">
                    Inference Speed (Open Source Models)
                </h3>

                {/* Comparison Bars */}
                <div className="space-y-3">
                    {/* Market Standard Bar */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-muted">Market Standard</span>
                            <span className="text-text-muted font-mono">1x</span>
                        </div>
                        <div className="h-3 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gray-500 rounded-full transition-all duration-1000"
                                style={{ width: "40%" }}
                            />
                        </div>
                    </div>

                    {/* Wiro Bar */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-white font-medium">Wiro</span>
                            <span className="text-primary font-mono font-semibold">2.5x Faster</span>
                        </div>
                        <div className="h-3 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,255,133,0.5)]"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Caption */}
                <p className="mt-4 text-xs text-text-secondary">
                    Ultra-low latency. <span className="text-primary font-semibold">2.5x faster</span> inference on models like Flux & SDXL.
                </p>
            </div>

            {/* 5. One API Code Snippet */}
            <div className="rounded-xl bg-[#0a0a0a] border border-card-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-card-border">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs font-mono text-text-muted">wiro.js</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                        One API. Hundreds of Models.
                    </span>
                </div>
                <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
                    {/* Comment */}
                    <div className="text-gray-500">
                        {"// Switch models by changing one line"}
                    </div>
                    {/* Code */}
                    <div className="mt-2">
                        <span className="text-purple-400">const</span>
                        <span className="text-white"> response </span>
                        <span className="text-purple-400">=</span>
                        <span className="text-purple-400"> await</span>
                        <span className="text-cyan-300"> wiro</span>
                        <span className="text-white">.</span>
                        <span className="text-yellow-300">run</span>
                        <span className="text-white">({"{"}</span>
                    </div>
                    <div className="ml-4">
                        <span className="text-cyan-300">model</span>
                        <span className="text-white">: </span>
                        <span className="text-primary">&quot;flux-pro&quot;</span>
                        <span className="text-white">, </span>
                        <span className="text-gray-500">{"// or \"llama-3-70b\", \"svd-xt\"..."}</span>
                    </div>
                    <div className="ml-4">
                        <span className="text-cyan-300">prompt</span>
                        <span className="text-white">: </span>
                        <span className="text-primary">&quot;A cyberpunk city...&quot;</span>
                    </div>
                    <div>
                        <span className="text-white">{"})"}</span>
                        <span className="text-white">;</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
