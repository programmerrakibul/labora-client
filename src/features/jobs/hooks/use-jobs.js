import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "../services/job";

export const useJobs = (filters) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => jobApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUserJobs = (filters) => {
  return useQuery({
    queryKey: ["jobs", "user", filters],
    queryFn: () => jobApi.getUserJobs(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useJob = (id) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => jobApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] });
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => jobApi.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
