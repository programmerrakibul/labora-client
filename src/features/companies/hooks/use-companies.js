import { toast } from "@/components/ui/toast";
import queryClient from "@/lib/query-client";
import { fetchSession, updateUser } from "@/stores/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { companyApi } from "../services/company";

export const companyQueryKeys = {
  all: ["companies"],
  list: (filters) => ["companies", filters],
  single: (id) => ["companies", id],
  requests: (id, filters) => ["companies", id, "requests", filters],
  members: (id, filters) => ["companies", id, "members", filters],
  myMembership: ["companies", "me", "membership"],
};

export const useCompanies = (filters) => {
  return useQuery({
    queryKey: companyQueryKeys.list(filters),
    queryFn: () => companyApi.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCompany = (id) => {
  return useQuery({
    queryKey: companyQueryKeys.single(id),
    queryFn: () => companyApi.getById(id),
    enabled: !!id,
  });
};

export const useMyMembership = (options = {}) => {
  return useQuery({
    queryKey: companyQueryKeys.myMembership,
    queryFn: companyApi.getMyMembership,
    ...options,
  });
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: companyApi.create,
    onSuccess: (data) => {
      const companyId = data?.data?._id || data?.data?.id;
      if (companyId) {
        updateUser({ role: "COMPANY_OWNER", companyId });
      }
      fetchSession();
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.myMembership,
      });
      toast.success({
        title: "Company created",
        description: "Your company has been created successfully.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error creating company",
        description:
          err?.response?.data?.error ||
          "An error occurred while creating your company.",
      });
    },
  });
};

export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: ({ id, ...payload }) => companyApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.single(variables.id),
      });
      toast.success({
        title: "Company updated",
        description: "Your company profile has been updated successfully.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error updating company",
        description:
          err?.response?.data?.error ||
          "An error occurred while updating your company.",
      });
    },
  });
};

export const useJoinCompany = () => {
  return useMutation({
    mutationFn: companyApi.join,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.myMembership,
      });
    },
  });
};

export const useCancelJoinRequest = () => {
  return useMutation({
    mutationFn: companyApi.cancelJoinRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.myMembership,
      });
      toast.success({
        title: "Request cancelled",
        description: "Your join request has been cancelled.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error cancelling request",
        description:
          err?.response?.data?.error ||
          "An error occurred while cancelling your request.",
      });
    },
  });
};

export const useRequests = (id, filters) => {
  return useQuery({
    queryKey: companyQueryKeys.requests(id, filters),
    queryFn: () => companyApi.getRequests(id, filters),
    staleTime: 1000 * 60 * 2,
    enabled: !!id,
  });
};

export const useRespondToRequest = () => {
  return useMutation({
    mutationFn: ({ id, requestId, status }) =>
      companyApi.respondToRequest(id, requestId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.requests(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.members(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
      toast.success({
        title: "Request updated",
        description: "The join request has been resolved.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error updating request",
        description:
          err?.response?.data?.error ||
          "An error occurred while updating the request.",
      });
    },
  });
};

export const useMembers = (id, filters) => {
  return useQuery({
    queryKey: companyQueryKeys.members(id, filters),
    queryFn: () => companyApi.getMembers(id, filters),
    staleTime: 1000 * 60 * 2,
    enabled: !!id,
  });
};

export const useRemoveMember = () => {
  return useMutation({
    mutationFn: ({ id, userId }) => companyApi.removeMember(id, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.members(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
      toast.success({
        title: "Member removed",
        description: "The member has been removed from your company.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error removing member",
        description:
          err?.response?.data?.error ||
          "An error occurred while removing the member.",
      });
    },
  });
};

export const useLeaveCompany = () => {
  return useMutation({
    mutationFn: companyApi.leave,
    onSuccess: () => {
      updateUser({ role: "JOB_SEEKER", companyId: null });
      fetchSession();
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.myMembership,
      });
      toast.success({
        title: "Company left",
        description: "You have left the company successfully.",
      });
    },
    onError: (err) => {
      toast.error({
        title: "Error leaving company",
        description:
          err?.response?.data?.error ||
          "An error occurred while leaving the company.",
      });
    },
  });
};
