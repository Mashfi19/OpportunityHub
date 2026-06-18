import { 
  OpportunityType, 
  FundingType, 
  AcademicLevel, 
  StudyDiscipline 
} from "@/core/domain/opportunity";

export interface AcademicProfile {
  country: string;            // Citizen ISO code (e.g. "US", "DE", "IN")
  degree: AcademicLevel;
  cgpa: number;               // 0.0 - 4.0
  major: StudyDiscipline;
  ielts: number | null;       // 0.0 - 9.0
  toefl: number | null;       // 0 - 120
  satScore?: number | null;   // 400 - 1600
  actScore?: number | null;   // 1 - 36
  experienceYears: number;
  hasResearchExp: boolean;
  preferredCountries: string[]; // ISO codes
  fundingNeeds?: string | null; // e.g. "Full", "Partial", "None"
}

export interface MatchResult {
  score: number;
  isEligible: boolean;
  matchReasons: string[];
  missingRequirements: string[];
  suggestedImprovements: string[];
}

export interface DetailOpportunity {
  id: string;
  title: string;
  host: string;
  location: string;
  countryCode: string;
  type: OpportunityType;
  fundingType: FundingType;
  amount: string;
  currency: string;
  deadline: Date | null;
  academicLevels: AcademicLevel[];
  disciplines: StudyDiscipline[];
  eligibleCitizenships: string[]; // ISO codes or ["GLOBAL"]
  tags: string[];
  
  // Detailed fields
  description: string;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  timeline: { event: string; date: Date | null }[];
  applicationSteps: string[];
  officialUrl: string;
  gpaMin?: number | null;
  ieltsMin?: number | null;
  toeflMin?: number | null;
  satMin?: number | null;
  actMin?: number | null;
  experienceYearsMin?: number | null;
  universityId?: string | null;
  organizationId?: string | null;
}

export interface UniversityProfile {
  id: string;
  name: string;
  countryId?: number;
  countryName?: string;
  countryCode: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  rankingGlobal: number;
  rankingNational: number;
  acceptanceRate: number;
  averageTuition: string;
  satRange: string;
  actRange: string;
  studentPopulation: number;
  activeOpportunitiesCount?: number;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
  type: string;
  foundedYear: number;
  activeOpportunitiesCount?: number;
}

export interface CountryProfile {
  code: string;
  name: string;
  description?: string;
  region?: string;
  activeOpportunitiesCount?: number;
}
