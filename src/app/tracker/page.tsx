"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  Edit3, 
  StickyNote, 
  ShieldAlert, 
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { Sidebar } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AuthModal } from "@/features/auth/components/AuthModal";

interface TrackerItem {
  opportunityId: string;
  title: string;
  host: string;
  type: string;
  deadline: string | null;
  status: "wishlist" | "applied" | "interviewing" | "offer";
  notes: string;
  lastUpdated: string;
}

const COLUMNS = [
  { key: "wishlist", label: "Wishlist", colorClass: "text-zinc-500 bg-zinc-500/10 border-zinc-500/15", barColor: "bg-zinc-500" },
  { key: "applied", label: "Applied", colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/15", barColor: "bg-indigo-500" },
  { key: "interviewing", label: "Interviewing", colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/15", barColor: "bg-amber-500" },
  { key: "offer", label: "Offer", colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/15", barColor: "bg-emerald-500" }
];

export default function TrackerPage() {
  const router = useRouter();
  const [session, setSession] = React.useState<{ name: string; email: string; initials: string } | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [trackerItems, setTrackerItems] = React.useState<TrackerItem[]>([]);
  
  // Notes Modal state
  const [activeNotesItem, setActiveNotesItem] = React.useState<TrackerItem | null>(null);
  const [notesContent, setNotesContent] = React.useState("");

  // Load session & tracker items
  const loadLocalData = React.useCallback(() => {
    try {
      const storedSession = localStorage.getItem("opportunityhub_session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
      
      const storedTracker = localStorage.getItem("opportunityhub_tracker") || "[]";
      setTrackerItems(JSON.parse(storedTracker));
    } catch (err) {
      console.error("Failed to load local data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    loadLocalData();

    // Listen to storage changes
    window.addEventListener("storage", loadLocalData);
    return () => {
      window.removeEventListener("storage", loadLocalData);
    };
  }, [loadLocalData]);

  // Update item column status
  const handleUpdateStatus = (id: string, newStatus: TrackerItem["status"]) => {
    try {
      const updated = trackerItems.map(item => {
        if (item.opportunityId === id) {
          return { ...item, status: newStatus, lastUpdated: new Date().toISOString() };
        }
        return item;
      });
      setTrackerItems(updated);
      localStorage.setItem("opportunityhub_tracker", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Open Notes Dialog
  const handleOpenNotes = (item: TrackerItem) => {
    setActiveNotesItem(item);
    setNotesContent(item.notes || "");
  };

  // Save Notes
  const handleSaveNotes = () => {
    if (!activeNotesItem) return;
    try {
      const updated = trackerItems.map(item => {
        if (item.opportunityId === activeNotesItem.opportunityId) {
          return { ...item, notes: notesContent, lastUpdated: new Date().toISOString() };
        }
        return item;
      });
      setTrackerItems(updated);
      localStorage.setItem("opportunityhub_tracker", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      setActiveNotesItem(null);
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    try {
      const updated = trackerItems.filter(item => item.opportunityId !== id);
      setTrackerItems(updated);
      localStorage.setItem("opportunityhub_tracker", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to delete tracker item:", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Loading Tracker...
      </div>
    );
  }

  // Render Anonymous screen if not signed in
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center space-y-6 animate-in fade-in duration-300">
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-black text-foreground">Access Restricted</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please Sign In or Create an Account to use the scholarship pipeline tracker, edit checklist logs, and track deadlines.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => { setIsAuthOpen(true); }}
            className="flex-1 rounded-xl h-10 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => { setIsAuthOpen(true); }}
            variant="outline" 
            className="flex-1 rounded-xl h-10 text-xs font-bold"
          >
            Get Started
          </Button>
        </div>

        <AuthModal 
          isOpen={isAuthOpen}
          onOpenChange={setIsAuthOpen}
          defaultTab="signin"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full max-w-[1400px] mx-auto animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">
              Application Tracker Pipeline
            </h1>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              Organize, track progress, and write notes for your saved global opportunities.
            </p>
          </div>
          
          <Button 
            onClick={() => router.push("/opportunities")}
            className="rounded-xl h-9 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-indigo-500/10 cursor-pointer"
          >
            Find More Programs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COLUMNS.map(col => {
            const items = trackerItems.filter(item => item.status === col.key);
            
            return (
              <div key={col.key} className="flex flex-col space-y-4 min-h-[400px]">
                
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-border/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.barColor}`} />
                    <h2 className="text-xs font-black uppercase tracking-wider text-foreground">
                      {col.label}
                    </h2>
                  </div>
                  <Badge variant="outline" className={`rounded-lg font-extrabold text-[10px] ${col.colorClass}`}>
                    {items.length}
                  </Badge>
                </div>

                {/* Cards Container */}
                <div className="flex-1 flex flex-col space-y-3.5 bg-muted/5 border border-border/10 rounded-2xl p-3 max-h-[70vh] overflow-y-auto scrollbar-thin">
                  {items.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-border/40 rounded-xl bg-background/5">
                      <ClipboardList className="h-5 w-5 text-muted-foreground/40 mb-2" />
                      <p className="text-[10px] text-muted-foreground font-semibold leading-normal">
                        No programs tracking here.
                      </p>
                    </div>
                  ) : (
                    items.map(item => (
                      <Card key={item.opportunityId} className="group rounded-xl border-border/40 hover:border-indigo-500/20 bg-background/30 hover:bg-background/80 transition-all duration-200 shadow-sm relative overflow-hidden flex flex-col">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${col.barColor}`} />
                        
                        <CardHeader className="p-4 pb-2 pl-5">
                          <div className="flex justify-between items-start gap-1">
                            <Badge variant="outline" className="text-[8px] font-extrabold tracking-wide uppercase bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 border-indigo-500/10 px-1.5 py-0">
                              {item.type}
                            </Badge>
                            <span className="text-[9px] text-muted-foreground font-semibold">
                              {item.deadline ? new Date(item.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Rolling"}
                            </span>
                          </div>
                          <CardTitle className="text-xs font-extrabold text-foreground line-clamp-1 leading-normal pt-1.5">
                            {item.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 pt-0 pl-5 pb-3 flex-1 space-y-3 text-[10px]">
                          <p className="text-muted-foreground font-bold line-clamp-1">{item.host}</p>
                          
                          {/* Notes Preview if available */}
                          {item.notes && (
                            <div className="bg-muted/30 border border-border/10 p-2 rounded-lg text-muted-foreground leading-normal flex gap-1.5 items-start">
                              <StickyNote className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <p className="line-clamp-2">{item.notes}</p>
                            </div>
                          )}

                          {/* Action Select Box */}
                          <div className="pt-1 flex items-center justify-between gap-2">
                            <label htmlFor={`status-select-${item.opportunityId}`} className="sr-only">Change Status</label>
                            <select
                              id={`status-select-${item.opportunityId}`}
                              value={item.status}
                              onChange={(e) => handleUpdateStatus(item.opportunityId, e.target.value as TrackerItem["status"])}
                              className="text-[9px] font-extrabold tracking-wide uppercase bg-muted border border-border/30 rounded-lg px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-900 cursor-pointer h-7 text-foreground"
                            >
                              <option value="wishlist">Wishlist</option>
                              <option value="applied">Applied</option>
                              <option value="interviewing">Interviewing</option>
                              <option value="offer">Offer</option>
                            </select>

                            <div className="flex items-center gap-1.5">
                              {/* Edit Notes button */}
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleOpenNotes(item)}
                                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/5 cursor-pointer"
                                aria-label="Edit notes"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </Button>

                              {/* Delete button */}
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteItem(item.opportunityId)}
                                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 cursor-pointer"
                                aria-label="Delete tracked program"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Dynamic Notes Editor Dialog */}
      <Dialog open={activeNotesItem !== null} onOpenChange={(open) => { if (!open) setActiveNotesItem(null); }}>
        <DialogContent className="max-w-md rounded-2xl bg-background p-6">
          <DialogHeader>
            <DialogTitle className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
              <StickyNote className="h-4.5 w-4.5 text-indigo-500" />
              Notes / Reminders
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground truncate">{activeNotesItem?.title}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">{activeNotesItem?.host}</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="notes-textarea" className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Reminders & Log Comments</label>
              <textarea
                id="notes-textarea"
                rows={4}
                value={notesContent}
                onChange={(e) => setNotesContent(e.target.value)}
                placeholder="E.g., Finished essay drafts. Letter of recommendation from Prof. Smith is pending..."
                className="w-full text-xs p-3 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-medium leading-relaxed resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end border-t border-border/20 pt-4">
            <DialogClose render={
              <Button variant="outline" className="rounded-xl text-xs h-9 font-bold">
                Cancel
              </Button>
            } />
            <Button 
              onClick={handleSaveNotes}
              className="rounded-xl text-xs h-9 font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
              Save Notes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
