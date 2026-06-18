import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
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

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
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
  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/20 border border-border/20 rounded-xl">
      <span className="text-xs font-bold text-muted-foreground mr-1">Active filters:</span>
      
      {selectedType && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Type: {selectedType}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ type: null })} 
            aria-label="Remove category filter"
          />
        </Badge>
      )}

      {selectedLevel && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Level: {selectedLevel}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ level: null })} 
            aria-label="Remove academic level filter"
          />
        </Badge>
      )}

      {selectedCountry && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Country: {selectedCountry}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ country: null })} 
            aria-label="Remove country filter"
          />
        </Badge>
      )}

      {selectedUniversity && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>University: {selectedUniversity}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ university: null })} 
            aria-label="Remove university filter"
          />
        </Badge>
      )}

      {selectedDiscipline && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Discipline: {selectedDiscipline}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ discipline: null })} 
            aria-label="Remove field of study filter"
          />
        </Badge>
      )}

      {selectedLanguage && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Language: {selectedLanguage}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ language: null })} 
            aria-label="Remove language filter"
          />
        </Badge>
      )}

      {selectedFunding && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Funding: {selectedFunding}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ funding: null })} 
            aria-label="Remove funding filter"
          />
        </Badge>
      )}

      {selectedScholarshipType && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Coverage: {selectedScholarshipType}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ scholarshipType: null })} 
            aria-label="Remove scholarship coverage filter"
          />
        </Badge>
      )}

      {selectedDeadline && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Deadline: {selectedDeadline}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ deadline: null })} 
            aria-label="Remove deadline filter"
          />
        </Badge>
      )}

      {selectedGpa && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>GPA: {selectedGpa === "none" ? "None" : `≤ ${selectedGpa}`}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ gpa: null })} 
            aria-label="Remove GPA filter"
          />
        </Badge>
      )}

      {selectedTests && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Tests: {selectedTests}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ tests: null })} 
            aria-label="Remove test requirements filter"
          />
        </Badge>
      )}

      {selectedAmountRange && (
        <Badge variant="secondary" className="text-[10px] py-0.5 pl-2 pr-1 rounded-md flex items-center gap-1 font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-none">
          <span>Award Range: {selectedAmountRange}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => updateUrlParams({ amountRange: null })} 
            aria-label="Remove award amount range filter"
          />
        </Badge>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleResetFilters}
        className="h-6 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-md text-[10px] font-bold px-2 ml-auto shrink-0 transition-colors cursor-pointer"
      >
        Clear all filters
      </Button>
    </div>
  );
};
