"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BookmarkCheck, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Edit3,
  Calendar,
  Activity,
  Bell,
  Clock,
  TrendingUp,
  User,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/navigation";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { AcademicProfile, DetailOpportunity } from "@/features/opportunities/types";
import { calculateMatch } from "@/features/opportunities/utils/matcher";
import { OpportunityCard } from "@/features/opportunities/components/OpportunityCard";
import { aiRecommendations } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface TrackerItem {
  opportunityId: string;
  title: string;
  host: string;
  type: string;
  deadline: string | null;
  status: "wishlist" | "applied" | "interviewing" | "offer";
  notes: string;
  lastUpdated: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = React.useState<{ name: string; email: string; initials: string } | null>(null);
  const [profile, setProfile] = React.useState<AcademicProfile | null>(null);
  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authTab, setAuthTab] = React.useState<"signin" | "signup">("signin");
  const [trackerItems, setTrackerItems] = React.useState<TrackerItem[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = React.useState<string[]>([]);

  // Local notifications state
  const [notifications, setNotifications] = React.useState<Array<{ id: string; text: string; time: string; type: "deadline" | "match" | "info" }>>([]);

  // Load session & profile & tracker items from localStorage
  const loadLocalData = React.useCallback(() => {
    try {
      const storedSession = localStorage.getItem("opportunityhub_session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
      
      const storedProfile = localStorage.getItem("opportunityhub_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

      const storedTracker = localStorage.getItem("opportunityhub_tracker") || "[]";
      const parsedTracker: TrackerItem[] = JSON.parse(storedTracker);
      setTrackerItems(parsedTracker);

      const storedRecently = localStorage.getItem("opportunityhub_recently_viewed") || "[]";
      setRecentlyViewedIds(JSON.parse(storedRecently));

      const tempNotifications: Array<{ id: string; text: string; time: string; type: "deadline" | "match" | "info" }> = [
        { id: "1", text: "DAAD PhD Research Grants discovery feed updated.", time: "1 hour ago", type: "info" }
      ];

      parsedTracker.forEach(item => {
        if (item.deadline) {
          const daysLeft = Math.ceil((new Date(item.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          if (daysLeft > 0 && daysLeft <= 30) {
            tempNotifications.push({
              id: item.opportunityId,
              text: `Deadline ending soon for ${item.title} (${daysLeft} days remaining).`,
              time: `${daysLeft}d left`,
              type: "deadline" as const
            });
          }
        }
      });

      setNotifications(tempNotifications);
    } catch (err) {
      console.error("Failed to load local data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    loadLocalData();
    window.addEventListener("storage", loadLocalData);
    return () => {
      window.removeEventListener("storage", loadLocalData);
    };
  }, [loadLocalData]);

  const wishlistCount = React.useMemo(() => trackerItems.filter(item => item.status === "wishlist").length, [trackerItems]);
  const appliedCount = React.useMemo(() => trackerItems.filter(item => item.status === "applied").length, [trackerItems]);
  const interviewingCount = React.useMemo(() => trackerItems.filter(item => item.status === "interviewing").length, [trackerItems]);
  const offerCount = React.useMemo(() => trackerItems.filter(item => item.status === "offer").length, [trackerItems]);

  const recentlyViewed = React.useMemo(() => {
    return recentlyViewedIds
      .map(id => MOCK_OPPORTUNITIES.find(opp => opp.id === id))
      .filter(Boolean) as typeof MOCK_OPPORTUNITIES;
  }, [recentlyViewedIds]);

  // Calculate matching opportunities count
  const matchedOpportunities = React.useMemo(() => {
    if (!profile) return [];
    return MOCK_OPPORTUNITIES.map(opp => ({
      opp,
      match: calculateMatch(profile, opp)
    }))
    .filter(item => item.match.isEligible && item.match.score >= 75)
    .sort((a, b) => b.match.score - a.match.score);
  }, [profile]);

  const [aiRecs, setAiRecs] = React.useState<DetailOpportunity[]>([]);

  React.useEffect(() => {
    if (!session) return;
    let active = true;
    async function loadRecommendations() {
      try {
        const list = await aiRecommendations();
        if (active && list && list.length > 0) {
          setAiRecs(list);
        }
      } catch (err) {
        console.error("AI Recommendations call failed:", err);
      }
    }
    loadRecommendations();
    return () => { active = false; };
  }, [session]);

  // Determine top 2 matches to display
  const topMatches = React.useMemo(() => {
    if (aiRecs.length > 0) {
      return aiRecs.slice(0, 2);
    }
    if (matchedOpportunities.length > 0) {
      return matchedOpportunities.slice(0, 2).map(item => item.opp);
    }
    return MOCK_OPPORTUNITIES.slice(0, 2);
  }, [aiRecs, matchedOpportunities]);

  const profileCompletionPercent = React.useMemo(() => {
    if (!profile) return 15; // default session
    let points = 15; // baseline name/email
    if (profile.country) points += 15;
    if (profile.degree) points += 15;
    if (profile.cgpa) points += 15;
    if (profile.major) points += 15;
    if (profile.ielts || profile.toefl) points += 15;
    if (profile.preferredCountries.length > 0) points += 10;
    return points;
  }, [profile]);

  // Handle trigger for login modal
  const triggerAuth = (tab: "signin" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleQuickAction = (action: string) => {
    if (action === "sync") {
      toast({
        title: "Database Synced",
        description: "Checked for newly crawled opportunities matching your parameters.",
        type: "success"
      });
    } else if (action === "test") {
      router.push("/profile");
    } else if (action === "browse") {
      router.push("/opportunities");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Dashboard...
      </div>
    );
  }

  // 1. RENDER ANONYMOUS GUEST PROMPT IF NOT LOGGED IN
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center space-y-6 animate-in fade-in duration-300">
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-black text-foreground">Access Restricted</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please Sign In or Create an Account to view your dashboard workspace, track upcoming deadlines, and unlock profile matchmaking metrics.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => triggerAuth("signin")}
            className="flex-1 rounded-xl h-10 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => triggerAuth("signup")}
            variant="outline" 
            className="flex-1 rounded-xl h-10 text-xs font-bold cursor-pointer"
          >
            Get Started
          </Button>
        </div>

        <AuthModal 
          isOpen={isAuthOpen}
          onOpenChange={setIsAuthOpen}
          defaultTab={authTab}
        />
      </div>
    );
  }

  // 2. RENDER FULL DASHBOARD PORTAL IF SESSION IS ACTIVE
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Reusable Sidebar layout component */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full animate-in fade-in duration-300">
        
        {/* Welcome Greeting Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">
              Welcome back, {session.name}!
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Your profile currently matches with {matchedOpportunities.length} fully verified global scholarships.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => handleQuickAction("sync")}
              variant="outline"
              className="rounded-xl h-9 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="h-4 w-4" />
              Sync DB
            </Button>
            <Button 
              onClick={() => router.push("/opportunities")}
              className="rounded-xl h-9 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10"
            >
              Explore Catalog
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Statistics Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Profile Completion Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-indigo-500" />
                Profile Strength
              </span>
              <h2 className="text-2xl font-black text-foreground pt-1">{profileCompletionPercent}%</h2>
            </div>
            
            <div className="space-y-2">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500" 
                  style={{ width: `${profileCompletionPercent}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
                <span>{profile ? "Configured" : "Basics Only"}</span>
                <Link href="/profile" className="text-indigo-500 hover:underline flex items-center gap-1 font-extrabold text-[9px]">
                  Build
                  <Edit3 className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </Card>

          {/* Matches Count Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                AI Recommendations
              </span>
              <h2 className="text-2xl font-black text-foreground pt-1">{matchedOpportunities.length} Available</h2>
            </div>
            <div className="text-[10px] text-muted-foreground font-bold leading-normal">
              {matchedOpportunities.length > 0 
                ? "Eligibility calculated >= 75% match ratings." 
                : "Build your academic profile to calculate match scores."}
            </div>
          </Card>

          {/* Application Tracker Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black flex items-center gap-1.5">
                <BookmarkCheck className="h-4 w-4 text-indigo-500" />
                Application Pipeline
              </span>
              <h2 className="text-2xl font-black text-foreground pt-1">{trackerItems.length} Tracked</h2>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {wishlistCount > 0 && <Badge variant="outline" className="text-[8px] rounded-md bg-zinc-500/5 text-zinc-400 border-zinc-500/15 font-bold py-0">{wishlistCount} Wish</Badge>}
              {appliedCount > 0 && <Badge variant="outline" className="text-[8px] rounded-md bg-indigo-500/5 text-indigo-400 border-indigo-500/15 font-bold py-0">{appliedCount} Sent</Badge>}
              {interviewingCount > 0 && <Badge variant="outline" className="text-[8px] rounded-md bg-amber-500/5 text-amber-400 border-amber-500/15 font-bold py-0">{interviewingCount} Interview</Badge>}
              {offerCount > 0 && <Badge variant="outline" className="text-[8px] rounded-md bg-emerald-500/5 text-emerald-400 border-emerald-500/15 font-bold py-0 text-emerald-500">{offerCount} Offer</Badge>}
              {trackerItems.length === 0 && <span className="text-[10px] text-muted-foreground font-semibold">No applications tracked.</span>}
            </div>
          </Card>

          {/* Active Notifications Card */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-indigo-500" />
                Pipeline Alerts
              </span>
              <h2 className="text-2xl font-black text-foreground pt-1">{notifications.length} Unread</h2>
            </div>
            <div className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 truncate">
              {notifications.length > 0 ? (
                <>
                  <Clock className="h-3 w-3 text-amber-500 animate-pulse shrink-0" />
                  <span className="truncate">{notifications[notifications.length - 1].text}</span>
                </>
              ) : (
                "No urgent deadlines or match notifications."
              )}
            </div>
          </Card>
        </div>

        {/* Analytics Section with SVG Custom Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visual SVG Charts Panel (66%) */}
          <Card className="lg:col-span-2 rounded-2xl border-border/40 bg-background/30 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border/10 pb-3">
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Pipeline Funnel Analytics</h3>
                <p className="text-[10px] text-muted-foreground font-semibold">Visual tracking of application success stages.</p>
              </div>
              <Badge variant="outline" className="rounded-lg text-[9px] font-bold bg-indigo-500/5 text-indigo-500 border-none flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Live Status
              </Badge>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-around py-4">
              {/* Bar charts container */}
              <div className="w-full max-w-sm">
                <svg viewBox="0 0 400 160" className="w-full h-auto text-muted-foreground font-sans">
                  {/* Grid Lines */}
                  <line x1="40" y1="10" x2="380" y2="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="opacity-15" />
                  <line x1="40" y1="45" x2="380" y2="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="opacity-15" />
                  <line x1="40" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="opacity-15" />
                  <line x1="40" y1="115" x2="380" y2="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="opacity-15" />
                  
                  {/* Axis Line */}
                  <line x1="40" y1="130" x2="380" y2="130" stroke="currentColor" strokeWidth="1" className="opacity-30" />

                  {/* Bars & Labels */}
                  {/* Wishlist */}
                  <rect x="70" y={130 - Math.max(5, wishlistCount * 25)} width="35" height={Math.max(5, wishlistCount * 25)} rx="6" className="fill-zinc-500/50 stroke-zinc-500/20" />
                  <text x="87.5" y="145" textAnchor="middle" className="text-[9px] font-black fill-muted-foreground uppercase">Wishlist</text>
                  <text x="87.5" y={120 - Math.max(5, wishlistCount * 25)} textAnchor="middle" className="text-[10px] font-black fill-foreground">{wishlistCount}</text>

                  {/* Applied */}
                  <rect x="150" y={130 - Math.max(5, appliedCount * 25)} width="35" height={Math.max(5, appliedCount * 25)} rx="6" className="fill-indigo-600/70 stroke-indigo-500/20" />
                  <text x="167.5" y="145" textAnchor="middle" className="text-[9px] font-black fill-muted-foreground uppercase">Applied</text>
                  <text x="167.5" y={120 - Math.max(5, appliedCount * 25)} textAnchor="middle" className="text-[10px] font-black fill-foreground">{appliedCount}</text>

                  {/* Interviewing */}
                  <rect x="230" y={130 - Math.max(5, interviewingCount * 25)} width="35" height={Math.max(5, interviewingCount * 25)} rx="6" className="fill-amber-500/70 stroke-amber-500/20" />
                  <text x="247.5" y="145" textAnchor="middle" className="text-[9px] font-black fill-muted-foreground uppercase">Interview</text>
                  <text x="247.5" y={120 - Math.max(5, interviewingCount * 25)} textAnchor="middle" className="text-[10px] font-black fill-foreground">{interviewingCount}</text>

                  {/* Offer */}
                  <rect x="310" y={130 - Math.max(5, offerCount * 25)} width="35" height={Math.max(5, offerCount * 25)} rx="6" className="fill-emerald-500/70 stroke-emerald-500/20" />
                  <text x="327.5" y="145" textAnchor="middle" className="text-[9px] font-black fill-muted-foreground uppercase">Offer</text>
                  <text x="327.5" y={120 - Math.max(5, offerCount * 25)} textAnchor="middle" className="text-[10px] font-black fill-foreground">{offerCount}</text>
                </svg>
              </div>

              {/* Radial Profile Strength Gauge */}
              <div className="flex flex-col items-center space-y-2 text-center shrink-0">
                <div className="relative h-28 w-28">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    {/* Circle Background */}
                    <path
                      className="text-muted/10"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Active Segment */}
                    <path
                      className="text-indigo-600 transition-all duration-500"
                      strokeDasharray={`${profileCompletionPercent}, 100`}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-foreground">{profileCompletionPercent}%</span>
                    <span className="text-[8px] text-muted-foreground font-black uppercase tracking-wider">Complete</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-foreground uppercase tracking-wider">Matching Accuracy</h4>
                  <p className="text-[9px] text-muted-foreground font-semibold">Based on filled academic records</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Panel (33%) */}
          <Card className="rounded-2xl border-border/40 bg-background/30 p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground border-b border-border/10 pb-2">Quick Actions</h3>
            
            <div className="space-y-3.5 pt-1">
              <Button 
                onClick={() => handleQuickAction("sync")}
                variant="outline" 
                className="w-full justify-start rounded-xl h-10 px-4 text-xs font-bold flex items-center gap-3 cursor-pointer"
              >
                <Activity className="h-4 w-4 text-indigo-500 shrink-0" />
                Sync Discovery Pipelines
              </Button>
              
              <Button 
                onClick={() => handleQuickAction("test")}
                variant="outline" 
                className="w-full justify-start rounded-xl h-10 px-4 text-xs font-bold flex items-center gap-3 cursor-pointer"
              >
                <User className="h-4 w-4 text-purple-500 shrink-0" />
                Configure Profile Builder
              </Button>

              <Button 
                onClick={() => handleQuickAction("browse")}
                variant="outline" 
                className="w-full justify-start rounded-xl h-10 px-4 text-xs font-bold flex items-center gap-3 cursor-pointer"
              >
                <PlusCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                Track New Scholarships
              </Button>
            </div>
          </Card>
        </section>

        {/* Dashboard Grid layout split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Matches grid (66%) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recommended Opportunities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/20 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Top Recommendations</h3>
                <Link href="/opportunities" className="text-[11px] font-black text-indigo-500 hover:underline flex items-center gap-0.5 uppercase tracking-wider">
                  View catalog
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
   
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                {topMatches.map((opp) => {
                  let aiMatchTip = (opp as { aiExplanation?: string }).aiExplanation;
                  if (!aiMatchTip) {
                    const match = calculateMatch(profile, opp);
                    aiMatchTip = `Recommended based on study location and matching ${opp.type} category.`;
                    if (profile) {
                      if (match.score >= 85) {
                        aiMatchTip = `Excellent fit! Matches your ${profile.degree} level, ${profile.major} major, and satisfies language scores.`;
                      } else if (match.score >= 65) {
                        aiMatchTip = `Good fit. Matches your study discipline of ${profile.major}. Review destination and citizenship details.`;
                      } else {
                        aiMatchTip = `Low fit. Matches your academic level but has gaps in required study discipline or language scores.`;
                      }
                    }
                  }
                  
                  return (
                    <div key={opp.id} className="space-y-3 flex flex-col h-full">
                      <div className="flex-1">
                        <OpportunityCard 
                          opportunity={opp} 
                          profile={profile} 
                        />
                      </div>
                      
                      {/* AI recommendation explain tag */}
                      <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 flex items-start gap-1.5 leading-normal">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-500 animate-pulse mt-0.5" />
                        <p>
                          <span className="font-extrabold uppercase tracking-wide text-[8px] bg-indigo-500/10 px-1 py-0.5 rounded-md mr-1">AI Match Tip:</span>
                          {aiMatchTip}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved Opportunities list detail */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/20 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Saved Opportunities</h3>
                <Link href="/tracker" className="text-[11px] font-black text-indigo-500 hover:underline flex items-center gap-0.5 uppercase tracking-wider">
                  Open Kanban Board
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {trackerItems.length === 0 ? (
                <Card className="p-6 rounded-2xl text-center border-dashed border-border/40 bg-background/5 text-xs text-muted-foreground font-semibold">
                  No saved opportunities. Click bookmark on any opportunity card to save it.
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackerItems.slice(0, 4).map(item => (
                    <div 
                      key={item.opportunityId} 
                      onClick={() => router.push(`/opportunities/${item.opportunityId}`)}
                      className="group cursor-pointer p-4 rounded-xl border border-border/20 bg-background/40 hover:bg-background transition-all flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground group-hover:text-indigo-500 transition-colors line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-muted-foreground font-semibold">{item.host}</p>
                      </div>
                      <Badge className={`rounded-lg font-black text-[8px] uppercase tracking-wider px-2 py-0 border-none shrink-0 ${
                        item.status === "offer" ? "bg-emerald-500/10 text-emerald-500" :
                        item.status === "interviewing" ? "bg-amber-500/10 text-amber-500" :
                        item.status === "applied" ? "bg-indigo-500/10 text-indigo-500" :
                        "bg-zinc-500/10 text-zinc-500"
                      }`}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Deadlines, Alerts & Activity Feeds (34%) */}
          <div className="space-y-6">
            
            {/* Deadline Calendar Sidebar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/20 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Calendar className="h-4.5 w-4.5 text-indigo-500" />
                  Upcoming Deadlines
                </h3>
              </div>

              <Card className="rounded-2xl border-border/40 bg-background/20 p-5 pt-3">
                <div className="space-y-3">
                  {trackerItems.filter(item => item.deadline !== null).length === 0 ? (
                    <p className="text-[10px] text-muted-foreground leading-normal py-4 text-center font-bold">
                      No tracked deadlines.
                    </p>
                  ) : (
                    trackerItems
                      .filter(item => item.deadline !== null)
                      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
                      .slice(0, 3)
                      .map(item => {
                        const date = new Date(item.deadline!);
                        const daysLeft = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                        const isExpired = daysLeft < 0;

                        return (
                          <div 
                            key={item.opportunityId}
                            onClick={() => router.push(`/opportunities/${item.opportunityId}`)}
                            className="group cursor-pointer flex items-center justify-between gap-3 p-2.5 rounded-xl bg-background/30 hover:bg-background/80 border border-border/10 hover:border-indigo-500/10 transition-all"
                          >
                            <div className="space-y-0.5 truncate">
                              <h4 className="text-[11px] font-extrabold text-foreground group-hover:text-indigo-500 transition-colors truncate">{item.title}</h4>
                              <p className="text-[9px] text-muted-foreground font-semibold">
                                {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                              </p>
                            </div>
                            
                            <Badge className={`rounded-lg font-black text-[8px] uppercase tracking-wider px-2 py-0 border-none shrink-0 ${
                              isExpired ? "bg-zinc-500/10 text-zinc-500" :
                              daysLeft <= 15 ? "bg-rose-500/10 text-rose-500 animate-pulse" :
                              daysLeft <= 30 ? "bg-amber-500/10 text-amber-500" :
                              "bg-indigo-500/10 text-indigo-500"
                            }`}>
                              {isExpired ? "Closed" : `${daysLeft}d left`}
                            </Badge>
                          </div>
                        );
                      })
                  )}
                </div>
              </Card>
            </div>

            {/* Live activity feed & crawl notifications logs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/20 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Activity className="h-4.5 w-4.5 text-indigo-500" />
                  Live Activity Feed
                </h3>
              </div>

              <Card className="rounded-2xl border-border/40 bg-background/20 p-5 pt-3">
                <div className="space-y-4 text-[10px] font-semibold text-muted-foreground leading-relaxed">
                  <div className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 animate-pulse" />
                    <div className="space-y-0.5">
                      <p className="text-foreground">Crawled 14 active scholarships from DAAD Germany bulletin.</p>
                      <span className="text-[8px] text-muted-foreground/60 font-bold">10 mins ago</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <div className="space-y-0.5">
                      <p className="text-foreground">Calculated matching recommendations based on updated major.</p>
                      <span className="text-[8px] text-muted-foreground/60 font-bold">1 hour ago</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <div className="space-y-0.5">
                      <p className="text-foreground">Bookmarked Fulbright Foreign Student Program fellowship.</p>
                      <span className="text-[8px] text-muted-foreground/60 font-bold">1 day ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recently Viewed panel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/20 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Recently Viewed</h3>
              </div>

              <Card className="rounded-2xl border-border/40 bg-background/20 p-5 pt-3">
                {recentlyViewed.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground leading-normal py-2 text-center font-bold">
                    No programs viewed yet.
                  </p>
                ) : (
                  <div className="space-y-2.5 text-[10px] font-semibold">
                    {recentlyViewed.map(opp => (
                      <Link 
                        key={opp.id} 
                        href={`/opportunities/${opp.id}`}
                        className="block p-2 rounded-xl bg-background/30 hover:bg-background/80 border border-border/10 hover:border-indigo-500/10 transition-all"
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-extrabold text-foreground truncate max-w-[140px]">{opp.title}</span>
                          <Badge className="rounded-md bg-indigo-500/5 text-indigo-500 border-none font-bold text-[8px] uppercase tracking-wide px-1 py-0 shrink-0">
                            {opp.type}
                          </Badge>
                        </div>
                        <p className="text-[9px] text-muted-foreground font-bold mt-0.5 truncate">{opp.host}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
