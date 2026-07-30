import api from "@/lib/axios";

export const authApi = {
  getSession: async () => {
    const { data } = await api.get("/auth/get-session");
    return data;
  },
};
