import DataTable from "@/components/shared/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { Trash2, UserRound } from "lucide-react";
import { useState } from "react";
import { useMembers, useRemoveMember } from "../hooks/use-companies";

const MembersTable = ({ companyId }) => {
  const [page, setPage] = useState(1);
  const [removeMember, setRemoveMember] = useState(null);
  const { data, isLoading } = useMembers(companyId, { page, limit: 10 });
  const remove = useRemoveMember();

  const members = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleRemove = async () => {
    if (!removeMember) return;

    await remove.mutateAsync({
      id: companyId,
      userId: removeMember.userId?._id,
    });
    setRemoveMember(null);
  };

  const columns = [
    {
      header: "Member",
      cell: (_, m) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            {m.userId?.image ? (
              <AvatarImage src={m.userId.image} alt={m.userId.name} />
            ) : null}
            <AvatarFallback>
              <UserRound className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{m.userId?.name || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">{m.userId?.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (_, m) =>
        m.role === "COMPANY_OWNER" ? (
          <Badge variant="secondary">Owner</Badge>
        ) : (
          <Badge variant="outline">Member</Badge>
        ),
    },
    {
      header: "Joined",
      className: "hidden md:table-cell",
      cell: (_, m) => (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(
            new Date(m.role === "COMPANY_OWNER" ? m.createdAt : m.respondedAt),
            { addSuffix: true },
          )}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (_, m) =>
        m.role === "COMPANY_OWNER" ? (
          <span className="text-sm text-muted-foreground">—</span>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => setRemoveMember(m)}
            aria-label={`Remove ${m.userId?.name || "member"}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Members</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={members}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalItems={data?.pagination?.totalDocs || 0}
          rowKey="_id"
          loadingRows={3}
          loadingCards={2}
          onPageChange={setPage}
          emptyMessage="No members yet"
          mobileCard={(m) => (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {m.userId?.image ? (
                        <AvatarImage src={m.userId.image} alt={m.userId.name} />
                      ) : null}
                      <AvatarFallback>
                        <UserRound className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {m.userId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {m.userId?.email}
                      </p>
                    </div>
                  </div>
                  {m.role === "COMPANY_OWNER" ? (
                    <Badge variant="secondary">Owner</Badge>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setRemoveMember(m)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        />
      </CardContent>

      <Dialog open={!!removeMember} onOpenChange={() => setRemoveMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              {removeMember?.userId?.name || "this member"} from your company?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveMember(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={remove.isPending}
            >
              {remove.isPending ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MembersTable;
