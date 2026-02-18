import { useState } from "react";
import { Volume2, Info } from "lucide-react";
import { EligibilityCard, EligibilityStatus } from "./EligibilityCard";
import { Button } from "@/components/ui/button";

interface SchemeResult {
  id: string;
  schemeName: string;
  ministry: string;
  status: EligibilityStatus;
  summary: string;
  reasoning: string[];
  sources: { title: string; url: string; type: "policy" | "guideline" | "notification" }[];
  benefits?: string;
}

const sampleResults: SchemeResult[] = [
  {
    id: "1",
    schemeName: "PM Kisan Samman Nidhi (PM-KISAN)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    status: "eligible",
    summary:
      "You qualify for direct income support of ₹6,000 per year based on your agricultural landholding and income criteria.",
    reasoning: [
      "Applicant owns less than 2 hectares of cultivable land (verified: 1.5 hectares)",
      "Family income is below ₹2 lakh per annum (verified: ₹1.8 lakh)",
      "Not holding any constitutional post or retired government official",
      "Valid Aadhaar and bank account linkage present",
    ],
    sources: [
      { title: "PM-KISAN Official Guidelines 2023", url: "#", type: "guideline" },
      { title: "Notification No. 1-1/2019-Credit-I", url: "#", type: "notification" },
    ],
    benefits: "₹6,000 per year in 3 equal installments of ₹2,000 each",
  },
  {
    id: "2",
    schemeName: "Ayushman Bharat - PMJAY",
    ministry: "Ministry of Health & Family Welfare",
    status: "eligible",
    summary:
      "You are eligible for health coverage of up to ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    reasoning: [
      "Family falls under identified SECC 2011 deprivation criteria",
      "Annual household income within PMJAY eligibility threshold",
      "No existing ESI/CGHS coverage detected",
    ],
    sources: [
      { title: "PMJAY Eligibility Criteria 2023", url: "#", type: "policy" },
      { title: "NHA Official Circular", url: "#", type: "notification" },
    ],
    benefits: "₹5 lakh health coverage per family per year",
  },
  {
    id: "3",
    schemeName: "National Scholarship Portal - Post-Matric",
    ministry: "Ministry of Social Justice & Empowerment",
    status: "possibly-eligible",
    summary:
      "Based on your category and income, you may qualify for post-matric scholarship. Additional verification of enrollment status required.",
    reasoning: [
      "Belongs to eligible social category (OBC)",
      "Family income below ₹2.5 lakh threshold",
      "Pending: Current enrollment certificate verification",
      "Pending: Previous year marks sheet submission",
    ],
    sources: [
      { title: "Post-Matric Scholarship Guidelines", url: "#", type: "guideline" },
    ],
    benefits: "Full tuition fee reimbursement + monthly maintenance allowance",
  },
  {
    id: "4",
    schemeName: "PM Awas Yojana - Gramin",
    ministry: "Ministry of Rural Development",
    status: "not-eligible",
    summary:
      "Current criteria indicate ineligibility due to existing pucca house ownership.",
    reasoning: [
      "Applicant already owns a pucca house (disqualifying criterion)",
      "Not categorized as houseless or living in kutcha/dilapidated house",
      "Note: May become eligible if housing situation changes",
    ],
    sources: [
      { title: "PMAY-G Operational Guidelines 2022", url: "#", type: "policy" },
    ],
  },
];

export function EligibilityPanel() {
  const [results] = useState<SchemeResult[]>(sampleResults);

  const eligibleCount = results.filter((r) => r.status === "eligible").length;
  const possiblyCount = results.filter((r) => r.status === "possibly-eligible").length;
  const notEligibleCount = results.filter((r) => r.status === "not-eligible").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Eligibility Analysis</h2>
          <Button variant="outline" size="sm">
            <Volume2 className="w-4 h-4 mr-1" />
            Read Aloud
          </Button>
        </div>

        {/* Summary stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-eligible" />
            <span className="text-foreground font-medium">{eligibleCount}</span>
            <span className="text-muted-foreground">Eligible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-possibly-eligible" />
            <span className="text-foreground font-medium">{possiblyCount}</span>
            <span className="text-muted-foreground">Possibly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-not-eligible" />
            <span className="text-foreground font-medium">{notEligibleCount}</span>
            <span className="text-muted-foreground">Not Eligible</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Info className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-foreground mb-1">No Analysis Yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start a conversation with the AI assistant to discover schemes you may be eligible for.
            </p>
          </div>
        ) : (
          results.map((result) => (
            <EligibilityCard
              key={result.id}
              schemeName={result.schemeName}
              ministry={result.ministry}
              status={result.status}
              summary={result.summary}
              reasoning={result.reasoning}
              sources={result.sources}
              benefits={result.benefits}
            />
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-3 bg-secondary/50 border-t border-border">
        <p className="text-2xs text-muted-foreground text-center">
          <strong>Disclaimer:</strong> This analysis is AI-generated based on available policy documents. 
          Final eligibility is determined by the respective ministry/department. Always verify through official channels.
        </p>
      </div>
    </div>
  );
}