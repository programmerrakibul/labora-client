import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEnumByValue, JOB_TYPE, WORK_LOCATION_TYPE } from "@/constants/enums";
import { Briefcase, Clock, Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import JobStatusSelect from "./job-status-select";
import { formatJobLocation, formatPostedAt } from "../utils/job";

const MyJobsCard = ({ job, onView, onDelete }) => {
  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);

  return (
    <Card className="space-y-0">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight">{job.title}</h3>
            <p className="truncate text-sm text-muted-foreground">{job.company}</p>
          </div>
          <JobStatusSelect job={job} />
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
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate">{formatJobLocation(job.location) || "-"}</span>
          <span className="flex shrink-0 items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatPostedAt(job.createdAt)}
          </span>
        </div>
        <div className="flex gap-2 border-t pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView?.(job)}
          >
            <Eye className="mr-1.5 h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/dashboard/my-jobs/update/${job._id}`}>
              <Pencil className="mr-1.5 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-destructive hover:text-destructive"
            onClick={() => onDelete?.(job._id)}
          >
            <Trash2 className="mr-1.5 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyJobsCard;
