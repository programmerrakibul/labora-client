import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  EXPERIENCE_LEVEL,
  getEnumByValue,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enums";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import { formatJobLocation, formatPostedAt, formatSalary } from "../utils/job";

const SkillItem = ({ skill }) => (
  <span
    key={skill}
    className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
  >
    {skill}
  </span>
);

const JobCard = ({ job }) => {
  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);
  const experienceLevel = getEnumByValue(EXPERIENCE_LEVEL, job.experienceLevel);
  const jobLocation = formatJobLocation(job.location);
  const skills = job.skills || [];

  return (
    <Link to={`/job-details/${job._id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            {job.salary?.min != null && (
              <div className="text-right whitespace-nowrap">
                <p className="font-semibold text-primary">
                  {formatSalary(job.salary)}
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
                <MapPin className="mr-1 size-3" />
                {locationType.label}
              </Badge>
            )}
            {experienceLevel && (
              <Badge variant="secondary" className={experienceLevel.color}>
                {experienceLevel.label}
              </Badge>
            )}
          </div>
          {skills?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.length > 3 ? (
                <>
                  {skills.slice(0, 3).map((skill) => (
                    <SkillItem key={skill} skill={skill} />
                  ))}
                  <SkillItem key="more" skill={`+${skills.length - 3}`} />
                </>
              ) : (
                skills.map((skill) => <SkillItem key={skill} skill={skill} />)
              )}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate">
              {jobLocation || "Location on request"}
            </span>
            <span className="flex shrink-0 items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatPostedAt(job.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
