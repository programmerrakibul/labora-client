import api from "@/lib/axios";

export const dashboardApi = {
  getAdminStats: async () => {
    const { data } = await api.get("/dashboard/admin");
    return data;
  },

  getRecruiterStats: async () => {
    const { data } = await api.get("/dashboard/recruiter");
    return data;
  },

  getJobSeekerStats: async () => {
    const { data } = await api.get("/dashboard/job-seeker");
    return data;
  },
};
