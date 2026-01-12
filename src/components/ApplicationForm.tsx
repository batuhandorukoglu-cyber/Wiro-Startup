"use client";

import { useState } from "react";

type ProductStage = "mvp" | "live" | null;
type Infrastructure = "" | "none" | "aws" | "fal" | "replicate" | "huggingface";

interface FormData {
    fullName: string;
    email: string;
    githubLinkedin: string;
    companyName: string;
    projectUrl: string;
    productStage: ProductStage;
    infrastructure: Infrastructure;
    gpuSpend: number;
    description: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    companyName?: string;
    productStage?: string;
    infrastructure?: string;
    description?: string;
}

const TOTAL_STEPS = 3;

export default function ApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        githubLinkedin: "",
        companyName: "",
        projectUrl: "",
        productStage: null,
        infrastructure: "",
        gpuSpend: 500,
        description: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const showSwitchingBonus = formData.infrastructure === "fal" || formData.infrastructure === "replicate";
    const progressPercent = (currentStep / TOTAL_STEPS) * 100;

    // Validation
    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }

        if (step === 2) {
            if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
            if (!formData.productStage) newErrors.productStage = "Please select a product stage";
            if (!formData.infrastructure) newErrors.infrastructure = "Please select your infrastructure";
        }

        if (step === 3) {
            if (!formData.description.trim()) newErrors.description = "Please describe what you're building";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigation
    const goToStep = (step: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentStep(step);
            setIsTransitioning(false);
        }, 150);
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            goToStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        goToStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            console.log("Form submitted:", formData);
            setIsSubmitted(true);
        }
    };

    // Input handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleStageSelect = (stage: ProductStage) => {
        setFormData((prev) => ({ ...prev, productStage: stage }));
        setErrors((prev) => ({ ...prev, productStage: undefined }));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, gpuSpend: parseInt(e.target.value) }));
    };

    const formatSpend = (value: number) => {
        if (value >= 5000) return "$5,000+";
        return `$${value.toLocaleString()}`;
    };

    // Error display component
    const ErrorMessage = ({ error }: { error?: string }) => {
        if (!error) return null;
        return (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
            </p>
        );
    };

    // Step labels
    const stepLabels = ["Identity", "The Build", "Scale"];

    // Success State UI
    if (isSubmitted) {
        return (
            <div className="animate-fade-in">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                            <svg
                                className="w-10 h-10 text-primary animate-success-check"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        {/* Rocket Decorations */}
                        <div className="absolute -top-2 -right-2 text-2xl animate-float">🚀</div>
                    </div>
                </div>

                {/* Headline */}
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    System Initialization Started.
                </h2>

                {/* Subtext */}
                <p className="text-text-secondary text-center mb-4">
                    Our team is reviewing your application. You will receive your API Keys and credit grant via email shortly.
                </p>

                {/* Timeline Badge */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-primary font-medium">
                            Approval status email within 24 hours
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-card-border mb-8" />

                {/* Discord CTA Card */}
                <div className="p-5 rounded-xl bg-surface-elevated border border-card-border">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#5865F2]/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">
                                While you wait, join the builders.
                            </h3>
                            <p className="text-sm text-text-secondary mb-4">
                                Get direct access to support and meet other founders.
                            </p>
                            <a
                                href="https://discord.gg/wiro"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="btn-discord-cta"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5865F2] text-white font-medium text-sm hover:bg-[#4752C4] transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                Join Wiro Discord Community
                            </a>
                        </div>
                    </div>
                </div>

                {/* Application Reference */}
                <p className="mt-6 text-xs text-text-muted text-center">
                    Application ID: <span className="font-mono text-text-secondary">WIRO-{Date.now().toString(36).toUpperCase()}</span>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} id="form-application">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs text-text-muted mb-2">
                    {stepLabels.map((label, index) => (
                        <span
                            key={label}
                            className={`transition-colors ${currentStep > index ? "text-primary" : currentStep === index + 1 ? "text-white" : ""}`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="text-right text-xs text-text-muted mt-1">
                    Step {currentStep} of {TOTAL_STEPS}
                </div>
            </div>

            {/* Step Content with Transitions */}
            <div className={`transition-opacity duration-150 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
                {/* Step 1: Identity */}
                {currentStep === 1 && (
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Identity
                        </h3>

                        <div>
                            <label htmlFor="input-fullname" className="block text-sm font-medium text-text-secondary mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="input-fullname"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`form-input ${errors.fullName ? "border-red-500" : ""}`}
                                placeholder="Jane Doe"
                            />
                            <ErrorMessage error={errors.fullName} />
                        </div>

                        <div>
                            <label htmlFor="input-email" className="block text-sm font-medium text-text-secondary mb-2">
                                Work Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="input-email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? "border-red-500" : ""}`}
                                placeholder="dev@startup.com"
                            />
                            <ErrorMessage error={errors.email} />
                        </div>

                        <div>
                            <label htmlFor="input-github" className="block text-sm font-medium text-text-secondary mb-2">
                                GitHub / LinkedIn Profile
                            </label>
                            <input
                                type="url"
                                id="input-github"
                                name="githubLinkedin"
                                value={formData.githubLinkedin}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://github.com/username"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: The Build */}
                {currentStep === 2 && (
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            The Build
                        </h3>

                        <div>
                            <label htmlFor="input-company" className="block text-sm font-medium text-text-secondary mb-2">
                                Company / Project Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="input-company"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={`form-input ${errors.companyName ? "border-red-500" : ""}`}
                                placeholder="Acme AI"
                            />
                            <ErrorMessage error={errors.companyName} />
                        </div>

                        <div>
                            <label htmlFor="input-project-url" className="block text-sm font-medium text-text-secondary mb-2">
                                Project URL
                                <span className="ml-2 text-xs text-text-muted">(Repo link is fine if not live)</span>
                            </label>
                            <input
                                type="url"
                                id="input-project-url"
                                name="projectUrl"
                                value={formData.projectUrl}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://github.com/acme/project"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Product Stage <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    id="btn-stage-mvp"
                                    onClick={() => handleStageSelect("mvp")}
                                    className={`stage-selector ${formData.productStage === "mvp" ? "stage-selector-active" : ""}`}
                                >
                                    <span className="text-lg mb-1">🚀</span>
                                    <span className="font-medium">MVP</span>
                                </button>
                                <button
                                    type="button"
                                    id="btn-stage-live"
                                    onClick={() => handleStageSelect("live")}
                                    className={`stage-selector ${formData.productStage === "live" ? "stage-selector-active" : ""}`}
                                >
                                    <span className="text-lg mb-1">📈</span>
                                    <span className="font-medium">Live / Scaling</span>
                                </button>
                            </div>
                            <ErrorMessage error={errors.productStage} />
                        </div>

                        <div>
                            <label htmlFor="select-provider" className="block text-sm font-medium text-text-secondary mb-2">
                                Current Infrastructure <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="select-provider"
                                name="infrastructure"
                                value={formData.infrastructure}
                                onChange={handleChange}
                                className={`form-input ${errors.infrastructure ? "border-red-500" : ""}`}
                            >
                                <option value="">Select your current provider</option>
                                <option value="none">None</option>
                                <option value="aws">AWS</option>
                                <option value="fal">Fal.ai</option>
                                <option value="replicate">Replicate</option>
                                <option value="huggingface">HuggingFace</option>
                            </select>
                            <ErrorMessage error={errors.infrastructure} />

                            {showSwitchingBonus && (
                                <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-start gap-2">
                                    <span className="text-primary">⚡</span>
                                    <p className="text-sm text-primary">
                                        Excellent. Upload your last invoice later to unlock the Switching Bonus.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Scale */}
                {currentStep === 3 && (
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Scale
                        </h3>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="slider-spend" className="text-sm font-medium text-text-secondary">
                                    Monthly AI/API Spend
                                </label>
                                <span id="slider-spend-value" className="text-lg font-semibold text-primary">
                                    {formatSpend(formData.gpuSpend)}
                                </span>
                            </div>
                            <input
                                type="range"
                                id="slider-spend"
                                name="gpuSpend"
                                min="0"
                                max="5000"
                                step="100"
                                value={formData.gpuSpend}
                                onChange={handleSliderChange}
                                className="range-slider"
                            />
                            <div className="flex justify-between text-xs text-text-muted mt-1">
                                <span>$0</span>
                                <span>$2,500</span>
                                <span>$5,000+</span>
                            </div>
                            <p className="text-xs text-text-muted mt-2">
                                Estimate your costs for running models like Flux, Llama, or Stable Diffusion.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="input-description" className="block text-sm font-medium text-text-secondary mb-2">
                                What are you building? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="input-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`form-input resize-none ${errors.description ? "border-red-500" : ""}`}
                                placeholder="Describe your project and how you plan to use GPU credits..."
                            />
                            <ErrorMessage error={errors.description} />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 space-y-3">
                {/* Back Button (Steps 2 & 3) */}
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full py-2.5 text-text-secondary hover:text-white transition-colors text-sm"
                    >
                        ← Back
                    </button>
                )}

                {/* Next Button (Steps 1 & 2) */}
                {currentStep < TOTAL_STEPS && (
                    <button
                        type="button"
                        id="btn-next-step"
                        onClick={handleNext}
                        className="w-full py-4 px-6 bg-primary text-background font-semibold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,255,133,0.4)] transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Next →
                    </button>
                )}

                {/* Submit Button (Step 3 only) */}
                {currentStep === TOTAL_STEPS && (
                    <button
                        type="submit"
                        id="btn-submit-app"
                        className="w-full py-4 px-6 bg-primary text-background font-semibold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,255,133,0.4)] transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Initialize Application →
                    </button>
                )}
            </div>
        </form>
    );
}
