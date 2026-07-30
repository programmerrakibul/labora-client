import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboard";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: dashboardApi.getAdminStats,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecruiterStats = () => {
  return useQuery({
    queryKey: ["dashboard", "recruiter"],
    queryFn: dashboardApi.getRecruiterStats,
    staleTime: 1000 * 60 * 5,
  });
};

export const useJobSeekerStats = () => {
  return useQuery({
    queryKey: ["dashboard", "job-seeker"],
    queryFn: dashboardApi.getJobSeekerStats,
    staleTime: 1000 * 60 * 5,
  });
};
