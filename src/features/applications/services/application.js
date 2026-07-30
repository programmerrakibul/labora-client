import api from "@/lib/axios";

export const applicationApi = {
  getAll: async (params) => {
    const { data } = await api.get("/applications", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/applications/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/applications", payload);
    return data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/applications/${id}/status`, { status });
    return data;
  },

  withdraw: async (id) => {
    const { data } = await api.delete(`/applications/${id}`);
    return data;
  },
};
