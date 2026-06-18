export type OpportunityType =
  | "Scholarship"
  | "Internship"
  | "Fellowship"
  | "ResearchGrant"
  | "Competition"
  | "SummerSchool"
  | "Conference"
  | "PhDPosition";

export type FundingType =
  | "FullyFunded"
  | "PartiallyFunded"
  | "TuitionWaiver"
  | "Paid"
  | "Unpaid";

export type AcademicLevel =
  | "HighSchool"
  | "Undergraduate"
  | "Graduate"
  | "PhD"
  | "PostDoc"
  | "EarlyCareer";

export type StudyDiscipline =
  | "STEM"
  | "Humanities"
  | "SocialSciences"
  | "Medicine"
  | "Arts"
  | "Business"
  | "All";

export interface Opportunity {
  id: string; // UUID v4
  title: string;
  description: string;
  hostInstitution: string;
  officialUrl: string;
  providerId: string;
  rawOpportunityId: string;
  
  type: OpportunityType;
  fundingType: FundingType;
  tags: string[];
  
  deadline: Date | null;
  startDate: Date | null;
  duration: string | null;
  
  destinationCountries: string[]; // ISO country codes
  
  amount: string | null;
  currency: string | null; // e.g. "USD"
  benefits: string[];
  
  // Eligibility constraints
  academicLevels: AcademicLevel[];
  disciplines: StudyDiscipline[];
  eligibleCitizenships: string[]; // ISO country codes or "GLOBAL"
  gpaMin: number | null; // Normalized to 4.0
  ageMax: number | null;
  requiredLanguages: string[];
  
  createdAt: Date;
  updatedAt: Date;
}
