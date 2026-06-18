import * as React from "react";
import { Mail, Lock, User, Phone, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ALL_COUNTRIES } from "@/features/opportunities/data/countriesData";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onOpenChange,
  defaultTab = "signin",
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">(defaultTab);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dialCode, setDialCode] = React.useState("+880"); // Default Bangladesh code

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  // Sync activeTab when defaultTab changes
  React.useEffect(() => {
    setActiveTab(defaultTab);
    setErrors({});
    setStatus("idle");
  }, [defaultTab, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email Check
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Check
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (activeTab === "signup") {
      // Name Check
      if (!name.trim()) {
        newErrors.name = "Full name is required.";
      }

      // Phone Check
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\d+$/.test(phone.trim())) {
        newErrors.phone = "Phone number must contain digits only.";
      } else if (phone.trim().length < 7 || phone.trim().length > 15) {
        newErrors.phone = "Phone number must be between 7 and 15 digits.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!validate()) {
      setStatus("error");
      return;
    }

    // Simulated session payload
    const sessionUser = {
      name: activeTab === "signup" ? name : email.split("@")[0].toUpperCase(),
      email,
      phone: activeTab === "signup" ? `${dialCode}${phone}` : null,
      initials: activeTab === "signup" 
        ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) 
        : email.slice(0, 2).toUpperCase(),
      role: email.toLowerCase().includes("admin") ? "admin" : "user",
    };

    try {
      localStorage.setItem("opportunityhub_session", JSON.stringify(sessionUser));
      setStatus("success");
      
      setTimeout(() => {
        onOpenChange(false);
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      }, 1500);
    } catch (err) {
      console.error("Failed to save session:", err);
      setStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-md rounded-2xl bg-background p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-xs">
            {activeTab === "signin" 
              ? "Sign in to access your dashboard and matching recommendations." 
              : "Register to unlock eligibility forecasts and track applications."}
          </DialogDescription>
        </DialogHeader>

        {/* Tab Selection */}
        <div className="flex bg-muted/30 border border-border/10 p-1 rounded-xl mb-6">
          <button
            onClick={() => { setActiveTab("signin"); setErrors({}); setStatus("idle"); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "signin" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab("signup"); setErrors({}); setStatus("idle"); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "signup" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {activeTab === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="name-input"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-9 h-10 rounded-lg text-xs border-border bg-background/40 ${errors.name ? "border-rose-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                id="email-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-9 h-10 rounded-lg text-xs border-border bg-background/40 ${errors.email ? "border-rose-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {activeTab === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="phone-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Mobile Number</label>
              <div className="flex gap-2">
                {/* Dial code select dropdown */}
                <select
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  className="h-10 w-[110px] px-2 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold shrink-0 cursor-pointer"
                  aria-label="Country dial code"
                >
                  {ALL_COUNTRIES.map((c) => (
                    <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                      {c.code} ({c.dialCode})
                    </option>
                  ))}
                </select>
                
                {/* Phone number input */}
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="phone-input"
                    type="tel"
                    placeholder="1785658189"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`pl-9 h-10 rounded-lg text-xs border-border bg-background/40 ${errors.phone ? "border-rose-500" : ""}`}
                  />
                </div>
              </div>
              {errors.phone ? (
                <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.phone}
                </p>
              ) : (
                <p className="text-[9px] text-muted-foreground font-semibold">Provide your phone number (digits only, e.g. 17xxxxxxxx)</p>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="password-input" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                id="password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-9 h-10 rounded-lg text-xs border-border bg-background/40 ${errors.password ? "border-rose-500" : ""}`}
              />
            </div>
            {errors.password && (
              <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Feedback states */}
          {status === "success" && (
            <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              <span>
                {activeTab === "signin" ? "Sign In successful! Syncing session..." : "Account created successfully! Logging in..."}
              </span>
            </div>
          )}

          {status === "error" && Object.keys(errors).length === 0 && (
            <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="h-4.5 w-4.5 text-rose-500 shrink-0" />
              <span>An error occurred. Please try again.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="w-full h-11 rounded-xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/10 transition-colors pt-1"
          >
            {status === "submitting" ? "Connecting..." : activeTab === "signin" ? "Sign In to Account" : "Register Credentials"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-border/40" />
          <span className="relative bg-background px-3 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Or Continue With</span>
        </div>

        {/* Social Authentication */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.setItem("opportunityhub_session", JSON.stringify({ 
                name: "Google User", 
                email: "google@gmail.com", 
                initials: "GU",
                avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
              }));
              setStatus("success");
              setTimeout(() => { onOpenChange(false); window.location.reload(); }, 1000);
            }}
            className="rounded-xl h-10 text-xs font-bold flex items-center justify-center gap-2"
          >
            {/* Google Icon */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
 
          <Button
            variant="outline"
            onClick={() => {
              localStorage.setItem("opportunityhub_session", JSON.stringify({ 
                name: "Github User", 
                email: "github@gmail.com", 
                initials: "GH",
                avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              }));
              setStatus("success");
              setTimeout(() => { onOpenChange(false); window.location.reload(); }, 1000);
            }}
            className="rounded-xl h-10 text-xs font-bold flex items-center justify-center gap-2"
          >
            {/* Github Icon */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </Button>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
          <Shield className="h-3.5 w-3.5 text-indigo-500" />
          <span>Secured encryption transmission</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
