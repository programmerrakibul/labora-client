import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jobFormOptions } from "../utils/job-options";
import { jobSchema } from "../validation/job";
import JobFormCard from "./job-form-card";

const buildDefaultValues = (job = {}) => {
  return {
    title: job.title ?? "",
    description: job.description ?? "",
    jobType: job.jobType ?? "",
    workLocationType: job.workLocationType ?? "",
    experienceLevel: job.experienceLevel ?? "",
    category: job.category ?? "",
    salaryMin: job.salary?.min ?? "",
    salaryMax: job.salary?.max ?? "",
    salaryCurrency: job.salary?.currency ?? "BDT",
    isNegotiable: job.salary?.isNegotiable ?? false,
    city: job.location?.city ?? "",
    state: job.location?.state ?? "",
    country: job.location?.country ?? "",
    status: job.status ?? "ACTIVE",
  };
};

const JobForm = ({
  initialJob,
  onSubmit,
  isSubmitting,
  onCancel,
  submitLabel = "Save",
  loadingLabel = "Saving...",
}) => {
  const [skills, setSkills] = useState(initialJob?.skills ?? []);
  const [requirements, setRequirements] = useState(
    initialJob?.requirements ?? [],
  );
  const [responsibilities, setResponsibilities] = useState(
    initialJob?.responsibilities ?? [],
  );
  const [skillInput, setSkillInput] = useState("");
  const [reqInput, setReqInput] = useState("");
  const [respInput, setRespInput] = useState("");

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: buildDefaultValues(initialJob),
  });

  useEffect(() => {
    reset(buildDefaultValues(initialJob));
    setSkills(initialJob?.skills ?? []);
    setRequirements(initialJob?.requirements ?? []);
    setResponsibilities(initialJob?.responsibilities ?? []);
  }, [initialJob, reset]);

  const handleFormSubmit = (values) => {
    onSubmit({
      title: values.title,
      description: values.description,
      jobType: values.jobType,
      workLocationType: values.workLocationType,
      experienceLevel: values.experienceLevel,
      category: values.category,
      skills,
      requirements,
      responsibilities,
      status: values.status,
      salary: {
        min: values.salaryMin,
        max: values.salaryMax,
        currency: values.salaryCurrency,
        isNegotiable: values.isNegotiable,
      },
      location: {
        city: values.city,
        state: values.state,
        country: values.country,
      },
    });
  };

  const addListItem = (value, list, setter, inputSetter) => {
    if (value.trim()) {
      setter([...list, value.trim()]);
      inputSetter("");
    }
  };

  const removeListItem = (index, list, setter) => {
    setter(list.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <JobFormCard title="Basic Information">
        <FormField
          type="text"
          name="title"
          control={control}
          label="Job Title"
          placeholder={"e.g. Senior React Developer"}
          required
        />

        <FormField
          type="textarea"
          name="description"
          control={control}
          label="Description"
          placeholder={"Describe the role..."}
          rows={5}
          required
        />
      </JobFormCard>

      <JobFormCard title="Job Details">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              name="jobType"
              control={control}
              label="Job Type"
              placeholder="Select..."
              type="select"
              options={jobFormOptions.jobTypes}
              required
            />

            <FormField
              name="workLocationType"
              control={control}
              label="Location Type"
              placeholder="Select..."
              type="select"
              options={jobFormOptions.locationTypes}
              required
            />

            <FormField
              name="experienceLevel"
              control={control}
              label="Experience Level"
              placeholder="Select..."
              type="select"
              options={jobFormOptions.experienceLevels}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name="category"
              control={control}
              label="Category"
              placeholder="Select..."
              type="select"
              options={jobFormOptions.categories}
              required
            />

            <FormField
              name="status"
              control={control}
              label="Status"
              placeholder="Select..."
              type="select"
              options={jobFormOptions.statuses}
              required
            />
          </div>
        </div>
      </JobFormCard>

      <JobFormCard title="Salary Details">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              name="salaryMin"
              control={control}
              label="Min Salary"
              placeholder={"Min Salary"}
              renderComponent={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              )}
            />

            <FormField
              name="salaryMax"
              control={control}
              label="Max Salary"
              placeholder={"Max Salary"}
              renderComponent={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              )}
            />

            <FormField
              name="salaryCurrency"
              control={control}
              label="Currency"
              placeholder="Select..."
              type="select"
              options={["BDT", "USD", "EUR", "GBP"].map((currency) => ({
                value: currency,
                label: currency,
              }))}
              required
            />
          </div>

          <FormField
            type="checkbox"
            name="isNegotiable"
            control={control}
            label={"Salary is negotiable"}
            orientation="horizontal"
          />
        </div>
      </JobFormCard>

      <JobFormCard title={"Location"}>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            name="city"
            control={control}
            label={"City"}
            placeholder={"e.g. Dhaka"}
          />

          <FormField
            name="state"
            control={control}
            label={"State"}
            placeholder={"e.g. Dhaka Division"}
          />

          <FormField
            name="country"
            control={control}
            label={"Country"}
            placeholder={"e.g. Bangladesh"}
          />
        </div>
      </JobFormCard>

      <JobFormCard title={"Skills & Requirements"}>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="skill">Skills</FieldLabel>
            <div className="flex items-center gap-2">
              <Input
                id="skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addListItem(skillInput, skills, setSkills, setSkillInput);
                  }
                }}
                placeholder="Type and press Enter"
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() =>
                  addListItem(skillInput, skills, setSkills, setSkillInput)
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <Badge key={i} variant="outline" className="gap-2">
                    <span>{s}</span>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="destructive"
                      onClick={() => removeListItem(i, skills, setSkills)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </Field>

          <div>
            <FieldLabel htmlFor="requirement">Requirements</FieldLabel>
            <div className="mt-1 flex items-center gap-2">
              <Input
                id="requirement"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addListItem(
                      reqInput,
                      requirements,
                      setRequirements,
                      setReqInput,
                    );
                  }
                }}
                placeholder="Type and press Enter"
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() =>
                  addListItem(
                    reqInput,
                    requirements,
                    setRequirements,
                    setReqInput,
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {requirements.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {requirements.map((r, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{r}</span>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="destructive"
                      onClick={() =>
                        removeListItem(i, requirements, setRequirements)
                      }
                      className="text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <FieldLabel>Responsibilities</FieldLabel>
            <div className="mt-1 flex items-center gap-2">
              <Input
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addListItem(
                      respInput,
                      responsibilities,
                      setResponsibilities,
                      setRespInput,
                    );
                  }
                }}
                placeholder="Type and press Enter"
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() =>
                  addListItem(
                    respInput,
                    responsibilities,
                    setResponsibilities,
                    setRespInput,
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {responsibilities.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {responsibilities.map((r, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{r}</span>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="destructive"
                      onClick={() =>
                        removeListItem(i, responsibilities, setResponsibilities)
                      }
                      className="text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </JobFormCard>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default JobForm;
