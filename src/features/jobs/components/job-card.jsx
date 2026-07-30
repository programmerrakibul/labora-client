import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { getEnumByValue, JOB_TYPE, WORK_LOCATION_TYPE, EXPERIENCE_LEVEL } from "@/constants/enums";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job }) => {
  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);
  const experienceLevel = getEnumByValue(EXPERIENCE_LEVEL, job.experienceLevel);

  return (
    <Link to={`/job-details/${job._id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            {job.salary?.min != null && (
              <div className="text-right">
                <p className="font-semibold text-primary">
                  {job.salary.currency || "BDT"} {job.salary.min.toLocaleString()}
                  {job.salary.max ? ` - ${job.salary.max.toLocaleString()}` : ""}
                </p>
                {job.salary.isNegotiable && (
                  <p className="text-xs text-muted-foreground">Negotiable</p>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {job.description}
          </p>
          <div className="flex flex-wrap gap-2">
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
          {job.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {job.location?.city && (
              <span>
                {job.location.city}
                {job.location.country ? `, ${job.location.country}` : ""}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
