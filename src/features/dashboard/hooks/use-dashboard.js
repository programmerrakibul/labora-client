import useAuth from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboard";

export const dashboardQueryKeys = {
  all: ["dashboard"],
  admin: ["dashboard", "admin"],
  recruiter: ["dashboard", "recruiter"],
  jobSeeker: ["dashboard", "job-seeker"],
};

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useAdminStats = () => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: [user?.email, ...dashboardQueryKeys.admin],
    queryFn: dashboardApi.getAdminStats,
    staleTime: STALE_TIME,
  });
};

export const useRecruiterStats = () => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: [user?.email, ...dashboardQueryKeys.recruiter],
    queryFn: dashboardApi.getRecruiterStats,
    staleTime: STALE_TIME,
  });
};

export const useJobSeekerStats = () => {
  const user = useAuth((state) => state.user);

  return useQuery({
    queryKey: [user?.email, ...dashboardQueryKeys.jobSeeker],
    queryFn: dashboardApi.getJobSeekerStats,
    staleTime: STALE_TIME,
  });
};
