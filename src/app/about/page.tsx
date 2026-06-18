"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Globe, 
  Award, 
  Users, 
  Compass, 
  GraduationCap, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const router = useRouter();

  const stats = [
    { label: "Funding Indexed", value: "$120M+", icon: Award, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Active Listings", value: "12,000+", icon: Compass, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Countries Supported", value: "160+", icon: Globe, color: "text-purple-500 bg-purple-500/10" },
    { label: "Matched Students", value: "85,000+", icon: Users, color: "text-pink-500 bg-pink-500/10" }
  ];

  const values = [
    {
      title: "100% Official Verifications",
      description: "We scrape and aggregate data exclusively from official government, university, and foundation portals. Zero speculative listings or outdated blog reposts.",
      icon: ShieldCheck
    },
    {
      title: "Democratic Access",
      description: "Finding life-changing opportunities shouldn't require paying expensive agency fees. OpportunityHub is open-access and designed to equalize the academic landscape.",
      icon: GraduationCap
    },
    {
      title: "Personalized Alignment",
      description: "Our weighted matchmaking engine aligns you with opportunities matching your citizenship, major, CGPA, and language scores to maximize success rates.",
      icon: Target
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Democratizing Global <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Academic Mobility</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          OpportunityHub was founded to bridge the information gap for students and researchers globally. We connect international talents with fully funded scholarships, internships, fellowships, and research grants.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="rounded-2xl border-border/40 bg-background/20 p-6 flex flex-col items-center text-center space-y-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className={`p-3 rounded-2xl ${stat.color} shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</span>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-b border-border/40 py-16">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            Bridging the Information Divide
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every year, millions of dollars in prestigious academic grants and fully-funded fellowship seats go unclaimed due to fragmented information channels. Students often rely on untrustworthy third-party blogs or pay high-fees to education consultants just to identify active programs.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our platform solves this by deploying automated schedulers that crawl university bulletins, government boards, and official research institutes. We normalize the data into a Universal Opportunity model and use standard matchmaking criteria to let students query their eligibility instantly.
          </p>
        </div>
        
        {/* Decorative Graphic Block */}
        <div className="bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent border border-border/40 rounded-3xl p-8 space-y-6 relative overflow-hidden backdrop-blur-xs">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Core Mission</span>
            <blockquote className="text-base font-extrabold text-foreground italic leading-snug">
              &ldquo;To ensure no talent is limited by geography, and every researcher finds their gateway to global contribution.&rdquo;
            </blockquote>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
              OH
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">OpportunityHub Team</p>
              <p className="text-[10px] text-muted-foreground">Global Operations Committee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-foreground">Our Core Pillars</h2>
          <p className="text-xs text-muted-foreground">The values that define our architectural and operational standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <Card key={idx} className="rounded-2xl border-border/40 bg-background/30 p-6 space-y-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0 w-11 h-11 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-foreground">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-8 rounded-3xl bg-zinc-950/20 border border-border/40 text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden backdrop-blur-xs">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">Get Started with Personalized Matchmaking</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Create your profile today, upload your test scores, and see which international fellowships and grants are currently looking for candidates like you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button 
            onClick={() => router.push("/profile")}
            className="rounded-xl h-10 px-5 text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/10"
          >
            Build Academic Profile
          </Button>
          <Button 
            onClick={() => router.push("/opportunities")}
            variant="outline" 
            className="rounded-xl h-10 px-5 text-xs font-bold"
          >
            Explore Catalog
          </Button>
        </div>
      </div>
    </div>
  );
}
