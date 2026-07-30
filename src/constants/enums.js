export const USER_ROLE = {
  JOB_SEEKER: {
    value: "JOB_SEEKER",
    label: "Job Seeker",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  RECRUITER: {
    value: "RECRUITER",
    label: "Recruiter",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  ADMIN: {
    value: "ADMIN",
    label: "Admin",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
};

export const JOB_TYPE = {
  FULL_TIME: {
    value: "FULL_TIME",
    label: "Full Time",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  PART_TIME: {
    value: "PART_TIME",
    label: "Part Time",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  CONTRACT: {
    value: "CONTRACT",
    label: "Contract",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  INTERNSHIP: {
    value: "INTERNSHIP",
    label: "Internship",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  },
  FREELANCE: {
    value: "FREELANCE",
    label: "Freelance",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  },
  HOURLY: {
    value: "HOURLY",
    label: "Hourly",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
};

export const WORK_LOCATION_TYPE = {
  ON_SITE: {
    value: "ON_SITE",
    label: "On Site",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  },
  HYBRID: {
    value: "HYBRID",
    label: "Hybrid",
    color:
      "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  },
  REMOTE: {
    value: "REMOTE",
    label: "Remote",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
};

export const EXPERIENCE_LEVEL = {
  ENTRY_LEVEL: {
    value: "ENTRY_LEVEL",
    label: "Entry Level",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  },
  MID_LEVEL: {
    value: "MID_LEVEL",
    label: "Mid Level",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  SENIOR_LEVEL: {
    value: "SENIOR_LEVEL",
    label: "Senior Level",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  EXECUTIVE: {
    value: "EXECUTIVE",
    label: "Executive",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
};

export const JOB_STATUS = {
  DRAFT: {
    value: "DRAFT",
    label: "Draft",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  ACTIVE: {
    value: "ACTIVE",
    label: "Active",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  PAUSED: {
    value: "PAUSED",
    label: "Paused",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  CLOSED: {
    value: "CLOSED",
    label: "Closed",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
};

export const APPLICATION_STATUS = {
  PENDING: {
    value: "PENDING",
    label: "Pending",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  REVIEWING: {
    value: "REVIEWING",
    label: "Reviewing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  SHORTLISTED: {
    value: "SHORTLISTED",
    label: "Shortlisted",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  INTERVIEW_SCHEDULED: {
    value: "INTERVIEW_SCHEDULED",
    label: "Interview Scheduled",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  REJECTED: {
    value: "REJECTED",
    label: "Rejected",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  HIRED: {
    value: "HIRED",
    label: "Hired",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  WITHDRAWN: {
    value: "WITHDRAWN",
    label: "Withdrawn",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
};

export const CURRENCY = {
  USD: { value: "USD", label: "USD" },
  EUR: { value: "EUR", label: "EUR" },
  GBP: { value: "GBP", label: "GBP" },
  BDT: { value: "BDT", label: "BDT" },
};

export const JOB_CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Education",
  "Healthcare",
  "Engineering",
  "Business",
  "Legal",
  "Creative",
];

/** Helper to get enum entry by value */
export const getEnumByValue = (enumObj, value) => {
  return Object.values(enumObj).find((e) => e.value === value) || null;
};

/** Helper to get enum label */
export const getEnumLabel = (enumObj, value) => {
  return getEnumByValue(enumObj, value)?.label || value;
};

/** Helper to get enum color */
export const getEnumColor = (enumObj, value) => {
  return getEnumByValue(enumObj, value)?.color || "";
};
