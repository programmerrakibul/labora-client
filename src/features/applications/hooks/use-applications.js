import { dashboardQueryKeys } from "@/features/dashboard/hooks/use-dashboard";
import queryClient from "@/lib/query-client";
import useAuth from "@/stores/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/application";

export const applicationQueryKeys = {
  all: ["applications"],
  list: (filters) => ["applications", filters],
  single: (id) => ["applications", id],
};

export const useApplications = (filters) => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: applicationQueryKeys.list({ ...filters, email: user?.email }),
    queryFn: () => applicationApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useApplication = (id) => {
  return useQuery({
    queryKey: applicationQueryKeys.single(id),
    queryFn: () => applicationApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: applicationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }) => applicationApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
    },
  });
};

export const useWithdrawApplication = () => {
  return useMutation({
    mutationFn: applicationApi.withdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
    },
  });
};
