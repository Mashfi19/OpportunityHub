"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ArrowRight, 
  Globe, 
  Calendar, 
  Award, 
  Star, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle,
  Mail,
  SlidersHorizontal,
  Clock,
  Zap,
  Sparkles,
  Brain,
  Briefcase,
  GraduationCap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Injected mock database of featured opportunities
const FEATURED_OPPORTUNITIES = [
  {
    id: "1",
    title: "Erasmus Mundus Joint Masters Scholarship",
    host: "European Commission",
    location: "Europe (Multiple)",
    type: "Scholarship",
    funding: "Fully Funded",
    amount: "€1,400 / month + tuition",
    deadline: "Jan 15, 2027",
    matchScore: 98,
    tags: ["Master", "All Disciplines"]
  },
  {
    id: "2",
    title: "Fulbright Foreign Student Program",
    host: "US Department of State",
    location: "United States",
    type: "Fellowship",
    amount: "Tuition, stipend & airfare",
    deadline: "Oct 12, 2026",
    matchScore: 95,
    tags: ["Graduate", "Leadership"]
  },
  {
    id: "3",
    title: "CERN Openlab Summer Student Program",
    host: "CERN",
    location: "Switzerland",
    type: "Internship",
    amount: "CHF 90 / day + travel allowance",
    deadline: "Jan 31, 2027",
    matchScore: 92,
    tags: ["Undergraduate", "STEM"]
  }
];

const LATEST_OPPORTUNITIES = [
  {
    id: "5",
    title: "Google STEP Internship 2026",
    host: "Google",
    location: "Switzerland",
    type: "Internship",
    amount: "Competitive salary + relocation",
    deadline: "Oct 30, 2026",
    tags: ["Undergrad", "STEM"]
  },
  {
    id: "7",
    title: "Gates Cambridge Scholarship",
    host: "Bill & Melinda Gates Foundation",
    location: "United Kingdom",
    type: "Scholarship",
    amount: "£20,000 / year + tuition",
    deadline: "Dec 5, 2026",
    tags: ["Graduate", "PhD"]
  },
  {
    id: "11",
    title: "KAUST VSRP Internship",
    host: "KAUST",
    location: "Saudi Arabia",
    type: "Internship",
    amount: "$1,000 / mo + housing + flights",
    deadline: "Dec 31, 2026",
    tags: ["Undergrad", "STEM"]
  }
];

const TOP_UNIVERSITIES = [
  { name: "University of Cambridge", location: "United Kingdom", logo: "UC", opportunities: "14 active programs" },
  { name: "ETH Zurich", location: "Switzerland", logo: "EZ", opportunities: "8 active programs" },
  { name: "Tsinghua University", location: "China", logo: "TU", opportunities: "5 active programs" },
  { name: "Stanford University", location: "United States", logo: "SU", opportunities: "11 active programs" },
  { name: "Munich University (LMU)", location: "Germany", logo: "MU", opportunities: "9 active programs" },
  { name: "KAUST", location: "Saudi Arabia", logo: "KU", opportunities: "6 active programs" }
];

const CATEGORIES = [
  { name: "Scholarships", type: "Scholarship", count: "120+", icon: GraduationCap, description: "Fully and partially funded studies", color: "text-indigo-500 bg-indigo-500/10" },
  { name: "Internships", type: "Internship", count: "85+", icon: Briefcase, description: "Paid industry & research placements", color: "text-emerald-500 bg-emerald-500/10" },
  { name: "Fellowships", type: "Fellowship", count: "40+", icon: Award, description: "Professional & academic development", color: "text-amber-500 bg-amber-500/10" },
  { name: "Research Grants", type: "ResearchGrant", count: "30+", icon: Brain, description: "PhD and Postdoc research budgets", color: "text-purple-500 bg-purple-500/10" },
  { name: "Conferences", type: "Conference", count: "15+", icon: Users, description: "Travel grants & fee waivers", color: "text-rose-500 bg-rose-500/10" },
  { name: "Exchange Programs", type: "ExchangeProgram", count: "20+", icon: Globe, description: "Semester abroad credits transfer", color: "text-blue-500 bg-blue-500/10" }
];

const TRENDING_COUNTRIES = [
  { name: "Germany", flag: "🇩🇪", opportunities: "310 available", theme: "from-amber-500 to-red-600" },
  { name: "United States", flag: "🇺🇸", opportunities: "450 available", theme: "from-blue-600 to-red-500" },
  { name: "Switzerland", flag: "🇨🇭", opportunities: "120 available", theme: "from-red-500 to-rose-600" },
  { name: "United Kingdom", flag: "🇬🇧", opportunities: "290 available", theme: "from-indigo-600 to-blue-500" },
  { name: "Japan", flag: "🇯🇵", opportunities: "140 available", theme: "from-red-600 to-orange-400" },
  { name: "Canada", flag: "🇨🇦", opportunities: "210 available", theme: "from-red-500 to-red-700" }
];

const LATEST_UPDATES = [
  {
    title: "DAAD PhD Research Grants",
    source: "DAAD Germany",
    time: "2 hours ago",
    status: "Verified",
    badgeColor: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "CERN Summer Student Internship Program",
    source: "CERN Notice Bulletin",
    time: "5 hours ago",
    status: "Auto-discovered",
    badgeColor: "bg-indigo-500/10 text-indigo-500"
  },
  {
    title: "Schwarzman Scholars Masters Program",
    source: "Tsinghua University Board",
    time: "1 day ago",
    status: "Verified",
    badgeColor: "bg-emerald-500/10 text-emerald-500"
  }
];

const FAQ_ITEMS = [
  {
    q: "How does OpportunityHub match opportunities to my profile?",
    a: "When you build your Academic Profile, you input credentials like GPA, nationality, fields of interest, and degree level. Our matchmaking engine cross-references this with the eligibility criteria of thousands of scholarships, fellowships, and internships in our system, giving you an eligibility score for each opportunity."
  },
  {
    q: "How frequently are opportunities updated?",
    a: "Our discovery crawlers scan official global education and grant portals twice daily. Every discovered opportunity is moderated by our administrative team to verify deadline accuracy and eligibility criteria before being published."
  },
  {
    q: "Is OpportunityHub free to use?",
    a: "Yes! OpportunityHub offers a fully-featured free tier that lets you search, filter, and match with global opportunities. We also offer a Premium tier with instant SMS/email alerts, document storage, and AI-assisted essay guidance."
  }
];

export default function Home() {
  const router = useRouter();
  
  // Search Mode state
  const [searchMode, setSearchMode] = React.useState<"classic" | "ai">("classic");

  // Classic Search states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("");
  
  // AI Prompt search states
  const [aiPrompt, setAiPrompt] = React.useState("");
  const [isAiParsing, setIsAiParsing] = React.useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  // Newsletter state
  const [emailInput, setEmailInput] = React.useState("");
  const [newsletterStatus, setNewsletterStatus] = React.useState<"idle" | "loading" | "success">("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedType) params.set("type", selectedType);
    if (selectedLevel) params.set("level", selectedLevel);
    
    router.push(`/opportunities?${params.toString()}`);
  };

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiParsing(true);
    
    // Simulate AI extraction logic
    setTimeout(() => {
      setIsAiParsing(false);
      const query = aiPrompt.toLowerCase();
      const params = new URLSearchParams();

      let matchedCountry = "";
      let matchedType = "";
      let matchedDiscipline = "";

      if (query.includes("germany")) { matchedCountry = "DE"; params.set("country", "DE"); }
      if (query.includes("switzerland")) { matchedCountry = "CH"; params.set("country", "CH"); }
      if (query.includes("united states") || query.includes("usa") || query.includes("us ")) { matchedCountry = "US"; params.set("country", "US"); }
      if (query.includes("united kingdom") || query.includes("uk")) { matchedCountry = "GB"; params.set("country", "GB"); }

      if (query.includes("internship") || query.includes("placement") || query.includes("intern")) { matchedType = "Internship"; params.set("type", "Internship"); }
      if (query.includes("scholarship") || query.includes("funding")) { matchedType = "Scholarship"; params.set("type", "Scholarship"); }
      if (query.includes("fellowship")) { matchedType = "Fellowship"; params.set("type", "Fellowship"); }
      if (query.includes("grant") || query.includes("research")) { matchedType = "ResearchGrant"; params.set("type", "ResearchGrant"); }

      if (query.includes("computer science") || query.includes("stem") || query.includes("engineering")) { matchedDiscipline = "STEM"; params.set("discipline", "STEM"); }

      toast({
        title: "AI Prompt Parsed Successfully",
        description: `Identified: ${matchedType || "Any opportunity"} ${matchedDiscipline ? `in ${matchedDiscipline}` : ""} ${matchedCountry ? `located in ${matchedCountry}` : ""}.`,
        type: "success"
      });

      params.set("q", aiPrompt);
      router.push(`/opportunities?${params.toString()}`);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setNewsletterStatus("loading");
    
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmailInput("");
      
      toast({
        title: "Subscribed Successfully",
        description: "You have been added to the Weekly Discovery Digest list.",
        type: "success"
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32 bg-gradient-to-b from-indigo-950/20 via-background to-background">
        {/* Glow Rings */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center max-w-5xl">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-8 leading-[1.1]">
            Connecting Global Talent with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Lifelong Opportunities
            </span>
          </h1>
          
          <p className="max-w-[700px] mx-auto text-sm md:text-base text-muted-foreground mb-10 leading-relaxed">
            Discover thousands of verified scholarships, internships, research fellowships, and summer schools worldwide. Personalized matchmaking matched specifically to your academic credentials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button 
              onClick={() => router.push("/profile")} 
              className="w-full sm:w-auto h-12 rounded-xl px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Build Academic Profile</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push("/opportunities")} 
              className="w-full sm:w-auto h-12 rounded-xl px-8 border border-border/40 bg-background/50 backdrop-blur-md hover:bg-accent/40 font-bold transition-all duration-300 cursor-pointer"
            >
              Explore Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* 2. AI SEARCH & CLASSIC SEARCH SECTION */}
      <section className="py-6 bg-background relative z-20">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <Card className="p-4 md:p-6 shadow-2xl border border-border/40 bg-background/50 backdrop-blur-xl -mt-16 md:-mt-24 rounded-2xl">
            {/* Mode Select Header */}
            <div className="flex border-b border-border/20 pb-3 mb-4 gap-4">
              <button
                onClick={() => setSearchMode("classic")}
                className={`flex items-center gap-1.5 pb-2 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${searchMode === "classic" ? "border-indigo-500 text-indigo-500" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Classic Search
              </button>
              <button
                onClick={() => setSearchMode("ai")}
                className={`flex items-center gap-1.5 pb-2 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${searchMode === "ai" ? "border-indigo-500 text-indigo-500" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Search with AI
              </button>
            </div>

            {searchMode === "classic" ? (
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-4">
                {/* Keyword Search */}
                <div className="relative w-full lg:flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    type="text"
                    placeholder="Search scholarships, subject areas, or host institutions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 w-full border border-border/40 bg-background/30 rounded-xl focus-visible:ring-indigo-500 focus-visible:ring-2 font-semibold text-xs"
                  />
                </div>

                {/* Opportunity Type Select */}
                <div className="w-full lg:w-48">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="h-12 w-full px-3 py-2 text-xs border border-border/40 bg-background rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-950 font-bold"
                    aria-label="Opportunity Type"
                  >
                    <option value="">All Types</option>
                    <option value="Scholarship">Scholarships</option>
                    <option value="Internship">Internships</option>
                    <option value="Fellowship">Fellowships</option>
                    <option value="ResearchGrant">Research Grants</option>
                    <option value="ExchangeProgram">Exchange Programs</option>
                  </select>
                </div>

                {/* Degree Level Select */}
                <div className="w-full lg:w-48">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="h-12 w-full px-3 py-2 text-xs border border-border/40 bg-background rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-950 font-bold"
                    aria-label="Academic Level"
                  >
                    <option value="">All Levels</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Master&apos;s / Graduate</option>
                    <option value="PhD">PhD / Doctorate</option>
                    <option value="PostDoc">Post-Doctorate</option>
                  </select>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full lg:w-auto h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/10 cursor-pointer">
                  <span>Search Catalog</span>
                </Button>
              </form>
            ) : (
              <form onSubmit={handleAiSearch} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder="Describe your background and goals (e.g., 'I am a computer science undergrad from Switzerland with a 3.5 GPA looking for a paid internship')"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full p-4 text-xs font-semibold border border-border/40 bg-background/30 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">
                    <Brain className="h-3.5 w-3.5 text-indigo-400" />
                    Natural NLP Parser
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isAiParsing || !aiPrompt.trim()}
                    className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 flex items-center justify-center gap-2 shadow-md shadow-indigo-500/10 cursor-pointer"
                  >
                    {isAiParsing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>AI Parsing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Match with AI</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
              Search by Category
            </h2>
            <p className="text-muted-foreground text-xs font-semibold">
              Explore global opportunities structured by academic mobilization and funding targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => router.push(`/opportunities?type=${cat.type}`)}
                  className="group cursor-pointer rounded-2xl border border-border/40 bg-background/40 hover:bg-background hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center space-y-4"
                >
                  <div className={`p-3.5 rounded-xl ${cat.color} shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xs text-foreground group-hover:text-indigo-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] text-muted-foreground leading-normal font-semibold">
                      {cat.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-md text-[8px] font-black tracking-wider uppercase px-2 py-0.5 border-none mt-auto">
                    {cat.count} Programs
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED OPPORTUNITIES SECTION */}
      <section className="py-20 bg-accent/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl mb-6 md:mb-0 space-y-2">
              <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
                High-Impact Featured Opportunities
              </h2>
              <p className="text-muted-foreground text-xs font-semibold">
                Discover prestigious, fully-funded programs currently accepting applications from official sources globally.
              </p>
            </div>
            <Button 
              onClick={() => router.push("/opportunities")} 
              variant="ghost" 
              className="group text-indigo-500 dark:text-indigo-400 font-black hover:text-indigo-600 hover:bg-transparent p-0 flex items-center space-x-1 cursor-pointer"
            >
              <span>View all opportunities</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_OPPORTUNITIES.map((opp) => (
              <Card key={opp.id} className="flex flex-col rounded-2xl border border-border/40 hover:border-indigo-500/20 bg-background/50 hover:bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden group">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none font-bold text-[9px] uppercase px-2 py-0.5">
                      {opp.type}
                    </Badge>
                    <div className="flex items-center space-x-1 text-emerald-500 font-bold text-[10px] bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                      <Star className="h-3 w-3 fill-emerald-500" />
                      <span>{opp.matchScore}% Match</span>
                    </div>
                  </div>
                  <CardTitle className="text-base font-extrabold text-foreground line-clamp-2 leading-snug group-hover:text-indigo-500 transition-colors">
                    {opp.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-0 pb-6 flex-1 space-y-4 text-xs">
                  <p className="text-muted-foreground font-bold">{opp.host}</p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-border/20 py-3 font-semibold text-[10px]">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Globe className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      <span className="truncate">{opp.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                      <span className="truncate">{opp.deadline}</span>
                    </div>
                  </div>

                  <div className="bg-accent/30 rounded-xl p-3 flex justify-between items-center text-[10px] font-bold">
                    <span className="text-muted-foreground font-semibold flex items-center gap-1"><Award className="h-3.5 w-3.5 text-indigo-500" /> Value:</span>
                    <span className="font-extrabold text-foreground">{opp.amount}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button 
                    onClick={() => router.push(`/opportunities/${opp.id}`)}
                    className="w-full justify-center rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-500 hover:text-white font-extrabold transition-all duration-300 py-4 h-auto text-xs cursor-pointer"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOP UNIVERSITIES SECTION */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
              Top Host Institutions
            </h2>
            <p className="text-muted-foreground text-xs font-semibold">
              Browse scholarships and fellowships listed directly by world-class universities and institutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TOP_UNIVERSITIES.map((uni) => (
              <div
                key={uni.name}
                onClick={() => router.push(`/opportunities?q=${uni.name}`)}
                className="group cursor-pointer flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-background/40 hover:bg-accent/10 transition-all duration-250"
              >
                <div className="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-black text-xs flex items-center justify-center shrink-0 shadow-inner">
                  {uni.logo}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-xs text-foreground group-hover:text-indigo-500 transition-colors">
                    {uni.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5">
                    <span>{uni.location}</span>
                    <span>•</span>
                    <span className="text-indigo-500/90 font-bold">{uni.opportunities}</span>
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST OPPORTUNITIES & SCAPE LOGS */}
      <section className="py-20 bg-accent/5">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            
            {/* Left Col: Latest Listings */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-heading font-black text-foreground">
                  Latest Opportunities
                </h2>
                <p className="text-muted-foreground text-[11px] font-semibold">
                  Freshly ingested programs added to the databases in the last 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                {LATEST_OPPORTUNITIES.map((opp) => (
                  <div 
                    key={opp.id}
                    onClick={() => router.push(`/opportunities/${opp.id}`)}
                    className="group cursor-pointer p-4 rounded-xl border border-border/30 bg-background/60 hover:bg-background transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline" className="rounded-lg bg-indigo-500/5 text-indigo-500 border-none text-[8px] font-bold uppercase tracking-wider px-1.5 py-0">
                          {opp.type}
                        </Badge>
                        <span className="text-[9px] text-muted-foreground font-semibold">
                          Deadline: {opp.deadline}
                        </span>
                      </div>
                      <h3 className="text-xs font-black text-foreground group-hover:text-indigo-500 transition-colors line-clamp-1">
                        {opp.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-bold leading-normal">
                        {opp.host} • {opp.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-black text-foreground bg-accent/40 px-2 py-0.5 rounded-md">
                        {opp.amount.split("+")[0]}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-indigo-500 group-hover:bg-indigo-500/5">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Ingestion Crawl Logs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-heading font-black text-foreground flex items-center gap-1.5">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  Crawler Pipeline Logs
                </h2>
                <p className="text-muted-foreground text-[11px] font-semibold">
                  Real-time activity logging of automatic web discovery processes.
                </p>
              </div>

              <div className="space-y-3.5">
                {LATEST_UPDATES.map((item, index) => (
                  <div key={index} className="p-3.5 border border-border/20 rounded-xl bg-background/40 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-[11px] font-black text-foreground truncate">{item.title}</h4>
                      <p className="text-[9px] text-muted-foreground font-bold">
                        {item.source} • {item.time}
                      </p>
                      <Badge className={`rounded-sm font-black text-[8px] uppercase tracking-wider px-1.5 py-0 border-none ${item.badgeColor}`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl border border-border/40 bg-background/30 backdrop-blur-md shadow-inner text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-2">
              <Zap className="h-6 w-6 text-indigo-500 mx-auto" />
              <p className="text-3xl md:text-4xl font-heading font-black text-foreground">5,000+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Opportunities</p>
            </div>
            <div className="space-y-2">
              <Award className="h-6 w-6 text-purple-500 mx-auto" />
              <p className="text-3xl md:text-4xl font-heading font-black text-purple-500">$120M+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total Funding</p>
            </div>
            <div className="space-y-2">
              <Globe className="h-6 w-6 text-indigo-500 mx-auto" />
              <p className="text-3xl md:text-4xl font-heading font-black text-foreground">150+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Countries</p>
            </div>
            <div className="space-y-2">
              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto" />
              <p className="text-3xl md:text-4xl font-heading font-black text-emerald-500">99.8%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Sourcing Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRENDING COUNTRIES SECTION */}
      <section className="py-20 bg-accent/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
              Trending Destinations
            </h2>
            <p className="text-muted-foreground text-xs font-semibold">
              Explore educational hubs hosting the highest concentration of international scholarships and research grants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {TRENDING_COUNTRIES.map((country) => (
              <div 
                key={country.name} 
                onClick={() => router.push(`/opportunities?country=${country.name}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border/40 bg-background/40 hover:bg-accent/20 hover:border-border transition-all duration-300"
              >
                <div className={`h-1.5 bg-gradient-to-r ${country.theme}`} />
                <div className="p-6 text-center">
                  <span className="text-4xl block mb-3 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" role="img" aria-label={`${country.name} Flag`}>
                    {country.flag}
                  </span>
                  <h3 className="font-extrabold text-foreground text-sm group-hover:text-indigo-500 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-semibold mt-1">{country.opportunities}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
              User Success Stories
            </h2>
            <p className="text-muted-foreground text-xs font-semibold">
              Join thousands of students who have secured fully funded opportunities globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 rounded-2xl border border-border/40 bg-background/40 hover:bg-background transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-muted-foreground italic mb-6 leading-relaxed">
                &ldquo;OpportunityHub matched me with the Erasmus Mundus Master scholarship. The eligibility scores saved me weeks of applying to programs I wasn&apos;t eligible for.&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <Image 
                  className="h-9 w-9 rounded-full object-cover border border-indigo-500/10 shrink-0" 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop" 
                  alt="Amina Ndiaye" 
                  width={36}
                  height={36}
                />
                <div>
                  <h4 className="font-extrabold text-xs text-foreground">Amina Ndiaye</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold">Physics Master at Munich, Germany</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/40 bg-background/40 hover:bg-background transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-muted-foreground italic mb-6 leading-relaxed">
                &ldquo;Finding PhD grants in quantum technology was incredibly hard. The search capabilities here uncovered DAAD funding options I couldn&apos;t find anywhere else.&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <Image 
                  className="h-9 w-9 rounded-full object-cover border border-purple-500/10 shrink-0" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" 
                  alt="Hiroshi Sato" 
                  width={36}
                  height={36}
                />
                <div>
                  <h4 className="font-extrabold text-xs text-foreground">Hiroshi Sato</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold">PhD Researcher at Tokyo Inst of Tech</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-border/40 bg-background/40 hover:bg-background transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-muted-foreground italic mb-6 leading-relaxed">
                &ldquo;I saved the Google STEP internship and track-managed my prep progress directly on the platform. Knowing the eligibility criteria ahead of time was huge.&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <Image 
                  className="h-9 w-9 rounded-full object-cover border border-pink-500/10 shrink-0" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" 
                  alt="Sarah Miller" 
                  width={36}
                  height={36}
                />
                <div>
                  <h4 className="font-extrabold text-xs text-foreground">Sarah Miller</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold">Undergrad CS at Stanford University</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 bg-accent/5">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-xs font-semibold">
              Clear up your doubts about our matchmaking engine and databases.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="rounded-2xl border border-border/40 bg-background/40 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left font-extrabold text-foreground hover:text-indigo-500 transition-colors focus:outline-hidden cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center space-x-3 text-xs">
                      <HelpCircle className="h-5 w-5 text-indigo-500 shrink-0" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90 text-indigo-500" : "text-muted-foreground"}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200 font-medium">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER & FOOTER */}
      <section className="bg-zinc-950 text-zinc-100 border-t border-zinc-900 pt-20 pb-10">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Newsletter Box */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-pink-950/40 rounded-3xl p-8 md:p-12 border border-zinc-800/80 mb-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-pink-500/5 blur-[50px] pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <Mail className="h-10 w-10 text-indigo-400 mx-auto" />
              <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight">
                Weekly Discovery Digest
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Subscribe to receive 5-10 freshly discovered scholarships and fellowships matching high-demand subjects directly to your inbox.
              </p>

              {newsletterStatus === "success" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 flex items-center justify-center space-x-2 text-xs font-bold animate-in zoom-in-95 duration-200">
                  <CheckCircle className="h-4 w-4" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="h-12 bg-zinc-900/50 border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus-visible:ring-indigo-500 focus-visible:ring-2 flex-1 font-semibold text-xs"
                  />
                  <Button 
                    type="submit" 
                    disabled={newsletterStatus === "loading"}
                    className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black px-8 shadow-lg shrink-0 transition-colors text-xs cursor-pointer"
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-zinc-900 pb-16">
            <div className="col-span-2 space-y-4">
              <h4 className="font-heading font-black text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                OpportunityHub
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[260px] font-medium">
                Discover and secure prestigious international scholarships, internships, and research funding verified directly from official sources.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-300">Discover</h5>
              <ul className="text-xs text-zinc-400 space-y-2.5 font-bold">
                <li><Link href="/opportunities?type=Scholarship" className="hover:text-indigo-400 transition-colors">Scholarships</Link></li>
                <li><Link href="/opportunities?type=Internship" className="hover:text-indigo-400 transition-colors">Internships</Link></li>
                <li><Link href="/opportunities?type=Fellowship" className="hover:text-indigo-400 transition-colors">Fellowships</Link></li>
                <li><Link href="/opportunities?type=Research" className="hover:text-indigo-400 transition-colors">Research Grants</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-300">Platform</h5>
              <ul className="text-xs text-zinc-400 space-y-2.5 font-bold">
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/profile" className="hover:text-indigo-400 transition-colors">Academic Profile</Link></li>
                <li><Link href="/tracker" className="hover:text-indigo-400 transition-colors">Application Tracker</Link></li>
                <li><Link href="/settings" className="hover:text-indigo-400 transition-colors">Settings</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-300">Legal</h5>
              <ul className="text-xs text-zinc-400 space-y-2.5 font-bold">
                <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Support Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright & Creator Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-zinc-500 pt-8 gap-8 border-t border-zinc-900 mt-8 font-semibold">
            <div className="space-y-1 text-center lg:text-left">
              <p>&copy; {new Date().getFullYear()} OpportunityHub. All rights reserved.</p>
              <p className="text-zinc-600">Sourced directly from official global bulletins.</p>
            </div>

            {/* Premium Developer Signature Card */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-2xl backdrop-blur-md hover:border-indigo-500/20 transition-all duration-300">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-zinc-800 shrink-0">
                <Image 
                  src="/mashfi_avatar.jpg" 
                  alt="Mashfi Rahman" 
                  width={48}
                  height={48}
                  className="h-full w-full object-cover object-center" 
                  loading="lazy"
                />
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
              </div>
              
              <div className="text-center sm:text-left space-y-2">
                <div>
                  <h6 className="text-[9px] uppercase tracking-widest text-indigo-400 font-extrabold">Full Stack Creator</h6>
                  <p className="text-xs font-black text-zinc-300">Mashfi Rahman</p>
                </div>
                
                {/* Developer Social Links */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <a 
                    href="https://github.com/Mashfi19" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-white transition-colors duration-200"
                    aria-label="GitHub Profile"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/mashfi-rahman-2a4040255v" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-blue-400 transition-colors duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://www.facebook.com/mashfirahman.amio" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Facebook Profile"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://www.instagram.com/mashfi_amio/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-pink-500 transition-colors duration-200"
                    aria-label="Instagram Profile"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://wa.me/8801785658189" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-emerald-500 transition-colors duration-200"
                    aria-label="WhatsApp Contact"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.453.993 6.01 1.013 1.585 5.385 1.581 10.812c-.001 1.716.452 3.393 1.312 4.887l-.99 3.625 3.754-.93zm11.233-5.07c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://mashfi19.github.io/Portfolio/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-indigo-400 transition-colors duration-200"
                    aria-label="Personal Portfolio"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
