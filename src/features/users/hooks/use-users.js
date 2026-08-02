import useAuth from "@/stores/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }) => userApi.toggleStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};
