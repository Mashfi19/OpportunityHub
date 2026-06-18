import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { SearchFilters } from "./SearchFilters";

interface MobileFilterDialogProps {
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
  resultsCount: number;
}

export const MobileFilterDialog: React.FC<MobileFilterDialogProps> = ({
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
  handleResetFilters,
  resultsCount,
}) => {
  return (
    <div className="flex lg:hidden items-center justify-between border border-border/40 p-4 rounded-xl bg-background/50 mb-4 backdrop-blur-xs">
      <span className="text-xs font-bold text-muted-foreground">
        Found {resultsCount} matching programs
      </span>
      
      <Dialog>
        <DialogTrigger render={
          <Button 
            className="h-9 rounded-lg bg-indigo-500/10 hover:bg-indigo-500 text-indigo-500 hover:text-white font-extrabold flex items-center space-x-2 text-xs border border-indigo-500/20 cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters ({activeFiltersCount})</span>
          </Button>
        } />
        <DialogContent className="max-h-[85vh] overflow-y-auto w-full max-w-sm rounded-2xl bg-background p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-sm font-extrabold uppercase tracking-wider">Faceted Search Filters</DialogTitle>
            <DialogDescription className="text-xs">
              Refine opportunities based on your academic profile criteria.
            </DialogDescription>
          </DialogHeader>
          
          <div className="pb-4">
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
          </div>
          
          <div className="flex gap-3 mt-4 border-t border-border/40 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl text-xs h-10 font-bold cursor-pointer" 
              onClick={handleResetFilters}
            >
              Reset All
            </Button>
            <DialogClose render={
              <Button className="flex-1 rounded-xl text-xs h-10 font-bold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
                Apply Filters
              </Button>
            } />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
