import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../services/user";

export const useUsers = (filters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => userApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }) => userApi.toggleStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
