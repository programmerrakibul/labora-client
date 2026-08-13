import { FieldSelect } from "@/components/forms/form-field";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import NotFound from "@/components/shared/not-found";
import SearchInput from "@/components/shared/search-input";
import Seo from "@/components/shared/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { APPLICATION_STATUS, getEnumByValue } from "@/constants/enum-configs";
import { USER_ROLE } from "@/constants/enums";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import useAuth from "@/stores/auth";
import { ChevronDown, ChevronUp, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ApplicationDetailsModal from "../components/application-details-modal";
import ApplicationStatusSelect from "../components/application-status-select";
import {
  useApplications,
  useWithdrawApplication,
} from "../hooks/use-applications";

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [viewApp, setViewApp] = useState(null);
  const { search, setSearch, debouncedSearch } = useDebouncedSearch(() =>
    setPage(1),
  );

  const filters = {
    page,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter && { status: statusFilter }),
  };

  const { data, isLoading } = useApplications(filters);
  const withdraw = useWithdrawApplication();

  const applications = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const isRecruiter = [
    USER_ROLE.COMPANY_MEMBER,
    USER_ROLE.COMPANY_OWNER,
  ].includes(user?.role);
  
  const canWithdraw = (app) =>
    !isRecruiter && !["WITHDRAWN", "REJECTED", "HIRED"].includes(app.status);

  const columns = [
    {
      header: "Job",
      cell: (_, app) => (
        <>
          <p className="font-medium">{app.jobId?.title || "N/A"}</p>
          <p className="text-sm text-muted-foreground">
            {app.jobId?.company || ""}
          </p>
        </>
      ),
    },
    {
      header: isRecruiter ? "Applicant" : "Company",
      cell: (_, app) =>
        isRecruiter ? (
          <>
            <p className="font-medium">{app.applicantId?.name || "N/A"}</p>
            <p className="text-sm text-muted-foreground">
              {app.applicantId?.email || ""}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">{app.jobId?.company || "N/A"}</p>
        ),
    },
    {
      header: "Status",
      cell: (_, app) => {
        if (isRecruiter) {
          return (
            <ApplicationStatusSelect
              applicationId={app._id}
              status={app.status}
            />
          );
        }
        const status = getEnumByValue(APPLICATION_STATUS, app.status);
        return status ? (
          <Badge variant="secondary" className={status.color}>
            {status.label}
          </Badge>
        ) : null;
      },
    },
    {
      header: "Expected Salary",
      className: "hidden lg:table-cell",
      cell: (_, app) =>
        app.expectedSalary != null ? (
          <span className="text-sm">{app.expectedSalary.toLocaleString()}</span>
        ) : (
          "-"
        ),
    },
    {
      header: "Actions",
      cell: (_, app) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewApp(app)}
            aria-label="View application details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {canWithdraw(app) && (
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
      ),
    },
  ];

  const handleWithdraw = async (id) => {
    try {
      await withdraw.mutateAsync(id);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to withdraw");
    }
  };

  return (
    <Container className="py-8">
      <Seo
        title="Applications"
        noindex
        description="Review job applications and track your applications on Labora."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          {isRecruiter
            ? "Review incoming applications"
            : "Track your job applications"}
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <SearchInput
          placeholder={
            isRecruiter
              ? "Search by job title or applicant..."
              : "Search by job title or company..."
          }
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
          className="max-w-sm"
        />
        <FieldSelect
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-52"
        >
          <option value="">All Statuses</option>
          {Object.values(APPLICATION_STATUS).map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </FieldSelect>
      </div>

      {!isLoading && applications.length === 0 ? (
        <NotFound
          message="No applications found"
          icon={FileText}
          actionLabel="Browse Jobs"
          action={() => navigate("/all-jobs")}
        />
      ) : (
        <DataTable
          columns={columns}
          data={applications}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalItems={data?.pagination?.total || 0}
          rowKey="_id"
          loadingRows={5}
          loadingCards={3}
          onPageChange={setPage}
          mobileCard={(app) => {
            const status = getEnumByValue(APPLICATION_STATUS, app.status);
            const isExpanded = expandedId === app._id;
            return (
              <Card>
                <CardHeader
                  className="cursor-pointer pb-2"
                  onClick={() => setExpandedId(isExpanded ? null : app._id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {app.jobId?.title || "N/A"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {app.jobId?.company || ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isRecruiter ? (
                        <ApplicationStatusSelect
                          applicationId={app._id}
                          status={app.status}
                        />
                      ) : (
                        status && (
                          <Badge variant="secondary" className={status.color}>
                            {status.label}
                          </Badge>
                        )
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0 space-y-2">
                    {isRecruiter && app.applicantId && (
                      <p className="text-sm">
                        <span className="font-medium">Applicant:</span>{" "}
                        {app.applicantId.name} ({app.applicantId.email})
                      </p>
                    )}
                    {app.expectedSalary != null && (
                      <p className="text-sm">
                        <span className="font-medium">Expected Salary:</span>{" "}
                        {app.expectedSalary.toLocaleString()}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewApp(app)}
                      >
                        <Eye className="mr-1.5 size-4" />
                        View
                      </Button>
                      {canWithdraw(app) && (
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
                  </CardContent>
                )}
              </Card>
            );
          }}
        />
      )}

      <ApplicationDetailsModal
        application={viewApp}
        open={!!viewApp}
        onOpenChange={() => setViewApp(null)}
      />
    </Container>
  );
};

export default ApplicationsPage;
