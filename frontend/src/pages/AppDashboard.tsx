import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { EligibilityPanel } from "@/components/eligibility/EligibilityPanel";
import { SchemeCategoryGrid } from "@/components/schemes/SchemeCategoryGrid";
import { SchemeFilters, FilterState, CombinedFilters } from "@/components/schemes/SchemeFilters";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Search,
  BookOpen,
  HelpCircle,
  FileText,
  ArrowLeft,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AppDashboard = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // New search state

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log("Selected category:", categoryId);
  };

  const handleFiltersApply = ({filters, searchQuery}: CombinedFilters) => {
    console.log("Applied filters:", filters, "Search:", searchQuery);
    setSearchQuery(searchQuery);
  };

  return (
    <MainLayout>
      <section className="bg-primary-foreground text-foreground border-b border-border">
        <div className="container py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-foreground/10">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Home
                </Button>
              </Link>
              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  Eligify <span className="text-accent">AI</span> Assistant
                </h2>
                <p className="text-xs text-foreground/70 hidden sm:block">
                  Eligibility intelligence with verified sources.
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-foreground/70">
              <BadgeCheck className="w-4 h-4 text-accent" />
              Verified by official policy sources
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 container py-5 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="w-full justify-start bg-card/90 border border-border rounded-2xl h-auto p-2 gap-1 flex-wrap shadow-sm">
            <TabsTrigger
              value="assistant"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="explore"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-xl"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Explore Programs</span>
              <span className="sm:hidden">Explore</span>
            </TabsTrigger>
            <TabsTrigger
              value="how-it-works"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-xl"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">How It Works</span>
              <span className="sm:hidden">How</span>
            </TabsTrigger>
            <TabsTrigger
              value="sources"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-xl"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Policy Sources</span>
              <span className="sm:hidden">Sources</span>
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-xl"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQs</span>
              <span className="sm:hidden">Help</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[calc(100vh-300px)] min-h-[520px]">
              <div className="luxe-card overflow-hidden">
                <ChatPanel />
              </div>

              <div className="luxe-card overflow-hidden">
                <EligibilityPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explore" className="mt-0 space-y-6">
            <div className="luxe-card p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 min-w-0">
                <SchemeFilters 
                  onApplyFilters={handleFiltersApply} 
                  searchQuery={searchQuery}
                  onSearchChange={(q) => setSearchQuery(q)}
                />
              </div>
              {searchQuery && (
                <Badge variant="outline" className="text-xs">
matching categories
                </Badge>
              )}
            </div>

            <div className="luxe-card p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Browse by Category</h3>
                <span className="text-xs text-muted-foreground">Curated, official programs</span>
              </div>
              <SchemeCategoryGrid 
                onCategorySelect={handleCategorySelect} 
                searchQuery={searchQuery}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="luxe-card p-6">
                <h4 className="font-semibold text-foreground mb-2">Central Government Programs</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  National programs administered by Government of India ministries.
                </p>
                <p className="text-3xl font-semibold text-primary">
                  478 <span className="text-base font-normal text-muted-foreground">Programs</span>
                </p>
              </div>
              <div className="luxe-card p-6">
                <h4 className="font-semibold text-foreground mb-2">State Government Programs</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  State-specific programs. Apply filters to view your state list.
                </p>
                <p className="text-3xl font-semibold text-primary">
                  369 <span className="text-base font-normal text-muted-foreground">Programs</span>
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-0">
            <div className="luxe-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                How Eligibility Is Determined
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">Profile Capture</h4>
                  <p className="text-muted-foreground">
                    Share key details through chat or voice. We capture only what is necessary for
                    eligibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">Policy Matching</h4>
                  <p className="text-muted-foreground">
                    Eligify AI matches your profile against official criteria and policy documents.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center text-success-foreground text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">Verified Results</h4>
                  <p className="text-muted-foreground">
                    Every outcome includes the rule path and sources so you can validate decisions.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-secondary/70 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Important Note</h4>
                <p className="text-muted-foreground">
                  This is an assistive eligibility assessment. Final eligibility is confirmed by the
                  respective government authority during application review.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-0">
            <div className="luxe-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Policy Sources and Data Origin
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-secondary/50 border border-border rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">Official Government Portals</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Primary eligibility criteria sourced from official ministry websites and portals.
                  </p>
                  <ul className="text-sm text-primary space-y-1">
                    <li>MyScheme (myscheme.gov.in)</li>
                    <li>National Portal of India (india.gov.in)</li>
                    <li>Individual Ministry Portals</li>
                  </ul>
                </div>

                <div className="p-5 bg-secondary/50 border border-border rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">Gazette Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Official orders, notifications, and circulars from the Gazette of India and state
                    gazettes.
                  </p>
                </div>

                <div className="p-5 bg-secondary/50 border border-border rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">RTI Disclosed Documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Scheme guidelines and operational documents obtained through RTI disclosures.
                  </p>
                </div>

                <div className="p-5 bg-secondary/50 border border-border rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">Refresh Cadence</h4>
                  <p className="text-sm text-muted-foreground">
                    Our database is refreshed regularly to reflect new policy changes and programs.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="help" className="mt-0">
            <div className="luxe-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3 max-w-3xl">
                <details className="group bg-secondary/30 border border-border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium text-foreground flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    Is this an official government website?
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    Eligify AI is an eligibility intelligence platform that uses official government
                    policy documents. It is not an official government portal.
                  </div>
                </details>

                <details className="group bg-secondary/30 border border-border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium text-foreground flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    Is my data safe and private?
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    We do not store personal information beyond your session. Data is processed
                    in real time to generate eligibility results.
                  </div>
                </details>

                <details className="group bg-secondary/30 border border-border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium text-foreground flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    Can I apply through this portal?
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    Eligify AI helps you discover and understand programs. For applications, we direct
                    you to the official portals.
                  </div>
                </details>

                <details className="group bg-secondary/30 border border-border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium text-foreground flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    What languages are supported?
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    English plus major regional languages for both input and output. We expand
                    coverage continuously.
                  </div>
                </details>

                <details className="group bg-secondary/30 border border-border rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium text-foreground flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    How accurate is the eligibility analysis?
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    Eligify AI provides a preliminary eligibility assessment. Final determination is
                    made by the respective government authority.
                  </div>
                </details>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </MainLayout>
  );
};

export default AppDashboard;
