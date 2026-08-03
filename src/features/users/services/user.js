import api from "@/lib/axios";

export const userApi = {
  getAll: async (params) => {
    const { data } = await api.get("/users", { params });

    if (!data.success) throw new Error(data.message);

    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/users/${id}`);

    if (!data.success) throw new Error(data.message);

    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/users/profile", payload);
    return data;
  },

  toggleStatus: async (id, isActive) => {
    const { data } = await api.patch(`/users/${id}/status`, { isActive });

    if (!data.success) throw new Error(data.message);

    return data;
  },

  updateRole: async (id, role) => {
    const { data } = await api.patch(`/users/${id}/role`, { role });

    if (!data.success) throw new Error(data.message);

    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/users/${id}`);

    if (!data.success) throw new Error(data.message);

    return data;
  },
};
