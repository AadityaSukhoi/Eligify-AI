import { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const states = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const ministries = [
  "All Ministries",
  "Ministry of Education",
  "Ministry of Health & Family Welfare",
  "Ministry of Agriculture & Farmers Welfare",
  "Ministry of Rural Development",
  "Ministry of Women & Child Development",
  "Ministry of Social Justice & Empowerment",
  "Ministry of Labour & Employment",
  "Ministry of Housing & Urban Affairs",
];

const incomeRanges = [
  { value: "all", label: "All Income Levels" },
  { value: "bpl", label: "Below Poverty Line (BPL)" },
  { value: "0-1", label: "Up to ₹1 Lakh" },
  { value: "1-2.5", label: "₹1 - 2.5 Lakhs" },
  { value: "2.5-5", label: "₹2.5 - 5 Lakhs" },
  { value: "5-8", label: "₹5 - 8 Lakhs" },
  { value: "8+", label: "Above ₹8 Lakhs" },
];

const socialCategories = [
  "All Categories", "General", "SC", "ST", "OBC", "EWS", "Minority",
];

export interface CombinedFilters {
  filters: FilterState;
  searchQuery: string;
}

export interface FilterState {
  state: string;
  ministry: string;
  ageMin: string;
  ageMax: string;
  income: string;
  category: string;
  gender: string;
  disability: string;
}

interface SchemeFiltersProps {
  onApplyFilters: (data: CombinedFilters) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function SchemeFilters({ onApplyFilters, searchQuery: externalSearchQuery = '', onSearchChange }: SchemeFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    state: "",
    ministry: "",
    ageMin: "",
    ageMax: "",
    income: "",
    category: "",
    gender: "",
    disability: "",
  });
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      state: "",
      ministry: "",
      ageMin: "",
      ageMax: "",
      income: "",
      category: "",
      gender: "",
      disability: "",
    });
  };

  const handleApply = () => {
    onApplyFilters({filters, searchQuery});
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange?.(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, onSearchChange]);

  return (
    <div className="relative">
      <div className="bg-card border border-border rounded-lg">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3 py-2 text-left"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-foreground text-sm">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
        </button>
      </div>

      {/* Filter content - Dropdown below */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg p-3 animate-fade-in shadow-lg z-50" style={{ width: '100%', minWidth: '400px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* State */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">State / UT</Label>
              <Select value={filters.state} onValueChange={(v) => updateFilter("state", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ministry */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Ministry</Label>
              <Select value={filters.ministry} onValueChange={(v) => updateFilter("ministry", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Ministry" />
                </SelectTrigger>
                <SelectContent>
                  {ministries.map((ministry) => (
                    <SelectItem key={ministry} value={ministry.toLowerCase().replace(/\s+/g, "-")}>
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age Range */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Age</Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={(e) => updateFilter("ageMin", e.target.value)}
                  className="h-8 text-sm"
                  min={0}
                  max={120}
                />
                <span className="text-muted-foreground text-xs">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={(e) => updateFilter("ageMax", e.target.value)}
                  className="h-8 text-sm"
                  min={0}
                  max={120}
                />
              </div>
            </div>

            {/* Income */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Income</Label>
              <Select value={filters.income} onValueChange={(v) => updateFilter("income", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Income" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Social Category */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Select value={filters.category} onValueChange={(v) => updateFilter("category", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {socialCategories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Gender</Label>
              <Select value={filters.gender} onValueChange={(v) => updateFilter("gender", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Disability */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Disability</Label>
              <Select value={filters.disability} onValueChange={(v) => updateFilter("disability", v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground h-8 text-xs px-2">
              <X className="w-3 h-3 mr-0.5" />
              Clear
            </Button>
            <Button size="sm" onClick={handleApply} className="h-8 text-xs px-3 bg-accent text-background hover:bg-accent/90">
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}