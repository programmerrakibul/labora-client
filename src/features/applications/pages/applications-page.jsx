import { useApplications, useUpdateApplicationStatus, useWithdrawApplication } from "../hooks/use-applications";
import { APPLICATION_STATUS } from "@/constants/enums";
import { getEnumByValue } from "@/constants/enums";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import NotFound from "@/components/shared/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAuth from "@/stores/auth";
import { useState } from "react";
import { FileText, X, ChevronDown, ChevronUp } from "lucide-react";
import { TableSkeleton, CardSkeleton } from "@/components/shared/skeletons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldSelect,
} from "@/components/forms/form-field";

const ApplicationsPage = () => {
  const user = useAuth((s) => s.user);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusDialog, setStatusDialog] = useState(null);

  const filters = {
    page,
    limit: 10,
    ...(statusFilter && { status: statusFilter }),
  };

  const { data, isLoading } = useApplications(filters);
  const updateStatus = useUpdateApplicationStatus();
  const withdraw = useWithdrawApplication();

  const applications = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const isRecruiter = user?.role === "RECRUITER";

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      setStatusDialog(null);
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update status");
    }
  };

  const handleWithdraw = async (id) => {
    try {
      await withdraw.mutateAsync(id);
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to withdraw");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          {isRecruiter ? "Review incoming applications" : "Track your job applications"}
        </p>
      </div>

      <div className="mb-4">
        <FieldSelect
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="w-full max-w-xs"
        >
          <option value="">All Statuses</option>
          {Object.values(APPLICATION_STATUS).map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </FieldSelect>
      </div>

      {isLoading ? (
        <>
          <div className="hidden md:block">
            <TableSkeleton rows={5} columns={5} />
          </div>
          <div className="md:hidden">
            <CardSkeleton count={3} />
          </div>
        </>
      ) : applications.length === 0 ? (
        <NotFound
          message="No applications found"
          icon={FileText}
          actionLabel="Browse Jobs"
          action={() => window.location.replace("/all-jobs")}
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden rounded-lg border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left text-sm font-medium">Job</th>
                  <th className="p-4 text-left text-sm font-medium">
                    {isRecruiter ? "Applicant" : "Company"}
                  </th>
                  <th className="p-4 text-left text-sm font-medium">Status</th>
                  <th className="hidden p-4 text-left text-sm font-medium lg:table-cell">
                    Expected Salary
                  </th>
                  <th className="p-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const status = getEnumByValue(APPLICATION_STATUS, app.status);
                  return (
                    <tr key={app._id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4">
                        <p className="font-medium">{app.jobId?.title || "N/A"}</p>
                        <p className="text-sm text-muted-foreground">{app.jobId?.company || ""}</p>
                      </td>
                      <td className="p-4">
                        {isRecruiter ? (
                          <>
                            <p className="font-medium">{app.applicantId?.name || "N/A"}</p>
                            <p className="text-sm text-muted-foreground">{app.applicantId?.email || ""}</p>
                          </>
                        ) : (
                          <p className="text-muted-foreground">{app.jobId?.company || "N/A"}</p>
                        )}
                      </td>
                      <td className="p-4">
                        {status && <Badge variant="secondary" className={status.color}>{status.label}</Badge>}
                      </td>
                      <td className="hidden p-4 text-sm lg:table-cell">
                        {app.expectedSalary != null ? app.expectedSalary.toLocaleString() : "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {isRecruiter && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setStatusDialog(app)}
                            >
                              Update Status
                            </Button>
                          )}
                          {!isRecruiter && app.status === "PENDING" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleWithdraw(app._id)}
                            >
                              Withdraw
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {applications.map((app) => {
              const status = getEnumByValue(APPLICATION_STATUS, app.status);
              const isExpanded = expandedId === app._id;
              return (
                <Card key={app._id}>
                  <CardHeader
                    className="cursor-pointer pb-2"
                    onClick={() => setExpandedId(isExpanded ? null : app._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{app.jobId?.title || "N/A"}</h3>
                        <p className="text-sm text-muted-foreground">{app.jobId?.company || ""}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {status && <Badge variant="secondary" className={status.color}>{status.label}</Badge>}
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0 space-y-2">
                      {isRecruiter && app.applicantId && (
                        <p className="text-sm"><span className="font-medium">Applicant:</span> {app.applicantId.name} ({app.applicantId.email})</p>
                      )}
                      {app.expectedSalary != null && (
                        <p className="text-sm"><span className="font-medium">Expected Salary:</span> {app.expectedSalary.toLocaleString()}</p>
                      )}
                      {app.coverLetter && (
                        <p className="text-sm"><span className="font-medium">Cover Letter:</span> {app.coverLetter}</p>
                      )}
                      <div className="flex gap-2 pt-2">
                        {isRecruiter && (
                          <Button variant="outline" size="sm" onClick={() => setStatusDialog(app)}>
                            Update Status
                          </Button>
                        )}
                        {!isRecruiter && app.status === "PENDING" && (
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleWithdraw(app._id)}>
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <Dialog open={!!statusDialog} onOpenChange={() => setStatusDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status for this application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {Object.values(APPLICATION_STATUS)
              .filter((s) => s.value !== "WITHDRAWN")
              .map((s) => (
                <Button
                  key={s.value}
                  variant={statusDialog?.status === s.value ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleStatusUpdate(statusDialog?._id, s.value)}
                  disabled={updateStatus.isPending}
                >
                  <Badge variant="secondary" className={`mr-2 ${s.color}`}>{s.label}</Badge>
                </Button>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialog(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ApplicationsPage;
