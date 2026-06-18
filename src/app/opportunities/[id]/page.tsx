"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  BookOpen,
  FileText,
  Clock,
  Compass,
  Sparkles,
  MessageSquare,
  Send,
  X
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { AcademicProfile } from "@/features/opportunities/types";
import { calculateMatch } from "@/features/opportunities/utils/matcher";
import { OpportunityCard } from "@/features/opportunities/components/OpportunityCard";
import { aiSummary, aiChat, aiEligibility, aiChecklist } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OpportunityDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const opportunityId = resolvedParams.id;

  const [profile, setProfile] = React.useState<AcademicProfile | null>(null);
  const [isProfileLoaded, setIsProfileLoaded] = React.useState(false);

  // Load profile from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("opportunityhub_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load academic profile:", err);
    } finally {
      setIsProfileLoaded(true);
    }
  }, []);

  // Find the current opportunity
  const opportunity = React.useMemo(() => {
    return MOCK_OPPORTUNITIES.find(opp => opp.id === opportunityId);
  }, [opportunityId]);

  // Calculate local dynamic matchmaking results (fallback)
  const matchResult = React.useMemo(() => {
    if (!opportunity) return null;
    return calculateMatch(profile, opportunity);
  }, [profile, opportunity]);

  // AI Eligibility results
  const [aiEligibilityResult, setAiEligibilityResult] = React.useState<{
    score: number;
    isEligible: boolean;
    reasons: string[];
    gaps: string[];
    roadmap: string[];
  } | null>(null);
  const [, setIsEligibilityLoading] = React.useState(false);

  React.useEffect(() => {
    if (!profile || !opportunity) return;
    let active = true;
    async function loadEligibility() {
      setIsEligibilityLoading(true);
      try {
        const res = await aiEligibility(opportunityId);
        if (active && res) {
          setAiEligibilityResult({
            score: res.score,
            isEligible: res.isEligible,
            reasons: res.reasons || [],
            gaps: res.gaps || [],
            roadmap: res.roadmap || []
          });
        }
      } catch (err) {
        console.error("AI Eligibility Check failed:", err);
      } finally {
        if (active) setIsEligibilityLoading(false);
      }
    }
    loadEligibility();
    return () => { active = false; };
  }, [profile, opportunity, opportunityId]);

  // Compute final eligibility parameters
  const { score, isEligible, matchReasons, missingRequirements, suggestedImprovements } = React.useMemo(() => {
    if (aiEligibilityResult) {
      return {
        score: aiEligibilityResult.score,
        isEligible: aiEligibilityResult.isEligible,
        matchReasons: aiEligibilityResult.reasons,
        missingRequirements: aiEligibilityResult.gaps,
        suggestedImprovements: aiEligibilityResult.roadmap
      };
    }
    const local = matchResult || { score: 75, isEligible: true, matchReasons: [], missingRequirements: [], suggestedImprovements: [] };
    return {
      score: local.score,
      isEligible: local.isEligible,
      matchReasons: local.matchReasons,
      missingRequirements: local.missingRequirements || [],
      suggestedImprovements: local.suggestedImprovements || []
    };
  }, [aiEligibilityResult, matchResult]);

  // Filter related opportunities: same type or discipline, excluding the current one
  const relatedOpportunities = React.useMemo(() => {
    if (!opportunity) return [];
    return MOCK_OPPORTUNITIES.filter(
      opp => opp.id !== opportunity.id && (opp.type === opportunity.type || opp.disciplines.some(d => opportunity.disciplines.includes(d)))
    ).slice(0, 2);
  }, [opportunity]);

  const scoreColorClass = React.useMemo(() => {
    if (score === undefined) return "";
    if (!isEligible) return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    if (score >= 85) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
  }, [score, isEligible]);

  // AI Summary states
  const [isAiLoading, setIsAiLoading] = React.useState(true);
  const [aiSummaryPoints, setAiSummaryPoints] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    if (!opportunity) return;
    const desc = opportunity.description;
    let active = true;
    async function loadSummary() {
      setIsAiLoading(true);
      try {
        const data = await aiSummary(opportunityId, desc);
        if (active) {
          setAiSummaryPoints([
            data.summary,
            ...data.keyPoints
          ]);
        }
      } catch (err) {
        console.error("AI Summary call failed:", err);
      } finally {
        if (active) setIsAiLoading(false);
      }
    }
    loadSummary();
    return () => { active = false; };
  }, [opportunity, opportunityId]);

  // Documents checklist state
  const [checklistDocs, setChecklistDocs] = React.useState<Array<{ name: string; status: boolean; description: string }>>([]);
  const [isChecklistLoading, setIsChecklistLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (!opportunity) return;
    let active = true;
    async function loadChecklist() {
      setIsChecklistLoading(true);
      try {
        const data = await aiChecklist(opportunityId);
        if (active) {
          const stored = localStorage.getItem(`opportunityhub_checklist_${opportunityId}`);
          const prepared = stored ? JSON.parse(stored) : {};
          
          const docs = data.documents.map(d => ({
            ...d,
            status: !!prepared[d.name]
          }));
          setChecklistDocs(docs);
        }
      } catch (err) {
        console.error("AI Checklist call failed:", err);
      } finally {
        if (active) setIsChecklistLoading(false);
      }
    }
    loadChecklist();
    return () => { active = false; };
  }, [opportunity, opportunityId]);

  // Track recently viewed opportunities
  React.useEffect(() => {
    if (!opportunityId) return;
    try {
      const stored = localStorage.getItem("opportunityhub_recently_viewed") || "[]";
      let list: string[] = JSON.parse(stored);
      list = list.filter(id => id !== opportunityId);
      list.unshift(opportunityId);
      list = list.slice(0, 3);
      localStorage.setItem("opportunityhub_recently_viewed", JSON.stringify(list));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to update recently viewed list:", err);
    }
  }, [opportunityId]);

  const toggleDoc = (docName: string) => {
    const updatedDocs = checklistDocs.map(d => {
      if (d.name === docName) {
        return { ...d, status: !d.status };
      }
      return d;
    });
    setChecklistDocs(updatedDocs);
    
    const prepared: Record<string, boolean> = {};
    updatedDocs.forEach(d => {
      prepared[d.name] = d.status;
    });
    try {
      localStorage.setItem(`opportunityhub_checklist_${opportunityId}`, JSON.stringify(prepared));
    } catch (err) {
      console.error(err);
    }
  };

  const preparedCount = checklistDocs.filter(d => d.status).length;
  const docsLength = checklistDocs.length;
  const preparedPercent = docsLength > 0 ? (preparedCount / docsLength) * 100 : 0;

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ role: "bot" | "user"; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial bot greeting
  React.useEffect(() => {
    if (opportunity) {
      setMessages([
        {
          role: "bot",
          text: `Hi! I'm your AI assistant for the **${opportunity.title}** program. Ask me anything about the eligibility requirements, funding, documents, or timeline!`,
          time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
        }
      ]);
    }
  }, [opportunity]);

  const getBotResponse = (question: string) => {
    if (!opportunity) return "";
    const q = question.toLowerCase();
    const deadlineDate = opportunity.deadline 
      ? new Date(opportunity.deadline).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })
      : "Rolling";
    
    if (q.includes("deadline") || q.includes("when") || q.includes("date") || q.includes("due")) {
      return `The official application deadline is **${deadlineDate}**. Be sure to submit all documents before this date.`;
    }
    if (q.includes("funding") || q.includes("amount") || q.includes("money") || q.includes("cover") || q.includes("cost") || q.includes("tuition")) {
      return `This opportunity provides **${opportunity.amount}**. It is classified as a **${opportunity.fundingType === "FullyFunded" ? "Fully Funded" : "Partially Funded"}** program, which helps offset academic costs.`;
    }
    if (q.includes("eligible") || q.includes("criteria") || q.includes("qualify") || q.includes("gpa") || q.includes("major")) {
      const matchRating = score || 0;
      return `To qualify for this program, you must study **${opportunity.disciplines.join(" or ")}** at the **${opportunity.academicLevels.join(" or ")}** level. Your profile currently calculates a **${matchRating}% match rating**.`;
    }
    if (q.includes("document") || q.includes("require") || q.includes("checklist") || q.includes("apply") || q.includes("need")) {
      return `You will need to prepare the following dossier items: **${opportunity.requiredDocuments.join(", ")}**. You can track your progress using the checklist on this page!`;
    }
    if (q.includes("host") || q.includes("who") || q.includes("where") || q.includes("country") || q.includes("location") || q.includes("university")) {
      return `This program is hosted by **${opportunity.host}** located in **${opportunity.location}** (${opportunity.countryCode}).`;
    }
    return `The **${opportunity.title}** program is hosted by **${opportunity.host}** in **${opportunity.location}**. It offers **${opportunity.amount}** in funding. Is there a specific detail (like deadlines, eligibility, or documents) you'd like to check?`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput.trim();
    const timeString = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: userMsg, time: timeString }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const responseText = await aiChat(opportunityId, userMsg);
      const botTimeString = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      
      if (responseText) {
        setMessages(prev => [...prev, { role: "bot", text: responseText, time: botTimeString }]);
      } else {
        const fallbackText = getBotResponse(userMsg);
        setMessages(prev => [...prev, { role: "bot", text: fallbackText, time: botTimeString }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const botTimeString = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      const fallbackText = getBotResponse(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: fallbackText, time: botTimeString }]);
    } finally {
      setIsTyping(false);
    }
  };

  // If opportunity not found, display fallback
  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2 text-foreground">Opportunity Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The program you are trying to view does not exist or has been removed from our databases.
        </p>
        <Button 
          onClick={() => router.push("/opportunities")} 
          className="rounded-xl bg-indigo-600 text-white font-bold"
        >
          Return to Catalog
        </Button>
      </div>
    );
  }

  // Guaranteed not null here
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8 animate-in fade-in duration-300">
      
      {/* Breadcrumbs Back Navigation */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => router.push("/opportunities")}
          className="group rounded-xl h-9 text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Scholarship Catalog
        </Button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT MAIN DETAIL COLUMNS ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Banner */}
          <div className="space-y-4 border-b border-border/40 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-lg bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 border-indigo-500/25 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5">
                {opportunity.type}
              </Badge>
              <Badge variant="outline" className="rounded-lg bg-emerald-500/5 text-emerald-500 dark:text-emerald-400 border-emerald-500/25 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5">
                {opportunity.fundingType === "FullyFunded" ? "Fully Funded" : opportunity.fundingType === "PartiallyFunded" ? "Partially Funded" : "Paid"}
              </Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight">
              {opportunity.title}
            </h1>
            
            <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400">
              {opportunity.host}
            </p>
          </div>

          {/* Description Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Compass className="h-5 w-5 text-indigo-500" />
              Program Overview
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {opportunity.description}
            </p>
          </section>

          {/* AI Summary Card */}
          <Card className="rounded-2xl border-indigo-500/20 bg-indigo-500/5 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 pointer-events-none" />
            <div className="flex items-center justify-between border-b border-indigo-500/10 pb-3 mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-500 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
                AI Opportunity Insights
              </h3>
              <Badge variant="outline" className="rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none text-[8px] font-bold uppercase tracking-wider px-2 py-0.5">
                Verified AI
              </Badge>
            </div>
            
            {isAiLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-5/6 bg-muted/60" />
                <Skeleton className="h-4 w-4/5 bg-muted/60" />
                <Skeleton className="h-4 w-2/3 bg-muted/60" />
              </div>
            ) : (
              <ul className="space-y-2.5">
                {aiSummaryPoints.map((point, index) => (
                  <li key={index} className="flex gap-2 text-xs text-muted-foreground leading-relaxed font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 animate-pulse" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Benefits Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Award className="h-5 w-5 text-indigo-500" />
              Financial & Award Benefits
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {opportunity.benefits.map((benefit, index) => (
                <li key={index} className="flex gap-2 p-3 bg-muted/20 border border-border/10 rounded-xl text-xs text-muted-foreground leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Eligibility Criteria Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              Admission Eligibility
            </h2>
            <ul className="space-y-2.5">
              {opportunity.eligibilityCriteria.map((criteria, index) => (
                <li key={index} className="flex gap-2 p-3 bg-muted/20 border border-border/10 rounded-xl text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Documents Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/10 pb-2">
              <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-indigo-500" />
                Required Application Documents
              </h2>
              {docsLength > 0 && (
                <Badge variant="secondary" className="rounded-lg text-[9px] font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none px-2 py-0.5">
                  Prepared: {preparedCount} / {docsLength} ({Math.round(preparedPercent)}%)
                </Badge>
              )}
            </div>
            
            {/* Progress bar */}
            {docsLength > 0 && (
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${preparedPercent}%` }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {isChecklistLoading ? (
                <>
                  <Skeleton className="h-16 w-full bg-muted/60" />
                  <Skeleton className="h-16 w-full bg-muted/60" />
                </>
              ) : checklistDocs.map((doc, index) => {
                const isChecked = doc.status;
                return (
                  <div 
                    key={index} 
                    onClick={() => toggleDoc(doc.name)}
                    className={cn(
                      "flex flex-col p-3.5 border rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 select-none space-y-1.5",
                      isChecked 
                        ? "bg-indigo-500/5 border-indigo-500/30 text-indigo-500" 
                        : "bg-background/50 border-border/40 text-foreground hover:border-indigo-500/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded-lg",
                          isChecked ? "bg-indigo-500/10 text-indigo-500" : "bg-muted text-muted-foreground"
                        )}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className={isChecked ? "line-through opacity-80" : ""}>{doc.name}</span>
                      </div>
                      
                      <div className={cn(
                        "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                        isChecked ? "border-indigo-500 bg-indigo-500 text-white" : "border-muted-foreground/30"
                      )}>
                        {isChecked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    {doc.description && (
                      <p className="text-[10px] text-muted-foreground pl-10 font-normal leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline & Milestones Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-indigo-500" />
              Important Timeline & Dates
            </h2>
            <div className="border border-border/40 bg-background/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xs">
              <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-border/40 hidden md:block" />
              
              <div className="space-y-6">
                {opportunity.timeline.map((item, index) => {
                  const itemDate = item.date ? new Date(item.date) : null;
                  const isPassed = itemDate ? itemDate < new Date() : false;
                  
                  return (
                    <div key={index} className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-xs">
                      {/* Date Indicator dot */}
                      <div className={`h-6 w-6 rounded-full border-4 ${isPassed ? "bg-muted border-muted-foreground/20" : "bg-indigo-500 border-indigo-500/20"} z-10 shrink-0 hidden md:block`} />
                      
                      {/* Date segment */}
                      <div className="w-32 font-black text-indigo-500 shrink-0">
                        {itemDate ? itemDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Rolling"}
                      </div>
                      
                      {/* Event description */}
                      <div className="flex-1 font-semibold text-foreground bg-muted/10 p-3 rounded-xl border border-border/10 md:bg-transparent md:border-none md:p-0">
                        {item.event}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Application Steps */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Compass className="h-5 w-5 text-indigo-500" />
              Step-by-Step Instructions
            </h2>
            <ol className="space-y-3">
              {opportunity.applicationSteps.map((step, index) => (
                <li key={index} className="flex gap-4 p-4 bg-muted/20 border border-border/10 rounded-xl text-xs text-muted-foreground leading-relaxed">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/25 flex items-center justify-center font-black shrink-0 text-[10px]">
                    {index + 1}
                  </div>
                  <div className="pt-0.5">{step}</div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* ================= RIGHT SIDEBAR COLUMNS ================= */}
        <div className="space-y-6">
          
          {/* Personalized Matching Engine Panel */}
          {isProfileLoaded && (
            <Card className="rounded-2xl border-border/40 bg-background/30 backdrop-blur-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 pointer-events-none" />
              
              <CardHeader className="border-b border-border/40 p-6">
                <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                  Eligibility Forecast
                </CardTitle>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-3xl font-black text-foreground">{score}%</span>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Calculated Match</p>
                  </div>
                  
                  <Badge variant="outline" className={`rounded-xl px-3 py-1 font-bold text-xs uppercase tracking-wider ${scoreColorClass}`}>
                    {isEligible ? "Eligible" : "Ineligible"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4 text-xs font-semibold">
                
                {/* Match Reasons */}
                {isEligible && matchReasons.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">Why you match:</span>
                    <ul className="space-y-2">
                      {matchReasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Criteria */}
                {missingRequirements.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">Missing Requirements:</span>
                    <ul className="space-y-2">
                      {missingRequirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2 text-rose-500 font-medium">
                          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Gaps Improvements */}
                {suggestedImprovements.length > 0 && (
                  <div className="space-y-2 border-t border-border/20 pt-4">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">Suggested Actions:</span>
                    <ul className="space-y-2">
                      {suggestedImprovements.map((imp, idx) => (
                        <li key={idx} className="flex gap-2 text-muted-foreground font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {!profile && (
                  <div className="text-center py-4 space-y-3">
                    <p className="text-muted-foreground text-xs leading-normal font-medium">
                      Fill out your academic profile to test this opportunity against your CGPA, Major, and language scores.
                    </p>
                    <Button 
                      onClick={() => router.push("/profile")}
                      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-9 text-xs"
                    >
                      Setup Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Specifications Info Grid */}
          <Card className="rounded-2xl border-border/40 bg-background/20 p-6 space-y-4">
            <div className="space-y-3 text-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground border-b border-border/20 pb-2">Program Details</h3>
              
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground font-medium">Country</span>
                <span className="font-bold text-foreground">{opportunity.location}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground font-medium">Award Value</span>
                <span className="font-bold text-foreground truncate pl-4">{opportunity.amount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground font-medium">Deadline</span>
                <span className="font-bold text-foreground">
                  {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Rolling"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground font-medium">Field of Study</span>
                <span className="font-bold text-foreground">{opportunity.disciplines.join(", ")}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground font-medium">Academic Level</span>
                <span className="font-bold text-foreground">{opportunity.academicLevels.join(", ")}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <a 
                href={opportunity.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10 h-auto"
                )}
              >
                Apply on Official Site
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= BOTTOM RELATED OPPORTUNITIES ================= */}
      {relatedOpportunities.length > 0 && (
        <section className="border-t border-border/40 pt-12 space-y-6">
          <div>
            <h2 className="text-xl font-black text-foreground">Related Opportunities</h2>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Explore similar programs matched to the discipline and study level of this listing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {relatedOpportunities.map((opp) => (
              <OpportunityCard 
                key={opp.id} 
                opportunity={opp} 
                profile={profile} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Floating Chatbot Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatOpen(true)}
          className="h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center cursor-pointer transition-all hover:scale-110 duration-200 animate-bounce"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>

      {/* Context Chatbot Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Overlay backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsChatOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/10">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-inner shrink-0 animate-pulse">
                  AI
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Program Assistant</h3>
                  <p className="text-[9px] text-muted-foreground font-semibold">Chatting about: {opportunity.title}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => {
                const isBot = msg.role === "bot";
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs",
                      isBot 
                        ? "bg-muted/50 text-foreground self-start rounded-tl-none border border-border/10" 
                        : "bg-indigo-600 text-white self-end rounded-tr-none"
                    )}
                  >
                    {/* Parse simple markdown bold symbols */}
                    <p className="whitespace-pre-wrap font-semibold">
                      {msg.text.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold underline">{part}</strong> : part)}
                    </p>
                    <span className={cn(
                      "text-[8px] font-bold mt-1.5 self-end",
                      isBot ? "text-muted-foreground/60" : "text-indigo-200"
                    )}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="bg-muted/50 border border-border/10 text-foreground rounded-2xl rounded-tl-none p-3.5 text-xs self-start flex items-center space-x-1 max-w-[80%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border/40 flex items-center gap-2 bg-muted/5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about deadlines, funding, eligibility..."
                className="flex-1 h-9 px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-medium"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!chatInput.trim() || isTyping}
                className="h-9 w-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-md shadow-indigo-500/10 shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
