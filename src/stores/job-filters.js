import { create } from "zustand";

const initialState = {
  search: "",
  category: "",
  jobType: "",
  workLocationType: "",
  experienceLevel: "",
  minSalary: "",
  maxSalary: "",
  page: 1,
  limit: 10,
};

const useJobFilters = create(() => initialState);

export const setSearch = (search) =>
  useJobFilters.setState({ search, page: 1 });

export const setCategory = (category) =>
  useJobFilters.setState({ category, page: 1 });

export const setJobType = (jobType) =>
  useJobFilters.setState({ jobType, page: 1 });

export const setWorkLocationType = (workLocationType) =>
  useJobFilters.setState({ workLocationType, page: 1 });

export const setExperienceLevel = (experienceLevel) =>
  useJobFilters.setState({ experienceLevel, page: 1 });

export const setMinSalary = (minSalary) =>
  useJobFilters.setState({ minSalary, page: 1 });

export const setMaxSalary = (maxSalary) =>
  useJobFilters.setState({ maxSalary, page: 1 });

export const setPage = (page) => useJobFilters.setState({ page });

export const resetFilters = () => useJobFilters.setState(initialState);

export const toQueryParams = () => {
  const s = useJobFilters.getState();
  const params = new URLSearchParams();
  if (s.search) params.set("search", s.search);
  if (s.category) params.set("category", s.category);
  if (s.jobType) params.set("jobType", s.jobType);
  if (s.workLocationType) params.set("workLocationType", s.workLocationType);
  if (s.experienceLevel) params.set("experienceLevel", s.experienceLevel);
  if (s.minSalary) params.set("minSalary", s.minSalary);
  if (s.maxSalary) params.set("maxSalary", s.maxSalary);
  params.set("page", String(s.page));
  params.set("limit", String(s.limit));
  return params.toString();
};

export default useJobFilters;
