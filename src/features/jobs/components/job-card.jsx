import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router";
import { formatJobLocation, formatPostedAt, formatSalary } from "../utils/job";
import JobBadges from "./job-badges";

const JobCard = ({ job }) => {
  const jobLocation = formatJobLocation(job.location);
  const skills = job.skills || [];

  return (
    <Link to={`/job-details/${job._id}`} className="block h-full w-full">
      <Card className="transition-shadow hover:shadow-md h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-lg font-semibold leading-tight line-clamp-1">
                {job.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {job.company}
              </p>
            </div>
            {job.salary?.min != null && (
              <div className="whitespace-break-spaces">
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
          <JobBadges job={job} />
          {skills?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.length > 3 ? (
                <>
                  {skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  <Badge variant="secondary">+{skills.length - 3} more</Badge>
                </>
              ) : (
                skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))
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
