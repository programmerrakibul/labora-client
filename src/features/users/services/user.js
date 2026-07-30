import api from "@/lib/axios";

export const userApi = {
  getAll: async (params) => {
    const { data } = await api.get("/users", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/users/profile", payload);
    return data;
  },

  toggleStatus: async (id, isActive) => {
    const { data } = await api.patch(`/users/${id}/status`, { isActive });
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },
};
