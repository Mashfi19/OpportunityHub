import { MOCK_OPPORTUNITIES } from "@/features/opportunities/data/mockData";
import { DetailOpportunity } from "@/features/opportunities/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Retrieve token from session storage safely
function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // CSRF protection header
    "X-CSRF-Token": "opportunityhub_secure_csrf_token"
  };

  if (typeof window !== "undefined") {
    const session = localStorage.getItem("opportunityhub_session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.token) {
          headers["Authorization"] = `Bearer ${parsed.token}`;
        }
      } catch (err) {
        console.error("Failed to parse auth token", err);
      }
    }
  }

  return headers;
}

export async function aiSearch(query: string): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/search`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ query })
    });
    if (res.ok) return await res.json() as Record<string, string>;
  } catch (err) {
    console.warn("[API Client] Backend search endpoint offline. Falling back to local search rules.", err);
  }

  // Local fallback parsing (Graceful degradation)
  const filters: Record<string, string> = {};
  const q = query.toLowerCase();
  
  if (q.includes("computer science") || q.includes("cs")) filters.keyword = "STEM";
  if (q.includes("germany")) filters.country = "DE";
  if (q.includes("usa") || q.includes("united states")) filters.country = "US";
  if (q.includes("phd") || q.includes("doctorate")) filters.level = "PhD";
  if (q.includes("master") || q.includes("graduate")) filters.level = "Graduate";
  if (q.includes("fully funded")) filters.funding = "FullyFunded";

  return filters;
}

export async function aiSummary(opportunityId: string, description: string): Promise<{ summary: string; keyPoints: string[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/summary`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ opportunityId })
    });
    if (res.ok) return await res.json() as { summary: string; keyPoints: string[] };
  } catch (err) {
    console.warn("[API Client] Backend summary endpoint offline. Using local summarizer.", err);
  }

  // Local fallback: trim and supply points
  return {
    summary: description.slice(0, 150) + "...",
    keyPoints: [
      "Provides verified program funding support.",
      "Requires active student/academic status.",
      "Requires complete certified transcripts dossier.",
      "Review official portals for rolling timeline updates."
    ]
  };
}

export async function aiChat(opportunityId: string, question: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ opportunityId, question })
    });
    if (res.ok) {
      const data = await res.json() as { answer: string };
      return data.answer;
    }
  } catch (err) {
    console.warn("[API Client] Backend chatbot offline. Using static responder rules.", err);
  }

  return ""; // empty string signals caller to use its local rule-based chatbot
}

interface EligibilityResult {
  score: number;
  isEligible: boolean;
  reasons: string[];
  gaps: string[];
  roadmap: string[];
}

export async function aiEligibility(opportunityId: string): Promise<EligibilityResult | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/eligibility`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ opportunityId })
    });
    if (res.ok) return await res.json() as EligibilityResult;
  } catch (err) {
    console.warn("[API Client] Backend eligibility endpoint offline. Running client-side heuristic match.", err);
  }

  return null; // Signals caller to run client-side calculateMatch
}

interface ChecklistItem {
  name: string;
  status: boolean;
  description: string;
}

export async function aiChecklist(opportunityId: string): Promise<{ documents: ChecklistItem[]; tips: string[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/checklist`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ opportunityId })
    });
    if (res.ok) return await res.json() as { documents: ChecklistItem[]; tips: string[] };
  } catch (err) {
    console.warn("[API Client] Backend checklist endpoint offline. Using local document checklist templates.", err);
  }

  // Local fallback: dynamic documents list matching opportunity requirements
  const found = MOCK_OPPORTUNITIES.find(o => o.id === opportunityId);
  const baseDocs = found?.requiredDocuments || [
    "Academic Transcripts",
    "Curriculum Vitae (CV)",
    "Statement of Purpose (SOP)",
    "Recommendation Letters"
  ];

  return {
    documents: baseDocs.map(name => ({
      name,
      status: false,
      description: `Prepare high-quality, certified copy of your ${name}.`
    })),
    tips: [
      "Secure recommendation letters at least 3 weeks before the target deadline.",
      "Translate all academic records into official English counterparts.",
      "Highlight research output or project milestones in your CV."
    ]
  };
}

interface RawRecommendationItem {
  id: string;
  title: string;
  host?: string;
  university?: string;
  location?: string;
  country?: string;
  country_code?: string;
  countryCode?: string;
  type?: string;
  category?: string;
  fundingType?: string;
  funding_type?: string;
  amount?: string;
  amount_value?: string;
  deadline?: string;
  deadline_date?: string;
  deadlines?: Array<{ deadline_date?: string }>;
  tags?: string[];
  subject?: string;
  logoUrl?: string;
  logo_url?: string;
  currency?: string;
  academicLevels?: string[];
  academic_levels?: string[];
  levels?: string[];
  disciplines?: string[];
  eligibleCitizenships?: string[];
  eligible_citizenships?: string[];
  gpaMin?: number;
  gpa_min?: number;
  ieltsMin?: number;
  ielts_min?: number;
  toeflMin?: number;
  toefl_min?: number;
  description: string;
  benefits?: string[];
  eligibilityCriteria?: string[];
  requiredDocuments?: string[];
  required_documents?: string[];
  officialUrl?: string;
  official_source_url?: string;
  matchScore?: number;
  aiExplanation?: string;
}

export async function aiRecommendations(): Promise<DetailOpportunity[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/recommendations`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const data = await res.json() as RawRecommendationItem[];
      return data.map((item: RawRecommendationItem) => {
        const parsedDeadline = item.deadline 
          ? new Date(item.deadline) 
          : (item.deadlines?.[0]?.deadline_date ? new Date(item.deadlines[0].deadline_date) : null);
        
        return {
          id: item.id,
          title: item.title,
          host: item.host || item.university || "Global Institution",
          location: item.location || item.country || "Global",
          countryCode: item.country_code || item.countryCode || "GLOBAL",
          type: (item.type || item.category || "Scholarship") as unknown as DetailOpportunity["type"],
          fundingType: (item.fundingType || item.funding_type || "FullyFunded") as unknown as DetailOpportunity["fundingType"],
          amount: item.amount || item.amount_value || "Fully Funded",
          currency: item.currency || "USD",
          deadline: parsedDeadline,
          academicLevels: (item.academicLevels || item.academic_levels || item.levels || ["Graduate"]) as unknown as DetailOpportunity["academicLevels"],
          disciplines: (item.disciplines || ["All"]) as unknown as DetailOpportunity["disciplines"],
          eligibleCitizenships: item.eligibleCitizenships || item.eligible_citizenships || ["GLOBAL"],
          tags: item.tags || [item.category || "Scholarship"],
          gpaMin: item.gpaMin || item.gpa_min || 0,
          ieltsMin: item.ieltsMin || item.ielts_min || 0,
          toeflMin: item.toeflMin || item.toefl_min || 0,
          description: item.description || "",
          benefits: item.benefits || [item.amount_value || "Fully Funded"],
          eligibilityCriteria: item.eligibilityCriteria || [],
          requiredDocuments: item.requiredDocuments || item.required_documents || [],
          officialUrl: item.officialUrl || item.official_source_url || "",
          matchScore: item.matchScore,
          aiExplanation: item.aiExplanation,
          timeline: [],
          applicationSteps: []
        };
      }) as unknown as DetailOpportunity[];
    }
  } catch (err) {
    console.warn("[API Client] Backend recommendations endpoint offline. Running client-side matching.", err);
  }

  return []; // Signals caller to run local recommendation engine
}
