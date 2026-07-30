import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "../services/application";

export const useApplications = (filters) => {
  return useQuery({
    queryKey: ["applications", filters],
    queryFn: () => applicationApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useApplication = (id) => {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => applicationApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applicationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => applicationApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applicationApi.withdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
