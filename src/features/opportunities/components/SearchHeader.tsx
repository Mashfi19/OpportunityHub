import * as React from "react";
import { List, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  resultsCount: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  scrollMode: "pagination" | "infinite";
  setScrollMode: (value: "pagination" | "infinite") => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  resultsCount,
  sortBy,
  setSortBy,
  scrollMode,
  setScrollMode
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Scholarship Catalog
        </h1>
        <p className="text-xs font-semibold text-muted-foreground mt-1">
          Discover and filter {resultsCount} verified global programs matched to your academic goals.
        </p>
      </div>
      
      {/* Display and Sort Settings Controls */}
      <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
        {/* Toggle Mode */}
        <div className="flex items-center bg-muted/20 border border-border/10 p-1 rounded-xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScrollMode("pagination")}
            className={`h-8 rounded-lg text-xs font-bold px-3 flex items-center gap-1.5 cursor-pointer ${
              scrollMode === "pagination"
                ? "bg-background shadow-xs text-indigo-500 dark:text-indigo-400"
                : "text-muted-foreground"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>Pages</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScrollMode("infinite")}
            className={`h-8 rounded-lg text-xs font-bold px-3 flex items-center gap-1.5 cursor-pointer ${
              scrollMode === "infinite"
                ? "bg-background shadow-xs text-indigo-500 dark:text-indigo-400"
                : "text-muted-foreground"
            }`}
          >
            <Infinity className="h-3.5 w-3.5" />
            <span>Infinite</span>
          </Button>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 bg-muted/20 border border-border/10 p-1.5 rounded-xl">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider pl-2 pr-1">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-8 px-2 py-0.5 text-xs font-bold border-none bg-transparent rounded-lg focus:outline-hidden focus:ring-0 text-foreground cursor-pointer dark:bg-zinc-950/20"
            aria-label="Sort options"
          >
            <option value="match-desc" className="bg-background">Highest Eligibility</option>
            <option value="deadline-asc" className="bg-background">Deadline: Soonest</option>
            <option value="deadline-desc" className="bg-background">Deadline: Latest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
