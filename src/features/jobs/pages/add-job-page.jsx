import Container from "@/components/shared/container";
import Seo from "@/components/shared/seo";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/error";
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
      const msg = getErrorMessage(err);
      toast.error({
        title: "Failed to create job",
        description: msg || "Failed to create job",
      });
    }
  };

  return (
    <Container className="py-8">
      <Seo
        title="Post a New Job"
        noindex
        description="Post a new freelance job listing on Labora and connect with qualified talent."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new job listing
        </p>
      </div>

      <JobForm
        onSubmit={handleSubmit}
        isSubmitting={createJob.isPending}
        submitLabel="Create Job"
        loadingLabel="Creating..."
      />
    </Container>
  );
};

export default AddJobPage;
