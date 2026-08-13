import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getEnumByValue,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enum-configs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { formatPostedAt } from "../utils/job";
import JobStatusSelect from "./job-status-select";

const JobTableRow = ({ job, onView, onEdit, onDelete }) => {
  const jobType = getEnumByValue(JOB_TYPE, job.jobType);
  const locationType = getEnumByValue(WORK_LOCATION_TYPE, job.workLocationType);

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4">
        <Link
          to={`/job-details/${job._id}`}
          className="font-medium hover:underline"
        >
          {job.title}
        </Link>
        <p className="text-sm text-muted-foreground">{job.company}</p>
      </td>
      <td className="hidden p-4 md:table-cell">
        {jobType && (
          <Badge variant="secondary" className={jobType.color}>
            {jobType.label}
          </Badge>
        )}
      </td>
      <td className="hidden p-4 md:table-cell">
        {locationType && (
          <Badge variant="secondary" className={locationType.color}>
            {locationType.label}
          </Badge>
        )}
      </td>
      <td className="hidden p-4 sm:table-cell">
        <JobStatusSelect jobId={job._id} status={job.status} />
      </td>
      <td className="hidden p-4 text-sm text-muted-foreground lg:table-cell">
        {formatPostedAt(job.createdAt)}
      </td>
      <td className="p-4">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onView?.(job)}
            aria-label="View job details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit?.(job)}
            aria-label="Edit job"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete?.(job._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default JobTableRow;
