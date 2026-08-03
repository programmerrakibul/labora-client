import { Field, FieldLabel, FieldSelect } from "@/components/forms/form-field";
import SearchInput from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import {
  JOB_TYPE,
  WORK_LOCATION_TYPE,
  EXPERIENCE_LEVEL,
  JOB_CATEGORIES,
} from "@/constants/enums";
import { useDebounce } from "@/hooks/use-debounce";
import useJobFilters, {
  setSearch,
  setCategory,
  setJobType,
  setWorkLocationType,
  setExperienceLevel,
  resetFilters,
} from "@/stores/job-filters";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const JobFilters = () => {
  const { search, category, jobType, workLocationType, experienceLevel } =
    useJobFilters();
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);
  const lastSyncedRef = useRef(search);

  useEffect(() => {
    if (debouncedSearch !== lastSyncedRef.current) {
      lastSyncedRef.current = debouncedSearch;
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (search !== lastSyncedRef.current) {
      lastSyncedRef.current = search;
      setSearchInput(search);
    }
  }, [search]);

  return (
    <div className="space-y-4">
      <SearchInput
        placeholder="Search jobs..."
        value={searchInput}
        onChange={setSearchInput}
        onClear={() => setSearchInput("")}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Field>
          <FieldLabel>Category</FieldLabel>
          <FieldSelect value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </FieldSelect>
        </Field>

        <Field>
          <FieldLabel>Job Type</FieldLabel>
          <FieldSelect value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">All Types</option>
            {Object.values(JOB_TYPE).map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </FieldSelect>
        </Field>

        <Field>
          <FieldLabel>Location</FieldLabel>
          <FieldSelect
            value={workLocationType}
            onChange={(e) => setWorkLocationType(e.target.value)}
          >
            <option value="">All Locations</option>
            {Object.values(WORK_LOCATION_TYPE).map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </FieldSelect>
        </Field>

        <Field>
          <FieldLabel>Experience</FieldLabel>
          <FieldSelect
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            {Object.values(EXPERIENCE_LEVEL).map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </FieldSelect>
        </Field>
      </div>

      <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
        <RotateCcw className="h-3 w-3" />
        Reset Filters
      </Button>
    </div>
  );
};

export default JobFilters;
