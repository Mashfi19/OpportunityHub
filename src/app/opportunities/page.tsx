"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

// Import custom features
import { MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { OpportunityCard } from "@/features/opportunities/components/OpportunityCard";
import { ActiveFilters } from "@/features/opportunities/components/ActiveFilters";
import { SearchFilters } from "@/features/opportunities/components/SearchFilters";
import { SearchHeader } from "@/features/opportunities/components/SearchHeader";
import dynamic from "next/dynamic";
const MobileFilterDialog = dynamic(
  () => import("@/features/opportunities/components/MobileFilterDialog").then(mod => mod.MobileFilterDialog),
  { ssr: false }
);
import { AcademicProfile } from "@/features/opportunities/types";
import { calculateMatch } from "@/features/opportunities/utils/matcher";
import { AcademicLevel, StudyDiscipline } from "@/core/domain/opportunity";

const parseAmount = (amountStr: string): number => {
  if (!amountStr) return 0;
  const lower = amountStr.toLowerCase();
  if (lower.includes("fully funded") || lower.includes("full tuition") || lower.includes("full scholarship") || lower.includes("full board")) {
    return 60000;
  }
  const cleanStr = amountStr.replace(/,/g, '');
  const match = cleanStr.match(/\d+/);
  if (!match) return 0;
  let val = parseInt(match[0], 10);
  if (lower.includes("month") || lower.includes("/mo")) {
    val = val * 12;
  }
  if (lower.includes("€") || lower.includes("eur")) {
    val = val * 1.1;
  } else if (lower.includes("£") || lower.includes("gbp")) {
    val = val * 1.25;
  }
  return val;
};

function SearchCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search parameters states initialized from URL queries
  const searchQuery = searchParams.get("q") || "";
  const selectedType = searchParams.get("type") || "";
  const selectedCountry = searchParams.get("country") || "";
  const selectedLevel = searchParams.get("level") || "";
  const selectedDiscipline = searchParams.get("discipline") || "";
  const selectedFunding = searchParams.get("funding") || "";
  const selectedDeadline = searchParams.get("deadline") || "";
  const selectedUniversity = searchParams.get("university") || "";
  const selectedLanguage = searchParams.get("language") || "";
  const selectedScholarshipType = searchParams.get("scholarshipType") || "";
  const selectedGpa = searchParams.get("gpa") || "";
  const selectedTests = searchParams.get("tests") || "";
  const selectedAmountRange = searchParams.get("amountRange") || "";

  const [sortBy, setSortBy] = React.useState("match-desc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [profile, setProfile] = React.useState<AcademicProfile | null>(null);
  const [isProfileLoaded, setIsProfileLoaded] = React.useState(false);
  const [scrollMode, setScrollMode] = React.useState<"pagination" | "infinite">("pagination");
  const [infinitePage, setInfinitePage] = React.useState(1);
  const [hiddenIds, setHiddenIds] = React.useState<string[]>([]);

  const itemsPerPage = 6;

  // Load academic profile and hidden opportunities from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("opportunityhub_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
      
      const storedHidden = localStorage.getItem("opportunityhub_hidden");
      if (storedHidden) {
        setHiddenIds(JSON.parse(storedHidden));
      }
    } catch (err) {
      console.error("Failed to load academic profile or hidden states:", err);
    } finally {
      setIsProfileLoaded(true);
    }
  }, []);

  // Listen to storage events to sync hidden/favorited actions dynamically
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedHidden = localStorage.getItem("opportunityhub_hidden");
        if (storedHidden) {
          setHiddenIds(JSON.parse(storedHidden));
        } else {
          setHiddenIds([]);
        }
      } catch (err) {
        console.error("Storage change error:", err);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync page state when search parameters change
  React.useEffect(() => {
    setCurrentPage(1);
    setInfinitePage(1);
  }, [searchParams]);

  // Handle URL updates when filters change
  const updateUrlParams = React.useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/opportunities?${params.toString()}`);
  }, [searchParams, router]);

  const handleResetFilters = () => {
    router.push("/opportunities");
  };

  // Filter opportunities based on all faceted filters including GPA and Test checks
  const filteredOpportunities = React.useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      // 0. Omit hidden opportunities
      if (hiddenIds.includes(opp.id)) return false;

      // 1. Keyword search (matches title, host, location, description, or tags)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesHost = opp.host.toLowerCase().includes(q);
        const matchesLoc = opp.location.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        const matchesTags = opp.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesHost && !matchesLoc && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Category / Type filter
      if (selectedType && opp.type !== selectedType) return false;

      // 3. Country / Location filter
      if (selectedCountry && opp.countryCode !== selectedCountry) return false;

      // 4. Academic Degree level filter
      if (selectedLevel && !opp.academicLevels.includes(selectedLevel as AcademicLevel)) return false;

      // 5. Major / Study Discipline filter
      if (selectedDiscipline && !opp.disciplines.includes(selectedDiscipline as StudyDiscipline) && !opp.disciplines.includes("All")) {
        return false;
      }

      // 6. Funding Type filter
      if (selectedFunding && opp.fundingType !== selectedFunding) return false;

      // 7. University / Host Filter
      if (selectedUniversity && opp.host !== selectedUniversity) return false;

      // 8. Language requirement filter
      if (selectedLanguage) {
        const desc = opp.description.toLowerCase();
        const host = opp.host.toLowerCase();
        if (selectedLanguage === "German") {
          if (!desc.includes("german") && !host.includes("daad") && !host.includes("humboldt") && !host.includes("lmu")) return false;
        } else if (selectedLanguage === "Chinese") {
          if (!desc.includes("chinese") && !host.includes("tsinghua") && !host.includes("schwarzman")) return false;
        } else if (selectedLanguage === "French") {
          if (!desc.includes("french") && !desc.includes("geneva") && !host.includes("cern")) return false;
        } else if (selectedLanguage === "Arabic") {
          if (!desc.includes("arabic") && !host.includes("kaust")) return false;
        } else {
          // Default English checks
          if (selectedLanguage === "English" && desc.includes("only german")) return false;
        }
      }

      // 9. Scholarship Type (Coverage Level) Filter
      if (selectedScholarshipType) {
        const amt = opp.amount.toLowerCase();
        const fndType = opp.fundingType;
        if (selectedScholarshipType === "FullScholarship" && fndType !== "FullyFunded") return false;
        if (selectedScholarshipType === "TuitionWaiver" && !amt.includes("tuition")) return false;
        if (selectedScholarshipType === "TravelGrant" && !amt.includes("travel") && !amt.includes("airfare") && !amt.includes("flights")) return false;
        if (selectedScholarshipType === "StipendOnly" && !amt.includes("stipend") && !amt.includes("salary") && !amt.includes("allowance")) return false;
      }

      // 10. Deadline Filter
      if (selectedDeadline) {
        const today = new Date();
        if (selectedDeadline === "rolling" && opp.deadline !== null) return false;
        if (selectedDeadline === "active") {
          if (opp.deadline !== null && new Date(opp.deadline) < today) return false;
        }
        if (selectedDeadline === "ending-soon") {
          if (opp.deadline === null) return false;
          const diffDays = Math.ceil((new Date(opp.deadline).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays < 0 || diffDays > 30) return false;
        }
      }

      // 11. GPA Requirement Filter
      if (selectedGpa) {
        if (selectedGpa === "none") {
          if (opp.gpaMin !== null && opp.gpaMin !== undefined) return false;
        } else {
          const gpaLimit = parseFloat(selectedGpa);
          if (opp.gpaMin !== null && opp.gpaMin !== undefined && opp.gpaMin > gpaLimit) {
            return false;
          }
        }
      }

      // 12. Test Requirements Filter
      if (selectedTests) {
        const testsList = selectedTests.split(",");
        if (testsList.includes("none")) {
          if (opp.satMin || opp.actMin || opp.ieltsMin || opp.toeflMin) return false;
        }
        if (testsList.includes("sat") && !opp.satMin) return false;
        if (testsList.includes("act") && !opp.actMin) return false;
        if (testsList.includes("ielts") && !opp.ieltsMin) return false;
        if (testsList.includes("toefl") && !opp.toeflMin) return false;
      }

      // 13. Amount Range Filter
      if (selectedAmountRange) {
        const [minStr, maxStr] = selectedAmountRange.split("-");
        const minVal = parseInt(minStr, 10);
        const maxVal = parseInt(maxStr, 10);
        const parsedVal = parseAmount(opp.amount);
        if (parsedVal < minVal || parsedVal > maxVal) {
          return false;
        }
      }

      return true;
    });
  }, [
    hiddenIds,
    searchQuery,
    selectedType,
    selectedCountry,
    selectedLevel,
    selectedDiscipline,
    selectedFunding,
    selectedDeadline,
    selectedUniversity,
    selectedLanguage,
    selectedScholarshipType,
    selectedGpa,
    selectedTests,
    selectedAmountRange
  ]);

  // Sort opportunities
  const sortedOpportunities = React.useMemo(() => {
    const list = [...filteredOpportunities];
    return list.sort((a, b) => {
      if (sortBy === "match-desc") {
        const scoreA = calculateMatch(profile, a).score;
        const scoreB = calculateMatch(profile, b).score;
        return scoreB - scoreA;
      }
      if (sortBy === "deadline-asc") {
        if (a.deadline === null) return 1;
        if (b.deadline === null) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === "deadline-desc") {
        if (a.deadline === null) return 1;
        if (b.deadline === null) return -1;
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      }
      return 0;
    });
  }, [filteredOpportunities, sortBy, profile]);

  // Paginated or infinite list
  const totalPages = Math.ceil(sortedOpportunities.length / itemsPerPage);
  const displayedOpportunities = React.useMemo(() => {
    if (scrollMode === "infinite") {
      return sortedOpportunities.slice(0, infinitePage * itemsPerPage);
    }
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedOpportunities.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedOpportunities, currentPage, infinitePage, scrollMode]);

  const activeFiltersCount = [
    selectedType,
    selectedCountry,
    selectedLevel,
    selectedDiscipline,
    selectedFunding,
    selectedDeadline,
    selectedUniversity,
    selectedLanguage,
    selectedScholarshipType,
    selectedGpa,
    selectedTests,
    selectedAmountRange
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Onboarding Banner if Profile Not Set */}
      {isProfileLoaded && !profile && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-indigo-500 dark:text-indigo-400">Personalize Your Scholarship Matches</h3>
            <p className="text-xs text-muted-foreground">
              Set up your academic profile (GPA, TOEFL, major) to calculate real-time eligibility scores.
            </p>
          </div>
          <Button 
            onClick={() => router.push("/profile")}
            className="rounded-xl h-9 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            Create Academic Profile
          </Button>
        </div>
      )}

      {/* Page Title & Sort Header */}
      <SearchHeader
        resultsCount={filteredOpportunities.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        scrollMode={scrollMode}
        setScrollMode={setScrollMode}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 self-start border border-border/40 bg-background/30 backdrop-blur-md p-6 rounded-2xl">
          <SearchFilters
            searchQuery={searchQuery}
            selectedType={selectedType}
            selectedCountry={selectedCountry}
            selectedLevel={selectedLevel}
            selectedDiscipline={selectedDiscipline}
            selectedFunding={selectedFunding}
            selectedDeadline={selectedDeadline}
            selectedUniversity={selectedUniversity}
            selectedLanguage={selectedLanguage}
            selectedScholarshipType={selectedScholarshipType}
            selectedGpa={selectedGpa}
            selectedTests={selectedTests}
            selectedAmountRange={selectedAmountRange}
            activeFiltersCount={activeFiltersCount}
            updateUrlParams={updateUrlParams}
            handleResetFilters={handleResetFilters}
          />
        </aside>

        {/* Catalog Results Grid */}
        <section className="lg:col-span-3 space-y-6">
          
          {/* Mobile Filter Button */}
          <MobileFilterDialog
            searchQuery={searchQuery}
            selectedType={selectedType}
            selectedCountry={selectedCountry}
            selectedLevel={selectedLevel}
            selectedDiscipline={selectedDiscipline}
            selectedFunding={selectedFunding}
            selectedDeadline={selectedDeadline}
            selectedUniversity={selectedUniversity}
            selectedLanguage={selectedLanguage}
            selectedScholarshipType={selectedScholarshipType}
            selectedGpa={selectedGpa}
            selectedTests={selectedTests}
            selectedAmountRange={selectedAmountRange}
            activeFiltersCount={activeFiltersCount}
            updateUrlParams={updateUrlParams}
            handleResetFilters={handleResetFilters}
            resultsCount={sortedOpportunities.length}
          />

          {/* Active Filter Badges */}
          <ActiveFilters
            selectedType={selectedType}
            selectedCountry={selectedCountry}
            selectedLevel={selectedLevel}
            selectedDiscipline={selectedDiscipline}
            selectedFunding={selectedFunding}
            selectedDeadline={selectedDeadline}
            selectedUniversity={selectedUniversity}
            selectedLanguage={selectedLanguage}
            selectedScholarshipType={selectedScholarshipType}
            selectedGpa={selectedGpa}
            selectedTests={selectedTests}
            selectedAmountRange={selectedAmountRange}
            activeFiltersCount={activeFiltersCount}
            updateUrlParams={updateUrlParams}
            handleResetFilters={handleResetFilters}
          />

          {/* Listings Grid */}
          {!isProfileLoaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="flex flex-col h-80 rounded-2xl border-border/40 p-6 space-y-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : displayedOpportunities.length === 0 ? (
            <EmptyState
              title="No opportunities match your filter criteria"
              description="Try adjusting your keywords, academic levels, or destination countries. Our scrapers index new programs daily."
              actionLabel="Clear all search filters"
              onAction={handleResetFilters}
            />
          ) : (
            <>
              {/* Desktop Result Summary */}
              <div className="hidden lg:flex items-center justify-between text-[11px] text-muted-foreground font-bold px-1 uppercase tracking-wider">
                <span>Showing {displayedOpportunities.length} of {sortedOpportunities.length} programs</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedOpportunities.map((opp) => (
                  <OpportunityCard 
                    key={opp.id} 
                    opportunity={opp} 
                    profile={profile} 
                  />
                ))}
              </div>

              {/* Dynamic Controls depending on mode */}
              {scrollMode === "infinite" ? (
                displayedOpportunities.length < sortedOpportunities.length && (
                  <div className="flex justify-center pt-8">
                    <Button
                      onClick={() => setInfinitePage(prev => prev + 1)}
                      className="rounded-xl h-10 px-6 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/10 cursor-pointer transition-all hover:scale-105 duration-200"
                    >
                      Load More Opportunities (Lazy Loading)
                    </Button>
                  </div>
                )
              ) : (
                totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="rounded-lg h-9 text-xs font-bold cursor-pointer"
                    >
                      Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      const isCurrent = pageNum === currentPage;
                      return (
                        <Button
                          key={pageNum}
                          variant={isCurrent ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`rounded-lg h-9 w-9 text-xs font-bold cursor-pointer ${isCurrent ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="rounded-lg h-9 text-xs font-bold cursor-pointer"
                    >
                      Next
                    </Button>
                  </div>
                )
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Opportunities Catalog...
      </div>
    }>
      <SearchCatalogContent />
    </Suspense>
  );
}
