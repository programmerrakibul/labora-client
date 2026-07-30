import { useUsers, useToggleUserStatus, useDeleteUser } from "../hooks/use-users";
import { USER_ROLE } from "@/constants/enums";
import { getEnumByValue } from "@/constants/enums";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import NotFound from "@/components/shared/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Users as UsersIcon, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { TableSkeleton, CardSkeleton } from "@/components/shared/skeletons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManageUsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filters = {
    page,
    limit: 10,
    ...(search && { search }),
    ...(roleFilter && { role: roleFilter }),
  };

  const { data, isLoading } = useUsers(filters);
  const toggleStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();

  const users = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUser.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to delete user");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground">View and manage platform users</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="max-w-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="flex h-10 rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">All Roles</option>
          {Object.values(USER_ROLE).map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <>
          <div className="hidden md:block"><TableSkeleton rows={5} columns={5} /></div>
          <div className="md:hidden"><CardSkeleton count={3} /></div>
        </>
      ) : users.length === 0 ? (
        <NotFound message="No users found" icon={UsersIcon} />
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden rounded-lg border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left text-sm font-medium">User</th>
                  <th className="hidden p-4 text-left text-sm font-medium md:table-cell">Role</th>
                  <th className="hidden p-4 text-left text-sm font-medium lg:table-cell">Phone</th>
                  <th className="hidden p-4 text-left text-sm font-medium lg:table-cell">Location</th>
                  <th className="p-4 text-left text-sm font-medium">Status</th>
                  <th className="p-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const role = getEnumByValue(USER_ROLE, u.role);
                  return (
                    <tr key={u._id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4">
                        <p className="font-medium">{u.name}</p>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </td>
                      <td className="hidden p-4 md:table-cell">
                        {role && <Badge variant="secondary" className={role.color}>{role.label}</Badge>}
                      </td>
                      <td className="hidden p-4 text-sm lg:table-cell">{u.phoneNumber || "-"}</td>
                      <td className="hidden p-4 text-sm lg:table-cell">
                        {[u.city, u.country].filter(Boolean).join(", ") || "-"}
                      </td>
                      <td className="p-4">
                        <Badge variant={u.isActive ? "secondary" : "destructive"}>
                          {u.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleStatus.mutate({ id: u._id, isActive: !u.isActive })}
                            disabled={toggleStatus.isPending}
                          >
                            {u.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => setDeleteId(u._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 md:hidden">
            {users.map((u) => {
              const role = getEnumByValue(USER_ROLE, u.role);
              return (
                <Card key={u._id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{u.name}</h3>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </div>
                      {role && <Badge variant="secondary" className={role.color}>{role.label}</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={u.isActive ? "secondary" : "destructive"}>
                        {u.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => toggleStatus.mutate({ id: u._id, isActive: !u.isActive })}>
                          {u.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(u._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-6">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteUser.isPending}>
              {deleteUser.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ManageUsersPage;
