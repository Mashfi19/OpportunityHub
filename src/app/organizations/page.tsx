"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Search, 
  Calendar, 
  Tag, 
  ExternalLink, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/navigation";
import { MOCK_ORGANIZATIONS, MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { OrganizationProfile } from "@/features/opportunities/types";

export default function OrganizationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("All");
  const [selectedOrg, setSelectedOrg] = React.useState<OrganizationProfile | null>(null);

  // Get unique organization types
  const orgTypes = React.useMemo(() => {
    const list = new Set(MOCK_ORGANIZATIONS.map(o => o.type));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter organizations and attach dynamic opportunity counts
  const filteredOrganizations = React.useMemo(() => {
    return MOCK_ORGANIZATIONS.map(org => {
      const activeOpps = MOCK_OPPORTUNITIES.filter(o => o.organizationId === org.id && o.deadline && new Date(o.deadline) > new Date());
      return {
        ...org,
        activeOpportunitiesCount: activeOpps.length
      };
    }).filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            org.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || org.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  // Load opportunities for selected organization
  const selectedOrgOpps = React.useMemo(() => {
    if (!selectedOrg) return [];
    return MOCK_OPPORTUNITIES.filter(o => o.organizationId === selectedOrg.id);
  }, [selectedOrg]);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-[1400px] mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <Building2 className="h-6 w-6 text-indigo-500" />
              Sponsoring Organizations
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Connect with government bodies, corporate foundations, and private trusts funding global initiatives.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-background/25 border border-border/40 p-4 rounded-2xl backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations by name, type, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/40 border-border/40 rounded-xl text-xs font-semibold"
            />
          </div>

          {/* Org Type Tabs */}
          <div className="flex gap-1.5 p-1 bg-background/30 border border-border/20 rounded-xl overflow-x-auto w-full md:w-auto">
            {orgTypes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer whitespace-nowrap ${selectedType === t ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Layout split: List & Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Organizations Grid List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-black uppercase text-muted-foreground tracking-wider pb-1">
              <span>Sponsors Found ({filteredOrganizations.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredOrganizations.map((org) => (
                <Card 
                  key={org.id} 
                  onClick={() => setSelectedOrg(org)}
                  className={`border border-border/40 bg-background/30 backdrop-blur-xs hover:border-indigo-500/30 hover:bg-background/80 transition-all duration-300 rounded-2xl cursor-pointer group relative overflow-hidden ${selectedOrg?.id === org.id ? "ring-2 ring-indigo-500/50 border-indigo-500/30 bg-background/80" : ""}`}
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center font-black text-indigo-500 text-xs shrink-0">
                        {org.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge className="bg-indigo-500/10 text-indigo-500 border-none font-bold text-[8px] uppercase tracking-wider px-2.5 py-0.5">
                          {org.type}
                        </Badge>
                        {org.activeOpportunitiesCount > 0 && (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[8px] uppercase tracking-wider px-2 py-0.5">
                            {org.activeOpportunitiesCount} Program{org.activeOpportunitiesCount > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm text-foreground line-clamp-1 group-hover:text-indigo-500 transition-colors">
                        {org.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3 text-indigo-500" />
                        Est. {org.foundedYear}
                      </p>
                    </div>

                    <p className="text-[11px] font-semibold text-muted-foreground line-clamp-2 leading-relaxed">
                      {org.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Details Sidebar Panel */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase text-muted-foreground tracking-wider pb-1">
              <span>Sponsor Profile Detail</span>
            </div>

            {selectedOrg ? (
              <div className="bg-background/40 border border-border/40 p-6 rounded-3xl backdrop-blur-md space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center font-black text-indigo-500 text-sm">
                      {selectedOrg.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <Badge variant="outline" className="rounded-xl bg-indigo-500/5 text-indigo-500 border-indigo-500/15 text-[9px] font-black uppercase px-2.5 py-0.5">
                      {selectedOrg.type} Sponsor
                    </Badge>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-black text-foreground">{selectedOrg.name}</h2>
                    <a 
                      href={selectedOrg.websiteUrl}
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
                  {selectedOrg.description}
                </p>

                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-3 border-t border-b border-border/20 py-4 text-[10px] font-bold">
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Tag className="h-3.5 w-3.5 text-indigo-500" />
                      Sector Type
                    </span>
                    <span className="text-xs font-extrabold text-foreground">{selectedOrg.type}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                      Founded Year
                    </span>
                    <span className="text-xs font-extrabold text-foreground">{selectedOrg.foundedYear}</span>
                  </div>
                </div>

                {/* Sourced Opportunities List */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                    Sponsored Programs
                  </h4>
                  
                  {selectedOrgOpps.length === 0 ? (
                    <div className="text-[11px] font-semibold text-muted-foreground/60 py-3 text-center bg-background/20 rounded-xl border border-border/10">
                      No direct matching programs currently listed.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedOrgOpps.map(opp => (
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
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-wider">Select a Sponsor</p>
                  <p className="text-[11px] font-semibold text-muted-foreground leading-normal">
                    Click any organization card on the left to load its profile details, classification, and active scholarship matches.
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
