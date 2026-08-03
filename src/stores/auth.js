import { createAuthClient } from "better-auth/react";
import { create } from "zustand";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
});

const { signIn, signUp, signOut, getSession } = authClient;

const initialState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

const useAuth = create(() => initialState);

export const fetchSession = async () => {
  useAuth.setState({ loading: true, error: null });

  try {
    const { data } = await getSession();

    if (!data) throw new Error("No session found!");

    useAuth.setState({ user: data.user, isAuthenticated: true });
  } catch (err) {
    useAuth.setState({
      user: null,
      error: err?.message || "Session expired",
      isAuthenticated: false,
    });
  } finally {
    useAuth.setState({ loading: false });
  }
};

export const login = async (email, password, callbackURL) => {
  const { data, error } = await signIn.email({ email, password, callbackURL });
  if (error) throw error;

  await fetchSession();

  return data;
};

export const logInWithGoogle = async ({ callbackURL, additionalData }) => {
  const { data, error } = await signIn.social({
    provider: "google",
    callbackURL,
    additionalData,
  });

  if (error) throw error;

  await fetchSession();

  return data;
};

export const register = async (name, email, password, role) => {
  const { data, error } = await signUp.email({ name, email, password, role });

  if (error) throw error;

  await fetchSession();

  return data;
};

export const logout = async () => {
  useAuth.setState({ loading: true });
  await signOut();
  useAuth.setState({ user: null, loading: false, isAuthenticated: false });
};

export const updateUser = (userData) => {
  const current = useAuth.getState().user;
  if (current) {
    useAuth.setState({ user: { ...current, ...userData } });
  }
};

export default useAuth;
