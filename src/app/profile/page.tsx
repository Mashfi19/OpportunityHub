"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Check, 
  AlertCircle,
  Undo2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MAJORS } from "@/features/opportunities/data/mockData";
import { AcademicProfile } from "@/features/opportunities/types";
import { AcademicLevel, StudyDiscipline } from "@/core/domain/opportunity";
import { ALL_COUNTRIES } from "@/features/opportunities/data/countriesData";

export default function ProfilePage() {
  const router = useRouter();

  // Load existing profile if any
  const [country, setCountry] = React.useState("IN");
  const [degree, setDegree] = React.useState("Graduate");
  const [cgpa, setCgpa] = React.useState("3.60");
  const [major, setMajor] = React.useState("STEM");
  const [ielts, setIelts] = React.useState("7.5");
  const [toefl, setToefl] = React.useState("105");
  const [experienceYears, setExperienceYears] = React.useState("1");
  const [hasResearchExp, setHasResearchExp] = React.useState(true);
  const [researchDetails, setResearchDetails] = React.useState("Published a paper on Machine Learning applications in astrophysics.");
  const [preferredCountries, setPreferredCountries] = React.useState<string[]>(["US", "DE", "CH"]);
  const [satScore, setSatScore] = React.useState("");
  const [actScore, setActScore] = React.useState("");
  const [fundingNeeds, setFundingNeeds] = React.useState("Full");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = React.useState<"idle" | "saving" | "success" | "error">("idle");

  // Hydrate from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("opportunityhub_profile");
      if (stored) {
        const data: AcademicProfile & { researchDetails?: string } = JSON.parse(stored);
        setCountry(data.country || "IN");
        setDegree(data.degree || "Graduate");
        setCgpa(data.cgpa !== undefined ? data.cgpa.toString() : "3.60");
        setMajor(data.major || "STEM");
        setIelts(data.ielts !== null && data.ielts !== undefined ? data.ielts.toString() : "");
        setToefl(data.toefl !== null && data.toefl !== undefined ? data.toefl.toString() : "");
        setExperienceYears(data.experienceYears !== undefined ? data.experienceYears.toString() : "0");
        setHasResearchExp(!!data.hasResearchExp);
        setResearchDetails(data.researchDetails || "");
        setPreferredCountries(data.preferredCountries || []);
        setSatScore(data.satScore !== null && data.satScore !== undefined ? data.satScore.toString() : "");
        setActScore(data.actScore !== null && data.actScore !== undefined ? data.actScore.toString() : "");
        setFundingNeeds(data.fundingNeeds || "Full");
      }
    } catch (err) {
      console.error("Failed to load profile from localStorage:", err);
    }
  }, []);

  const handleCountryToggle = (code: string) => {
    if (preferredCountries.includes(code)) {
      setPreferredCountries(preferredCountries.filter(c => c !== code));
    } else {
      setPreferredCountries([...preferredCountries, code]);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. CGPA validation
    const gpaNum = parseFloat(cgpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      newErrors.cgpa = "CGPA must be a valid number between 0.00 and 4.00.";
    }

    // 2. IELTS validation
    if (ielts.trim() !== "") {
      const ieltsNum = parseFloat(ielts);
      if (isNaN(ieltsNum) || ieltsNum < 0 || ieltsNum > 9.0) {
        newErrors.ielts = "IELTS score must be between 0.0 and 9.0.";
      } else if (ieltsNum % 0.5 !== 0) {
        newErrors.ielts = "IELTS score must be in increments of 0.5.";
      }
    }

    // 3. TOEFL validation
    if (toefl.trim() !== "") {
      const toeflNum = parseInt(toefl);
      if (isNaN(toeflNum) || toeflNum < 0 || toeflNum > 120) {
        newErrors.toefl = "TOEFL score must be an integer between 0 and 120.";
      }
    }

    // 4. Experience Years validation
    const expNum = parseInt(experienceYears);
    if (isNaN(expNum) || expNum < 0) {
      newErrors.experienceYears = "Experience must be a positive integer.";
    }

    // 5. SAT score validation
    if (satScore.trim() !== "") {
      const satNum = parseInt(satScore);
      if (isNaN(satNum) || satNum < 400 || satNum > 1600) {
        newErrors.satScore = "SAT score must be an integer between 400 and 1600.";
      }
    }

    // 6. ACT score validation
    if (actScore.trim() !== "") {
      const actNum = parseInt(actScore);
      if (isNaN(actNum) || actNum < 1 || actNum > 36) {
        newErrors.actScore = "ACT score must be an integer between 1 and 36.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");

    if (!validate()) {
      setSaveStatus("error");
      return;
    }

    // Build standard profile object
    const profileData: AcademicProfile & { researchDetails: string } = {
      country,
      degree: degree as AcademicLevel,
      cgpa: parseFloat(cgpa),
      major: major as StudyDiscipline,
      ielts: ielts.trim() === "" ? null : parseFloat(ielts),
      toefl: toefl.trim() === "" ? null : parseInt(toefl),
      satScore: satScore.trim() === "" ? null : parseInt(satScore),
      actScore: actScore.trim() === "" ? null : parseInt(actScore),
      experienceYears: parseInt(experienceYears),
      hasResearchExp,
      researchDetails,
      preferredCountries,
      fundingNeeds: fundingNeeds
    };

    try {
      localStorage.setItem("opportunityhub_profile", JSON.stringify(profileData));
      setSaveStatus("success");
      
      // Reset toast after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSaveStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/75">
            Academic Profile Builder
          </h1>
          <p className="text-xs font-semibold text-muted-foreground mt-1">
            Complete your academic details to calculate dynamic matchmaking scores.
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => router.push("/opportunities")}
          className="rounded-xl text-xs h-9 font-bold flex items-center gap-1.5"
        >
          <Undo2 className="h-4 w-4" />
          Catalog
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="rounded-2xl border-border/40 bg-background/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Academic Background</CardTitle>
            <CardDescription className="text-xs">Provide your current citizenship, degree standings, and grade point averages.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            
            {/* Citizenship & Major field row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Citizenship Country */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  Country of Citizenship
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
                >
                  {ALL_COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Major Discipline */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  Field of Study (Major)
                </label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold"
                >
                  {MAJORS.map(m => (
                    <option key={m.code} value={m.code}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Degree Standing & CGPA row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Degree Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-indigo-500" />
                  Current Academic Degree
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold"
                >
                  <option value="HighSchool">High School</option>
                  <option value="Undergraduate">Undergraduate (Bachelor&apos;s)</option>
                  <option value="Graduate">Graduate (Master&apos;s)</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="PostDoc">Post-Doctorate</option>
                  <option value="EarlyCareer">Early Career Professional</option>
                </select>
              </div>

              {/* CGPA */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  CGPA (Normalized to 4.0)
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 3.85"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.cgpa ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
                {errors.cgpa && (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.cgpa}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* English Language Proficiency and Experience */}
        <Card className="rounded-2xl border-border/40 bg-background/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Qualifications & Languages</CardTitle>
            <CardDescription className="text-xs">Provide language scores and professional achievements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* IELTS & TOEFL score fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* IELTS Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">IELTS Score</label>
                <Input
                  type="text"
                  placeholder="e.g. 7.5 (Optional)"
                  value={ielts}
                  onChange={(e) => setIelts(e.target.value)}
                  className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.ielts ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
                {errors.ielts ? (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.ielts}
                  </p>
                ) : (
                  <p className="text-[9px] text-muted-foreground font-semibold">Scale: 0.0 - 9.0 in steps of 0.5</p>
                )}
              </div>

              {/* TOEFL Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">TOEFL iBT Score</label>
                <Input
                  type="text"
                  placeholder="e.g. 108 (Optional)"
                  value={toefl}
                  onChange={(e) => setToefl(e.target.value)}
                  className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.toefl ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
                {errors.toefl ? (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.toefl}
                  </p>
                ) : (
                  <p className="text-[9px] text-muted-foreground font-semibold">Scale: 0 - 120 integer score</p>
                )}
              </div>
            </div>

            {/* SAT & ACT score fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border/20 pt-4">
              {/* SAT Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SAT Score</label>
                <Input
                  type="text"
                  placeholder="e.g. 1520 (Optional)"
                  value={satScore}
                  onChange={(e) => setSatScore(e.target.value)}
                  className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.satScore ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
                {errors.satScore ? (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.satScore}
                  </p>
                ) : (
                  <p className="text-[9px] text-muted-foreground font-semibold">Scale: 400 - 1600 (for US/Global admissions)</p>
                )}
              </div>

              {/* ACT Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ACT Score</label>
                <Input
                  type="text"
                  placeholder="e.g. 34 (Optional)"
                  value={actScore}
                  onChange={(e) => setActScore(e.target.value)}
                  className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.actScore ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
                {errors.actScore ? (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.actScore}
                  </p>
                ) : (
                  <p className="text-[9px] text-muted-foreground font-semibold">Scale: 1 - 36</p>
                )}
              </div>
            </div>

            {/* Target Funding Needs */}
            <div className="space-y-2 border-t border-border/20 pt-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Funding Needs</label>
              <select
                value={fundingNeeds}
                onChange={(e) => setFundingNeeds(e.target.value)}
                className="h-10 w-full px-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold cursor-pointer"
              >
                <option value="Full">Full Scholarship (Fully Funded)</option>
                <option value="Partial">Partial / Tuition Waivers / Grants</option>
                <option value="None">None (Self-funded)</option>
              </select>
              <p className="text-[9px] text-muted-foreground font-semibold">Match score weights will prioritize scholarships matching your funding goals.</p>
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Years of Research / Professional Experience</label>
              <Input
                type="number"
                min="0"
                placeholder="e.g. 2"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className={`h-10 rounded-lg text-xs border-border bg-background focus-visible:ring-indigo-500 focus-visible:ring-1 font-semibold ${errors.experienceYears ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              />
              {errors.experienceYears && (
                <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.experienceYears}
                </p>
              )}
            </div>

            {/* Research Checkbox + Textarea */}
            <div className="space-y-4 pt-2 border-t border-border/20">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="research-checkbox"
                  checked={hasResearchExp}
                  onChange={(e) => setHasResearchExp(e.target.checked)}
                  className="h-4.5 w-4.5 rounded-md border-border text-indigo-600 focus:ring-indigo-500 bg-background cursor-pointer"
                />
                <label htmlFor="research-checkbox" className="text-xs font-bold text-foreground cursor-pointer select-none">
                  I have research experience or academic publications
                </label>
              </div>

              {hasResearchExp && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label htmlFor="research-textarea" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Research Publications & Project Details</label>
                  <textarea
                    id="research-textarea"
                    rows={3}
                    placeholder="Briefly describe your thesis title, research projects, publications or preprints..."
                    value={researchDetails}
                    onChange={(e) => setResearchDetails(e.target.value)}
                    className="w-full p-3 text-xs border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 font-semibold"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Destination Preferences */}
        <Card className="rounded-2xl border-border/40 bg-background/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Destination Preferences</CardTitle>
            <CardDescription className="text-xs">Select target countries you prefer to study or complete research in.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-40 overflow-y-auto border border-border/20 rounded-xl p-3.5 flex flex-wrap gap-2 bg-background/20 scrollbar-thin">
              {ALL_COUNTRIES.map((c) => {
                const isSelected = preferredCountries.includes(c.code);
                return (
                  <Badge
                    key={c.code}
                    onClick={() => handleCountryToggle(c.code)}
                    className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border border-border/30 cursor-pointer select-none transition-all duration-200 hover:scale-102 ${isSelected ? "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-700" : "bg-muted/30 text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {c.name}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Controls & Toast Banners */}
        <div className="flex flex-col gap-4">
          
          {/* Toast banners */}
          {saveStatus === "success" && (
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-300">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>Profile updated successfully! Matchmaking scores across the catalog have been re-calculated.</span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-300">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
              <span>Failed to save. Please review the form fields for validation errors.</span>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/opportunities")}
              className="flex-1 rounded-xl text-xs h-11 font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveStatus === "saving"}
              className="flex-1 rounded-xl text-xs h-11 font-black bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/10"
            >
              {saveStatus === "saving" ? "Saving Profile..." : "Save Profile Details"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
