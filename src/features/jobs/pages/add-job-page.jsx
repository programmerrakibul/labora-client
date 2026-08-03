import Container from "@/components/shared/container";
import { useNavigate } from "react-router";
import JobForm from "../components/job-form";
import { useCreateJob } from "../hooks/use-jobs";

const AddJobPage = () => {
  const navigate = useNavigate();
  const createJob = useCreateJob();

  const handleSubmit = async (payload) => {
    try {
      await createJob.mutateAsync(payload);
      navigate("/dashboard/my-jobs");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to create job");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new job listing
        </p>
      </div>

      <JobForm
        onSubmit={handleSubmit}
        isSubmitting={createJob.isPending}
        onCancel={() => navigate(-1)}
        submitLabel="Create Job"
        loadingLabel="Creating..."
      />
    </Container>
  );
};

export default AddJobPage;
