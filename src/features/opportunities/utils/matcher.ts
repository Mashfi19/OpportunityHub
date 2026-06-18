import { AcademicProfile, MatchResult, DetailOpportunity } from "../types";

export function calculateMatch(
  profile: AcademicProfile | null,
  opportunity: DetailOpportunity
): MatchResult {
  // If no profile exists, return a baseline result
  if (!profile) {
    return {
      score: 75, // Baseline/fallback score
      isEligible: true,
      matchReasons: ["Log in or set up your academic profile for personalized matchmaking scores."],
      missingRequirements: [],
      suggestedImprovements: ["Create an academic profile to unlock personal eligibility predictions."]
    };
  }

  let score = 0;
  let isEligible = true;
  const matchReasons: string[] = [];
  const missingRequirements: string[] = [];
  const suggestedImprovements: string[] = [];

  // 1. Citizenship Check (Critical - Hard Blocker)
  const citizenships = opportunity.eligibleCitizenships || [];
  const isGlobal = citizenships.length === 0 || citizenships.includes("GLOBAL");
  
  if (!isGlobal && !citizenships.includes(profile.country)) {
    isEligible = false;
    missingRequirements.push(`Citizenship restriction: Open only to citizens of [${citizenships.join(", ")}].`);
    suggestedImprovements.push("Search for opportunities open globally or targeting citizens of your country.");
  } else {
    matchReasons.push("Matches citizenship requirements (Open to your country of citizenship).");
  }

  // 2. Academic Level Alignment (Weight: 30%)
  const levels = opportunity.academicLevels || [];
  if (levels.includes(profile.degree)) {
    score += 30;
    matchReasons.push(`Matches academic level requirement (${profile.degree}).`);
  } else {
    isEligible = false;
    score += 0;
    missingRequirements.push(`Academic level mismatch: Opportunity is for [${levels.join(", ")}], but you are currently [${profile.degree}].`);
    suggestedImprovements.push(`Look for programs designed for ${profile.degree} candidates or apply when you reach ${levels.join("/")} standing.`);
  }

  // 3. Field of Study / Major Alignment (Weight: 25%)
  const disciplines = opportunity.disciplines || [];
  const isAllDisciplines = disciplines.includes("All");
  
  if (isAllDisciplines || disciplines.includes(profile.major)) {
    score += 25;
    matchReasons.push(`Perfect match for study discipline: targets ${isAllDisciplines ? "any field" : profile.major}.`);
  } else {
    // If user major is general or they are partially aligned
    score += 5; // Small consolation score
    missingRequirements.push(`Discipline mismatch: Targets [${disciplines.join(", ")}], but your major is [${profile.major}].`);
    suggestedImprovements.push(`Focus on programs aligned with ${profile.major} or those open to 'All' disciplines.`);
  }

  // 4. Academic Merit / CGPA Alignment (Weight: 20%)
  const minGpa = opportunity.gpaMin;
  if (minGpa === undefined || minGpa === null) {
    score += 20;
    matchReasons.push("No minimum CGPA restriction specified.");
  } else if (profile.cgpa >= minGpa) {
    score += 20;
    matchReasons.push(`Your CGPA (${profile.cgpa.toFixed(2)}) meets the minimum requirement of ${minGpa.toFixed(2)}.`);
  } else {
    score += 0;
    missingRequirements.push(`CGPA (${profile.cgpa.toFixed(2)}) is below the required minimum of ${minGpa.toFixed(2)}.`);
    suggestedImprovements.push(`Apply to programs with a minimum CGPA below ${profile.cgpa.toFixed(2)}, or focus on raising your GPA.`);
  }

  // 5. Language Proficiency Alignment (Weight: 15%)
  const minIelts = opportunity.ieltsMin;
  const minToefl = opportunity.toeflMin;
  const hasIeltsReq = minIelts !== undefined && minIelts !== null && minIelts > 0;
  const hasToeflReq = minToefl !== undefined && minToefl !== null && minToefl > 0;

  if (!hasIeltsReq && !hasToeflReq) {
    score += 15;
    matchReasons.push("No English language proficiency test score restrictions.");
  } else {
    let metIelts = false;
    let metToefl = false;

    if (hasIeltsReq && profile.ielts !== null && profile.ielts >= minIelts!) {
      metIelts = true;
    }
    if (hasToeflReq && profile.toefl !== null && profile.toefl >= minToefl!) {
      metToefl = true;
    }

    if ((hasIeltsReq && metIelts) || (hasToeflReq && metToefl) || (!hasIeltsReq && metToefl) || (!hasToeflReq && metIelts)) {
      score += 15;
      const scoreStr = metIelts 
        ? `IELTS ${profile.ielts}` 
        : `TOEFL ${profile.toefl}`;
      matchReasons.push(`Your language test score (${scoreStr}) meets the minimum requirements.`);
    } else {
      score += 0;
      const reqs: string[] = [];
      if (hasIeltsReq) reqs.push(`IELTS ${minIelts}`);
      if (hasToeflReq) reqs.push(`TOEFL ${minToefl}`);
      
      missingRequirements.push(`Language score below minimum: Requires ${reqs.join(" or ")} (yours: IELTS ${profile.ielts || "N/A"}, TOEFL ${profile.toefl || "N/A"}).`);
      suggestedImprovements.push(`Take or retake the IELTS/TOEFL to achieve the minimum required scores (${reqs.join("/")}).`);
    }
  }

  // 6. Destination Preference Alignment (Weight: 10%)
  const preferred = profile.preferredCountries || [];
  if (preferred.length === 0) {
    // If user has no preferred countries, they align with everything
    score += 10;
  } else if (preferred.includes(opportunity.countryCode) || (opportunity.countryCode === "EU" && preferred.some(c => ["DE", "FR", "IT", "ES", "NL", "BE", "CH", "SE", "GB"].includes(c)))) {
    score += 10;
    matchReasons.push("Located in one of your preferred study destinations.");
  } else {
    score += 0;
    // Not a blocker, just lower preference score
  }

  // Final adjustments: if they are critically ineligible, cap the match score at 15%
  if (!isEligible) {
    score = Math.min(score, 15);
  }

  return {
    score: Math.round(score),
    isEligible,
    matchReasons,
    missingRequirements,
    suggestedImprovements
  };
}
