import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/stores/auth";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import JobApplyForm from "../components/job-apply-form";
import JobDetailsHeader from "../components/job-details-header";
import JobDetailsInfoCard from "../components/job-details-info-card";
import JobDetailsSections from "../components/job-details-sections";
import JobDetailsSkeleton from "../components/job-details-skeleton";
import { useJob } from "../hooks/use-jobs";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const { data, isLoading } = useJob(id);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const job = data?.data;

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (!job) {
    return (
      <Container className="py-8">
        <NotFound message="Job not found" />
      </Container>
    );
  }

  const isYourJob = user?.email === job.postedBy?.email;

  return (
    <Container className="py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <JobDetailsHeader job={job} />
          <Separator />
          <JobDetailsSections job={job} />
        </div>

        <div className="space-y-4">
          <JobDetailsInfoCard
            job={job}
            postedByName={isYourJob ? "You" : job.postedBy?.name}
          />
          {!isYourJob && !showApplyForm && (
            <Button
              className="w-full"
              onClick={() => {
                if (!user) {
                  toast.info("Please login to apply for this job");
                  return;
                }

                setShowApplyForm(true);
              }}
            >
              Apply Now
            </Button>
          )}
          {showApplyForm && (
            <JobApplyForm job={job} onCancel={() => setShowApplyForm(false)} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default JobDetailsPage;
