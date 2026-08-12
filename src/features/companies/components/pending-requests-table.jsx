import DataTable from "@/components/shared/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Check, Loader2, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useRequests, useRespondToRequest } from "../hooks/use-companies";

const PendingRequestsTable = ({ companyId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useRequests(companyId, { page, limit: 10 });
  const respond = useRespondToRequest();

  const requests = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const isProcessing = (requestId) =>
    respond.isPending && respond.variables?.requestId === requestId;

  const handleRespond = async (requestId, status) => {
    await respond.mutateAsync({ id: companyId, requestId, status });
  };

  const columns = [
    {
      header: "Applicant",
      cell: (_, r) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            {r.userId?.image ? (
              <AvatarImage src={r.userId.image} alt={r.userId.name} />
            ) : null}
            <AvatarFallback>
              <UserRound className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{r.userId?.name || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">{r.userId?.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Requested",
      className: "hidden md:table-cell",
      cell: (_, r) => (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (_, r) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRespond(r._id, "APPROVED")}
            disabled={respond.isPending}
          >
            {isProcessing(r._id) ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-1.5 h-4 w-4" />
            )}
            Approve
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() => handleRespond(r._id, "REJECTED")}
            disabled={respond.isPending}
          >
            <X className="mr-1.5 h-4 w-4" />
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pending Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={requests}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalItems={data?.pagination?.totalDocs || 0}
          rowKey="_id"
          loadingRows={3}
          loadingCards={2}
          onPageChange={setPage}
          emptyMessage="No pending join requests"
          mobileCard={(r) => (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {r.userId?.image ? (
                        <AvatarImage src={r.userId.image} alt={r.userId.name} />
                      ) : null}
                      <AvatarFallback>
                        <UserRound className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{r.userId?.name || "Unknown"}</p>
                      <p className="text-sm text-muted-foreground">
                        {r.userId?.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(r.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRespond(r._id, "APPROVED")}
                    disabled={respond.isPending}
                  >
                    {isProcessing(r._id) ? (
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-1.5 h-4 w-4" />
                    )}
                    Approve
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleRespond(r._id, "REJECTED")}
                    disabled={respond.isPending}
                  >
                    <X className="mr-1.5 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PendingRequestsTable;
