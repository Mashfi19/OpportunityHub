import * as React from "react";
import { Search, Sparkles, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COUNTRIES, MAJORS, MOCK_OPPORTUNITIES } from "../data/mockData";
import { useDebounce } from "../hooks/useDebounce";
import { aiSearch } from "@/lib/api";

interface SearchFiltersProps {
  searchQuery: string;
  selectedType: string;
  selectedCountry: string;
  selectedLevel: string;
  selectedDiscipline: string;
  selectedFunding: string;
  selectedDeadline: string;
  selectedUniversity: string;
  selectedLanguage: string;
  selectedScholarshipType: string;
  selectedGpa: string;
  selectedTests: string;
  selectedAmountRange: string;
  activeFiltersCount: number;
  updateUrlParams: (updates: Record<string, string | null>) => void;
  handleResetFilters: () => void;
}

const UNIVERSITIES = [
  "European Commission",
  "US Department of State",
  "CERN",
  "German Academic Exchange Service",
  "Google",
  "Tsinghua University",
  "Bill & Melinda Gates Foundation",
  "ETH Zurich",
  "American Astronomical Society",
  "King Abdullah University of Science and Technology",
  "Alexander von Humboldt Foundation"
];

const LANGUAGES = [
  { code: "English", name: "English required" },
  { code: "German", name: "German / bilingual" },
  { code: "Chinese", name: "Chinese / bilingual" },
  { code: "French", name: "French / bilingual" },
  { code: "Arabic", name: "Arabic / bilingual" }
];

const SCHOLARSHIP_TYPES = [
  { code: "FullScholarship", name: "Full Scholarship (Fully Funded)" },
  { code: "TuitionWaiver", name: "Tuition Waiver Included" },
  { code: "TravelGrant", name: "Travel & Airfare Grant" },
  { code: "StipendOnly", name: "Stipend / Salary Only" }
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
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
  selectedAmountRange,
  activeFiltersCount,
  updateUrlParams,
  handleResetFilters
}) => {
  const [localQuery, setLocalQuery] = React.useState(searchQuery);
  const [isAiSearch, setIsAiSearch] = React.useState(false);
  const [isParsing, setIsParsing] = React.useState(false);

  // Autocomplete state
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const autocompleteRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const debouncedQuery = useDebounce(localQuery, 400);

  // Compute autocomplete suggestions based on input
  React.useEffect(() => {
    if (!localQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const q = localQuery.toLowerCase();
    const matches: Set<string> = new Set();

    MOCK_OPPORTUNITIES.forEach(opp => {
      if (opp.title.toLowerCase().includes(q)) {
        matches.add(opp.title);
      }
      if (opp.host.toLowerCase().includes(q)) {
        matches.add(opp.host);
      }
    });

    setSuggestions(Array.from(matches).slice(0, 5));
  }, [localQuery]);

  // Close suggestions list on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    async function runAiSearch() {
      if (!isAiSearch || !debouncedQuery.trim()) return;
      setIsParsing(true);
      try {
        const parsed = await aiSearch(debouncedQuery);
        const updates: Record<string, string | null> = {};
        
        if (parsed.keyword) {
          updates.q = parsed.keyword;
          setLocalQuery(parsed.keyword);
        }
        
        if (parsed.category) {
          const cat = parsed.category.toLowerCase();
          if (cat.includes("scholarship")) updates.type = "Scholarship";
          else if (cat.includes("internship")) updates.type = "Internship";
          else if (cat.includes("fellowship")) updates.type = "Fellowship";
          else if (cat.includes("grant")) updates.type = "ResearchGrant";
        }
        
        if (parsed.country) {
          const countryMatch = COUNTRIES.find(
            c => c.name.toLowerCase().includes(parsed.country.toLowerCase()) || c.code.toLowerCase() === parsed.country.toLowerCase()
          );
          if (countryMatch) {
            updates.country = countryMatch.code;
          }
        }
        
        if (parsed.degree_level) {
          const lvl = parsed.degree_level.toLowerCase();
          if (lvl.includes("phd") || lvl.includes("doctor")) updates.level = "PhD";
          else if (lvl.includes("master") || lvl.includes("grad")) updates.level = "Graduate";
          else if (lvl.includes("bachelor") || lvl.includes("undergrad")) updates.level = "Undergraduate";
        }

        if (parsed.funding_type) {
          const fnd = parsed.funding_type.toLowerCase();
          if (fnd.includes("fully")) updates.funding = "FullyFunded";
          else if (fnd.includes("partial")) updates.funding = "PartiallyFunded";
          else if (fnd.includes("paid")) updates.funding = "Paid";
        }

        updateUrlParams(updates);
      } catch (err) {
        console.error("AI Search Parse Error:", err);
      } finally {
        setIsParsing(false);
      }
    }

    if (debouncedQuery !== searchQuery) {
      if (isAiSearch && debouncedQuery.trim()) {
        runAiSearch();
      } else {
        updateUrlParams({ q: debouncedQuery });
      }
    }
  }, [debouncedQuery, searchQuery, isAiSearch, updateUrlParams]);

  const selectSuggestion = (val: string) => {
    setLocalQuery(val);
    updateUrlParams({ q: val });
    setShowSuggestions(false);
  };

  const handleTestToggle = (testCode: string) => {
    const activeTests = selectedTests ? selectedTests.split(",") : [];
    let nextTests: string[];
    if (activeTests.includes(testCode)) {
      nextTests = activeTests.filter(t => t !== testCode);
    } else {
      nextTests = [...activeTests, testCode];
    }
    updateUrlParams({ tests: nextTests.length > 0 ? nextTests.join(",") : null });
  };

  return (
    <div className="space-y-6">
      {/* Search Header for Sidebar */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Faceted Filters</h2>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="h-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg text-xs font-semibold px-2 cursor-pointer"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Keyword Search with Autocomplete */}
      <div ref={autocompleteRef} className="space-y-2 relative">
        <div className="flex items-center justify-between">
          <label htmlFor="search-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Keyword</label>
          <button
            type="button"
            onClick={() => setIsAiSearch(!isAiSearch)}
            className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md transition-all duration-300 border cursor-pointer ${
              isAiSearch
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-500 dark:text-indigo-400"
                : "border-border/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>AI Parser</span>
          </button>
        </div>
        
        <div className="relative">
          {isParsing ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-500 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          )}
          <Input
            id="search-input"
            type="text"
            placeholder={isAiSearch ? "Describe your background..." : "Search programs..."}
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-9 pr-8 h-10 rounded-lg text-xs border-border bg-background/40 focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold"
          />
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery("");
                updateUrlParams({ q: null });
                setSuggestions([]);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
              aria-label="Clear keyword input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-[66px] z-50 rounded-lg border border-border/40 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => selectSuggestion(s)}
                className="w-full text-left rounded-md px-2.5 py-2 text-xs font-semibold text-foreground hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors truncate cursor-pointer block"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Program Type Filter */}
      <div className="space-y-2">
        <label htmlFor="category-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Program Type</label>
        <select
          id="category-select"
          value={selectedType}
          onChange={(e) => updateUrlParams({ type: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Scholarship">Scholarships</option>
          <option value="Internship">Internships</option>
          <option value="Fellowship">Fellowships</option>
          <option value="ResearchGrant">Research Grants</option>
          <option value="Conference">Conferences</option>
          <option value="ExchangeProgram">Exchange Programs</option>
        </select>
      </div>

      {/* Scholarship Type Filter */}
      <div className="space-y-2">
        <label htmlFor="scholarshiptype-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Scholarship Type</label>
        <select
          id="scholarshiptype-select"
          value={selectedScholarshipType}
          onChange={(e) => updateUrlParams({ scholarshipType: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Coverage Levels</option>
          {SCHOLARSHIP_TYPES.map(st => (
            <option key={st.code} value={st.code}>{st.name}</option>
          ))}
        </select>
      </div>

      {/* Degree Filter */}
      <div className="space-y-2">
        <label htmlFor="degree-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Degree Level</label>
        <select
          id="degree-select"
          value={selectedLevel}
          onChange={(e) => updateUrlParams({ level: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Levels</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Master&apos;s / Graduate</option>
          <option value="PhD">PhD / Doctorate</option>
          <option value="PostDoc">Post-Doctorate</option>
          <option value="EarlyCareer">Early Career</option>
        </select>
      </div>

      {/* Country Filter */}
      <div className="space-y-2">
        <label htmlFor="country-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Country</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => updateUrlParams({ country: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Countries</option>
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* University Filter */}
      <div className="space-y-2">
        <label htmlFor="university-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">University / Host</label>
        <select
          id="university-select"
          value={selectedUniversity}
          onChange={(e) => updateUrlParams({ university: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Universities</option>
          {UNIVERSITIES.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {/* Major / Discipline Filter */}
      <div className="space-y-2">
        <label htmlFor="discipline-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Field of Study</label>
        <select
          id="discipline-select"
          value={selectedDiscipline}
          onChange={(e) => updateUrlParams({ discipline: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Fields</option>
          {MAJORS.map(m => (
            <option key={m.code} value={m.code}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      <div className="space-y-2">
        <label htmlFor="language-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Required Language</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => updateUrlParams({ language: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Funding Type Filter */}
      <div className="space-y-2">
        <label htmlFor="funding-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Funding Model</label>
        <select
          id="funding-select"
          value={selectedFunding}
          onChange={(e) => updateUrlParams({ funding: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Funding Models</option>
          <option value="FullyFunded">Fully Funded</option>
          <option value="PartiallyFunded">Partially Funded</option>
          <option value="Paid">Paid / Stipend-based</option>
        </select>
      </div>

      {/* Deadline Filter */}
      <div className="space-y-2">
        <label htmlFor="deadline-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Timeline</label>
        <select
          id="deadline-select"
          value={selectedDeadline}
          onChange={(e) => updateUrlParams({ deadline: e.target.value })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Timelines</option>
          <option value="active">Active (Open)</option>
          <option value="ending-soon">Ending Soon (&lt; 30 days)</option>
          <option value="rolling">Rolling Deadlines</option>
        </select>
      </div>

      {/* GPA Requirement Limit */}
      <div className="space-y-2">
        <label htmlFor="gpa-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GPA Requirement Limit</label>
        <select
          id="gpa-select"
          value={selectedGpa}
          onChange={(e) => updateUrlParams({ gpa: e.target.value || null })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">Show All GPAs</option>
          <option value="none">No GPA Requirement Only</option>
          <option value="3.0">Requires ≤ 3.0 GPA</option>
          <option value="3.2">Requires ≤ 3.2 GPA</option>
          <option value="3.5">Requires ≤ 3.5 GPA</option>
          <option value="3.7">Requires ≤ 3.7 GPA</option>
          <option value="4.0">Requires ≤ 4.0 GPA</option>
        </select>
      </div>

      {/* Standardized Tests Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Test Requirements</label>
        <div className="space-y-2 bg-background/20 p-3 rounded-xl border border-border/20">
          {[
            { code: "sat", name: "SAT Required" },
            { code: "act", name: "ACT Required" },
            { code: "ielts", name: "IELTS Required" },
            { code: "toefl", name: "TOEFL Required" },
            { code: "none", name: "No Test Required" }
          ].map(test => {
            const isChecked = (selectedTests ? selectedTests.split(",") : []).includes(test.code);
            return (
              <div key={test.code} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`test-${test.code}`}
                  checked={isChecked}
                  onChange={() => handleTestToggle(test.code)}
                  className="h-4 w-4 rounded-sm border-border text-indigo-600 focus:ring-indigo-500 bg-background cursor-pointer"
                />
                <label htmlFor={`test-${test.code}`} className="text-xs font-semibold text-foreground cursor-pointer select-none">
                  {test.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funding Amount Filter */}
      <div className="space-y-2">
        <label htmlFor="amount-select" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Award Value Range</label>
        <select
          id="amount-select"
          value={selectedAmountRange}
          onChange={(e) => updateUrlParams({ amountRange: e.target.value || null })}
          className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
        >
          <option value="">All Amounts</option>
          <option value="0-5000">Under $5,000</option>
          <option value="5000-15000">$5,000 – $15,000</option>
          <option value="15000-30000">$15,000 – $30,000</option>
          <option value="30000-50000">$30,000 – $50,000</option>
          <option value="50000-9999999">Over $50,000 / Full Ride</option>
        </select>
      </div>
    </div>
  );
};
