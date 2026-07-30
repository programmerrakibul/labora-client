import { useParams, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useJob, useUpdateJob } from "../hooks/use-jobs";
import { jobFormOptions } from "../utils/job-options";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldTextarea,
  FieldSelect,
  FieldError,
} from "@/components/forms/form-field";
import Container from "@/components/shared/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

const jobSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  company: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  jobType: z.string().optional(),
  workLocationType: z.string().optional(),
  experienceLevel: z.string().optional(),
  category: z.string().optional(),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  salaryCurrency: z.string().optional(),
  isNegotiable: z.boolean().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  status: z.string().optional(),
});

const UpdateJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: loadingJob } = useJob(id);
  const updateJob = useUpdateJob();
  const job = data?.data;

  const [skills, setSkills] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [reqInput, setReqInput] = useState("");
  const [respInput, setRespInput] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        company: job.company,
        description: job.description,
        jobType: job.jobType,
        workLocationType: job.workLocationType,
        experienceLevel: job.experienceLevel,
        category: job.category,
        salaryMin: job.salary?.min,
        salaryMax: job.salary?.max,
        salaryCurrency: job.salary?.currency || "BDT",
        isNegotiable: job.salary?.isNegotiable || false,
        city: job.location?.city,
        state: job.location?.state,
        country: job.location?.country,
        status: job.status,
      });
      setSkills(job.skills || []);
      setRequirements(job.requirements || []);
      setResponsibilities(job.responsibilities || []);
    }
  }, [job, reset]);

  const onSubmit = async (values) => {
    const payload = {
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
    };

    try {
      await updateJob.mutateAsync({ id, ...payload });
      navigate("/dashboard/my-jobs");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update job");
    }
  };

  const addToList = (value, list, setter, inputSetter) => {
    if (value.trim()) {
      setter([...list, value.trim()]);
      inputSetter("");
    }
  };

  if (loadingJob) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded bg-muted" />
          <div className="h-96 rounded bg-muted" />
        </div>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container className="py-8">
        <p className="text-muted-foreground">Job not found</p>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Update Job</h1>
        <p className="text-muted-foreground">Edit the job listing details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <FieldLabel>Job Title</FieldLabel>
                    <FieldInput {...field} error={fieldState.error} />
                    <FieldError error={fieldState.error} />
                  </Field>
                )}
              />
              <Controller
                name="company"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Company</FieldLabel>
                    <FieldInput {...field} error={fieldState.error} />
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
                  <FieldLabel>Description</FieldLabel>
                  <FieldTextarea rows={5} {...field} error={fieldState.error} />
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
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Job Type</FieldLabel>
                    <FieldSelect {...field}>
                      <option value="">Select...</option>
                      {jobFormOptions.jobTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </FieldSelect>
                  </Field>
                )}
              />
              <Controller
                name="workLocationType"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Location Type</FieldLabel>
                    <FieldSelect {...field}>
                      <option value="">Select...</option>
                      {jobFormOptions.locationTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </FieldSelect>
                  </Field>
                )}
              />
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Experience Level</FieldLabel>
                    <FieldSelect {...field}>
                      <option value="">Select...</option>
                      {jobFormOptions.experienceLevels.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </FieldSelect>
                  </Field>
                )}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <FieldSelect {...field}>
                      <option value="">Select...</option>
                      {jobFormOptions.categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </FieldSelect>
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
                        <option key={s.value} value={s.value}>{s.label}</option>
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
                    <FieldInput type="number" min="0" {...field} value={field.value ?? ""} error={fieldState.error} />
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
                    <FieldInput type="number" min="0" {...field} value={field.value ?? ""} error={fieldState.error} />
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
                      <option value="BDT">BDT</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
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
                render={({ field }) => (
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    <FieldInput {...field} />
                  </Field>
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>State</FieldLabel>
                    <FieldInput {...field} />
                  </Field>
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Country</FieldLabel>
                    <FieldInput {...field} />
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
                      addToList(skillInput, skills, setSkills, setSkillInput);
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
                <Button type="button" size="sm" onClick={() => addToList(skillInput, skills, setSkills, setSkillInput)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {skills.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                      {s}
                      <button type="button" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}>
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
                      addToList(reqInput, requirements, setRequirements, setReqInput);
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
                <Button type="button" size="sm" onClick={() => addToList(reqInput, requirements, setRequirements, setReqInput)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {requirements.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-center justify-between">
                      {r}
                      <button type="button" onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))} className="text-destructive">
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
                      addToList(respInput, responsibilities, setResponsibilities, setRespInput);
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
                <Button type="button" size="sm" onClick={() => addToList(respInput, responsibilities, setResponsibilities, setRespInput)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {responsibilities.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-center justify-between">
                      {r}
                      <button type="button" onClick={() => setResponsibilities(responsibilities.filter((_, idx) => idx !== i))} className="text-destructive">
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
                Updating...
              </>
            ) : (
              "Update Job"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateJobPage;
