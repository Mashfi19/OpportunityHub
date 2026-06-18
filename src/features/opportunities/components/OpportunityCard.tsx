import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Globe, 
  Calendar, 
  Award, 
  Share2, 
  Bookmark, 
  EyeOff,
  Scale,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailOpportunity, AcademicProfile } from "../types";
import { calculateMatch } from "../utils/matcher";
import { toast } from "@/hooks/use-toast";

interface OpportunityCardProps {
  opportunity: DetailOpportunity;
  profile: AcademicProfile | null;
}

const getFlagEmoji = (code: string): string => {
  const flags: Record<string, string> = {
    US: "🇺🇸",
    DE: "🇩🇪",
    CH: "🇨🇭",
    GB: "🇬🇧",
    EU: "🇪🇺",
    CN: "🇨🇳",
    SA: "🇸🇦",
    JP: "🇯🇵",
    CA: "🇨🇦",
    AU: "🇦🇺",
    IN: "🇮🇳",
    SG: "🇸🇬",
    BD: "🇧🇩"
  };
  return flags[code.toUpperCase()] || "🌐";
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, profile }) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isCompared, setIsCompared] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);

  // Calculate matching
  const matchResult = React.useMemo(() => {
    return calculateMatch(profile, opportunity);
  }, [profile, opportunity]);

  const { score, isEligible } = matchResult;

  // Hydrate states
  React.useEffect(() => {
    try {
      // 1. Bookmarks
      const storedTracker = localStorage.getItem("opportunityhub_tracker") || "[]";
      const trackerItems = JSON.parse(storedTracker);
      setIsBookmarked(trackerItems.some((item: { opportunityId: string }) => item.opportunityId === opportunity.id));

      // 2. Comparisons
      const storedCompare = localStorage.getItem("opportunityhub_compare") || "[]";
      const compareItems = JSON.parse(storedCompare);
      setIsCompared(compareItems.includes(opportunity.id));

      // 3. Hidden list
      const storedHidden = localStorage.getItem("opportunityhub_hidden") || "[]";
      const hiddenItems = JSON.parse(storedHidden);
      setIsHidden(hiddenItems.includes(opportunity.id));
    } catch (err) {
      console.error("Failed to load card states:", err);
    }
  }, [opportunity.id]);

  // Handle bookmark click
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("opportunityhub_tracker") || "[]";
      let trackerItems = JSON.parse(stored);

      if (isBookmarked) {
        trackerItems = trackerItems.filter((item: { opportunityId: string }) => item.opportunityId !== opportunity.id);
        setIsBookmarked(false);
        toast({
          title: "Bookmark Removed",
          description: "Removed from your application tracker board.",
          type: "info"
        });
      } else {
        const newItem = {
          opportunityId: opportunity.id,
          title: opportunity.title,
          host: opportunity.host,
          type: opportunity.type,
          deadline: opportunity.deadline,
          status: "wishlist",
          notes: "",
          lastUpdated: new Date().toISOString()
        };
        trackerItems.push(newItem);
        setIsBookmarked(true);
        toast({
          title: "Opportunity Saved",
          description: "Added to your tracker Wishlist panel.",
          type: "success"
        });
      }

      localStorage.setItem("opportunityhub_tracker", JSON.stringify(trackerItems));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to update bookmark:", err);
    }
  };

  // Handle compare toggle
  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("opportunityhub_compare") || "[]";
      let compareItems = JSON.parse(stored);

      if (isCompared) {
        compareItems = compareItems.filter((id: string) => id !== opportunity.id);
        setIsCompared(false);
        toast({
          title: "Removed from Compare",
          description: "Removed from your side-by-side comparison matrix.",
          type: "info"
        });
      } else {
        if (compareItems.length >= 3) {
          toast({
            title: "Limit Reached",
            description: "You can compare up to 3 opportunities at a time.",
            type: "warning"
          });
          return;
        }
        compareItems.push(opportunity.id);
        setIsCompared(true);
        toast({
          title: "Added to Compare",
          description: "Added to your side-by-side comparison matrix.",
          type: "success"
        });
      }
      localStorage.setItem("opportunityhub_compare", JSON.stringify(compareItems));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle hide toggle
  const handleHideToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("opportunityhub_hidden") || "[]";
      let hiddenItems = JSON.parse(stored);

      if (isHidden) {
        hiddenItems = hiddenItems.filter((id: string) => id !== opportunity.id);
        setIsHidden(false);
        toast({
          title: "Opportunity Restored",
          description: "This program is now visible in your feed again.",
          type: "info"
        });
      } else {
        hiddenItems.push(opportunity.id);
        setIsHidden(true);
        toast({
          title: "Opportunity Hidden",
          description: "This program has been filtered out of your matches.",
          type: "info"
        });
      }
      localStorage.setItem("opportunityhub_hidden", JSON.stringify(hiddenItems));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle share click
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = `${window.location.origin}/opportunities/${opportunity.id}`;
      navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };



  // Real-time Deadline countdown ticker details
  const countdownText = React.useMemo(() => {
    if (!opportunity.deadline) return "Rolling";
    const today = new Date();
    const deadlineDate = new Date(opportunity.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Closed";
    if (diffDays === 0) return "Ends Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  }, [opportunity.deadline]);

  const countdownColorClass = React.useMemo(() => {
    if (!opportunity.deadline) return "bg-indigo-500/5 text-indigo-500 border-indigo-500/10";
    const today = new Date();
    const deadlineDate = new Date(opportunity.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "bg-zinc-500/10 text-zinc-500 border-zinc-500/10";
    if (diffDays <= 15) return "bg-rose-500/10 text-rose-500 border-rose-500/25";
    if (diffDays <= 30) return "bg-amber-500/10 text-amber-500 border-amber-500/25";
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/25";
  }, [opportunity.deadline]);

  // Generate university initials for logo placeholder
  const uniInitials = React.useMemo(() => {
    return opportunity.host
      .split(" ")
      .map(w => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [opportunity.host]);

  // Circular progress calculations for matching rating ring
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const ringColorClass = React.useMemo(() => {
    if (!isEligible) return "stroke-rose-500";
    if (score >= 85) return "stroke-emerald-500";
    if (score >= 60) return "stroke-amber-500";
    return "stroke-zinc-500";
  }, [score, isEligible]);

  const badgeColorClass = React.useMemo(() => {
    if (!isEligible) return "text-rose-500 bg-rose-500/10";
    if (score >= 85) return "text-emerald-500 bg-emerald-500/10";
    if (score >= 60) return "text-amber-500 bg-amber-500/10";
    return "text-zinc-500 bg-zinc-500/10";
  }, [score, isEligible]);

  if (isHidden) return null; // Instantly hide card when clicked

  return (
    <Card className="flex flex-col h-full rounded-2xl border border-border/40 hover:border-indigo-500/30 bg-background/40 hover:bg-background/90 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group relative overflow-hidden backdrop-blur-xs">
      
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardHeader className="p-6 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Stylized Logo Frame */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 text-indigo-500 font-black text-xs shadow-inner shrink-0">
            {uniInitials}
          </div>

          <div className="flex items-center gap-1">
            {/* Compare Checkbox Icon action */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCompareToggle}
              className={`h-8 w-8 rounded-lg cursor-pointer transition-colors ${isCompared ? "text-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}
              aria-label="Add to Compare"
            >
              <Scale className="h-4 w-4" />
            </Button>

            {/* Hide Icon action */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHideToggle}
              className="h-8 w-8 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-accent/40 cursor-pointer"
              aria-label="Hide Opportunity"
            >
              <EyeOff className="h-4 w-4" />
            </Button>

            {/* Share action */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 cursor-pointer"
                aria-label="Share Opportunity"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              {showCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-zinc-100 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md animate-in fade-in zoom-in-95 duration-150">
                  Copied!
                </span>
              )}
            </div>

            {/* Bookmark action */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkToggle}
              className={`h-8 w-8 rounded-lg cursor-pointer ${isBookmarked ? "text-amber-500 bg-amber-500/5 hover:bg-amber-500/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}
              aria-label="Save Opportunity"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Badges line with Type and Academic Levels */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <Badge variant="outline" className="rounded-lg bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 border-indigo-500/10 font-bold text-[8px] uppercase tracking-wider px-2 py-0.5">
            {opportunity.type}
          </Badge>
          {opportunity.academicLevels.map((lvl) => (
            <Badge key={lvl} variant="outline" className="rounded-lg bg-zinc-500/5 text-muted-foreground border-border/40 font-bold text-[8px] uppercase tracking-wider px-2 py-0.5">
              {lvl === "Undergraduate" ? "Undergrad" : lvl === "Graduate" ? "Master" : lvl}
            </Badge>
          ))}
        </div>
        
        <CardTitle className="text-base font-extrabold text-foreground line-clamp-2 leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {opportunity.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0 pb-4 flex-1 space-y-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
          <span className="text-muted-foreground font-bold line-clamp-1">{opportunity.host}</span>
        </div>

        {/* Specifications Grid with Country Flags and Deadline Countdown */}
        <div className="grid grid-cols-2 gap-3 border-t border-b border-border/20 py-3 text-[11px] font-semibold">
          <div className="flex items-center space-x-1.5 text-muted-foreground truncate">
            <span className="text-sm filter drop-shadow-xs shrink-0">{getFlagEmoji(opportunity.countryCode)}</span>
            <span className="truncate">{opportunity.location}</span>
          </div>
          
          <div className={`flex items-center space-x-1.5 border rounded-lg px-2 py-0.5 shrink-0 w-fit font-bold ${countdownColorClass}`}>
            <Calendar className="h-3.5 w-3.5 shrink-0 text-current" />
            <span className="truncate">{countdownText}</span>
          </div>
        </div>

        {/* Academic Requirements details row */}
        <div className="flex flex-wrap gap-2 text-[10px] font-bold py-1 text-muted-foreground bg-zinc-500/5 p-2.5 rounded-xl border border-border/10 justify-between">
          <span className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
            GPA: {opportunity.gpaMin ? `>= ${opportunity.gpaMin}` : "No Min"}
          </span>
          <span className="flex items-center gap-1">
            <Globe className="h-3.5 w-3.5 text-indigo-500" />
            IELTS: {opportunity.ieltsMin ? `>= ${opportunity.ieltsMin}` : "No Min"}
          </span>
          {(opportunity.satMin || opportunity.actMin) && (
            <span className="flex items-center gap-1 text-indigo-500">
              ⚡ Test Required
            </span>
          )}
        </div>

        {/* Funding Value Info */}
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-indigo-500" />
            Funding
          </span>
          <span className="font-extrabold text-foreground bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-md truncate max-w-[150px]">
            {opportunity.amount}
          </span>
        </div>

        {/* Premium matching rating ring */}
        <div className="flex justify-between items-center border-t border-border/10 pt-3 text-[10px] font-bold">
          <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
            Match rating
          </span>
          
          <div className="flex items-center gap-2">
            <Badge className={`rounded-md border-none font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 ${badgeColorClass}`}>
              {isEligible ? "Eligible" : "Ineligible"}
            </Badge>

            {/* Circular Matching Score SVG Indicator */}
            <div className="relative h-8 w-8">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="16"
                  cy="16"
                  r={radius}
                  className="stroke-muted-foreground/15 fill-transparent"
                  strokeWidth="3"
                />
                <circle
                  cx="16"
                  cy="16"
                  r={radius}
                  className={`fill-transparent transition-all duration-500 ${ringColorClass}`}
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-foreground">
                {score}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => router.push(`/opportunities/${opportunity.id}`)}
          className="w-full justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold transition-all duration-300 text-xs py-5 h-auto shadow-md shadow-indigo-500/10 cursor-pointer"
        >
          View Full Details
        </Button>
      </CardFooter>
    </Card>
  );
};
