import { FieldSelect } from "@/components/forms/form-field";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import NotFound from "@/components/shared/not-found";
import SearchInput from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { USER_ROLE } from "@/constants/enums";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { Trash2, Users as UsersIcon } from "lucide-react";
import { useState } from "react";
import UserRoleSelect from "../components/user-role-select";
import UserStatusSelect from "../components/user-status-select";
import { useDeleteUser, useUsers } from "../hooks/use-users";

const ManageUsersPage = () => {
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const { search, setSearch, debouncedSearch } = useDebouncedSearch(() =>
    setPage(1),
  );

  const filters = {
    page,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(roleFilter && { role: roleFilter }),
  };

  const { data, isLoading } = useUsers(filters);
  const deleteUser = useDeleteUser();

  const users = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const columns = [
    {
      header: "User",
      cell: (_, u) => (
        <>
          <p className="font-medium">{u.name}</p>
          <p className="text-sm text-muted-foreground">{u.email}</p>
        </>
      ),
    },
    {
      header: "Role",
      className: "hidden md:table-cell",
      cell: (_, u) => <UserRoleSelect userId={u._id} role={u.role} />,
    },
    {
      header: "Phone",
      className: "hidden lg:table-cell",
      cell: (_, u) => <span className="text-sm">{u.phoneNumber || "-"}</span>,
    },
    {
      header: "Location",
      className: "hidden lg:table-cell",
      cell: (_, u) => (
        <span className="text-sm">
          {[u.city, u.country].filter(Boolean).join(", ") || "-"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (_, u) => <UserStatusSelect userId={u._id} isActive={u.isActive} />,
    },
    {
      header: "Actions",
      cell: (_, u) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => setDeleteId(u._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteId) return;

    await deleteUser.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground">View and manage platform users</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <SearchInput
          placeholder="Search by name or email..."
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
          className="max-w-sm"
        />
        <FieldSelect
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-52"
        >
          <option value="">All Roles</option>
          {Object.values(USER_ROLE).map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </FieldSelect>
      </div>

      {!isLoading && users.length === 0 ? (
        <NotFound message="No users found" icon={UsersIcon} />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalItems={data?.pagination?.total || 0}
          rowKey="_id"
          loadingRows={5}
          loadingCards={3}
          onPageChange={setPage}
          mobileCard={(u) => {
            return (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{u.name}</h3>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                    <UserRoleSelect userId={u._id} role={u.role} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <UserStatusSelect userId={u._id} isActive={u.isActive} />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setDeleteId(u._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }}
        />
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
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
              disabled={deleteUser.isPending}
            >
              {deleteUser.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ManageUsersPage;
