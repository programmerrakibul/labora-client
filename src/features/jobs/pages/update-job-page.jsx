import Container from "@/components/shared/container";
import { useParams, useNavigate } from "react-router";
import JobForm from "../components/job-form";
import { useJob, useUpdateJob } from "../hooks/use-jobs";

const UpdateJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: loadingJob } = useJob(id);
  const updateJob = useUpdateJob();
  const job = data?.data;

  const handleSubmit = async (payload) => {
    try {
      await updateJob.mutateAsync({ id, ...payload });
      navigate("/dashboard/my-jobs");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update job");
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

      <JobForm
        initialJob={job}
        onSubmit={handleSubmit}
        isSubmitting={updateJob.isPending}
        onCancel={() => navigate(-1)}
        submitLabel="Update Job"
        loadingLabel="Updating..."
      />
    </Container>
  );
};

export default UpdateJobPage;
