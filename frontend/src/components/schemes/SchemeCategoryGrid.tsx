import { 
  GraduationCap, 
  Heart, 
  Users, 
  Tractor, 
  Briefcase, 
  Home, 
  Baby, 
  Shield,
  Coins,
  Building2,
  Accessibility,
  Leaf,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface SchemeCategory {
  id: string;
  name: string;
  nameHi: string;
  icon: React.ElementType;
  count: number;
  description: string;
}

const categories: SchemeCategory[] = [
  {
    id: "education",
    name: "Education",
    nameHi: "शिक्षा",
    icon: GraduationCap,
    count: 127,
    description: "Scholarships, skill development, higher education support",
  },
  {
    id: "health",
    name: "Health",
    nameHi: "स्वास्थ्य",
    icon: Heart,
    count: 89,
    description: "Medical coverage, hospital schemes, disease support",
  },
  {
    id: "women",
    name: "Women & Child",
    nameHi: "महिला एवं बाल",
    icon: Users,
    count: 64,
    description: "Maternity benefits, safety schemes, child welfare",
  },
  {
    id: "farmers",
    name: "Agriculture",
    nameHi: "कृषि",
    icon: Tractor,
    count: 98,
    description: "Farmer income support, crop insurance, subsidies",
  },
  {
    id: "employment",
    name: "Employment",
    nameHi: "रोज़गार",
    icon: Briefcase,
    count: 56,
    description: "Job schemes, self-employment, MGNREGA",
  },
  {
    id: "housing",
    name: "Housing",
    nameHi: "आवास",
    icon: Home,
    count: 34,
    description: "Affordable housing, rural housing, urban renewal",
  },
  {
    id: "senior",
    name: "Senior Citizens",
    nameHi: "वरिष्ठ नागरिक",
    icon: Shield,
    count: 28,
    description: "Pension schemes, healthcare for elderly",
  },
  {
    id: "disability",
    name: "Disability",
    nameHi: "दिव्यांगजन",
    icon: Accessibility,
    count: 42,
    description: "Assistive devices, education, employment support",
  },
  {
    id: "financial",
    name: "Financial Aid",
    nameHi: "वित्तीय सहायता",
    icon: Coins,
    count: 76,
    description: "Direct benefit transfers, subsidies, loans",
  },
  {
    id: "msme",
    name: "Business & MSME",
    nameHi: "व्यापार एवं MSME",
    icon: Building2,
    count: 45,
    description: "Startup support, loans, business development",
  },
  {
    id: "child",
    name: "Child Welfare",
    nameHi: "बाल कल्याण",
    icon: Baby,
    count: 38,
    description: "Nutrition, education, child protection",
  },
  {
    id: "environment",
    name: "Environment",
    nameHi: "पर्यावरण",
    icon: Leaf,
    count: 22,
    description: "Clean energy, conservation, green initiatives",
  },
];

interface SchemeCategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  searchQuery?: string;
}

export function SchemeCategoryGrid({ onCategorySelect, searchQuery = '' }: SchemeCategoryGridProps) {
  const query = searchQuery.toLowerCase().trim();
  const isExactMatch = (category: SchemeCategory) => category.name.toLowerCase() === query;
  const isRelatedMatch = (category: SchemeCategory) => 
    category.name.toLowerCase().includes(query) || 
    category.description.toLowerCase().includes(query);

  const filteredCategories = categories.filter(category => {
    if (query === '') return true;
    if (isExactMatch(category)) return true;
    return isRelatedMatch(category);
  });

  const noResults = query !== '' && filteredCategories.length === 0;

  return (
    <div className="space-y-4">
  {noResults ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No schemes found</h3>
          <p className="text-muted-foreground mb-4">Try a different search term or check spelling.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="scheme-category-card bg-card border border-border rounded-lg p-4 text-left hover:border-primary/30 hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {category.count} schemes
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{category.nameHi}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
