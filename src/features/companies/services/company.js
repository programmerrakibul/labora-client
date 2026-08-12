import api from "@/lib/axios";

export const companyApi = {
  getAll: async (params) => {
    const { data } = await api.get("/companies", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/companies/${id}`);
    return data.data || {};
  },

  create: async (payload) => {
    const { data } = await api.post("/companies", payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.patch(`/companies/${id}`, payload);
    return data;
  },

  join: async (id) => {
    const { data } = await api.post(`/companies/${id}/join`);
    return data;
  },

  cancelJoinRequest: async (id) => {
    const { data } = await api.delete(`/companies/${id}/join`);
    return data;
  },

  getRequests: async (id, params) => {
    const { data } = await api.get(`/companies/${id}/requests`, { params });
    return data;
  },

  respondToRequest: async (id, requestId, status) => {
    const { data } = await api.patch(`/companies/${id}/requests/${requestId}`, {
      status,
    });
    return data;
  },

  getMembers: async (id, params) => {
    const { data } = await api.get(`/companies/${id}/members`, { params });
    return data;
  },

  removeMember: async (id, userId) => {
    const { data } = await api.delete(`/companies/${id}/members/${userId}`);
    return data;
  },

  leave: async () => {
    const { data } = await api.delete("/companies/me/membership");
    return data;
  },

  getMyMembership: async () => {
    const { data } = await api.get("/companies/me/membership");
    return data;
  },
};
