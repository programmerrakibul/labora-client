import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getEnumByValue,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enums";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Clock,
  EyeIcon,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { formatJobLocation, formatPostedAt } from "../utils/job";
import JobStatusSelect from "./job-status-select";

const MyJobsCard = ({ job, onView, onEdit, onDelete }) => {
  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);

  return (
    <Card className="space-y-0">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight">
              {job.title}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {job.company}
            </p>
          </div>
          <JobStatusSelect jobId={job._id} status={job.status} />
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
          <span className="truncate">
            {formatJobLocation(job.location) || "-"}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatPostedAt(job.createdAt)}
          </span>
        </div>
        <div className="flex gap-2 border-t pt-3">
          {[
            {
              icon: EyeIcon,
              label: "View",
              onClick: () => onView?.(job),
              className: "",
            },
            {
              icon: Pencil,
              label: "Edit",
              onClick: () => onEdit?.(job),
              className: "",
            },
            {
              icon: Trash2,
              label: "Delete",
              onClick: () => onDelete?.(job._id),
              className: "text-destructive hover:text-destructive",
            },
          ].map((item) => (
            <Button
              key={item.label}
              variant="outline"
              size="sm"
              className={cn("flex-1", item.className)}
              onClick={item.onClick}
            >
              <item.icon className="mr-1.5 size-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyJobsCard;
