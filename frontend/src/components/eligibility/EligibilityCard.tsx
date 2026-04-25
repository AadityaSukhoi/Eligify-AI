import { ChevronDown, ChevronUp, ExternalLink, FileText, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type EligibilityStatus = "eligible" | "possibly-eligible" | "not-eligible";

interface Source {
  title: string;
  url: string;
  type: "policy" | "guideline" | "notification";
}

interface EligibilityCardProps {
  schemeName: string;
  ministry: string;
  status: EligibilityStatus;
  summary: string;
  reasoning: string[];
  sources: Source[];
  benefits?: string;
}

const statusConfig = {
  eligible: {
    label: "Eligible",
    icon: CheckCircle2,
    className: "status-eligible",
    borderClass: "border-l-eligible",
  },
  "possibly-eligible": {
    label: "Possibly Eligible",
    icon: AlertCircle,
    className: "status-possibly",
    borderClass: "border-l-possibly-eligible",
  },
  "not-eligible": {
    label: "Not Eligible",
    icon: XCircle,
    className: "status-not-eligible",
    borderClass: "border-l-not-eligible",
  },
};

export function EligibilityCard({
  schemeName,
  ministry,
  status,
  summary,
  reasoning,
  sources,
  benefits,
}: EligibilityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={`bg-card rounded-lg border border-border border-l-4 ${config.borderClass} shadow-sm animate-slide-in-right`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-tight">{schemeName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{ministry}</p>
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium shrink-0 ${config.className}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {config.label}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-foreground/90 mt-3">{summary}</p>

        {/* Benefits preview */}
        {benefits && (
          <div className="mt-3 p-2.5 bg-secondary/50 rounded text-sm">
            <span className="font-medium text-foreground">Benefits: </span>
            <span className="text-foreground/80">{benefits}</span>
          </div>
        )}

        {/* Expand button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1 text-muted-foreground" />
              Hide reasoning & sources
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1 text-muted-foreground" />
              View reasoning & sources
            </>
          )}
        </Button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 animate-fade-in">
          {/* Reasoning */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Eligibility Reasoning
            </h4>
            <ul className="space-y-2">
              {reasoning.map((rule, idx) => (
                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              Policy Sources
            </h4>
            <ul className="space-y-1.5">
              {sources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link text-sm inline-flex items-center gap-1"
                  >
                    {source.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({source.type})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}