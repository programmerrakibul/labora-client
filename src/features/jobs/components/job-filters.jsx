import useJobFilters, {
  setSearch,
  setCategory,
  setJobType,
  setWorkLocationType,
  setExperienceLevel,
  resetFilters,
} from "@/stores/job-filters";
import {
  JOB_TYPE,
  WORK_LOCATION_TYPE,
  EXPERIENCE_LEVEL,
  JOB_CATEGORIES,
} from "@/constants/enums";
import { Field, FieldLabel, FieldSelect } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const JobFilters = () => {
  const { search, category, jobType, workLocationType, experienceLevel } =
    useJobFilters();

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
