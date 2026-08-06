import api from "@/lib/axios";

export const applicationApi = {
  getAll: async (params) => {
    const { data } = await api.get("/applications", { params });

    if (!data.success) throw new Error(data.message);

    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/applications/${id}`);

    if (!data.success) throw new Error(data.message);

    return data;
  },

  create: async (payload) => {
    const { data } = await api.post("/applications", payload);

    if (!data.success) throw new Error(data.message);

    return data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/applications/${id}/status`, { status });

    if (!data.success) throw new Error(data.message);

    return data;
  },

  withdraw: async (id) => {
    const { data } = await api.delete(`/applications/${id}`);

    if (!data.success) throw new Error(data.message);

    return data;
  },
};
