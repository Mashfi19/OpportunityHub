"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  School, 
  Search, 
  TrendingUp, 
  MapPin, 
  Percent, 
  Coins, 
  Users, 
  SlidersHorizontal,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/navigation";
import { MOCK_UNIVERSITIES, MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { UniversityProfile } from "@/features/opportunities/types";

export default function UniversitiesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("All");
  const [selectedUni, setSelectedUni] = React.useState<UniversityProfile | null>(null);

  // Get unique country list
  const countries = React.useMemo(() => {
    const list = new Set(MOCK_UNIVERSITIES.map(u => u.countryCode));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter universities
  const filteredUniversities = React.useMemo(() => {
    return MOCK_UNIVERSITIES.map(uni => {
      const activeOpps = MOCK_OPPORTUNITIES.filter(o => o.universityId === uni.id && o.deadline && new Date(o.deadline) > new Date());
      return {
        ...uni,
        activeOpportunitiesCount: activeOpps.length
      };
    }).filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            uni.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === "All" || uni.countryCode === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

  // Load opportunities for selected university
  const selectedUniOpps = React.useMemo(() => {
    if (!selectedUni) return [];
    return MOCK_OPPORTUNITIES.filter(o => o.universityId === selectedUni.id);
  }, [selectedUni]);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-[1400px] mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <School className="h-6 w-6 text-indigo-500" />
              University Directory
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Explore world-class academic institutions and their active scholarship opportunities.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-background/25 border border-border/40 p-4 rounded-2xl backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search universities by name, rank or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/40 border-border/40 rounded-xl text-xs font-semibold"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="h-11 px-4 w-full md:w-48 bg-background/40 border border-border/40 rounded-xl text-xs font-semibold focus:outline-hidden text-foreground select-dark"
            >
              <option value="All">All Countries</option>
              {countries.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c === "US" ? "United States" : c === "DE" ? "Germany" : c === "GB" ? "United Kingdom" : c === "CH" ? "Switzerland" : c === "CA" ? "Canada" : c === "SG" ? "Singapore" : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout split: List & Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Universities Grid List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center text-xs font-black uppercase text-muted-foreground tracking-wider pb-1">
              <span>Universities Found ({filteredUniversities.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredUniversities.map((uni) => (
                <Card 
                  key={uni.id} 
                  onClick={() => setSelectedUni(uni)}
                  className={`border border-border/40 bg-background/30 backdrop-blur-xs hover:border-indigo-500/30 hover:bg-background/80 transition-all duration-300 rounded-2xl cursor-pointer group relative overflow-hidden ${selectedUni?.id === uni.id ? "ring-2 ring-indigo-500/50 border-indigo-500/30 bg-background/80" : ""}`}
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center font-black text-indigo-500 text-xs shrink-0">
                        {uni.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge className="bg-indigo-500/10 text-indigo-500 border-none font-bold text-[8px] uppercase tracking-wider px-2 py-0.5">
                          Rank #{uni.rankingGlobal}
                        </Badge>
                        {uni.activeOpportunitiesCount > 0 && (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[8px] uppercase tracking-wider px-2 py-0.5">
                            {uni.activeOpportunitiesCount} Program{uni.activeOpportunitiesCount > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm text-foreground line-clamp-1 group-hover:text-indigo-500 transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-indigo-500" />
                        {uni.countryCode === "US" ? "United States" : uni.countryCode === "DE" ? "Germany" : uni.countryCode === "GB" ? "United Kingdom" : uni.countryCode === "CH" ? "Switzerland" : uni.countryCode === "CA" ? "Canada" : uni.countryCode === "SG" ? "Singapore" : uni.countryCode}
                      </p>
                    </div>

                    <p className="text-[11px] font-semibold text-muted-foreground line-clamp-2 leading-relaxed">
                      {uni.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Details Sidebar Panel */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase text-muted-foreground tracking-wider pb-1">
              <span>University Profile Detail</span>
            </div>

            {selectedUni ? (
              <div className="bg-background/40 border border-border/40 p-6 rounded-3xl backdrop-blur-md space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center font-black text-indigo-500 text-sm">
                      {selectedUni.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <Badge variant="outline" className="rounded-xl bg-indigo-500/5 text-indigo-500 border-indigo-500/15 text-[9px] font-black uppercase px-2.5 py-0.5">
                      Global Rank: #{selectedUni.rankingGlobal}
                    </Badge>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-black text-foreground">{selectedUni.name}</h2>
                    <a 
                      href={selectedUni.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-extrabold text-indigo-500 hover:underline flex items-center gap-0.5 mt-1"
                    >
                      Visit Official Portal
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                  {selectedUni.description}
                </p>

                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-3 border-t border-b border-border/20 py-4 text-[10px] font-bold">
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Percent className="h-3.5 w-3.5 text-indigo-500" />
                      Acceptance
                    </span>
                    <span className="text-xs font-extrabold text-foreground">{selectedUni.acceptanceRate}%</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Coins className="h-3.5 w-3.5 text-indigo-500" />
                      Average Tuition
                    </span>
                    <span className="text-xs font-extrabold text-foreground truncate block max-w-[130px]">{selectedUni.averageTuition}</span>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <TrendingUp className="h-3.5 w-3.5 text-indigo-500" />
                      SAT Range
                    </span>
                    <span className="text-xs font-extrabold text-foreground">{selectedUni.satRange}</span>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Users className="h-3.5 w-3.5 text-indigo-500" />
                      Enrollment
                    </span>
                    <span className="text-xs font-extrabold text-foreground">{selectedUni.studentPopulation.toLocaleString()}</span>
                  </div>
                </div>

                {/* Opportunities List */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Active Opportunities</h4>
                  
                  {selectedUniOpps.length === 0 ? (
                    <div className="text-[11px] font-semibold text-muted-foreground/60 py-3 text-center bg-background/20 rounded-xl border border-border/10">
                      No direct matching programs currently listed.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedUniOpps.map(opp => (
                        <div 
                          key={opp.id}
                          onClick={() => router.push(`/opportunities/${opp.id}`)}
                          className="p-3 rounded-xl border border-border/20 hover:border-indigo-500/30 hover:bg-background/60 transition-all cursor-pointer flex justify-between items-center group/item text-xs font-semibold"
                        >
                          <div className="space-y-0.5 truncate pr-2">
                            <p className="text-[11px] font-extrabold text-foreground truncate group-hover/item:text-indigo-500 transition-colors">{opp.title}</p>
                            <p className="text-[9px] text-indigo-500 font-extrabold">{opp.amount}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover/item:translate-x-0.5 transition-transform" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-background/20 border border-dashed border-border/40 p-8 rounded-3xl text-center text-muted-foreground/80 py-16 space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground/50">
                  <School className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-wider">Select a University</p>
                  <p className="text-[11px] font-semibold text-muted-foreground leading-normal">
                    Click any university card on the left to load its profile, stats, and active opportunity matches.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
