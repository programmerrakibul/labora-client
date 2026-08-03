import {
  Field,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
  FieldTextarea,
} from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { jobFormOptions } from "../utils/job-options";
import { jobSchema } from "../validation/job";

const buildDefaultValues = (job) => {
  if (!job) {
    return {
      status: "ACTIVE",
      salaryCurrency: "BDT",
      isNegotiable: false,
    };
  }
  return {
    title: job.title ?? "",
    company: job.company ?? "",
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
    defaultValues: () => buildDefaultValues(initialJob),
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
      company: values.company,
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
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Basic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Job Title</FieldLabel>
                  <FieldInput
                    placeholder="e.g. Senior React Developer"
                    {...field}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="company"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Company</FieldLabel>
                  <FieldInput
                    placeholder="e.g. Tech Corp"
                    {...field}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Description</FieldLabel>
                <FieldTextarea
                  rows={5}
                  placeholder="Describe the role..."
                  {...field}
                  error={fieldState.error}
                />
                <FieldError error={fieldState.error} />
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Job Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="jobType"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Job Type</FieldLabel>
                  <FieldSelect {...field} error={fieldState.error}>
                    <option value="">Select...</option>
                    {jobFormOptions.jobTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </FieldSelect>
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="workLocationType"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Location Type</FieldLabel>
                  <FieldSelect {...field} error={fieldState.error}>
                    <option value="">Select...</option>
                    {jobFormOptions.locationTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </FieldSelect>
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Experience Level</FieldLabel>
                  <FieldSelect {...field} error={fieldState.error}>
                    <option value="">Select...</option>
                    {jobFormOptions.experienceLevels.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </FieldSelect>
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Category</FieldLabel>
                  <FieldSelect {...field} error={fieldState.error}>
                    <option value="">Select...</option>
                    {jobFormOptions.categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </FieldSelect>
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <FieldSelect {...field}>
                    {jobFormOptions.statuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </FieldSelect>
                </Field>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Salary</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="salaryMin"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Min Salary</FieldLabel>
                  <FieldInput
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    value={field.value ?? ""}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="salaryMax"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Max Salary</FieldLabel>
                  <FieldInput
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    value={field.value ?? ""}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="salaryCurrency"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <FieldSelect {...field}>
                    {["BDT", "USD", "EUR", "GBP"].map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </FieldSelect>
                </Field>
              )}
            />
          </div>
          <Controller
            name="isNegotiable"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  className="rounded"
                />
                Salary is negotiable
              </label>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Location</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <FieldInput
                    placeholder="e.g. Dhaka"
                    {...field}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <FieldInput
                    placeholder="e.g. Dhaka Division"
                    {...field}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <FieldInput
                    placeholder="e.g. Bangladesh"
                    {...field}
                    error={fieldState.error}
                  />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Skills & Requirements</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Skills</label>
            <div className="mt-1 flex gap-2">
              <input
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
                size="sm"
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
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeListItem(i, skills, setSkills)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Requirements</label>
            <div className="mt-1 flex gap-2">
              <input
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
                size="sm"
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
                    {r}
                    <button
                      type="button"
                      onClick={() =>
                        removeListItem(i, requirements, setRequirements)
                      }
                      className="text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Responsibilities</label>
            <div className="mt-1 flex gap-2">
              <input
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
                size="sm"
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
                    {r}
                    <button
                      type="button"
                      onClick={() =>
                        removeListItem(i, responsibilities, setResponsibilities)
                      }
                      className="text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
