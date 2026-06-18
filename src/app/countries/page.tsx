"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Globe, 
  Search, 
  MapPin, 
  Award, 
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/navigation";
import { MOCK_COUNTRIES, MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";

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

export default function CountriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("All");

  // Get unique regions
  const regions = React.useMemo(() => {
    const list = new Set(MOCK_COUNTRIES.map(c => c.region).filter(Boolean));
    return ["All", ...Array.from(list)] as string[];
  }, []);

  // Filter countries and attach dynamic opportunity counts
  const filteredCountries = React.useMemo(() => {
    return MOCK_COUNTRIES.map(country => {
      const activeOpps = MOCK_OPPORTUNITIES.filter(o => o.countryCode === country.code && o.deadline && new Date(o.deadline) > new Date());
      return {
        ...country,
        activeOpportunitiesCount: activeOpps.length
      };
    }).filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (country.description && country.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRegion = selectedRegion === "All" || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-[1400px] mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <Globe className="h-6 w-6 text-indigo-500" />
              Destinations Directory
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Browse scholarships, programs, and opportunities grouped by study locations and regions.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-background/25 border border-border/40 p-4 rounded-2xl backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations by country name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/40 border-border/40 rounded-xl text-xs font-semibold"
            />
          </div>

          {/* Region filter tabs */}
          <div className="flex gap-1.5 p-1 bg-background/30 border border-border/20 rounded-xl overflow-x-auto w-full md:w-auto">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer whitespace-nowrap ${selectedRegion === r ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="space-y-4">
          <div className="text-xs font-black uppercase text-muted-foreground tracking-wider pb-1">
            <span>Study Locations ({filteredCountries.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map(country => (
              <Card 
                key={country.code}
                onClick={() => router.push(`/opportunities?country=${country.code}`)}
                className="border border-border/40 bg-background/30 backdrop-blur-xs hover:border-indigo-500/30 hover:bg-background/80 transition-all duration-300 rounded-3xl cursor-pointer group relative overflow-hidden"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-3xl filter drop-shadow-md select-none group-hover:scale-110 transition-transform duration-300">
                      {getFlagEmoji(country.code)}
                    </span>
                    
                    <Badge className="bg-indigo-500/10 text-indigo-500 border-none font-bold text-[8px] uppercase tracking-wider px-2.5 py-0.5">
                      {country.region}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-foreground flex items-center justify-between group-hover:text-indigo-500 transition-colors">
                      {country.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 mt-1 uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                      ISO Code: {country.code}
                    </p>
                  </div>

                  <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                    {country.description}
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-bold border-t border-border/10 pt-4">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Award className="h-3.5 w-3.5 text-indigo-500" />
                      Active Programs
                    </span>
                    <span className="font-extrabold text-indigo-500 bg-indigo-500/5 px-2 py-0.5 rounded-md">
                      {country.activeOpportunitiesCount} match{country.activeOpportunitiesCount !== 1 ? "es" : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
