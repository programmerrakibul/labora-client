import api from "@/lib/axios";

export const jobApi = {
  getAll: async (params) => {
    const { data } = await api.get("/jobs", { params });
    return data;
  },

  getUserJobs: async (params) => {
    const { data } = await api.get("/jobs/user", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/jobs", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/jobs/${id}`, payload);
    return data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/jobs/${id}/status`, { status });
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
  },
};
