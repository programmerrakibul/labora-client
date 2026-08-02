import { formatDistanceToNow } from "date-fns";

export const formatSalary = (salary) => {
  if (!salary || salary.min == null) return "";
  const min = salary.min.toLocaleString();
  const max = salary.max != null ? ` - ${salary.max.toLocaleString()}` : "";
  return `${salary.currency || "BDT"} ${min}${max}`;
};

export const formatJobLocation = (location = {}) =>
  [location.city, location.state, location.country].filter(Boolean).join(", ");

export const formatPostedAt = (date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });
