import * as React from "react";
import { FolderOpen, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-background/30 backdrop-blur-xs p-8 text-center animate-in fade-in duration-500",
        className
      )}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 text-muted-foreground border border-border/40 shadow-inner mb-6">
        <Icon className="h-10 w-10 text-muted-foreground/80" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
        {title}
      </h3>
      <p className="max-w-[420px] text-sm text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-md px-6 py-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
