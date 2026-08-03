import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import NotFound from "@/components/shared/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getEnumByValue,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enums";
import { BriefcaseBusiness, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import EditJobDialog from "../components/edit-job-dialog";
import JobDetailsModal from "../components/job-details-modal";
import JobStatusSelect from "../components/job-status-select";
import MyJobsCard from "../components/my-jobs-card";
import { useDeleteJob, useUserJobs } from "../hooks/use-jobs";
import { formatPostedAt } from "../utils/job";

const MyJobsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const { data, isLoading } = useUserJobs({ page, limit: 10 });
  const deleteJob = useDeleteJob();

  const jobs = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const columns = [
    {
      header: "Job",
      cell: (_, job) => (
        <>
          <Link
            to={`/job-details/${job._id}`}
            className="font-medium hover:underline"
          >
            {job.title}
          </Link>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </>
      ),
    },
    {
      header: "Type",
      className: "hidden md:table-cell",
      cell: (_, job) => {
        const jobType = getEnumByValue(JOB_TYPE, job.jobType);
        return jobType ? (
          <Badge variant="secondary" className={jobType.color}>
            {jobType.label}
          </Badge>
        ) : null;
      },
    },
    {
      header: "Location",
      className: "hidden md:table-cell",
      cell: (_, job) => {
        const locationType = getEnumByValue(
          WORK_LOCATION_TYPE,
          job.workLocationType,
        );
        return locationType ? (
          <Badge variant="secondary" className={locationType.color}>
            {locationType.label}
          </Badge>
        ) : null;
      },
    },
    {
      header: "Status",
      className: "hidden sm:table-cell",
      cell: (_, job) => <JobStatusSelect jobId={job._id} status={job.status} />,
    },
    {
      header: "Posted",
      className: "hidden lg:table-cell",
      cell: (_, job) => (
        <span className="text-sm text-muted-foreground">
          {formatPostedAt(job.createdAt)}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (_, job) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewJob(job)}
            aria-label="View job details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setEditJob(job)}
            aria-label="Edit job"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setDeleteId(job._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteJob.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to delete job");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Jobs</h1>
          <p className="text-muted-foreground">Manage your posted jobs</p>
        </div>
        <Button
          onClick={() => navigate("/dashboard/add-job")}
          className="items-center"
        >
          <Plus className="h-4 w-4" />
          Post Job
        </Button>
      </div>

      {!isLoading && jobs.length === 0 ? (
        <NotFound
          message="No jobs posted yet"
          icon={BriefcaseBusiness}
          action={() => navigate("/dashboard/add-job", { replace: true })}
          actionLabel="Post Your First Job"
        />
      ) : (
        <DataTable
          columns={columns}
          data={jobs}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalItems={data?.pagination?.total || 0}
          rowKey="_id"
          loadingRows={5}
          loadingCards={3}
          onPageChange={setPage}
          mobileCard={(job) => (
            <MyJobsCard
              job={job}
              onView={setViewJob}
              onEdit={setEditJob}
              onDelete={setDeleteId}
            />
          )}
        />
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteJob.isPending}
            >
              {deleteJob.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <JobDetailsModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={() => setViewJob(null)}
      />

      <EditJobDialog
        job={editJob}
        open={!!editJob}
        onOpenChange={() => setEditJob(null)}
      />
    </Container>
  );
};

export default MyJobsPage;
