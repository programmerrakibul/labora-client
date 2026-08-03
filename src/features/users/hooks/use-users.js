import { toast } from "@/components/ui/toast";
import queryClient from "@/lib/query-client";
import useAuth from "@/stores/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "../services/user";

export const userQueryKeys = {
  all: ["users"],
  list: (filters) => ["users", filters],
  single: (id) => ["users", id],
};

export const useUsers = (filters) => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: userQueryKeys.list({ ...filters, email: user?.email }),
    queryFn: () => userApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: userQueryKeys.single(id),
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

export const useToggleUserStatus = () => {
  return useMutation({
    mutationFn: ({ id, isActive }) => userApi.toggleStatus(id, isActive),
    onSuccess: () => {
      toast.success({
        title: "Status updated",
        description: "User status has been updated successfully.",
      });

      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
    onError: (err) => {
      toast.error({
        title: "Error updating status",
        description:
          err?.response?.data?.error ||
          "An error occurred while updating the user status.",
      });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};
