export interface RawOpportunity {
  sourceId: string;
  sourceUrl: string;
  title: string;
  description: string;
  rawPayload: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface StandardOpportunity {
  title: string;
  hostInstitution: string;
  locationCountry: string;
  type: "Scholarship" | "Internship" | "Fellowship" | "Research Grant" | "Conference" | "Summer School" | "PhD Opportunity";
  fundingType: "Fully Funded" | "Partially Funded" | "Tuition Waiver" | "Paid" | "Self-Funded";
  awardValue?: string;
  eligibilityDescription: string;
  academicLevels: string[];
  deadline: Date | null;
  officialUrl: string;
  tags: string[];
}

export type ProviderSourceType = "api" | "rss" | "government" | "university";

export interface IOpportunityProvider {
  readonly id: string;
  readonly name: string;
  readonly sourceType: ProviderSourceType;
  fetchRawData(): Promise<RawOpportunity[]>;
  transform(raw: RawOpportunity): Promise<StandardOpportunity>;
}
