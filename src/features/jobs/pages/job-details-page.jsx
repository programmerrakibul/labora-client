import { useParams, useNavigate } from "react-router";
import { useJob } from "../hooks/use-jobs";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getEnumByValue,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
  EXPERIENCE_LEVEL,
  JOB_STATUS,
} from "@/constants/enums";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  ArrowLeft,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import useAuth from "@/stores/auth";
import { useCreateApplication } from "@/features/applications/hooks/use-applications";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const { data, isLoading } = useJob(id);
  const createApplication = useCreateApplication();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

  const job = data?.data;

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded bg-muted" />
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-48 rounded bg-muted" />
        </div>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container className="py-8">
        <p className="text-center text-muted-foreground">Job not found</p>
      </Container>
    );
  }

  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);
  const experienceLevel = getEnumByValue(EXPERIENCE_LEVEL, job.experienceLevel);
  const status = getEnumByValue(JOB_STATUS, job.status);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await createApplication.mutateAsync({
        jobId: job._id,
        resumeUrl,
        coverLetter,
        expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
      });
      setShowApplyForm(false);
      setResumeUrl("");
      setCoverLetter("");
      setExpectedSalary("");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to apply");
    }
  };

  return (
    <Container className="py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                <p className="mt-1 flex items-center gap-2 text-lg text-muted-foreground">
                  <Building2 className="h-5 w-5" />
                  {job.company}
                </p>
              </div>
              {status && (
                <Badge variant="secondary" className={status.color}>
                  {status.label}
                </Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {jobType && (
                <Badge variant="secondary" className={jobType.color}>
                  <Briefcase className="mr-1 h-3 w-3" />
                  {jobType.label}
                </Badge>
              )}
              {locationType && (
                <Badge variant="secondary" className={locationType.color}>
                  <MapPin className="mr-1 h-3 w-3" />
                  {locationType.label}
                </Badge>
              )}
              {experienceLevel && (
                <Badge variant="secondary" className={experienceLevel.color}>
                  {experienceLevel.label}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-line text-muted-foreground">
              {job.description}
            </p>
          </div>

          {job.requirements?.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Requirements</h2>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities?.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Responsibilities</h2>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {job.skills?.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Job Details</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {job.salary?.min != null && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {job.salary.currency || "BDT"} {job.salary.min.toLocaleString()}
                    {job.salary.max
                      ? ` - ${job.salary.max.toLocaleString()}`
                      : ""}
                    {job.salary.isNegotiable ? " (Negotiable)" : ""}
                  </span>
                </div>
              )}
              {job.location?.city && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {job.location.city}
                    {job.location.state ? `, ${job.location.state}` : ""}
                    {job.location.country ? `, ${job.location.country}` : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                </span>
              </div>
              {job.postedBy && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Posted by {job.postedBy.name}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {user?.role === "JOB_SEEKER" && !showApplyForm && (
            <Button className="w-full" onClick={() => setShowApplyForm(true)}>
              Apply Now
            </Button>
          )}

          {showApplyForm && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Apply for this Job</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Resume URL *</label>
                    <input
                      type="url"
                      required
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      placeholder="https://your-resume.pdf"
                      className="mt-1 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cover Letter</label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={3}
                      className="mt-1 flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Expected Salary ({job.salary?.currency || "BDT"})
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      className="mt-1 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={createApplication.isPending}>
                      {createApplication.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplyForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default JobDetailsPage;
