import { Badge } from "@/components/ui/badge";
import {
  EXPERIENCE_LEVEL,
  getEnumByValue,
  JOB_STATUS,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enum-configs";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin } from "lucide-react";

const JobBadges = ({ job, showStatus = false, className = "" }) => {
  const status = getEnumByValue(JOB_STATUS, job?.status);
  const jobType = getEnumByValue(JOB_TYPE, job?.jobType);
  const locationType = getEnumByValue(
    WORK_LOCATION_TYPE,
    job?.workLocationType,
  );
  const experienceLevel = getEnumByValue(
    EXPERIENCE_LEVEL,
    job?.experienceLevel,
  );

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {showStatus && status && (
        <Badge variant="secondary" className={status.color}>
          {status.label}
        </Badge>
      )}
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
  );
};

export default JobBadges;
