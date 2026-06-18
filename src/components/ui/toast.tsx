"use client";

import * as React from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast, ToastType } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TYPE_CONFIGS: Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string }>;
    styles: string;
    iconStyles: string;
  }
> = {
  success: {
    icon: CheckCircle,
    styles: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/40",
    iconStyles: "text-emerald-500",
  },
  error: {
    icon: AlertCircle,
    styles: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400 hover:border-rose-500/40",
    iconStyles: "text-rose-500",
  },
  warning: {
    icon: AlertTriangle,
    styles: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400 hover:border-amber-500/40",
    iconStyles: "text-amber-500",
  },
  info: {
    icon: Info,
    styles: "bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400 hover:border-indigo-500/40",
    iconStyles: "text-indigo-500",
  },
};

export function ToastProvider() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const config = TYPE_CONFIGS[t.type || "info"];
        const Icon = config.icon;

        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-in slide-in-from-right-5 fade-in-0 duration-200",
              config.styles
            )}
            role="alert"
          >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconStyles)} />
            
            <div className="flex-1 space-y-1">
              {t.title && (
                <h5 className="font-heading font-black text-xs tracking-tight text-foreground">
                  {t.title}
                </h5>
              )}
              {t.description && (
                <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => dismiss(t.id)}
              className="text-muted-foreground/60 hover:text-foreground shrink-0 rounded-lg p-0.5 transition-colors focus:outline-hidden"
              aria-label="Dismiss toast notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
