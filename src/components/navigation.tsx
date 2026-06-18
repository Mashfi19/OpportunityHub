"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  GraduationCap, 
  BookmarkCheck, 
  Settings, 
  LogOut, 
  Compass, 
  Bell,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/features/auth/components/AuthModal").then(mod => mod.AuthModal), {
  ssr: false,
  loading: () => <div className="hidden" />
});

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Opportunities", href: "/opportunities", icon: Compass },
  { label: "Tracker", href: "/tracker", icon: BookmarkCheck },
  { label: "Academic Profile", href: "/profile", icon: GraduationCap },
  { label: "Settings", href: "/settings", icon: Settings },
];

// Reusable Top Navbar for Public and Dashboard Pages
export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authTab, setAuthTab] = React.useState<"signin" | "signup">("signin");
  const [session, setSession] = React.useState<{ name: string; email: string; initials: string; avatarUrl?: string } | null>(null);

  React.useEffect(() => {
    const loadSession = () => {
      try {
        const stored = localStorage.getItem("opportunityhub_session");
        if (stored) {
          setSession(JSON.parse(stored));
        } else {
          setSession(null);
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      }
    };

    loadSession();

    window.addEventListener("storage", loadSession);
    return () => {
      window.removeEventListener("storage", loadSession);
    };
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("opportunityhub_session");
      setSession(null);
      window.location.reload();
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const openAuth = (tab: "signin" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="OpportunityHub Home">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            OpportunityHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/opportunities" 
            className={`transition-colors hover:text-foreground/80 ${pathname === "/opportunities" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            Explore
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors hover:text-foreground/80 ${pathname === "/about" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            About
          </Link>
          <Link 
            href="/dashboard" 
            className={`transition-colors hover:text-foreground/80 ${pathname === "/dashboard" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {session ? (
            <div className="flex items-center space-x-3">
              {session.avatarUrl ? (
                <Image 
                  src={session.avatarUrl} 
                  alt={session.name} 
                  width={36}
                  height={36}
                  unoptimized
                  className="h-9 w-9 rounded-full object-cover border border-border/40 shadow-inner" 
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-inner">
                  {session.initials}
                </div>
              )}
              <span className="hidden lg:inline-block text-xs font-bold text-muted-foreground truncate max-w-[100px]">{session.name}</span>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                size="sm"
                className="h-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg text-xs font-bold px-2.5 transition-colors"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button 
                onClick={() => openAuth("signin")}
                variant="outline" 
                className="hidden sm:inline-flex rounded-full text-xs font-semibold cursor-pointer"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => openAuth("signup")}
                className="hidden sm:inline-flex rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md transition-all duration-300 cursor-pointer"
              >
                Get Started
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4 px-6 py-6 text-sm font-medium">
            <Link 
              href="/opportunities" 
              onClick={() => setIsOpen(false)}
              className={`transition-colors hover:text-foreground ${pathname === "/opportunities" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
            >
              Explore Opportunities
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className={`transition-colors hover:text-foreground ${pathname === "/about" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
            >
              About Us
            </Link>
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={`transition-colors hover:text-foreground ${pathname === "/dashboard" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
            >
              Dashboard
            </Link>
            <hr className="border-border" />
            <div className="flex flex-col space-y-2">
              {session ? (
                <>
                  <div className="flex items-center space-x-3 px-2 py-1.5 bg-muted/20 border border-border/10 rounded-xl">
                    {session.avatarUrl ? (
                      <Image 
                        src={session.avatarUrl} 
                        alt={session.name} 
                        width={32}
                        height={32}
                        unoptimized
                        className="h-8 w-8 rounded-full object-cover border border-border/40 shadow-inner" 
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-inner">
                        {session.initials}
                      </div>
                    )}
                    <div className="flex-1 overflow-hidden text-left">
                      <p className="text-xs font-bold truncate text-foreground">{session.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{session.email}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline" 
                    className="w-full justify-center rounded-full text-xs font-semibold text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => openAuth("signin")}
                    variant="outline" 
                    className="w-full justify-center rounded-full text-xs font-semibold"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => openAuth("signup")}
                    className="w-full justify-center rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Global Auth Modal Popup */}
      <AuthModal 
        isOpen={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        defaultTab={authTab}
      />
    </header>
  );
}

// Reusable Dashboard Sidebar (Mobile-responsive overlay + desktop sidebar)
export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [session, setSession] = React.useState<{ name: string; email: string; initials: string; avatarUrl?: string } | null>(null);

  React.useEffect(() => {
    const loadSession = () => {
      try {
        const stored = localStorage.getItem("opportunityhub_session");
        if (stored) {
          setSession(JSON.parse(stored));
        } else {
          setSession(null);
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      }
    };

    loadSession();

    window.addEventListener("storage", loadSession);
    return () => {
      window.removeEventListener("storage", loadSession);
    };
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("opportunityhub_session");
      window.location.reload();
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden sticky top-16 z-40 flex h-12 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 w-full">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsMobileOpen(true)}
          className="text-muted-foreground flex items-center space-x-1"
        >
          <Menu className="h-4 w-4" />
          <span>Dashboard Menu</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </Button>
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-background transition-transform duration-300 ease-in-out
        md:sticky md:top-16 md:z-30 md:h-[calc(100vh-4rem)] md:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Mobile Close Button */}
        <div className="flex h-16 items-center justify-end px-4 md:hidden border-b border-border/40">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-semibold" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-indigo-500 dark:text-indigo-400" : "text-muted-foreground"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />}
              </Link>
            );
          })}
        </div>

        {/* Footer / User Profile summary */}
        <div className="border-t border-border/40 p-4 space-y-4">
          <div className="flex items-center space-x-3 px-2">
            {session && session.avatarUrl ? (
              <Image 
                src={session.avatarUrl} 
                alt={session.name} 
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 rounded-full object-cover border border-border/40 shadow-inner" 
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-inner">
                {session ? session.initials : "GU"}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">{session ? session.name : "Guest User"}</p>
              <p className="text-xs text-muted-foreground truncate">{session ? session.email : "guest@opportunityhub.com"}</p>
            </div>
          </div>
          
          <Button 
            onClick={handleSignOut}
            variant="ghost" 
            className="w-full justify-start rounded-xl px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
