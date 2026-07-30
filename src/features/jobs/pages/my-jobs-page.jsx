import { useUserJobs, useDeleteJob } from "../hooks/use-jobs";
import JobTableRow from "../components/job-table-row";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import NotFound from "@/components/shared/not-found";
import { TableSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MyJobsPage = () => {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const { data, isLoading } = useUserJobs({ page, limit: 10 });
  const deleteJob = useDeleteJob();

  const jobs = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteJob.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to delete job");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Jobs</h1>
          <p className="text-muted-foreground">Manage your posted jobs</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/add-job">
            <Plus className="mr-2 h-4 w-4" />
            Post Job
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : jobs.length === 0 ? (
        <NotFound
          message="No jobs posted yet"
          icon={BriefcaseBusiness}
          action={() => window.location.replace("/dashboard/add-job")}
          actionLabel="Post Your First Job"
        />
      ) : (
        <>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left text-sm font-medium">Job</th>
                  <th className="hidden p-4 text-left text-sm font-medium md:table-cell">Type</th>
                  <th className="hidden p-4 text-left text-sm font-medium md:table-cell">Location</th>
                  <th className="hidden p-4 text-left text-sm font-medium sm:table-cell">Status</th>
                  <th className="hidden p-4 text-left text-sm font-medium lg:table-cell">Posted</th>
                  <th className="p-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <JobTableRow key={job._id} job={job} onDelete={setDeleteId} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
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
    </Container>
  );
};

export default MyJobsPage;
