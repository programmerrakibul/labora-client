import { Badge } from "@/components/ui/badge";
import { getEnumByValue, JOB_STATUS } from "@/constants/enum-configs";
import { Building2 } from "lucide-react";
import JobBadges from "./job-badges";

const JobDetailsHeader = ({ job }) => {
  const status = getEnumByValue(JOB_STATUS, job.status);

  return (
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
      <JobBadges job={job} className="mt-4" />
    </div>
  );
};

export default JobDetailsHeader;
