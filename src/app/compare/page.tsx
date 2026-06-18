"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Award, 
  Calendar, 
  FileText, 
  Globe, 
  GraduationCap, 
  MapPin, 
  Scale, 
  Star, 
  Trash2,
  Undo2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/navigation";
import { MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { AcademicProfile, DetailOpportunity } from "@/features/opportunities/types";
import { calculateMatch } from "@/features/opportunities/utils/matcher";
import { toast } from "@/hooks/use-toast";

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
    IN: "🇮🇳"
  };
  return flags[code.toUpperCase()] || "🌐";
};

export default function ComparePage() {
  const router = useRouter();
  const [profile, setProfile] = React.useState<AcademicProfile | null>(null);
  const [compareIds, setCompareIds] = React.useState<string[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Hydrate from localStorage
  React.useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("opportunityhub_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

      const storedCompare = localStorage.getItem("opportunityhub_compare") || "[]";
      setCompareIds(JSON.parse(storedCompare));
    } catch (err) {
      console.error("Failed to load compare settings:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Filter compared opportunities
  const comparedOpportunities = React.useMemo(() => {
    return compareIds
      .map(id => MOCK_OPPORTUNITIES.find(o => o.id === id))
      .filter(Boolean) as DetailOpportunity[];
  }, [compareIds]);

  const handleRemoveFromCompare = (id: string) => {
    const updated = compareIds.filter(x => x !== id);
    setCompareIds(updated);
    localStorage.setItem("opportunityhub_compare", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    toast({
      title: "Opportunity Removed",
      description: "Removed from your comparison list.",
      type: "info"
    });
  };

  const handleClearCompare = () => {
    setCompareIds([]);
    localStorage.setItem("opportunityhub_compare", JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));
    toast({
      title: "Comparison Cleared",
      description: "All opportunities cleared from comparison.",
      type: "info"
    });
  };

  const handleAddSampleCompare = () => {
    // Add Fulbright and Erasmus Mundus as defaults for comparison demo
    const samples = ["1", "2"];
    setCompareIds(samples);
    localStorage.setItem("opportunityhub_compare", JSON.stringify(samples));
    window.dispatchEvent(new Event("storage"));
    toast({
      title: "Demo Loaded",
      description: "Loaded sample programs for side-by-side comparison.",
      type: "success"
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Comparison...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-[1400px] mx-auto animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <Scale className="h-6 w-6 text-indigo-500" />
              Compare Opportunities
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Analyze details, eligibility criteria, and funding amounts side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {comparedOpportunities.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearCompare}
                className="rounded-xl text-xs h-9 font-bold text-rose-500 border-rose-500/20 hover:bg-rose-500/5 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => router.push("/opportunities")}
              className="rounded-xl text-xs h-9 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Undo2 className="h-4 w-4" />
              Catalog
            </Button>
          </div>
        </div>

        {/* Comparison Dashboard Grid */}
        {comparedOpportunities.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 animate-pulse">
              <Scale className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">No Opportunities Selected</h3>
              <p className="text-xs text-muted-foreground leading-normal">
                To compare programs, browse our catalog and click &ldquo;Add to Compare&rdquo; on cards or detail views, or load our demo comparison matrices below.
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <Button
                onClick={handleAddSampleCompare}
                className="rounded-xl text-xs h-10 px-5 font-bold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-md shadow-indigo-500/10"
              >
                Load Demo Comparison
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/opportunities")}
                className="rounded-xl text-xs h-10 px-5 font-bold cursor-pointer"
              >
                Browse Catalog
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto border border-border/40 rounded-2xl bg-background/20 backdrop-blur-md shadow-xl scrollbar-thin">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-border/40 bg-muted/40">
                  <th className="p-4 w-52 font-black uppercase text-muted-foreground tracking-wider">Parameters</th>
                  {comparedOpportunities.map(opp => (
                    <th key={opp.id} className="p-4 border-l border-border/20">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="text-[8px] font-black uppercase tracking-wider bg-indigo-500/5 text-indigo-500 border-none px-2 py-0">
                            {opp.type}
                          </Badge>
                          <button
                            onClick={() => handleRemoveFromCompare(opp.id)}
                            className="text-muted-foreground/60 hover:text-rose-500 transition-colors"
                            aria-label={`Remove ${opp.title} from comparison`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <h3 className="text-xs font-black text-foreground line-clamp-2 leading-snug">{opp.title}</h3>
                        <p className="text-[10px] text-muted-foreground font-bold">{opp.host}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 1. Country & Location */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                    Location
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{getFlagEmoji(opp.countryCode)}</span>
                        <span>{opp.location}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. Funding Value */}
                <tr className="border-b border-border/10 bg-muted/5">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-indigo-500 shrink-0" />
                      Award Value
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground font-extrabold text-indigo-500 dark:text-indigo-400">
                      {opp.amount}
                    </td>
                  ))}
                </tr>

                {/* 3. Match Forecast rating */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-indigo-500 shrink-0" />
                      Match Rating
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => {
                    const { score, isEligible } = calculateMatch(profile, opp);
                    return (
                      <td key={opp.id} className="p-4 border-l border-border/20">
                        <Badge variant="outline" className={`rounded-xl px-2.5 py-0.5 font-bold text-[9px] uppercase tracking-wider ${
                          !isEligible ? "bg-rose-500/10 text-rose-500 border-none" :
                          score >= 85 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-none" :
                          "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-none"
                        }`}>
                          {score}% Match ({isEligible ? "Eligible" : "Ineligible"})
                        </Badge>
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Academic Levels */}
                <tr className="border-b border-border/10 bg-muted/5">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-indigo-500 shrink-0" />
                      Academic Level
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground">
                      <div className="flex flex-wrap gap-1">
                        {opp.academicLevels.map(lvl => (
                          <Badge key={lvl} variant="outline" className="rounded-md bg-muted/30 text-muted-foreground border-border/30 text-[8px] py-0 font-bold">
                            {lvl}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* GPA Requirements */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-indigo-500 shrink-0" />
                      GPA Req
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground font-bold">
                      {opp.gpaMin ? `≥ ${opp.gpaMin}` : "No Minimum GPA"}
                    </td>
                  ))}
                </tr>

                {/* SAT Requirements */}
                <tr className="border-b border-border/10 bg-muted/5">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-indigo-500 shrink-0" />
                      SAT Req
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground font-bold">
                      {opp.satMin ? `≥ ${opp.satMin}` : "No Minimum SAT"}
                    </td>
                  ))}
                </tr>

                {/* ACT Requirements */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-indigo-500 shrink-0" />
                      ACT Req
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground font-bold">
                      {opp.actMin ? `≥ ${opp.actMin}` : "No Minimum ACT"}
                    </td>
                  ))}
                </tr>

                {/* IELTS & TOEFL Requirements */}
                <tr className="border-b border-border/10 bg-muted/5">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-indigo-500 shrink-0" />
                      Lang Req
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground leading-normal">
                      <div className="space-y-1">
                        <div>IELTS: {opp.ieltsMin ? `≥ ${opp.ieltsMin}` : "No Min"}</div>
                        <div>TOEFL: {opp.toeflMin ? `≥ ${opp.toeflMin}` : "No Min"}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 5. Target Disciplines */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-indigo-500 shrink-0" />
                      Study Disciplines
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground">
                      <div className="flex flex-wrap gap-1">
                        {opp.disciplines.map(d => (
                          <Badge key={d} variant="outline" className="rounded-md bg-indigo-500/5 text-indigo-500 border-none text-[8px] py-0 font-bold">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. Deadlines */}
                <tr className="border-b border-border/10 bg-muted/5">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-indigo-500 shrink-0" />
                      Deadline Date
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground">
                      {opp.deadline ? new Date(opp.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Rolling"}
                    </td>
                  ))}
                </tr>

                {/* 7. Required Documents */}
                <tr className="border-b border-border/10">
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-indigo-500 shrink-0" />
                      Dossier Check
                    </div>
                  </td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20 text-foreground">
                      <ul className="list-disc pl-4 space-y-1 text-[10px] text-muted-foreground leading-normal">
                        {opp.requiredDocuments.slice(0, 3).map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                        {opp.requiredDocuments.length > 3 && <li>+ {opp.requiredDocuments.length - 3} more</li>}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 8. Direct Link actions */}
                <tr>
                  <td className="p-4 text-muted-foreground font-bold uppercase tracking-wider">Link Actions</td>
                  {comparedOpportunities.map(opp => (
                    <td key={opp.id} className="p-4 border-l border-border/20">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => router.push(`/opportunities/${opp.id}`)}
                          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-8 text-[10px] cursor-pointer"
                        >
                          View Details
                        </Button>
                        <a
                          href={opp.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center border border-border/30 hover:border-indigo-500/20 hover:bg-indigo-500/5 text-muted-foreground hover:text-indigo-500 font-extrabold h-8 text-[10px] rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          Visit Source
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
