import InfoRow from "@/components/shared/info-row";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, Clock, DollarSign, MapPin } from "lucide-react";
import { formatJobLocation, formatPostedAt, formatSalary } from "../utils/job";

const JobDetailsInfoCard = ({ job, postedByName }) => {
  const jobLocation = formatJobLocation(job.location);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Job Details</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {job.salary?.min != null && (
          <InfoRow icon={DollarSign}>
            {formatSalary(job.salary)}
            {job.salary?.isNegotiable ? " (Negotiable)" : ""}
          </InfoRow>
        )}
        {jobLocation && <InfoRow icon={MapPin}>{jobLocation}</InfoRow>}
        <InfoRow icon={Clock}>Posted {formatPostedAt(job.createdAt)}</InfoRow>
        {job.postedBy && (
          <InfoRow icon={Building2}>Posted by {postedByName}</InfoRow>
        )}
      </CardContent>
    </Card>
  );
};

export default JobDetailsInfoCard;
