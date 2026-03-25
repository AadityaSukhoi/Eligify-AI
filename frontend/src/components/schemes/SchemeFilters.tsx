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

interface FilterState {
  state: string;
  ministry: string;
  ageMin: string;
  ageMax: string;
  income: string;
  category: string;
  gender: string;
  disability: string;
}

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
    <div className="bg-card border border-border rounded-lg">
      {/* Header with Search beside */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-border">
        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 sm:flex-none flex items-center gap-3"
        >
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-foreground">Advanced Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount} active
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground ml-auto sm:ml-2" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground ml-auto sm:ml-2" />
          )}
        </button>
        
        {/* Search Input beside */}
        <div className="flex-1 min-w-0 sm:w-64">
            <Input
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
          />
        </div>
      </div>

      {/* Filter content */}
      {isExpanded && (
        <div className="border-t border-border p-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* State */}
            <div className="space-y-1.5">
              <Label className="text-xs">State / UT</Label>
              <Select value={filters.state} onValueChange={(v) => updateFilter("state", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select state" />
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
            <div className="space-y-1.5">
              <Label className="text-xs">Ministry</Label>
              <Select value={filters.ministry} onValueChange={(v) => updateFilter("ministry", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select ministry" />
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
            <div className="space-y-1.5">
              <Label className="text-xs">Age Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={(e) => updateFilter("ageMin", e.target.value)}
                  className="h-9 text-foreground"
                  min={0}
                  max={120}
                />
                <span className="text-muted-foreground">–</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={(e) => updateFilter("ageMax", e.target.value)}
                  className="h-9 text-foreground"
                  min={0}
                  max={120}
                />
              </div>
            </div>

            {/* Income */}
            <div className="space-y-1.5">
              <Label className="text-xs">Annual Income</Label>
              <Select value={filters.income} onValueChange={(v) => updateFilter("income", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select income range" />
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
            <div className="space-y-1.5">
              <Label className="text-xs">Social Category</Label>
              <Select value={filters.category} onValueChange={(v) => updateFilter("category", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select category" />
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
            <div className="space-y-1.5">
              <Label className="text-xs">Gender</Label>
              <Select value={filters.gender} onValueChange={(v) => updateFilter("gender", v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select gender" />
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
            <div className="space-y-1.5">
              <Label className="text-xs">Person with Disability</Label>
              <Select value={filters.disability} onValueChange={(v) => updateFilter("disability", v)}>
                <SelectTrigger className="h-9">
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
          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}