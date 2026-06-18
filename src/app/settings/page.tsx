"use client";

import * as React from "react";
import Image from "next/image";
import { 
  Settings, 
  Bell, 
  Trash2, 
  User, 
  ShieldAlert, 
  Save, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Sidebar } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthModal } from "@/features/auth/components/AuthModal";

interface SessionData {
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
}

const PRESET_AVATARS = [
  { name: "Avatar 1", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" },
  { name: "Avatar 2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
  { name: "Avatar 3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
  { name: "Avatar 4", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
  { name: "Avatar 5", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
  { name: "Avatar 6", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" }
];

interface NotificationSettings {
  deadlineAlerts: boolean;
  weeklyDigest: boolean;
  aiRecommendations: boolean;
}

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  deadlineAlerts: true,
  weeklyDigest: false,
  aiRecommendations: true
};

export default function SettingsPage() {
  const [session, setSession] = React.useState<SessionData | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);

  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [notifications, setNotifications] = React.useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Status banners
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Load configuration
  React.useEffect(() => {
    try {
      const storedSession = localStorage.getItem("opportunityhub_session");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setSession(parsedSession);
        setName(parsedSession.name || "");
        setEmail(parsedSession.email || "");
        setAvatarUrl(parsedSession.avatarUrl || "");
      }
      
      const storedNotifs = localStorage.getItem("opportunityhub_settings");
      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      } else {
        localStorage.setItem("opportunityhub_settings", JSON.stringify(DEFAULT_NOTIFICATIONS));
      }
    } catch (err) {
      console.error("Failed to load settings data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image size must be less than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving general account settings
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !name.trim() || !email.trim()) return;

    try {
      // Calculate new initials
      const initials = name
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "GU";

      const updatedSession: SessionData = {
        name: name.trim(),
        email: email.trim(),
        initials,
        avatarUrl: avatarUrl
      };

      localStorage.setItem("opportunityhub_session", JSON.stringify(updatedSession));
      setSession(updatedSession);
      
      // Dispatch storage event to update header/navbar initials and avatar
      window.dispatchEvent(new Event("storage"));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile settings:", err);
    }
  };

  // Handle toggling notification preferences
  const handleToggleNotification = (key: keyof NotificationSettings) => {
    const updated = {
      ...notifications,
      [key]: !notifications[key]
    };
    setNotifications(updated);
    localStorage.setItem("opportunityhub_settings", JSON.stringify(updated));
  };

  // Purge all data and log out
  const handlePurgeAllData = () => {
    if (confirm("WARNING: This will permanently delete all your saved bookmarks, application logs, profile parameters, and logout your session. Do you want to proceed?")) {
      try {
        localStorage.removeItem("opportunityhub_session");
        localStorage.removeItem("opportunityhub_profile");
        localStorage.removeItem("opportunityhub_tracker");
        localStorage.removeItem("opportunityhub_settings");
        
        // Remove recently viewed list
        localStorage.removeItem("opportunityhub_recently_viewed");
        
        // Clear checklist keys
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith("opportunityhub_checklist_")) {
            localStorage.removeItem(key);
          }
        });

        window.dispatchEvent(new Event("storage"));
        window.location.href = "/";
      } catch (err) {
        console.error("Failed to purge storage:", err);
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Settings...
      </div>
    );
  }

  // Restricted guest access prompt
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center space-y-6 animate-in fade-in duration-300">
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-black text-foreground">Access Restricted</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please Sign In or Create an Account to configure notification frequencies, edit details parameters, or purge local registry data.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => setIsAuthOpen(true)}
            className="flex-1 rounded-xl h-10 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => setIsAuthOpen(true)}
            variant="outline" 
            className="flex-1 rounded-xl h-10 text-xs font-bold"
          >
            Get Started
          </Button>
        </div>

        <AuthModal 
          isOpen={isAuthOpen}
          onOpenChange={setIsAuthOpen}
          defaultTab="signin"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-4xl mx-auto animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="border-b border-border/40 pb-6">
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-500" />
            Account Settings
          </h1>
          <p className="text-xs font-semibold text-muted-foreground mt-1">
            Manage your personal settings, notification frequencies, and storage cleanup.
          </p>
        </div>

        {/* Success Feedback Alert */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Settings saved successfully! Header initials updated.</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Form Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6">
            <CardHeader className="p-0 pb-4 border-b border-border/10 mb-6">
              <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-500" />
                Profile Identity
              </CardTitle>
              <CardDescription className="text-xs">
                Your name, email, and avatar are used for personalized reports, alerts, and navigation displays.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Profile Picture Uploader */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/10">
                <div className="relative group shrink-0">
                  {avatarUrl ? (
                    <Image 
                      src={avatarUrl} 
                      alt="Avatar Preview" 
                      width={80}
                      height={80}
                      unoptimized
                      className="w-20 h-20 rounded-full object-cover border border-border/40 shadow-md transition-all duration-300"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-md animate-in fade-in duration-300">
                      {session?.initials || "GU"}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block">Profile Picture</span>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 rounded-lg text-xs font-bold border-border bg-background/40 hover:bg-accent cursor-pointer"
                    >
                      Upload Picture
                    </Button>
                    {avatarUrl && (
                      <Button 
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAvatarUrl("")}
                        className="h-8 rounded-lg text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Max size 1MB. Whitelisted formats: JPG, PNG, WEBP.
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-muted-foreground block mb-2">Or choose from premium presets:</span>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {PRESET_AVATARS.map((avatar, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(avatar.url)}
                          className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all hover:scale-105 duration-200 cursor-pointer ${
                            avatarUrl === avatar.url ? "border-indigo-500 scale-105" : "border-transparent opacity-85 hover:opacity-100"
                          }`}
                        >
                          <Image 
                            src={avatar.url} 
                            alt={avatar.name} 
                            width={36}
                            height={36}
                            unoptimized
                            className="w-full h-full object-cover" 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <Input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-10 rounded-lg text-xs border-border bg-background/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@opportunityhub.com"
                    className="h-10 rounded-lg text-xs border-border bg-background/40"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button 
                  type="submit"
                  className="rounded-xl h-9 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10"
                >
                  <Save className="h-4 w-4" />
                  Save Profile Identity
                </Button>
              </div>
            </form>
          </Card>

          {/* Notifications Checklist Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6">
            <CardHeader className="p-0 pb-4 border-b border-border/10 mb-6">
              <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-indigo-500" />
                Notification Subscriptions
              </CardTitle>
              <CardDescription className="text-xs">
                Choose how you want to receive alerts about crawler results and deadline shifts.
              </CardDescription>
            </CardHeader>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-3 hover:bg-muted/10 rounded-xl transition-colors">
                <div className="space-y-0.5">
                  <label htmlFor="notif-deadlines" className="text-xs font-bold text-foreground cursor-pointer">Deadline Reminders</label>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Receive alert digests 14 days and 3 days before a bookmarked opportunity expires.
                  </p>
                </div>
                <input
                  id="notif-deadlines"
                  type="checkbox"
                  checked={notifications.deadlineAlerts}
                  onChange={() => handleToggleNotification("deadlineAlerts")}
                  className="h-4.5 w-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-500 mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 hover:bg-muted/10 rounded-xl transition-colors border-t border-border/10">
                <div className="space-y-0.5">
                  <label htmlFor="notif-digest" className="text-xs font-bold text-foreground cursor-pointer">Weekly Scraper Digest</label>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Receive a compiled report containing newly scraped and validated programs matching your citizenship.
                  </p>
                </div>
                <input
                  id="notif-digest"
                  type="checkbox"
                  checked={notifications.weeklyDigest}
                  onChange={() => handleToggleNotification("weeklyDigest")}
                  className="h-4.5 w-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-500 mt-1"
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 hover:bg-muted/10 rounded-xl transition-colors border-t border-border/10">
                <div className="space-y-0.5">
                  <label htmlFor="notif-ai" className="text-xs font-bold text-foreground cursor-pointer">AI Recommendations Alert</label>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Get instantly notified when our match rating calculates a &gt;85% score for new listings.
                  </p>
                </div>
                <input
                  id="notif-ai"
                  type="checkbox"
                  checked={notifications.aiRecommendations}
                  onChange={() => handleToggleNotification("aiRecommendations")}
                  className="h-4.5 w-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-500 mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Danger Zone Storage Purger */}
          <Card className="rounded-2xl border-rose-500/20 bg-rose-500/5 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/0 via-rose-500/0 to-rose-500/5 pointer-events-none" />
            
            <CardHeader className="p-0 pb-4 border-b border-rose-500/10 mb-6">
              <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-rose-500 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-rose-500/80 text-xs">
                Permanent actions that will erase your registry. Use with caution.
              </CardDescription>
            </CardHeader>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground">Purge Local Repository Data</h4>
                <p className="text-[10px] text-muted-foreground leading-normal max-w-lg">
                  Clears all local storage keys including session tokens, profile parameters, document preparation checklists, and bookmarked opportunities tracking.
                </p>
              </div>
              
              <Button 
                onClick={handlePurgeAllData}
                className="rounded-xl h-10 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-md shadow-rose-500/10 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
                Reset All Platform Data
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
