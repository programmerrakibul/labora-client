import { jobApi } from "@/features/jobs/services/job";
import queryClient from "@/lib/query-client";
import useAuth from "@/stores/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const jobQueryKeys = {
  all: ["jobs"],
  recruiter: (filters) => ["jobs", "recruiter", filters],
  list: (filters) => ["jobs", filters],
  single: (id) => ["jobs", id],
};

export const useJobs = (filters) => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: jobQueryKeys.list({ ...filters, email: user?.email }),
    queryFn: () => jobApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUserJobs = (filters) => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: jobQueryKeys.recruiter({ ...filters, email: user?.email }),
    queryFn: () => jobApi.getUserJobs(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useJob = (id) => {
  return useQuery({
    queryKey: jobQueryKeys.single(id),
    queryFn: () => jobApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  return useMutation({
    mutationFn: jobApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobQueryKeys.all });
    },
  });
};

export const useUpdateJob = () => {
  return useMutation({
    mutationFn: ({ id, ...payload }) => jobApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: jobQueryKeys.single(variables.id),
      });
    },
  });
};

export const useUpdateJobStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }) => jobApi.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: jobQueryKeys.single(variables.id),
      });
    },
  });
};

export const useDeleteJob = () => {
  return useMutation({
    mutationFn: jobApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobQueryKeys.all });
    },
  });
};
