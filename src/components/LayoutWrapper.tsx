import { ReactNode } from "react";

interface LayoutWrapperProps {
    children: ReactNode;
    className?: string;
}

/**
 * LayoutWrapper - A wrapper component that applies the dark cyberpunk theme globally.
 * Use this component to wrap page content for consistent styling.
 */
export default function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
    return (
        <div className={`min-h-screen bg-background text-foreground ${className}`}>
            {/* Main content */}
            {children}
        </div>
    );
}
