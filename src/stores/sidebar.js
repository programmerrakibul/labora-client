import { create } from "zustand";

const initialState = {
  open: true,
};

const useSidebarStore = create(() => initialState);

export const setSidebarOpen = (open) =>
  useSidebarStore.setState((state) => ({
    open: typeof open === "function" ? open(state.open) : open,
  }));

export const toggleSidebar = () =>
  useSidebarStore.setState((state) => ({ open: !state.open }));

export default useSidebarStore;
